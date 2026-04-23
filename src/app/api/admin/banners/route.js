import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(banners);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch banners' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { imageUrl, linkUrl, position, order, isActive } = body;

    const banner = await prisma.banner.create({
      data: {
        imageUrl,
        linkUrl: linkUrl || '/',
        position,
        order: parseInt(order) || 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    });
    return NextResponse.json(banner);
  } catch (error) {
    console.error("Error creating banner:", error);
    return NextResponse.json({ 
      error: 'Failed to create banner', 
      details: error.message 
    }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, imageUrl, linkUrl, position, order, isActive } = body;

    const banner = await prisma.banner.update({
      where: { id },
      data: {
        imageUrl,
        linkUrl,
        position,
        order: parseInt(order),
        isActive,
      },
    });
    return NextResponse.json(banner);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update banner' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.banner.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Banner deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete banner' }, { status: 500 });
  }
}
