import express from 'express';
import cors from 'cors';
import memoryRoutes from './routes/memoryRoutes.js';
import momentRoutes from './routes/momentRoutes.js';
const app = express();
import dotenv from 'dotenv';
import {clerkMiddleware, getAuth} from '@clerk/express'
dotenv.config();

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
app.use(clerkMiddleware());

app.get('/protected',(req,res)=>{
	const {userId} = getAuth(req);
	if(!userId){
		return res.status(401).json({error: 'Unauthorized'});
	}
	res.status(200).json({message: 'This is protected data.', userId});
})


app.use('/api/memories', memoryRoutes);

app.use('/api/moments', momentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 ScrapBook ESM Server on port ${PORT}`));