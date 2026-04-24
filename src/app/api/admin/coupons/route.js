import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(coupons);
  } catch (error) {
    console.error('GET /api/admin/coupons error:', error);
    return NextResponse.json({ error: 'Failed to fetch coupons' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { code, discountType, discountValue, minOrderAmount, maxDiscount, usageLimit, expiryDate, isActive } = body;

    if (!code || !discountType || discountValue === undefined) {
      return NextResponse.json({ error: 'Code, type, and value are required' }, { status: 400 });
    }

    const coupon = await prisma.coupon.create({
      data: {
        code: code.toUpperCase(),
        discountType,
        discountValue: parseFloat(discountValue),
        minOrderAmount: minOrderAmount ? parseFloat(minOrderAmount) : 0,
        maxDiscount: maxDiscount ? parseFloat(maxDiscount) : null,
        usageLimit: usageLimit ? parseInt(usageLimit) : null,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        isActive: isActive !== undefined ? isActive : true,
      }
    });

    return NextResponse.json(coupon);
  } catch (error) {
    console.error('POST /api/admin/coupons error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Coupon code already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create coupon' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, code, discountType, discountValue, minOrderAmount, maxDiscount, usageLimit, expiryDate, isActive } = body;

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const coupon = await prisma.coupon.update({
      where: { id },
      data: {
        code: code ? code.toUpperCase() : undefined,
        discountType,
        discountValue: discountValue !== undefined ? parseFloat(discountValue) : undefined,
        minOrderAmount: minOrderAmount !== undefined ? parseFloat(minOrderAmount) : undefined,
        maxDiscount: maxDiscount !== undefined ? parseFloat(maxDiscount) : undefined,
        usageLimit: usageLimit !== undefined ? (usageLimit ? parseInt(usageLimit) : null) : undefined,
        expiryDate: expiryDate !== undefined ? (expiryDate ? new Date(expiryDate) : null) : undefined,
        isActive: isActive !== undefined ? isActive : undefined,
      }
    });

    return NextResponse.json(coupon);
  } catch (error) {
    console.error('PUT /api/admin/coupons error:', error);
    return NextResponse.json({ error: 'Failed to update coupon' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    await prisma.coupon.delete({ where: { id } });
    return NextResponse.json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/admin/coupons error:', error);
    return NextResponse.json({ error: 'Failed to delete coupon' }, { status: 500 });
  }
}
