import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all pharmacies (or filter by proximity)
router.get('/', async (req, res) => {
    const { lat, lng } = req.query;
    const pharmacies = await prisma.pharmacy.findMany();

    // TODO: Implement Haversine distance filter if lat/lng provided
    res.json(pharmacies);
});

// Search Drugs
router.get('/search', async (req, res) => {
    const { q, lat, lng } = req.query; // q = drug name

    if (!q) return res.status(400).json({ error: "Query required" });

    try {
        const stocks = await prisma.stock.findMany({
            where: {
                drug: {
                    name: {
                        contains: String(q)
                        // mode: 'insensitive' // SQLite doesn't support insensitive easily without raw query, assume exact or like
                    }
                },
                quantity: { gt: 0 }
            },
            include: {
                pharmacy: true,
                drug: true
            }
        });

        res.json(stocks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Search failed" });
    }
});

// Get Pharmacy Inventory
router.get('/:pharmacyId/inventory', async (req, res) => {
    const { pharmacyId } = req.params;
    try {
        const stocks = await prisma.stock.findMany({
            where: { pharmacyId },
            include: { drug: true }
        });
        res.json(stocks);
    } catch (error) {
        res.status(500).json({ error: "Fetch failed" });
    }
});

// Add Drug to Inventory (Pharmacy only)
router.post('/inventory', async (req, res) => {
    const { pharmacyId, drugName, quantity, price } = req.body;

    try {
        // Find or create drug
        let drug = await prisma.drug.findFirst({ where: { name: drugName } });
        if (!drug) {
            drug = await prisma.drug.create({ data: { name: drugName } });
        }

        const stock = await prisma.stock.create({
            data: {
                pharmacyId,
                drugId: drug.id,
                quantity: Number(quantity),
                price: Number(price)
            }
        });

        res.json(stock);
    } catch (error) {
        res.status(500).json({ error: "Update failed" });
    }
});

// Get Pharmacy Stats (Dashboard)
router.get('/:pharmacyId/stats', async (req, res) => {
    const { pharmacyId } = req.params;
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const [dailySales, totalOrders, pendingOrders, lowStock] = await Promise.all([
            prisma.order.aggregate({
                where: {
                    pharmacyId,
                    createdAt: { gte: today },
                    status: 'COMPLETED'
                },
                _sum: { totalPrice: true }
            }),
            prisma.order.count({ where: { pharmacyId, createdAt: { gte: today } } }),
            prisma.order.count({ where: { pharmacyId, status: 'PENDING' } }),
            prisma.stock.count({ where: { pharmacyId, quantity: { lte: 10 } } })
        ]);

        res.json({
            dailySales: dailySales._sum.totalPrice || 0,
            totalOrders,
            pendingOrders,
            lowStock
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Stats failed" });
    }
});

// Get Pharmacy Orders
router.get('/:pharmacyId/orders', async (req, res) => {
    const { pharmacyId } = req.params;
    try {
        const orders = await prisma.order.findMany({
            where: { pharmacyId },
            include: {
                patient: { select: { name: true, phone: true } }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Fetch orders failed" });
    }
});

// Update Order Status
router.patch('/orders/:orderId/status', async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body; // CONFIRMED, READY, COMPLETED, CANCELLED

    try {
        const order = await prisma.order.update({
            where: { id: orderId },
            data: { status }
        });
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: "Update status failed" });
    }
});

// --- ADMIN ROUTES ---

// Get Pending Pharmacies
router.get('/admin/pending', async (req, res) => {
    try {
        const pending = await prisma.pharmacy.findMany({
            where: { verificationStatus: 'PENDING' },
            include: { user: { select: { name: true, phone: true } } }
        });
        res.json(pending);
    } catch (error) {
        res.status(500).json({ error: "Fetch pending failed" });
    }
});

// Verify Pharmacy
router.patch('/admin/:pharmacyId/verify', async (req, res) => {
    const { pharmacyId } = req.params;
    const { status } = req.body; // VERIFIED, REJECTED

    try {
        const pharmacy = await prisma.pharmacy.update({
            where: { id: pharmacyId },
            data: {
                verificationStatus: status,
                isVerified: status === 'VERIFIED'
            }
        });
        res.json(pharmacy);
    } catch (error) {
        res.status(500).json({ error: "Verification failed" });
    }
});

export default router;
