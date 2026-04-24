import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function GET() {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const orders = await prisma.order.findMany({
            where: { userId: session.user.id },
            include: {
                orderItems: true
            },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}
