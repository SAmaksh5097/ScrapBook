import express from 'express';
import { addMemory, getMemoryById, getUserMemories, getDistinctYears } from '../controllers/memoryController.js';

const router = express.Router();

router.post('/', addMemory);
router.get('/years/:userId', getDistinctYears);
router.get('/:userId/:year', getUserMemories);
router.get('/:memoryId', getMemoryById);

export default router;