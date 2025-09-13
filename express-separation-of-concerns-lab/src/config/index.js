import dotenv from 'dotenv';
dotenv.config(); // loads environment variables from .env file

const config = {
    port: process.env.PORT || 3000, //uses port from .env, with fallback to 3000
    nodeEnv: process.env.NODE_ENV || 'development',
};

export default config;