import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(brands);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch brands' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, linkUrl, isActive, order, imageUrl } = body;

    if (!name || !imageUrl) {
      return NextResponse.json({ error: 'Name and image URL are required' }, { status: 400 });
    }

    const brand = await prisma.brand.create({
      data: { 
        name, 
        linkUrl: linkUrl || '/', 
        isActive: isActive !== undefined ? isActive : true, 
        order: Number(order) || 0, 
        imageUrl 
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.error("Error creating brand:", error);
    return NextResponse.json({ error: 'Failed to create brand' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const brand = await prisma.brand.findUnique({ where: { id } });
    if (brand && brand.imageUrl) {
      try {
        const filepath = path.join(process.cwd(), 'public', brand.imageUrl);
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
      } catch (err) {
        console.error("Failed to delete brand image", err);
      }
    }

    await prisma.brand.delete({ where: { id } });
    return NextResponse.json({ message: 'Brand deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete brand' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, name, linkUrl, isActive, order, imageUrl } = body;
    
    const brand = await prisma.brand.update({
      where: { id },
      data: { name, linkUrl, isActive, order, imageUrl },
    });
    return NextResponse.json(brand);
  } catch (error) {
    console.error("Error updating brand:", error);
    return NextResponse.json({ error: 'Failed to update brand' }, { status: 500 });
  }
}
