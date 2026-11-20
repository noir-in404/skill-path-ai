import { Router } from 'express';
import {
  analyzeAssessment,
  generateRoadmap,
  checkHealth
} from '../controllers/assessmentController.js';

const router = Router();

// Assessment and Skill Gap Analysis
router.post('/assessment/analyze', analyzeAssessment);

// Dedicated Roadmap Generation
router.post('/roadmap/generate', generateRoadmap);

// System Health Check
router.get('/health', checkHealth);

export default router;
