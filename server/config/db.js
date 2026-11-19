import mongoose from 'mongoose';

const DEFAULT_ATLAS_URI =
  'mongodb+srv://sachininisansala320_db_user:FgQBGnYHv11DZu6q@cluster0.x7ycl3y.mongodb.net/trace_sri_lanka?retryWrites=true&w=majority';

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }
  
  const effectiveURI = process.env.MONGODB_URI || DEFAULT_ATLAS_URI;
  
  try {
    const conn = await mongoose.connect(effectiveURI, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`[MongoDB] Connected to database: ${conn.connection.host} / ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.warn(`[MongoDB Warning] Could not connect to MongoDB at ${effectiveURI}: ${error.message}`);
    return null;
  }
};

