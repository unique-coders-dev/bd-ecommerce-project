import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const session = await auth();
    const hasPermission = session?.user?.role === 'super-admin' || 
                         (session?.user?.role === 'admin' && session?.user?.permissions?.split(',').includes('dashboard'));
    
    if (!hasPermission) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const filter = searchParams.get('filter') || 'weekly';
        const startDateParam = searchParams.get('startDate');
        const endDateParam = searchParams.get('endDate');

        // Determine date range based on filter
        let dateRange = {};
        const now = new Date();
        
        if (filter === 'daily') {
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);
            dateRange = { gte: startOfDay };
        } else if (filter === 'weekly') {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            dateRange = { gte: sevenDaysAgo };
        } else if (filter === 'monthly') {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            dateRange = { gte: thirtyDaysAgo };
        } else if (filter === 'custom' && startDateParam && endDateParam) {
            const start = new Date(startDateParam);
            const end = new Date(endDateParam);
            end.setHours(23, 59, 59, 999);
            dateRange = { gte: start, lte: end };
        }

        // 1. Basic Stats (Filtered by Date)
        const revenueData = await prisma.order.aggregate({
            _sum: { totalAmount: true },
            where: { 
                status: { not: 'cancelled' },
                ...(Object.keys(dateRange).length > 0 ? { createdAt: dateRange } : {})
            }
        });

        const pendingOrdersCount = await prisma.order.count({
            where: { 
                status: { equals: 'pending' },
                ...(Object.keys(dateRange).length > 0 ? { createdAt: dateRange } : {})
            }
        });

        // Total Customers in the system (Role: customer)
        const totalCustomersCount = await prisma.user.count({
            where: { role: 'customer' }
        });

        // Active Customers: Unique users who placed an order in this period
        const activeOrders = await prisma.order.findMany({
            where: {
                ...(Object.keys(dateRange).length > 0 ? { createdAt: dateRange } : {}),
                userId: { not: null }
            },
            select: { userId: true },
            distinct: ['userId']
        });
        const activeCustomersCount = activeOrders.length;

        // 2. Recent Sales
        const recentOrders = await prisma.order.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: { name: true, email: true }
                }
            }
        });

        // 3. Chart Data (Based on Date Range)
        let chartData = [];
        let daysToFetch = 7;
        if (filter === 'monthly') daysToFetch = 30;
        else if (filter === 'daily') daysToFetch = 1;
        else if (filter === 'custom' && startDateParam && endDateParam) {
            const diffTime = Math.abs(new Date(endDateParam) - new Date(startDateParam));
            daysToFetch = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        }

        const salesData = await prisma.order.findMany({
            where: {
                status: { not: 'cancelled' },
                ...(Object.keys(dateRange).length > 0 ? { createdAt: dateRange } : {})
            },
            select: {
                createdAt: true,
                totalAmount: true
            }
        });

        for (let i = daysToFetch - 1; i >= 0; i--) {
            const date = new Date(now);
            if (filter === 'custom' && endDateParam) {
                date.setTime(new Date(endDateParam).getTime());
            }
            date.setDate(date.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            
            const daySales = salesData
                .filter(o => o.createdAt.toISOString().split('T')[0] === dateString)
                .reduce((acc, curr) => acc + curr.totalAmount, 0);

            chartData.push({
                day: date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }),
                amount: daySales,
                fullDate: dateString
            });
        }

        return NextResponse.json({
            stats: {
                totalRevenue: revenueData._sum.totalAmount || 0,
                pendingOrders: pendingOrdersCount,
                activeCustomers: activeCustomersCount,
                totalCustomers: totalCustomersCount, // Total customers in system
                totalOrders: await prisma.order.count({ 
                    where: Object.keys(dateRange).length > 0 ? { createdAt: dateRange } : {} 
                })
            },
            recentOrders: recentOrders.map(o => ({
                id: `#${o.id.slice(-5).toUpperCase()}`,
                customer: o.user?.name || o.customerName || 'Guest',
                status: o.status,
                total: `৳ ${o.totalAmount.toLocaleString()}`,
                date: getTimeAgo(o.createdAt)
            })),
            chartData
        });

    } catch (error) {
        console.error("OVERVIEW_ERROR", error);
        return NextResponse.json({ error: 'Failed to fetch overview data' }, { status: 500 });
    }
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " min ago";
    return Math.floor(seconds) + " sec ago";
}
