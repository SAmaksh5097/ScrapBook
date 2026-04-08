import express from 'express';
import { addMoment, getMomentsByMemoryId } from '../controllers/momentController.js';

const router = express.Router();

router.get('/:memoryId', getMomentsByMemoryId);
router.post('/', addMoment);

export default router;
