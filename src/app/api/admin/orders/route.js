import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const orders = await prisma.order.findMany({
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

export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, status } = body;

        const order = await prisma.order.update({
            where: { id },
            data: { status }
        });
        return NextResponse.json(order);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        await prisma.order.delete({
            where: { id }
        });
        return NextResponse.json({ message: 'Order deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
    }
}
