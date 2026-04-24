import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function GET() {
    const session = await auth();
    if (session?.user?.role !== 'super-admin') {
        return NextResponse.json({ error: 'Unauthorized: Super Admin access required' }, { status: 401 });
    }

    try {
        const users = await prisma.user.findMany({
            where: {
                role: { in: ['admin', 'super-admin'] }
            },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    const session = await auth();
    if (session?.user?.role !== 'super-admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { name, email, password, role, permissions } = body;

        if (!name || !email || !password || !role) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
                permissions: permissions || ""
            }
        });

        return NextResponse.json(newUser);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(request) {
    const session = await auth();
    if (session?.user?.role !== 'super-admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id, name, email, password, role, permissions } = body;

        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (role) updateData.role = role;
        if (permissions !== undefined) updateData.permissions = permissions;
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: updateData
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    const session = await auth();
    if (session?.user?.role !== 'super-admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        // Prevent self-deletion
        if (id === session.user.id) {
            return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 });
        }

        await prisma.user.delete({ where: { id } });
        return NextResponse.json({ message: 'User deleted' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
