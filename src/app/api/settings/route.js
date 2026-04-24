import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const settings = await prisma.setting.findUnique({
            where: { id: 'site-settings' }
        });
        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}
