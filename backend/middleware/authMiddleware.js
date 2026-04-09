import { getAuth } from '@clerk/express';

/**
 * Middleware to verify user is authenticated
 * Attaches userId to req.auth for use in controllers
 */
export const requireAuth = (req, res, next) => {
    
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource'
    });
  }

  // Attach userId to request for use in controllers
  req.auth = { userId };
  next();
};

/**
 * Middleware to verify user owns the resource (clerk_user_id in params or body)
 * Must be used after requireAuth middleware
 */
export const verifyUserOwnership = (req, res, next) => {
  const { userId } = req.auth;
  
  // Check if clerk_user_id is in params
  const paramUserId = req.params.clerk_user_id;
  
  // Check if clerk_user_id is in body (for POST requests)
  const bodyUserId = req.body?.clerk_user_id;
  
  const resourceUserId = paramUserId || bodyUserId;

  if (!resourceUserId) {
    return res.status(400).json({
      success: false,
      error: 'BAD_REQUEST',
      message: 'User ID is required in request parameters or body'
    });
    // If no user ID provided, let controller handle it
  }

  if (resourceUserId !== userId) {
    return res.status(403).json({
      success: false,
      error: 'FORBIDDEN',
      message: 'You do not have permission to access this resource'
    });
  }

  next();
};
