import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function GET() {
    const session = await auth();
    const hasPermission = session?.user?.role === 'super-admin' || 
                         (session?.user?.role === 'admin' && session?.user?.permissions?.split(',').includes('customers'));
    
    if (!hasPermission) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const customers = await prisma.user.findMany({
            where: { role: 'customer' },
            include: {
                orders: true,
            },
            orderBy: { createdAt: 'desc' }
        });

        // Calculate stats for each customer
        const customersWithStats = customers.map(user => {
            const totalSpent = user.orders.reduce((acc, order) => acc + order.totalAmount, 0);
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                city: user.city || user.district || 'N/A',
                status: user.status || 'active',
                orderCount: user.orders.length,
                totalSpent: totalSpent,
                createdAt: user.createdAt,
            };
        });

        return NextResponse.json(customersWithStats);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
    }
}
