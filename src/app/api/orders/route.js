import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { auth } from '@/auth';

export async function POST(request) {
    try {
        const body = await request.json();
        const { 
            name, email, mobile, address, city, district, 
            items, total, subtotal, shippingFee, paymentMethod, notes,
            password, discount, couponId
        } = body;

        if (!name || !mobile || !address || !items || items.length === 0) {
            return NextResponse.json({ error: 'Order must contain at least one item' }, { status: 400 });
        }

        const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const random = Math.floor(1000 + Math.random() * 9000);
        const orderNumber = `ORD-${date}-${random}`;

        const session = await auth();
        let userId = session?.user?.id;

        if (!userId && (!email || !password)) {
            return NextResponse.json({ error: 'Account registration is required to place an order. Please provide a password.' }, { status: 401 });
        }

        if (!userId && email && password) {
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                userId = existingUser.id;
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = await prisma.user.create({
                    data: {
                        name,
                        email,
                        password: hashedPassword,
                        role: 'customer'
                    }
                });
                userId = newUser.id;
            }
        }

        if (userId) {
            await prisma.user.update({
                where: { id: userId },
                data: {
                    phone: mobile,
                    address: address,
                    district: district,
                    city: city || district
                }
            }).catch(e => console.error("Profile update fail:", e));
        }

        if (couponId) {
            const alreadyUsed = await prisma.order.findFirst({
                where: {
                    couponId,
                    status: { not: 'cancelled' },
                    OR: [
                        userId ? { userId } : null,
                        { customerPhone: mobile },
                        email ? { customerEmail: email } : null
                    ].filter(Boolean)
                }
            });
            if (alreadyUsed) {
                return NextResponse.json({ error: 'You have already used this coupon code once' }, { status: 400 });
            }
        }

        const order = await prisma.$transaction(async (tx) => {
            if (!tx.order) throw new Error("Model order missing in tx");

            const newOrder = await tx.order.create({
                data: {
                    orderNumber,
                    customerName: name,
                    customerEmail: email,
                    customerPhone: mobile,
                    customerAddress: address,
                    customerCity: city || district,
                    customerArea: district,
                    totalAmount: total,
                    subtotal: subtotal,
                    discount: discount || 0,
                    couponId: couponId || null,
                    shippingFee: shippingFee || 0,
                    paymentMethod: paymentMethod || 'COD',
                    status: 'pending',
                    userId: userId || null
                }
            });

            const orderItems = items.map(item => ({
                orderId: newOrder.id,
                productId: item.id,
                productName: item.name,
                quantity: item.quantity,
                price: item.salePrice || item.regularPrice || 0
            }));

            await tx.orderItem.createMany({ data: orderItems });

            for (const item of items) {
                await tx.product.update({
                    where: { id: item.id },
                    data: { stock: { decrement: item.quantity } }
                });
            }

            if (couponId) {
                await tx.coupon.update({
                    where: { id: couponId },
                    data: { usageCount: { increment: 1 } }
                });
            }

            return newOrder;
        });

        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to place order', details: error.message }, { status: 500 });
    }
}
