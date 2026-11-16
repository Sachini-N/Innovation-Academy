import mongoose from 'mongoose';

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/trace_sri_lanka';
  
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB] Connected to database: ${conn.connection.host} / ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.warn(`[MongoDB Warning] Could not connect to MongoDB at ${mongoURI}: ${error.message}`);
    console.warn(`[MongoDB Info] Make sure your MongoDB Atlas connection string is set in server/.env as MONGODB_URI=...`);
    console.warn(`[MongoDB Info] The server will continue running. Please configure MONGODB_URI with your Atlas or local MongoDB credentials.`);
    return null;
  }
};

