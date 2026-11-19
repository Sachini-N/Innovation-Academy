import mongoose from 'mongoose';

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }
  
  const mongoURI = process.env.MONGODB_URI;
  if (!mongoURI && process.env.VERCEL) {
    console.error('[MongoDB Error] MONGODB_URI is not set in Vercel Environment Variables!');
    return null;
  }

  const effectiveURI = mongoURI || 'mongodb://127.0.0.1:27017/trace_sri_lanka';
  
  try {
    const conn = await mongoose.connect(effectiveURI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB] Connected to database: ${conn.connection.host} / ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.warn(`[MongoDB Warning] Could not connect to MongoDB at ${effectiveURI}: ${error.message}`);
    return null;
  }
};

