import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const slides = await prisma.heroSlide.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(slides);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch hero slides' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { imageUrl, mobileImageUrl, linkUrl, order, isActive } = body;

    const slide = await prisma.heroSlide.create({
      data: {
        imageUrl,
        mobileImageUrl,
        linkUrl: linkUrl || '/',
        order: parseInt(order) || 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    });
    return NextResponse.json(slide);
  } catch (error) {
    console.error("Error creating hero slide:", error);
    return NextResponse.json({ 
      error: 'Failed to create slide', 
      details: error.message 
    }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, imageUrl, mobileImageUrl, linkUrl, order, isActive } = body;

    const slide = await prisma.heroSlide.update({
      where: { id },
      data: {
        imageUrl,
        mobileImageUrl,
        linkUrl,
        order: parseInt(order),
        isActive,
      },
    });
    return NextResponse.json(slide);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update hero slide' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.heroSlide.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Slide deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete hero slide' }, { status: 500 });
  }
}
