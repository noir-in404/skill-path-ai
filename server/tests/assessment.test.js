import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../app.js';

describe('POST /api/assessment/analyze - Career Assessment Analysis', () => {
  it('should return 400 Bad Request if careerGoal is missing', async () => {
    const res = await request(app)
      .post('/api/assessment/analyze')
      .send({ currentSkills: [] });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.equal(res.body.error, 'VALIDATION_ERROR');
    assert.match(res.body.message, /target career role is required/i);
  });

  it('should return 400 Bad Request if careerGoal is empty whitespace', async () => {
    const res = await request(app)
      .post('/api/assessment/analyze')
      .send({ careerGoal: '   ' });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.equal(res.body.error, 'VALIDATION_ERROR');
  });

  it('should return structured skill-gap analysis in demo mode', async () => {
    const payload = {
      name: 'Alex Rivera',
      educationLevel: 'Undergraduate Student',
      careerGoal: 'Frontend Developer',
      currentSkills: [
        { skill: 'HTML & CSS', level: 'Intermediate' },
        { skill: 'JavaScript', level: 'Basic' }
      ],
      dailyStudyHours: 2,
      learningDurationWeeks: 8,
      learningStyle: 'Practical projects',
      useDemo: true
    };

    const res = await request(app)
      .post('/api/assessment/analyze')
      .send(payload);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.source, 'demo');

    const data = res.body.data;
    assert.equal(data.careerGoal, 'Frontend Developer');
    assert.ok(typeof data.summary === 'string' && data.summary.length > 10);
    assert.ok(typeof data.readinessScore === 'number' && data.readinessScore >= 0 && data.readinessScore <= 100);

    // Validate skillAnalysis array
    assert.ok(Array.isArray(data.skillAnalysis));
    assert.ok(data.skillAnalysis.length >= 3, 'Should identify at least 3 competencies');
    data.skillAnalysis.forEach(item => {
      assert.ok(item.skill, 'Each competency must have a skill name');
      assert.ok(item.currentLevel, 'Each competency must have currentLevel');
      assert.ok(item.requiredLevel, 'Each competency must have requiredLevel');
      assert.ok(['Strong', 'Needs Improvement', 'Missing'].includes(item.status));
      assert.ok(['High', 'Medium', 'Low'].includes(item.importance));
      assert.ok(typeof item.reason === 'string' && item.reason.length > 5);
    });

    // Validate priorityGaps array
    assert.ok(Array.isArray(data.priorityGaps));
    assert.ok(data.priorityGaps.length >= 1, 'Should identify at least 1 priority gap');

    // Validate roadmap
    assert.ok(Array.isArray(data.roadmap));
    assert.ok(data.roadmap.length >= 2, 'Should contain multiple phases');

    // Validate projects
    assert.ok(Array.isArray(data.projects));
    assert.ok(data.projects.length >= 1, 'Should recommend at least 1 practical project');
  });

  it('should support alternative careers like Data Analyst in demo mode', async () => {
    const payload = {
      careerGoal: 'Data Analyst',
      currentSkills: [{ skill: 'Excel', level: 'Intermediate' }],
      useDemo: true
    };

    const res = await request(app)
      .post('/api/assessment/analyze')
      .send(payload);

    assert.equal(res.status, 200);
    assert.equal(res.body.data.careerGoal, 'Data Analyst');
    assert.ok(res.body.data.skillAnalysis.some(s => s.skill.includes('SQL')));
  });
});
