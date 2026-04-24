import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function GET(request, { params }) {
    const { id } = await params;
    const session = await auth();
    const hasPermission = session?.user?.role === 'super-admin' || 
                         (session?.user?.role === 'admin' && session?.user?.permissions?.split(',').includes('customers'));
    
    if (!hasPermission) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const customer = await prisma.user.findUnique({
            where: { id },
            include: {
                orders: {
                    include: {
                        orderItems: true
                    },
                    orderBy: { createdAt: 'desc' }
                }
            }
        });

        if (!customer) {
            return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
        }

        return NextResponse.json(customer);
    } catch (error) {
        return NextResponse.json({ error: `Fetch failed: ${error.message}` }, { status: 500 });
    }
}

export async function PATCH(request, { params }) {
    const { id } = await params;
    const session = await auth();
    const hasPermission = session?.user?.role === 'super-admin' || 
                         (session?.user?.role === 'admin' && session?.user?.permissions?.split(',').includes('customers'));
    
    if (!hasPermission) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { status, password } = body;

        const updateData = {};
        if (status) updateData.status = status;
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: updateData
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        return NextResponse.json({ error: `Update failed: ${error.message}` }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const session = await auth();
    const hasPermission = session?.user?.role === 'super-admin' || 
                         (session?.user?.role === 'admin' && session?.user?.permissions?.split(',').includes('customers'));
    
    if (!hasPermission) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        await prisma.user.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Customer deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: `Delete failed: ${error.message}` }, { status: 500 });
    }
}
