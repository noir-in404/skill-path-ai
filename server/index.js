import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for client development
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON request bodies
app.use(express.json({ limit: '5mb' }));

// Mount API routes
app.use('/api', apiRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({
    product: 'SkillPath AI API Server',
    tagline: 'From Career Ambition to Practical Skill Development',
    status: 'online',
    endpoints: {
      health: 'GET /api/health',
      analyze: 'POST /api/assessment/analyze',
      roadmap: 'POST /api/roadmap/generate'
    }
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    error: 'SERVER_ERROR',
    message: err.message || 'An unexpected server error occurred.'
  });
});

// Start listening
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 SkillPath AI Server running on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🔑 Gemini Key Configured: ${Boolean(process.env.GEMINI_API_KEY)}`);
  console.log(`🤖 Gemini Model: ${process.env.GEMINI_MODEL || 'gemini-2.5-flash'}`);
  console.log(`===============================================`);
});
