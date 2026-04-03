import express from 'express';
import { getYearbook, addMemory } from '../controllers/memoryController.js';

const router = express.Router();

router.get('/:groupId', getYearbook);
router.post('/', addMemory);

export default router;