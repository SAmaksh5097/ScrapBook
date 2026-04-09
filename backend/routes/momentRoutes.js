import express from 'express';
import { addMoment, getMomentsByMemoryId, deleteMoment } from '../controllers/momentController.js';
import { requireAuth, verifyUserOwnership } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(requireAuth);

// GET - Get moments for authenticated user by memory ID
router.get('/:clerk_user_id/:memoryId', verifyUserOwnership, getMomentsByMemoryId);

// POST - Create moment (requires auth + body must have clerk_user_id matching user)
router.post('/', verifyUserOwnership, addMoment);

// DELETE - Delete moment (requires auth)
router.delete('/', deleteMoment);

export default router;
