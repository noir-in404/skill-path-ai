import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { geminiService } from '../services/geminiService.js';

describe('GeminiService Unit & Validation Tests', () => {
  it('should report correct active model name', () => {
    const model = geminiService.getModelName();
    assert.ok(typeof model === 'string');
    assert.ok(model.length > 0);
  });

  it('should validate and sanitize incomplete AI responses without crashing', () => {
    const partialData = {
      careerGoal: 'Frontend Developer',
      summary: 'Test summary',
      readinessScore: 60,
      skillAnalysis: [
        {
          skill: 'CSS',
          currentLevel: 'Basic',
          requiredLevel: 'Intermediate',
          status: 'Needs Improvement',
          importance: 'High',
          reason: 'Layout styling'
        }
      ],
      priorityGaps: [],
      roadmap: [
        {
          phase: 1,
          title: 'Foundations',
          tasks: [
            {
              title: 'Learn Flexbox',
              skill: 'CSS',
              estimatedHours: 4
            }
          ]
        }
      ],
      projects: [
        {
          title: 'Responsive Dashboard'
        }
      ]
    };

    const sanitized = geminiService.validateAndSanitize(partialData, 'Frontend Developer');

    assert.equal(sanitized.careerGoal, 'Frontend Developer');
    assert.equal(sanitized.readinessScore, 60);

    // Verify task IDs and fallback arrays were injected
    const task = sanitized.roadmap[0].tasks[0];
    assert.ok(task.id, 'Must generate id for task missing an id');
    assert.ok(Array.isArray(task.stepByStepGuide), 'Must supply fallback stepByStepGuide');
    assert.ok(Array.isArray(task.whatToDo), 'Must supply fallback whatToDo');
    assert.ok(Array.isArray(task.whatNotToDo), 'Must supply fallback whatNotToDo');
    assert.equal(task.completed, false);

    // Verify project IDs and fallback arrays
    const project = sanitized.projects[0];
    assert.ok(project.id, 'Must generate id for project missing an id');
    assert.ok(Array.isArray(project.stepByStepGuide));
    assert.ok(Array.isArray(project.whatToDo));
    assert.ok(Array.isArray(project.whatNotToDo));
    assert.equal(project.status, 'Not Started');
  });

  it('should reject invalid or null AI payload', () => {
    assert.throws(() => {
      geminiService.validateAndSanitize(null, 'Frontend Developer');
    }, /invalid response structure/i);

    assert.throws(() => {
      geminiService.validateAndSanitize('not an object', 'Frontend Developer');
    }, /invalid response structure/i);
  });
});
