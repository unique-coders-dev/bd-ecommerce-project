import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    try {
        const resolvedParams = await params;
        const { id } = resolvedParams;

        const reviews = await prisma.review.findMany({
            where: { 
                productId: id,
                status: 'approved'
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
}

export async function POST(request, { params }) {
    try {
        const resolvedParams = await params;
        const { id } = resolvedParams;
        const body = await request.json();
        const { userName, userEmail, rating, comment } = body;

        if (!userName || !rating || !comment) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const review = await prisma.review.create({
            data: {
                productId: id,
                userName,
                userEmail,
                rating: parseInt(rating),
                comment,
                status: 'approved' // Default to approved as requested
            }
        });

        return NextResponse.json(review, { status: 201 });
    } catch (error) {
        console.error('Error creating review:', error);
        return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
    }
}
