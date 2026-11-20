import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure .env is read from server/ directory or project root
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

/**
 * Central Gemini Service using the official @google/genai SDK
 */
class GeminiService {
  constructor() {
    this.modelName = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
    this.client = null;
  }

  getApiKey() {
    return (process.env.GEMINI_API_KEY || '').trim();
  }

  isConfigured() {
    const key = this.getApiKey();
    return Boolean(key && key.length > 0);
  }

  getModelName() {
    return process.env.GEMINI_MODEL || this.modelName || 'gemini-3.5-flash-lite';
  }

  getClient() {
    const key = this.getApiKey();
    if (!key) return null;
    return new GoogleGenAI({ apiKey: key });
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

    const client = this.getClient();
    if (!client) {
      const error = new Error('Failed to initialize GoogleGenAI client with the provided GEMINI_API_KEY.');
      error.code = 'MISSING_API_KEY';
      throw error;
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
          "completionCriteria": "Verifiable check to confirm understanding",
          "stepByStepGuide": [
            "Step 1: Scaffolding, setup, or core concept review",
            "Step 2: Practical code implementation instructions",
            "Step 3: Edge cases, debugging, and verification checks"
          ],
          "whatToDo": [
            "Specific best practice to follow 1",
            "Specific best practice to follow 2"
          ],
          "whatNotToDo": [
            "Common beginner trap or mistake to avoid 1",
            "Common beginner trap or mistake to avoid 2"
          ]
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
      "careerRelevance": "Why building this showcases real-world competency to hiring managers",
      "stepByStepGuide": [
        "Step 1: Architecture planning, project setup, and initial repo initialization",
        "Step 2: Core feature implementation",
        "Step 3: State persistence, error handling, and API integration",
        "Step 4: Responsive UI polish, accessibility checks, and deployment"
      ],
      "whatToDo": [
        "Key architectural rule to follow 1",
        "Key architectural rule to follow 2"
      ],
      "whatNotToDo": [
        "Common beginner trap to avoid 1",
        "Common beginner trap to avoid 2"
      ]
    }
  ]
}

Ensure the roadmap has 3-4 distinct phases spanning the ${learningDurationWeeks}-week duration, with realistic hourly commitments fitting ${dailyStudyHours} hours/day. Provide 2-3 high-impact practical projects with detailed Odin Project-style step-by-step instructions, DOs, and DON'Ts so the learner is never confused. Return ONLY the JSON object.
`;

    try {
      const candidateModels = [
        this.getModelName(),
        'gemini-3.5-flash-lite',
        'gemini-3.8-flash'
      ];
      const uniqueModels = [...new Set(candidateModels)];

      let response = null;
      let lastErr = null;

      for (const model of uniqueModels) {
        try {
          console.log(`[GeminiService] Calling Gemini with model: ${model}`);
          response = await client.models.generateContent({
            model,
            contents: userPrompt,
            config: {
              systemInstruction,
              responseMimeType: 'application/json',
              temperature: 0.3,
            }
          });
          if (response && response.text) {
            console.log(`[GeminiService] Successfully generated structured career plan using ${model}`);
            break;
          }
        } catch (mErr) {
          console.warn(`[GeminiService] Model ${model} failed, trying fallback:`, mErr.message);
          lastErr = mErr;
        }
      }

      if (!response || !response.text) {
        throw lastErr || new Error('Received empty response from Gemini API.');
      }

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
        stepByStepGuide: Array.isArray(task.stepByStepGuide) && task.stepByStepGuide.length > 0
          ? task.stepByStepGuide
          : [
              `1. Study core mechanics of ${task.skill || 'this topic'} and review recommended documentation.`,
              `2. Scaffold a minimal test project or isolated code sandbox.`,
              `3. Implement the practical exercise: ${task.practicalTask || task.description}`,
              `4. Test edge cases, handle potential errors, and verify: ${task.completionCriteria || 'working prototype'}`
            ],
        whatToDo: Array.isArray(task.whatToDo) && task.whatToDo.length > 0
          ? task.whatToDo
          : [
              'Write clean, modular code and test each function independently.',
              'Check official documentation when uncertain instead of guessing syntax.',
              'Verify that your code runs cleanly without unhandled console errors.'
            ],
        whatNotToDo: Array.isArray(task.whatNotToDo) && task.whatNotToDo.length > 0
          ? task.whatNotToDo
          : [
              'DO NOT copy-paste code without understanding every line.',
              'DO NOT install external libraries before trying the native language features.',
              'DO NOT skip testing edge cases or error states.'
            ],
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
      stepByStepGuide: Array.isArray(proj.stepByStepGuide) && proj.stepByStepGuide.length > 0
        ? proj.stepByStepGuide
        : [
            'Phase 1: Architecture Planning - Define schema, user stories, and directory structure.',
            'Phase 2: Project Setup - Initialize Vite repo with Tailwind CSS and Git version control.',
            'Phase 3: Core Implementation - Build key component hierarchy and business logic.',
            'Phase 4: Persistence & Error Handling - Add storage persistence and graceful network handling.',
            'Phase 5: Polish & Deployment - Verify responsive layout on mobile, add README, and deploy.'
          ],
      whatToDo: Array.isArray(proj.whatToDo) && proj.whatToDo.length > 0
        ? proj.whatToDo
        : [
            'Separate state management and business logic into pure helper functions.',
            'Commit frequently with clear, conventional Git commit messages.',
            'Include an informative README with setup instructions and architecture highlights.'
          ],
      whatNotToDo: Array.isArray(proj.whatNotToDo) && proj.whatNotToDo.length > 0
        ? proj.whatNotToDo
        : [
            'DO NOT try to add complex backend infrastructure before your frontend UI is completely functional.',
            'DO NOT leave credentials, API keys, or sensitive tokens in client code.',
            'DO NOT ignore accessibility standards or responsiveness on mobile screen viewports.'
          ],
      completed: false,
      status: 'Not Started'
    }));

    return sanitized;
  }
}

export const geminiService = new GeminiService();
