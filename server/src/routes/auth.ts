import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient(); // In real app, import singleton

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, phone, password, role, pharmacyDetails } = req.body;

        // Check existing
        const existing = await prisma.user.findUnique({ where: { phone } });
        if (existing) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Create user (Password hashing omitted for prototype speed, use bcrypt in prod)
        const user = await prisma.user.create({
            data: {
                name,
                phone,
                password, // TODO: Hash this!
                role
            }
        });

        // If Pharmacy, create details
        if (role === 'PHARMACY' && pharmacyDetails) {
            await prisma.pharmacy.create({
                data: {
                    userId: user.id,
                    name: pharmacyDetails.name || name,
                    address: pharmacyDetails.address,
                    latitude: pharmacyDetails.lat,
                    longitude: pharmacyDetails.lng
                }
            });
        }

        res.json({ message: "User created", userId: user.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { phone },
            include: { pharmacy: true }
        });

        if (!user || user.password !== password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // TODO: Return JWT
        res.json({
            token: "mock-jwt-token",
            user: { id: user.id, name: user.name, role: user.role, pharmacy: user.pharmacy }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
