import { geminiService } from '../services/geminiService.js';
import { getSampleAnalysis } from '../services/sampleDataService.js';

/**
 * @typedef {Object} SkillAssessmentPayload
 * @property {string} careerGoal - Desired industry career role
 * @property {Array<{ skill: string, level: string }>} [currentSkills] - Self-reported competencies
 * @property {number} [dailyStudyHours] - Available daily study time (hours)
 * @property {number} [learningDurationWeeks] - Target learning duration (weeks)
 * @property {string} [learningStyle] - Preferred learning format
 * @property {boolean} [useDemo] - Whether to force curated demo mode
 */

/**
 * Evaluates candidate self-reported skills against live industry requirements using Gemini AI.
 * Falls back to curated demo results when requested or when GEMINI_API_KEY is not yet set.
 * 
 * @param {import('express').Request<{}, {}, SkillAssessmentPayload>} req - Express request
 * @param {import('express').Response} res - Express response
 * @param {import('express').NextFunction} next - Express next handler
 */
export const analyzeAssessment = async (req, res, next) => {
  try {
    const { careerGoal, useDemo = false } = req.body;

    // Check if user requested Demo Mode or if Gemini API Key is missing
    const hasKey = geminiService.isConfigured();

    if (useDemo || !hasKey) {
      if (!hasKey && !useDemo) {
        return res.status(400).json({
          success: false,
          error: 'MISSING_API_KEY',
          message: 'Gemini API key is not configured in server/.env. You can supply your GEMINI_API_KEY or toggle Demo Mode to explore with curated sample results.',
          canUseDemo: true
        });
      }

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
    next(error);
  }
};

/**
 * Generates an actionable phased learning roadmap and recommended portfolio projects.
 * 
 * @param {import('express').Request<{}, {}, SkillAssessmentPayload>} req - Express request
 * @param {import('express').Response} res - Express response
 * @param {import('express').NextFunction} next - Express next handler
 */
export const generateRoadmap = async (req, res, next) => {
  try {
    const { careerGoal, useDemo = false } = req.body;
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
    next(error);
  }
};

/**
 * Provides service health, API model status, and capability metadata.
 * 
 * @param {import('express').Request} req - Express request
 * @param {import('express').Response} res - Express response
 */
export const checkHealth = (req, res) => {
  const hasKey = geminiService.isConfigured();
  return res.json({
    status: 'ok',
    product: 'SkillPath AI',
    tagline: 'From Career Ambition to Practical Skill Development',
    version: '1.0.0',
    hasGeminiKey: hasKey,
    model: geminiService.getModelName(),
    timestamp: new Date().toISOString()
  });
};
