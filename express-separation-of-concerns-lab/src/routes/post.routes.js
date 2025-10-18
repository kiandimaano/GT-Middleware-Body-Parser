import { Router } from 'express';
import * as postController from '../controllers/post.controller.js';
import * as commentController from '../controllers/comment.controller.js';
import { validatePost, validateComment } from '../middlewares/validator.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// Public routes (no authentication required)
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);

// Protected routes (authentication required)
router.post('/', authMiddleware, validatePost, postController.createPost);
router.put('/:id', authMiddleware, validatePost, postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);
router.patch('/:id', authMiddleware, postController.partiallyUpdatePost); // We should create a separate validator for patch later

// Comment routes
router.get('/:postId/comments', commentController.getCommentsByPostId);
router.post('/:postId/comments', validateComment, commentController.createCommentForPost);

export default router;