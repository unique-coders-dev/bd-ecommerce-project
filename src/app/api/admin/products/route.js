import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    // Allowed sort fields to prevent injection
    const allowedSorts = ['name', 'brand', 'category', 'regularPrice', 'stock', 'sku', 'isActive', 'createdAt'];
    const rawSortKey = searchParams.get('sortKey') || 'createdAt';
    const sortKey = allowedSorts.includes(rawSortKey) ? rawSortKey : 'createdAt';
    const sortDir = searchParams.get('sortDir') === 'asc' ? 'asc' : 'desc';

    const where = {
      AND: [
        search ? {
          OR: [
            { name: { contains: search } },
            { brand: { contains: search } },
            { sku: { contains: search } },
          ]
        } : {},
        category ? { category } : {},
      ]
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: [
          { isFeatured: 'desc' },
          { [sortKey]: sortDir }
        ],
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({ products, total, page, limit });
  } catch (error) {
    console.error('GET /api/admin/products error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, description, brand, category, regularPrice, salePrice, discount, stock, sku, image, images, isActive, isClearance, isFeatured } = body;

    if (!name || !image || regularPrice === undefined) {
      return NextResponse.json({ error: 'Name, image, and regular price are required' }, { status: 400 });
    }

    if (isFeatured) {
      await prisma.product.updateMany({
        where: { isFeatured: true },
        data: { isFeatured: false }
      });
    }

    const product = await prisma.product.create({
      data: {
        name,
        shortBrief: body.shortBrief || null,
        description: description || null,
        additionalInfo: body.additionalInfo || null,
        ingredients: body.ingredients || null,
        brand: brand || null,
        brandImage: body.brandImage || null,
        category: category || null,
        regularPrice: parseFloat(regularPrice),
        salePrice: salePrice ? parseFloat(salePrice) : null,
        discount: discount || null,
        stock: parseInt(stock) || 0,
        sku: sku || null,
        image,
        images: images ? JSON.stringify(images) : null,
        isActive: isActive !== undefined ? isActive : true,
        isClearance: isClearance !== undefined ? isClearance : false,
        isFeatured: isFeatured !== undefined ? isFeatured : false,
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('POST /api/admin/products error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, name, description, brand, category, regularPrice, salePrice, discount, stock, sku, image, images, isActive, isClearance, isFeatured } = body;

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    if (isFeatured) {
      await prisma.product.updateMany({
        where: { 
          isFeatured: true,
          NOT: { id }
        },
        data: { isFeatured: false }
      });
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        shortBrief: body.shortBrief || null,
        description: description || null,
        additionalInfo: body.additionalInfo || null,
        ingredients: body.ingredients || null,
        brand: brand || null,
        brandImage: body.brandImage || null,
        category: category || null,
        regularPrice: parseFloat(regularPrice),
        salePrice: salePrice ? parseFloat(salePrice) : null,
        discount: discount || null,
        stock: parseInt(stock) || 0,
        sku: sku || null,
        image,
        images: images ? JSON.stringify(images) : null,
        isActive,
        isClearance,
        isFeatured: isFeatured !== undefined ? isFeatured : false,
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('PUT /api/admin/products error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/admin/products error:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
