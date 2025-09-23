import pool from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

export const createUser = async (userData) => {
    const { username, email } = userData;

    try {
        const [result] = await pool.query(
            'INSERT INTO users (username, email) VALUES (?, ?)',
            [username, email]
        );
        const newUserId = result.insertId;
        return getUserById(newUserId);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new ApiError(409, "Username or email already exists");
        }
        throw error;
    }
};

export const getUserById = async (id) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    } catch (error) {
        if (!rows[0]) {
            throw new ApiError(404, "User not found");
        }
        throw error;
    }
};

export const getAllUsers = async () => {
    const [users] = await pool.query('SELECT * FROM users');
    return users;
};

export const getPostsByUserId = async (userId) => {
    const [posts] = await pool.query('SELECT * FROM posts WHERE authorId = ?', [userId]);
    return posts;
};