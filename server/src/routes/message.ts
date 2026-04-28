import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Send Message
router.post('/', async (req, res) => {
    try {
        const { content, senderId, receiverId } = req.body;
        const message = await prisma.message.create({
            data: { content, senderId, receiverId }
        });
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: "Failed to send message" });
    }
});

// Get conversation between two users
router.get('/:userId1/:userId2', async (req, res) => {
    try {
        const { userId1, userId2 } = req.params;
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: userId1, receiverId: userId2 },
                    { senderId: userId2, receiverId: userId1 }
                ]
            },
            orderBy: { createdAt: 'asc' }
        });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});

export default router;
