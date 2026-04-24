import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        const brand = searchParams.get('brand');
        const minPrice = parseFloat(searchParams.get('minPrice')) || 0;
        const maxPrice = parseFloat(searchParams.get('maxPrice')) || 1000000;
        const sort = searchParams.get('sort') || 'newness';
        const search = searchParams.get('search') || '';

        // Build Where Clause
        let where = {
            isActive: true,
            AND: [
                {
                    OR: [
                        {
                            AND: [
                                { salePrice: { not: null } },
                                { salePrice: { gte: minPrice, lte: maxPrice } }
                            ]
                        },
                        {
                            AND: [
                                { salePrice: null },
                                { regularPrice: { gte: minPrice, lte: maxPrice } }
                            ]
                        }
                    ]
                }
            ]
        };

        if (category) {
            // Fetch ALL categories once for recursive lookup
            const allCats = await prisma.category.findMany({ select: { id: true, name: true, parentId: true } });

            // Recursively collect all descendant names
            const getDescendantNames = (catName) => {
                const node = allCats.find(c => c.name === catName);
                if (!node) return [catName];
                const children = allCats.filter(c => c.parentId === node.id);
                let names = [catName];
                children.forEach(child => {
                    names = names.concat(getDescendantNames(child.name));
                });
                return names;
            };

            const catNames = getDescendantNames(category);
            where.category = { in: catNames };
        }

        if (brand) {
            const brandList = brand.split(',');
            where.brand = { in: brandList };
        }

        if (search) {
            where.OR = [
                { name: { contains: search } },
                { description: { contains: search } }
            ];
        }

        // Sorting
        let orderBy = {};
        if (sort === 'popularity') orderBy = { createdAt: 'desc' }; // Should be based on orders, but using date for now
        else if (sort === 'newness') orderBy = { createdAt: 'desc' };
        else if (sort === 'price-low') orderBy = { salePrice: 'asc' };
        else if (sort === 'price-high') orderBy = { salePrice: 'desc' };
        else if (sort === 'rating') orderBy = { createdAt: 'desc' }; // Fallback

        const products = await prisma.product.findMany({
            where,
            orderBy,
            include: {
                reviews: {
                    where: { status: 'approved' }
                }
            }
        });

        // Add rating stats to products
        const productsWithStats = products.map(p => {
            const reviewCount = p.reviews.length;
            const avgRating = reviewCount > 0 
                ? p.reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviewCount 
                : 0;
            return { ...p, avgRating, reviewCount };
        });

        // Get all active products for brand/category stats
        const allProducts = await prisma.product.findMany({
            where: { isActive: true },
            select: { brand: true, salePrice: true, regularPrice: true, category: true },
        });

        const brandsMap = {};
        const productCategories = new Set();
        let absoluteMaxPrice = 0;
        
        allProducts.forEach(p => {
            const effectivePrice = p.salePrice || p.regularPrice || 0;
            if (p.brand) {
                brandsMap[p.brand] = (brandsMap[p.brand] || 0) + 1;
            }
            if (p.category) {
                productCategories.add(p.category);
            }
            if (effectivePrice > absoluteMaxPrice) absoluteMaxPrice = effectivePrice;
        });

        const brands = Object.entries(brandsMap).map(([name, count]) => ({ name, count }));

        // Categories with counts
        const dbCategories = await prisma.category.findMany({
            include: { children: true }
        });

        // Helper to get all subcategory names recursively
        const getAllDescendantNames = (cat) => {
            let names = [];
            cat.children.forEach(child => {
                names.push(child.name);
                const grandchild = dbCategories.find(c => c.id === child.id);
                if (grandchild && grandchild.children) {
                    names = names.concat(getAllDescendantNames(grandchild));
                }
            });
            return names;
        };

        // Recursive helper to build nested sub list with counts
        const buildSubTree = (cat) => {
            const descendantNames = getAllDescendantNames(cat);
            const selfCount = allProducts.filter(p => p.category === cat.name).length;
            const childrenCount = allProducts.filter(p => descendantNames.includes(p.category)).length;
            return {
                name: cat.name,
                count: selfCount + childrenCount,
                sub: cat.children.map(child => {
                    const childNode = dbCategories.find(c => c.id === child.id);
                    return childNode ? buildSubTree(childNode) : { name: child.name, count: allProducts.filter(p => p.category === child.name).length, sub: [] };
                })
            };
        };

        // Categories with recursive counts
        const categoriesWithCounts = dbCategories.filter(c => !c.parentId).map(parent => {
            const descendantNames = getAllDescendantNames(parent);
            const parentOnlyCount = allProducts.filter(p => p.category === parent.name).length;
            const descendantsCount = allProducts.filter(p => descendantNames.includes(p.category)).length;

            return {
                name: parent.name,
                count: parentOnlyCount + descendantsCount,
                sub: parent.children.map(child => {
                    const childNode = dbCategories.find(c => c.id === child.id);
                    return childNode ? buildSubTree(childNode) : { name: child.name, count: allProducts.filter(p => p.category === child.name).length, sub: [] };
                })
            };
        });

        // Add orphaned categories (found in products but not in DB hierarchy)
        productCategories.forEach(catName => {
            const existsInHierarchy = dbCategories.some(c => c.name === catName);
            if (!existsInHierarchy) {
                categoriesWithCounts.push({
                    name: catName,
                    count: allProducts.filter(p => p.category === catName).length,
                    sub: []
                });
            }
        });

        return NextResponse.json({
            products: productsWithStats,
            brands,
            categories: categoriesWithCounts,
            maxPrice: absoluteMaxPrice
        });

    } catch (error) {
        console.error("SHOP_API_ERROR", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
