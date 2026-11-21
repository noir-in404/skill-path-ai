/**
 * Centralized Error Handling Middleware
 * Ensures every error returns a clean, structured JSON envelope.
 */

/**
 * Express error handler middleware
 * @param {Error} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const errorCode = err.code || 'SERVER_ERROR';
  const message = err.message || 'An unexpected internal server error occurred.';

  console.error(`[API Error ${statusCode}] ${errorCode}: ${message}`);
  if (process.env.NODE_ENV !== 'production' && err.stack) {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    error: errorCode,
    message,
    timestamp: new Date().toISOString()
  });
};
