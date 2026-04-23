import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const menus = await prisma.menu.findMany({
      include: {
        children: {
          orderBy: { order: 'asc' },
        },
        parent: true,
      },
      orderBy: [
        { type: 'asc' },
        { order: 'asc' },
      ],
    });
    return NextResponse.json(menus);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch menus' }, { status: 500 });
  }
}

export async function POST(request) {
  console.log("--- POST /api/admin/menus [LATEST V3] ---");
  try {
    const body = await request.json();
    const { label, href, order, isHot, type, parentId, isSystem } = body;

    console.log("Creating menu with payload:", { label, href, order, type, parentId });

    if (!label || !href) {
      return NextResponse.json({ error: 'Label and href are required' }, { status: 400 });
    }

    const menu = await prisma.menu.create({
      data: {
        label: String(label),
        href: String(href),
        order: Number(order) || 0,
        isHot: Boolean(isHot),
        isSystem: Boolean(isSystem),
        type: String(type || 'header'),
        parentId: parentId && parentId !== "" ? String(parentId) : null,
      },
    });
    return NextResponse.json(menu);
  } catch (error) {
    console.error("Error creating menu:", error);
    return NextResponse.json({ 
      error: 'Failed to create menu', 
      details: error.message,
      code: error.code 
    }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, label, href, order, isHot, type, parentId, isSystem } = body;

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const menu = await prisma.menu.update({
      where: { id },
      data: {
        label: label ? String(label) : undefined,
        href: href ? String(href) : undefined,
        order: order !== undefined ? Number(order) : undefined,
        isHot: isHot !== undefined ? Boolean(isHot) : undefined,
        isSystem: isSystem !== undefined ? Boolean(isSystem) : undefined,
        type: type ? String(type) : undefined,
        parentId: parentId !== undefined ? (parentId && parentId !== "" ? String(parentId) : null) : undefined,
      },
    });
    return NextResponse.json(menu);
  } catch (error) {
    console.error("Error updating menu:", error);
    return NextResponse.json({ 
      error: 'Failed to update menu', 
      details: error.message,
      code: error.code 
    }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const menu = await prisma.menu.findUnique({ where: { id } });
    if (menu?.isSystem) {
      return NextResponse.json({ error: 'System menus cannot be deleted.' }, { status: 403 });
    }

    await prisma.menu.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Menu deleted successfully' });
  } catch (error) {
    console.error("Error deleting menu:", error);
    return NextResponse.json({ 
      error: 'Failed to delete menu', 
      details: error.message,
      code: error.code 
    }, { status: 500 });
  }
}
