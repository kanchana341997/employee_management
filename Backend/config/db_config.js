import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const config = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  mongoURI: process.env.MONGO_URI,
};

export default config;
