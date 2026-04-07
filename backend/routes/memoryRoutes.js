import express from 'express';
import { addMemory, getMemoryById, getUserMemories } from '../controllers/memoryController.js';

const router = express.Router();

router.post('/', addMemory);
router.get('/user/:year', getUserMemories);

export default router;