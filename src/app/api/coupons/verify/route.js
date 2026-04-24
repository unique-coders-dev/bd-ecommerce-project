import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function POST(request) {
  try {
    const { code, cartTotal } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'Coupon code is required' }, { status: 400 });
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() }
    });

    if (!coupon) {
      return NextResponse.json({ error: 'Invalid coupon code' }, { status: 404 });
    }

    const session = await auth();
    if (session?.user?.id) {
        const alreadyUsed = await prisma.order.findFirst({
            where: {
                userId: session.user.id,
                couponId: coupon.id,
                status: { not: 'cancelled' }
            }
        });
        if (alreadyUsed) {
            return NextResponse.json({ error: 'You have already used this coupon once' }, { status: 400 });
        }
    }

    if (!coupon.isActive) {
      return NextResponse.json({ error: 'This coupon is no longer active' }, { status: 400 });
    }

    // Check expiry
    if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
      return NextResponse.json({ error: 'This coupon has expired' }, { status: 400 });
    }

    // Check usage limit
    if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
      return NextResponse.json({ error: 'This coupon has reached its usage limit' }, { status: 400 });
    }

    // Check minimum order amount
    if (coupon.minOrderAmount && cartTotal < coupon.minOrderAmount) {
      return NextResponse.json({ 
        error: `Minimum order amount for this coupon is ৳${coupon.minOrderAmount}` 
      }, { status: 400 });
    }

    // Calculate discount
    let discountAmount = 0;
    if (coupon.discountType === 'percentage') {
      discountAmount = (cartTotal * coupon.discountValue) / 100;
      if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
        discountAmount = coupon.maxDiscount;
      }
    } else {
      discountAmount = coupon.discountValue;
    }

    return NextResponse.json({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discountAmount,
      id: coupon.id
    });

  } catch (error) {
    console.error('Coupon verify error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
