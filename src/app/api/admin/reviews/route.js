import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const reviews = await prisma.review.findMany({
            include: {
                product: {
                    select: { name: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(reviews);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { productId, userName, rating, comment, isDummy } = body;

        const review = await prisma.review.create({
            data: {
                productId,
                userName,
                rating: parseInt(rating),
                comment,
                isDummy: !!isDummy,
                status: 'approved'
            }
        });
        return NextResponse.json(review, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, status, comment, rating } = body;

        const review = await prisma.review.update({
            where: { id },
            data: { status, comment, rating: rating ? parseInt(rating) : undefined }
        });
        return NextResponse.json(review);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        await prisma.review.delete({
            where: { id }
        });
        return NextResponse.json({ message: 'Review deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
    }
}
