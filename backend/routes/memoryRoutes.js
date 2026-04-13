import express from 'express';
import { addMemory, getMemoryById, getUserMemories, getMemoriesWithMoments, getDistinctYears, deleteMemory } from '../controllers/memoryController.js';
import { requireAuth, verifyUserOwnership } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(requireAuth);

// POST - Create memory (requires auth + body must have clerk_user_id matching user)
router.post('/', verifyUserOwnership, addMemory);

// Most specific routes first (prevent catch-all from matching too early)

// GET - Get years for authenticated user
router.get('/years/:clerk_user_id', verifyUserOwnership, getDistinctYears);

// GET - Get memories with moments for authenticated user by year (single joined query)
router.get('/with-moments/:clerk_user_id/:year', verifyUserOwnership, getMemoriesWithMoments);

// GET - Get memories for authenticated user by year (2 params)
router.get('/:clerk_user_id/:year', verifyUserOwnership, getUserMemories);

// DELETE - Delete memory (requires auth) - before generic GET
router.delete('/:memoryId', deleteMemory);

// GET - Get memory details by ID (most generic, define last)
router.get('/:memoryId', getMemoryById);

export default router;