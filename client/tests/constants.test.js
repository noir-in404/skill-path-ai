import { describe, it, expect } from 'vitest';
import {
  CAREER_ROLES,
  PROFICIENCY_LEVELS,
  EDUCATION_LEVELS,
  STUDY_HOURS_OPTIONS,
  DURATION_OPTIONS,
  LEARNING_STYLES
} from '../src/utils/constants.js';

describe('Constants & Configuration Integrity', () => {
  it('should define popular career tracks with suggested skills', () => {
    expect(CAREER_ROLES.length).toBeGreaterThanOrEqual(8);
    const frontend = CAREER_ROLES.find(r => r.id === 'frontend');
    expect(frontend).toBeDefined();
    expect(frontend.title).toBe('Frontend Developer');
    expect(frontend.suggestedSkills).toContain('React.js');
    expect(frontend.suggestedSkills).toContain('JavaScript (ES6+)');

    const dataAnalyst = CAREER_ROLES.find(r => r.id === 'data-analyst');
    expect(dataAnalyst).toBeDefined();
    expect(dataAnalyst.suggestedSkills).toContain('SQL Queries & CTEs');
  });

  it('should define standard proficiency levels', () => {
    const levels = PROFICIENCY_LEVELS.map(p => p.level);
    expect(levels).toContain('Beginner');
    expect(levels).toContain('Basic');
    expect(levels).toContain('Intermediate');
    expect(levels).toContain('Advanced');
  });

  it('should provide valid study duration options', () => {
    expect(DURATION_OPTIONS.length).toBeGreaterThanOrEqual(4);
    const values = DURATION_OPTIONS.map(d => d.value);
    expect(values).toEqual([4, 8, 12, 16]);
  });

  it('should include practical projects in learning styles', () => {
    const practical = LEARNING_STYLES.find(s => s.id === 'Practical projects');
    expect(practical).toBeDefined();
    expect(practical.title).toBe('Practical Projects');
  });
});
