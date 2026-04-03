import express from 'express';
import cors from 'cors';
import memoryRoutes from './routes/memoryRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/memories', memoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 ScrapBook ESM Server on port ${PORT}`));