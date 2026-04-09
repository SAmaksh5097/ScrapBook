import express from 'express';
import { addMemory, getMemoryById, getUserMemories, getMemoriesWithMoments, getDistinctYears, deleteMemory } from '../controllers/memoryController.js';
import { requireAuth, verifyUserOwnership } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(requireAuth);

// POST - Create memory (requires auth + body must have clerk_user_id matching user)
router.post('/', verifyUserOwnership, addMemory);

// GET - Get years for authenticated user
router.get('/years/:clerk_user_id', verifyUserOwnership, getDistinctYears);

// GET - Get memories with moments for authenticated user by year (single joined query)
router.get('/with-moments/:clerk_user_id/:year', verifyUserOwnership, getMemoriesWithMoments);

// GET - Get memories for authenticated user by year
router.get('/:clerk_user_id/:year', verifyUserOwnership, getUserMemories);

// GET - Get memory details by ID
router.get('/:memoryId', getMemoryById);

// DELETE - Delete memory (requires auth)
router.delete('/:memoryId', deleteMemory);

export default router;