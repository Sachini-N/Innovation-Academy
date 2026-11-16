import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { connectDB } from './config/db.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import programRoutes from './routes/programRoutes.js';
import workshopRoutes from './routes/workshopRoutes.js';
import registrationRoutes from './routes/registrationRoutes.js';
import visitRoutes from './routes/visitRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// Models for auto-seeding check
import User from './models/User.js';
import Program from './models/Program.js';
import { seedData } from './utils/seeder.js';

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Static uploads folder
const uploadsDir = path.resolve('uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// API Health Check & Root Endpoints
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'TRACE Sri Lanka API is active and operational.',
    organization: 'Innovation',
    project: 'InnovationA',
    frontend: 'http://localhost:5174',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      programs: '/api/programs',
      workshops: '/api/workshops',
      registrations: '/api/registrations',
      visits: '/api/visits',
      contact: '/api/contact',
      users: '/api/users',
    },
  });
});

app.get('/api', (req, res) => {
  res.json({
    status: 'online',
    organization: 'Innovation',
    project: 'InnovationA',
    service: 'TRACE Sri Lanka Innovation Academy Backend API',
    version: '1.0.0',
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    organization: 'Innovation',
    project: 'InnovationA',
    service: 'TRACE Sri Lanka Innovation Academy Backend',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/workshops', workshopRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/visits', visitRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to Database in background and start Express server immediately
const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`=======================================================`);
      console.log(`🚀 TRACE Sri Lanka API Server running on port ${PORT}`);
      console.log(`🌐 Base URL: http://localhost:${PORT}`);
      console.log(`🔒 Organization: Innovation | Project: InnovationA`);
      console.log(`=======================================================`);
    });

    // Asynchronously connect to MongoDB Atlas / local MongoDB
    connectDB()
      .then(async (conn) => {
        if (conn) {
          const userCount = await User.countDocuments();
          const programCount = await Program.countDocuments();
          if (userCount === 0 || programCount === 0) {
            console.log(
              '[TRACE System] Empty database detected. Auto-seeding initial TRACE programs and users...'
            );
            await seedData();
          }
        }
      })
      .catch((err) => {
        console.warn('[MongoDB Notice]', err.message);
      });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();

