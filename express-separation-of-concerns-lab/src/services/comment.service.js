import pool from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';
import * as postService from './post.service.js';
import * as userService from './user.service.js';

export const getAllComments = async () => {
    try {
        const [comments] = await pool.query(`
            SELECT c.*, u.username as authorName 
            FROM comments c 
            JOIN users u ON c.authorId = u.id 
            ORDER BY c.createdAt DESC
        `);
        return comments;
    } catch (error) {
        throw new ApiError(500, "Failed to retrieve comments");
    }
};

export const getCommentsByPostId = async (postId) => {
    try {
        const [comments] = await pool.query(`
            SELECT c.*, u.username as authorName 
            FROM comments c 
            JOIN users u ON c.authorId = u.id 
            WHERE c.postId = ? 
            ORDER BY c.createdAt DESC
        `, [postId]);
        return comments;
    } catch (error) {
        throw new ApiError(500, "Failed to retrieve comments for post");
    }
};

export const createComment = async (postId, commentData) => {
    const { text, authorId } = commentData;

    try {
        // Verify that the post exists
        const post = await postService.getPostById(postId);
        if (!post) {
            throw new ApiError(404, "Post not found");
        }

        // Verify that the author exists
        const author = await userService.getUserById(authorId);
        if (!author) {
            throw new ApiError(404, "Author not found");
        }

        // Insert the comment
        const [result] = await pool.query(
            'INSERT INTO comments (text, postId, authorId) VALUES (?, ?, ?)',
            [text, postId, authorId]
        );

        const newCommentId = result.insertId;

        // Return the created comment with author information
        const [newComment] = await pool.query(`
            SELECT c.*, u.username as authorName 
            FROM comments c 
            JOIN users u ON c.authorId = u.id 
            WHERE c.id = ?
        `, [newCommentId]);

        return newComment[0];
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, "Failed to create comment");
    }
};