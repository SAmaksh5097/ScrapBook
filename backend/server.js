import express from 'express';
import cors from 'cors';
import memoryRoutes from './routes/memoryRoutes.js';
import momentRoutes from './routes/momentRoutes.js';
const app = express();

const allowedOrigins = [
	process.env.FRONTEND_URL,
	'http://localhost:5173',
	'http://127.0.0.1:5173',
].filter(Boolean);

app.use(
	cors({
		origin(origin, callback) {
			// Allow server-to-server requests (no origin) and configured frontend origins.
			if (!origin || allowedOrigins.includes(origin)) {
				return callback(null, true);
			}

			return callback(new Error('CORS: origin not allowed'));
		},
		credentials: true,
	})
);

app.use(express.json());

app.use('/api/memories', memoryRoutes);

app.use('/api/moments', momentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 ScrapBook ESM Server on port ${PORT}`));