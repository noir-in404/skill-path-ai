import { geminiService } from '../services/geminiService.js';
import { getSampleAnalysis } from '../services/sampleDataService.js';

/**
 * Controller for Career Assessment & AI Analysis
 */
export const analyzeAssessment = async (req, res) => {
  try {
    const { careerGoal, currentSkills, useDemo = false } = req.body;

    // Validate required fields
    if (!careerGoal || typeof careerGoal !== 'string' || !careerGoal.trim()) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'A target career role is required.'
      });
    }

    // Check if user requested Demo Mode or if Gemini API Key is missing
    const hasKey = geminiService.isConfigured();

    if (useDemo || !hasKey) {
      if (!hasKey && !useDemo) {
        // Return clear warning that key is missing, while offering demo mode
        return res.status(400).json({
          success: false,
          error: 'MISSING_API_KEY',
          message: 'Gemini API key is not configured in server/.env. You can supply your GEMINI_API_KEY or toggle Demo Mode to explore with curated sample results.',
          canUseDemo: true
        });
      }

      // Serve curated sample data clearly marked as demo
      console.log(`[AssessmentController] Serving sample data for ${careerGoal} (Demo Mode)`);
      const sampleResult = getSampleAnalysis(req.body);
      return res.json({
        success: true,
        data: sampleResult,
        source: 'demo'
      });
    }

    // Execute live Gemini API call
    console.log(`[AssessmentController] Invoking Gemini API (${geminiService.getModelName()}) for career: ${careerGoal}`);
    const analysis = await geminiService.analyzeCareerReadiness(req.body);

    return res.json({
      success: true,
      data: analysis,
      source: 'gemini'
    });
  } catch (error) {
    console.error('[AssessmentController] Error in analyzeAssessment:', error.message);

    return res.status(500).json({
      success: false,
      error: error.code || 'AI_GENERATION_FAILED',
      message: error.message || 'An unexpected error occurred while analyzing career readiness.'
    });
  }
};

/**
 * Dedicated roadmap generation endpoint
 */
export const generateRoadmap = async (req, res) => {
  try {
    const { careerGoal, useDemo = false } = req.body;

    if (!careerGoal) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'A target career role is required.'
      });
    }

    const hasKey = geminiService.isConfigured();

    if (useDemo || !hasKey) {
      const sample = getSampleAnalysis(req.body);
      return res.json({
        success: true,
        data: {
          roadmap: sample.roadmap,
          projects: sample.projects,
          isDemo: true
        },
        source: 'demo'
      });
    }

    const fullAnalysis = await geminiService.analyzeCareerReadiness(req.body);
    return res.json({
      success: true,
      data: {
        roadmap: fullAnalysis.roadmap,
        projects: fullAnalysis.projects,
        isDemo: false
      },
      source: 'gemini'
    });
  } catch (error) {
    console.error('[AssessmentController] Error in generateRoadmap:', error.message);
    return res.status(500).json({
      success: false,
      error: error.code || 'ROADMAP_GENERATION_FAILED',
      message: error.message || 'Failed to generate learning roadmap.'
    });
  }
};

/**
 * System Health & Configuration Status Check
 */
export const checkHealth = (req, res) => {
  const hasKey = geminiService.isConfigured();
  return res.json({
    status: 'ok',
    product: 'SkillPath AI',
    tagline: 'From Career Ambition to Practical Skill Development',
    hasGeminiKey: hasKey,
    model: geminiService.getModelName(),
    timestamp: new Date().toISOString()
  });
};
