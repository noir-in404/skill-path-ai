import app from './app.js';

const PORT = process.env.PORT || 5000;

// Start listening
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 SkillPath AI Server running on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🔑 Gemini Key Configured: ${Boolean(process.env.GEMINI_API_KEY)}`);
  console.log(`🤖 Gemini Model: ${process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite'}`);
  console.log(`===============================================`);
});
