import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import postRoutes from './src/routes/post.routes.js';
import config from './src/config/index.js';

dotenv.config(); // loads environment variables from .env file

const app = express();
const port = config.port; //uses port from config

//middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use('/posts', postRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});