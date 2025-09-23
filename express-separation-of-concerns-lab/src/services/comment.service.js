import pool from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

export const getAllComments = async () => {
    const [comments] = await pool.query('SELECT * FROM comments');
    return comments;
};

export const getCommentsByPostId = async (postId) => {
    const [comments] = await pool.query('SELECT * FROM comments WHERE postId = ?', [postId]);
    return comments;
};

export const createComment = async (postId, authorId, commentData) => {
    try {
        const [result] = await pool.query('INSERT INTO comments (postId, authorId, text) VALUES (?, ?, ?)',
            [postId, authorId, commentData.text]);

        const newCommentId = result.insertId;
        const [newComment] = await pool.query('SELECT * FROM comments WHERE id = ?', [newCommentId]);

        return newComment[0];
    } catch (error) {
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            throw new ApiError(400, "Invalid postId or authorId");
        }
        throw error;
    }
};