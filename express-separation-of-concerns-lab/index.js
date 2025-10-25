// index.js
import express from 'express';
import postRoutes from './src/routes/post.routes.js';
import commentRoutes from './src/routes/comment.routes.js';
import photoRoutes from './src/routes/photo.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import { testConnection } from './src/config/db.js'; // Import the test function
import { errorHandler } from './src/middlewares/errorHandler.middleware.js';
import userRoutes from './src/routes/user.routes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

app.use('/uploads', express.static('uploads'));

// Mount the routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/photos', photoRoutes);

// CENTRAL ERROR HANDLER MIDDLEWARE
// This must be the LAST middleware in the chain
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    testConnection(); // Test the database connection on startup
});