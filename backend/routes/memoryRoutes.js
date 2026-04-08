import express from 'express';
import { addMemory, getMemoryById, getUserMemories, getDistinctYears, deleteMemory } from '../controllers/memoryController.js';

const router = express.Router();

router.post('/', addMemory);
router.get('/years/:userId', getDistinctYears);
router.get('/:userId/:year', getUserMemories);
router.get('/:memoryId', getMemoryById);
router.delete('/:memoryId', deleteMemory);

export default router;