import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Central Gemini Service using the official @google/genai SDK
 */
class GeminiService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || '';
    this.modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    this.client = null;

    if (this.apiKey) {
      try {
        this.client = new GoogleGenAI({ apiKey: this.apiKey });
      } catch (err) {
        console.error('Failed to initialize GoogleGenAI client:', err.message);
      }
    }
  }

  isConfigured() {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0);
  }

  getModelName() {
    return this.modelName;
  }

  /**
   * Performs full career analysis, skill gap mapping, roadmap generation,
   * and practical project recommendations in a unified structured AI call.
   */
  async analyzeCareerReadiness(assessment) {
    if (!this.isConfigured()) {
      const error = new Error('GEMINI_API_KEY is not configured on the server. Please add your key to server/.env or test with Demo Mode.');
      error.code = 'MISSING_API_KEY';
      throw error;
    }

    if (!this.client) {
      this.client = new GoogleGenAI({ apiKey: this.apiKey });
    }

    const {
      name,
      educationLevel,
      fieldOfStudy,
      careerGoal,
      currentSkills = [],
      dailyStudyHours = 2,
      learningDurationWeeks = 8,
      learningStyle = 'Practical projects',
      additionalNotes = ''
    } = assessment;

    const formattedSkills = currentSkills && currentSkills.length > 0
      ? currentSkills.map(s => `- ${s.skill} (Self-reported level: ${s.level || 'Beginner'})`).join('\n')
      : 'No current skills provided (starting fresh).';

    const systemInstruction = `You are an experienced career development and technical learning advisor for SkillPath AI. 
Analyse the user's target career and current self-reported skills. Identify relevant competencies, explain skill gaps, prioritise learning based on importance and dependencies, and create a realistic personalised roadmap. Recommend practical projects that demonstrate relevant abilities. Be specific, realistic, encouraging, and structured. 
Do not invent guarantees of employment, job placement, salary, or employability. Do not treat self-reported skill levels as objectively verified. Return only valid JSON conforming strictly to the requested schema.`;

    const userPrompt = `
Please analyze the following learner profile and generate an end-to-end skill gap analysis, personalised learning roadmap, and practical project recommendations:

Learner Profile:
- Name: ${name || 'Learner'}
- Education Level: ${educationLevel || 'Not specified'}
- Field of Study: ${fieldOfStudy || 'Not specified'}
- Target Career Role: ${careerGoal}
- Current Skills & Reported Levels:
${formattedSkills}
- Available Study Time: ${dailyStudyHours} hours per day
- Target Learning Duration: ${learningDurationWeeks} weeks
- Preferred Learning Style: ${learningStyle}
${additionalNotes ? `- Additional Context: ${additionalNotes}` : ''}

Required Output Schema (pure JSON):
{
  "careerGoal": "${careerGoal}",
  "summary": "2-3 sentences summarizing the learner's starting point, biggest competitive gaps, and strategic focus for their target role.",
  "readinessScore": 45, // An estimated self-reported alignment index between 10 and 90
  "skillAnalysis": [
    {
      "skill": "Name of required competency",
      "currentLevel": "None" | "Beginner" | "Basic" | "Intermediate" | "Advanced",
      "requiredLevel": "Basic" | "Intermediate" | "Advanced" | "Expert",
      "status": "Strong" | "Needs Improvement" | "Missing",
      "importance": "High" | "Medium" | "Low",
      "category": "Core Technical" | "Frameworks & Tools" | "Architecture & Design" | "Soft Skills & Workflow",
      "reason": "Specific explanation of why this competency matters for ${careerGoal}."
    }
  ],
  "priorityGaps": [
    {
      "skill": "Top priority skill to tackle first",
      "priority": "High" | "Medium",
      "reason": "Why this must be learned early (e.g., prerequisite for other skills)",
      "prerequisite": "Foundational requirement or 'None'"
    }
  ],
  "roadmap": [
    {
      "phase": 1,
      "title": "Phase title with week range (e.g. Phase 1: Foundations)",
      "duration": "e.g. Weeks 1-2",
      "focus": "Key learning theme of this phase",
      "objectives": [
        "Concrete learning objective 1",
        "Concrete learning objective 2"
      ],
      "tasks": [
        {
          "id": "t-1",
          "title": "Actionable task name",
          "skill": "Target skill",
          "description": "What to study or practice",
          "importance": "High" | "Medium" | "Low",
          "recommendedActivities": "Specific reading, documentation or tutorials to review",
          "estimatedHours": 6,
          "practicalTask": "A hands-on coding or design exercise to build",
          "completionCriteria": "Verifiable check to confirm understanding"
        }
      ]
    }
  ],
  "projects": [
    {
      "id": "p-1",
      "title": "Compelling Project Name",
      "description": "Detailed description of the project",
      "skills": ["Skill 1", "Skill 2"],
      "difficulty": "Beginner" | "Intermediate" | "Advanced",
      "estimatedHours": 15,
      "deliverables": [
        "Specific deliverable 1",
        "Specific deliverable 2"
      ],
      "careerRelevance": "Why building this showcases real-world competency to hiring managers"
    }
  ]
}

Ensure the roadmap has 3-4 distinct phases spanning the ${learningDurationWeeks}-week duration, with realistic hourly commitments fitting ${dailyStudyHours} hours/day. Provide 2-3 high-impact practical projects. Return ONLY the JSON object.
`;

    try {
      const response = await this.client.models.generateContent({
        model: this.modelName,
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.3,
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error('Received empty response from Gemini API.');
      }

      // Parse and validate response
      let parsed;
      try {
        // Strip markdown backticks if present
        const cleanedText = responseText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
        parsed = JSON.parse(cleanedText);
      } catch (parseErr) {
        console.error('Failed to parse Gemini response as JSON. Raw text:', responseText);
        throw new Error('Failed to parse Gemini response into expected structured JSON.');
      }

      // Sanitize and validate essential fields
      const sanitized = this.validateAndSanitize(parsed, careerGoal);
      sanitized.isDemo = false;
      return sanitized;
    } catch (err) {
      console.error('Gemini API execution error:', err.message);
      // Re-throw with user-friendly message
      if (err.message.includes('API_KEY_INVALID') || err.message.includes('invalid api key')) {
        const error = new Error('The configured GEMINI_API_KEY is invalid or unauthorized. Please verify your key.');
        error.code = 'INVALID_API_KEY';
        throw error;
      }
      if (err.message.includes('RESOURCE_EXHAUSTED') || err.message.includes('quota') || err.message.includes('rate limit')) {
        const error = new Error('Gemini API rate limit or quota exceeded. Please try again in a few moments.');
        error.code = 'RATE_LIMIT';
        throw error;
      }
      throw err;
    }
  }

  /**
   * Helper to ensure all required fields and stable IDs are present
   */
  validateAndSanitize(data, careerGoal) {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response structure returned by AI model.');
    }

    const sanitized = {
      careerGoal: data.careerGoal || careerGoal,
      summary: data.summary || `Personalized career roadmap and skill gap analysis for ${careerGoal}.`,
      readinessScore: typeof data.readinessScore === 'number' ? data.readinessScore : 50,
      skillAnalysis: Array.isArray(data.skillAnalysis) ? data.skillAnalysis : [],
      priorityGaps: Array.isArray(data.priorityGaps) ? data.priorityGaps : [],
      roadmap: Array.isArray(data.roadmap) ? data.roadmap : [],
      projects: Array.isArray(data.projects) ? data.projects : []
    };

    // Ensure IDs on roadmap tasks
    let taskCounter = 1;
    sanitized.roadmap = sanitized.roadmap.map((phase, pIndex) => ({
      phase: phase.phase || pIndex + 1,
      title: phase.title || `Phase ${pIndex + 1}`,
      duration: phase.duration || 'Weeks 1-2',
      focus: phase.focus || '',
      objectives: Array.isArray(phase.objectives) ? phase.objectives : [],
      tasks: (Array.isArray(phase.tasks) ? phase.tasks : []).map(task => ({
        id: task.id || `task-${taskCounter++}`,
        title: task.title || 'Learning Task',
        skill: task.skill || 'Core Skill',
        description: task.description || '',
        importance: task.importance || 'Medium',
        recommendedActivities: task.recommendedActivities || '',
        estimatedHours: Number(task.estimatedHours) || 4,
        practicalTask: task.practicalTask || '',
        completionCriteria: task.completionCriteria || '',
        completed: false
      }))
    }));

    // Ensure IDs and status on projects
    let projCounter = 1;
    sanitized.projects = sanitized.projects.map(proj => ({
      id: proj.id || `proj-${projCounter++}`,
      title: proj.title || 'Practical Portfolio Project',
      description: proj.description || '',
      skills: Array.isArray(proj.skills) ? proj.skills : [],
      difficulty: proj.difficulty || 'Intermediate',
      estimatedHours: Number(proj.estimatedHours) || 12,
      deliverables: Array.isArray(proj.deliverables) ? proj.deliverables : [],
      careerRelevance: proj.careerRelevance || '',
      completed: false,
      status: 'Not Started'
    }));

    return sanitized;
  }
}

export const geminiService = new GeminiService();
