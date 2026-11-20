/**
 * Frontend API client communicating with Express backend
 */

export const checkHealth = async () => {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn('Health check failed:', err.message);
    return {
      status: 'offline',
      hasGeminiKey: false,
      model: 'unknown',
      error: err.message
    };
  }
};

export const analyzeCareerAssessment = async (assessmentData, useDemo = false) => {
  const payload = {
    ...assessmentData,
    useDemo
  };

  const res = await fetch('/api/assessment/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message || 'Failed to analyze career readiness.');
    error.code = data.error;
    error.canUseDemo = data.canUseDemo;
    throw error;
  }

  return data;
};

export const generateRoadmap = async (assessmentData, useDemo = false) => {
  const res = await fetch('/api/roadmap/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...assessmentData, useDemo })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to generate roadmap.');
  }

  return data;
};
