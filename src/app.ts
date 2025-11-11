import express, { Application } from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import noteRoutes from './routes/noteRoutes';
import assignmentRoutes from './routes/assignmentRoutes';
import oldQuestionRoutes from './routes/oldQuestionRoutes';
import blogRoutes from './routes/blogRoutes';
import { errorHandler } from './middleware/errorHandler';

const createApp = (): Application => {
  const app = express();

  // Enable CORS for all origins
  app.use(
    cors({
      origin: '*', // allow all origins
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true // allow cookies/auth headers
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/notes', noteRoutes);
  app.use('/api/assignments', assignmentRoutes);
  app.use('/api/old-questions', oldQuestionRoutes);
  app.use('/api/blogs', blogRoutes);

  // Global error handler
  app.use(errorHandler);

  return app;
};

export default createApp;
