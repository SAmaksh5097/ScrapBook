import express from 'express';
import { addMoment, getMomentsByMemoryId, deleteMoment } from '../controllers/momentController.js';

const router = express.Router();

router.get('/:memoryId', getMomentsByMemoryId);
router.post('/', addMoment);
router.delete('/', deleteMoment);

export default router;
