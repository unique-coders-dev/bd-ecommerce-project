import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 20;
        const skip = (page - 1) * limit;

        const products = await prisma.product.findMany({
            where: {
                isActive: true,
                isClearance: true
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
            include: {
                reviews: {
                    where: { status: 'approved' }
                }
            }
        });

        const productsWithStats = products.map(p => {
            const reviewCount = p.reviews.length;
            const avgRating = reviewCount > 0
                ? p.reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviewCount
                : 0;
            return { ...p, avgRating, reviewCount };
        });

        return NextResponse.json({ products: productsWithStats });

    } catch (error) {
        console.error("CLEARANCE_API_ERROR", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
