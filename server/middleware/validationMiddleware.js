/**
 * Validation Middleware for Career Assessment & Roadmap Endpoints
 * Enforces strict input validation and clean error messaging.
 */

/**
 * Validates the career goal and assessment payload structure.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const validateAssessmentPayload = (req, res, next) => {
  const { careerGoal, dailyStudyHours, learningDurationWeeks } = req.body || {};

  // Check careerGoal is present and not whitespace
  if (!careerGoal || typeof careerGoal !== 'string' || !careerGoal.trim()) {
    return res.status(400).json({
      success: false,
      error: 'VALIDATION_ERROR',
      message: 'A target career role is required.'
    });
  }

  // Validate daily study hours if supplied
  if (dailyStudyHours !== undefined && (typeof dailyStudyHours !== 'number' || dailyStudyHours <= 0 || dailyStudyHours > 16)) {
    return res.status(400).json({
      success: false,
      error: 'VALIDATION_ERROR',
      message: 'Daily study hours must be a realistic number between 1 and 16.'
    });
  }

  // Validate learning duration weeks if supplied
  if (learningDurationWeeks !== undefined && (typeof learningDurationWeeks !== 'number' || learningDurationWeeks <= 0 || learningDurationWeeks > 52)) {
    return res.status(400).json({
      success: false,
      error: 'VALIDATION_ERROR',
      message: 'Learning duration must be a realistic number of weeks between 1 and 52.'
    });
  }

  next();
};
