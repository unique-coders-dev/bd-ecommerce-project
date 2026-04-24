import { prisma } from '@/lib/prisma';
import ProductDetailsClient from './ProductDetailsClient';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ProductDetailsPage(props) {
  const resolvedParams = await props.params;
  let id = resolvedParams?.id;

  if (!id || id === 'undefined' || id === 'null') {
    return notFound();
  }

  // Await the id if it happens to be a Promise (edge case in some canary versions)
  if (id && typeof id.then === 'function') {
    id = await id;
  }

  // Fetch product from DB safely
  const productData = await prisma.product.findUnique({
    where: { id: id || 'invalid-id' }
  });

  if (!productData) {
    return notFound();
  }

  // Parse images
  let images = [];
  try {
    if (productData.images) {
      images = JSON.parse(productData.images);
    }
  } catch (e) {
    images = [];
  }
  
  if (images.length === 0 && productData.image) {
    images = [productData.image];
  }

  // Calculate discount percentage logic
  const getDiscountPercent = (p) => {
    if (p.discount) {
      const parsed = parseInt(p.discount);
      if (!isNaN(parsed)) return parsed;
    }
    if (p.salePrice && p.regularPrice && p.salePrice < p.regularPrice) {
      return ((p.regularPrice - p.salePrice) / p.regularPrice) * 100;
    }
    return 0;
  };

  let activeSalePrice = productData.salePrice;
  const computedDiscountPercent = getDiscountPercent(productData);
  
  if (!activeSalePrice && computedDiscountPercent > 0) {
      activeSalePrice = Math.round(productData.regularPrice * (1 - computedDiscountPercent / 100));
  }

  let additionalInfo = null;
  if (productData.additionalInfo) {
    try {
      additionalInfo = JSON.parse(productData.additionalInfo);
    } catch (e) {
      // If not JSON, parse as "Key: Value" lines
      const lines = productData.additionalInfo.split('\n').filter(l => l.includes(':'));
      if (lines.length > 0) {
        additionalInfo = {};
        lines.forEach(line => {
          const [key, ...val] = line.split(':');
          additionalInfo[key.trim()] = val.join(':').trim();
        });
      } else {
        additionalInfo = { "Details": productData.additionalInfo };
      }
    }
  }

  // Format main product
  const formattedProduct = {
    id: productData.id,
    name: productData.name,
    brand: productData.brand || '',
    brandLogo: productData.brandImage || null,
    regularPrice: productData.regularPrice,
    salePrice: activeSalePrice || productData.regularPrice,
    discount: productData.discount || '',
    discountPercent: computedDiscountPercent,
    stockStatus: productData.stock > 0 ? `${productData.stock} in stock` : "Out of stock",
    sku: productData.sku || '',
    category: productData.category || 'Uncategorized',
    images: images,
    image: productData.image, // For cart
    shortDescription: productData.shortBrief || productData.description?.substring(0, 150) || '',
    description: productData.description || '',
    additionalInfo: additionalInfo,
    ingredients: productData.ingredients || ''
  };

  // ── Related Products Hierarchical Search ──
  // 1. Try exact category first
  let relatedData = await prisma.product.findMany({
    where: { 
      category: productData.category,
      id: { not: productData.id },
      isActive: true
    },
    take: 4,
    orderBy: { createdAt: 'desc' }
  });

  // 2. If fewer than 4, try parent category
  if (relatedData.length < 4 && productData.category) {
    const categoryRecord = await prisma.category.findFirst({
        where: { name: productData.category }
    });

    if (categoryRecord?.parentId) {
        const parentCategory = await prisma.category.findUnique({
            where: { id: categoryRecord.parentId }
        });

        if (parentCategory) {
            // Find other sub-categories under same parent
            const siblingCategories = await prisma.category.findMany({
                where: { parentId: parentCategory.id },
                select: { name: true }
            });
            const categoryNames = siblingCategories.map(c => c.name);

            const extraRelated = await prisma.product.findMany({
                where: {
                    category: { in: categoryNames },
                    id: { 
                        notIn: [productData.id, ...relatedData.map(r => r.id)] 
                    },
                    isActive: true
                },
                take: 4 - relatedData.length,
                orderBy: { createdAt: 'desc' }
            });
            relatedData = [...relatedData, ...extraRelated];
        }
    }
  }

  // 3. If still fewer than 4, take anything else
  if (relatedData.length < 4) {
    const backupRelated = await prisma.product.findMany({
      where: {
        id: { 
            notIn: [productData.id, ...relatedData.map(r => r.id)] 
        },
        isActive: true
      },
      take: 4 - relatedData.length,
      orderBy: { createdAt: 'desc' }
    });
    relatedData = [...relatedData, ...backupRelated];
  }

  const formattedRelated = relatedData.map(p => {
    let relatedSalePrice = p.salePrice;
    const relatedDiscPercent = getDiscountPercent(p);
    if (!relatedSalePrice && relatedDiscPercent > 0) {
        relatedSalePrice = Math.round(p.regularPrice * (1 - relatedDiscPercent / 100));
    }
    return {
      id: p.id,
      name: p.name,
      brand: p.brand || '',
      image: p.image,
      regularPrice: p.regularPrice,
      salePrice: relatedSalePrice || p.regularPrice,
      discount: p.discount || '',
      discountPercent: relatedDiscPercent,
      stockStatus: p.stock > 0 ? "In stock" : "Out of stock",
      sku: p.sku || '',
      link: `/product/${p.id}`
    };
  });

  return <ProductDetailsClient initialProduct={formattedProduct} relatedProducts={formattedRelated} />;
}
