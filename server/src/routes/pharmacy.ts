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

export default router;
