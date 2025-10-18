import * as postService from '../services/post.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from 'express-async-handler';

/* export const getAllPosts = (req, res) => {
    const posts = postService.getAllPosts();
    res.json(posts);
}; */

export const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await postService.getAllPosts();
    return res
        .status(200)
        .json(new ApiResponse(200, posts, "Posts retrieved successfully"));
});

/* export const getPostById = (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = postService.getPostById(postId);
    if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
    }
    res.json(post);
}; */

export const getPostById = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await postService.getPostById(postId);

    return res
        .status(200)
        .json(new ApiResponse(200, post, "Post retrieved successfully"));
});

/* export const createPost = (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
    }
    const newPost = postService.createPost({ title, content });
    res.status(201).json(newPost);
}; */

export const createPost = asyncHandler(async (req, res) => {
    // The authorId now comes from the authenticated user attached by the middleware
    const authorId = req.user.id;
    const postData = req.body;

    const newPost = await postService.createPost(postData, authorId); // Pass authorId separately
    res.status(201).json(new ApiResponse(201, newPost, "Post created successfully"));
});


/* export const updatePost = (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = postService.updatePost(postId, req.body);
    if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
    }
    res.json(post);
}; */

export const updatePost = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await postService.updatePost(postId, req.body);
    return res
        .status(200)
        .json(new ApiResponse(200, post, "Post updated successfully"));
});

/* export const partiallyUpdatePost = (req, res) => {
        const postId = parseInt(req.params.id, 10);
        const post = postService.partiallyUpdatePost(postId, req.body);
        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }
        res.json(post);
    };*/

export const partiallyUpdatePost = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await postService.partiallyUpdatePost(postId, req.body);
    return res
        .status(200)
        .json(new ApiResponse(200, post, "Post updated successfully"));
});

/* export const deletePost = (req, res) => {
        const postId = parseInt(req.params.id, 10);
        const success = postService.deletePost(postId);
        if (!success) {
            return res.status(404).json({ message: 'Post not found.' });
        }
        res.status(204).send();
    }; */

export const deletePost = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    await postService.deletePost(postId);
    return res.status(204).send();
});

export const getPostsByUserId = asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const posts = await postService.getPostsByUserId(userId);
    return res
        .status(200)
        .json(new ApiResponse(200, posts, "Posts retrieved successfully"));
});

