import express from 'express';
import cors from 'cors';
import memoryRoutes from './routes/memoryRoutes.js';
import momentRoutes from './routes/momentRoutes.js';
const app = express();
import dotenv from 'dotenv';
import {clerkMiddleware, getAuth} from '@clerk/express'
dotenv.config();

const allowedOrigin = process.env.FRONTEND_URL;

app.use(
	cors({
		origin: allowedOrigin,
		credentials: true,
	})
);

app.use((req,res,next)=>{
	if (req.path.startsWith('/api/')) {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
  }
  next();
})

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