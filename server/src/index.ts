import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth';
import pharmacyRouter from './routes/pharmacy';
import orderRouter from './routes/order';
import messageRouter from './routes/message';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

app.use('/api/auth', authRouter);
app.use('/api/pharmacy', pharmacyRouter);
app.use('/api/order', orderRouter);
app.use('/api/message', messageRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
