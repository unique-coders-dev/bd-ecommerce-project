import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function GET() {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                address: true,
                city: true,
                district: true,
            }
        });
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
    }
}

export async function PUT(request) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { name, phone, address, city, district, currentPassword, newPassword } = body;

        const updateData = {
            name,
            phone,
            address,
            city,
            district,
        };

        if (newPassword) {
            const user = await prisma.user.findUnique({
                where: { id: session.user.id }
            });

            if (!user.password) {
                // If user doesn't have a password (e.g. social login), allow setting one
                updateData.password = await bcrypt.hash(newPassword, 10);
            } else {
                if (!currentPassword) {
                    return NextResponse.json({ error: 'Current password is required to change password' }, { status: 400 });
                }
                const isValid = await bcrypt.compare(currentPassword, user.password);
                if (!isValid) {
                    return NextResponse.json({ error: 'Invalid current password' }, { status: 400 });
                }
                updateData.password = await bcrypt.hash(newPassword, 10);
            }
        }

        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: updateData,
        });

        return NextResponse.json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}
