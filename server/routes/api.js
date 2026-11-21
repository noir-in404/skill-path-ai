import { Router } from 'express';
import {
  analyzeAssessment,
  generateRoadmap,
  checkHealth
} from '../controllers/assessmentController.js';
import { validateAssessmentPayload } from '../middleware/validationMiddleware.js';

const router = Router();

// Assessment and Skill Gap Analysis
router.post('/assessment/analyze', validateAssessmentPayload, analyzeAssessment);

// Dedicated Roadmap Generation
router.post('/roadmap/generate', validateAssessmentPayload, generateRoadmap);

// System Health Check
router.get('/health', checkHealth);

export default router;
