import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Create Order (from Mobile)
router.post('/', async (req, res) => {
    try {
        const { patientId, pharmacyId, drugId, quantity, price, prescriptionUrl, paymentMethod } = req.body;

        const order = await prisma.order.create({
            data: {
                patientId,
                pharmacyId,
                prescriptionUrl,
                paymentMethod,
                paymentStatus: 'UNPAID',
                status: 'PENDING',
                totalPrice: Number(price) * Number(quantity),
                items: {
                    create: {
                        drugId,
                        quantity: Number(quantity),
                        price: Number(price)
                    }
                }
            },
            include: {
                items: { include: { drug: true } },
                pharmacy: true
            }
        });

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create order" });
    }
});

// Get orders for a pharmacy (Dashboard)
router.get('/pharmacy/:pharmacyId', async (req, res) => {
    try {
        const { pharmacyId } = req.params;
        const orders = await prisma.order.findMany({
            where: { pharmacyId },
            include: {
                items: { include: { drug: true } },
                patient: true
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

// Update Order Status
router.patch('/:orderId/status', async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body; // CONFIRMED, REJECTED, COMPLETED

        const order = await prisma.order.update({
            where: { id: orderId },
            data: { status }
        });

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: "Failed to update status" });
    }
});

// Get orders for a patient (Mobile)
router.get('/patient/:patientId', async (req, res) => {
    try {
        const { patientId } = req.params;
        const orders = await prisma.order.findMany({
            where: { patientId },
            include: {
                items: { include: { drug: true } },
                pharmacy: true
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

export default router;
