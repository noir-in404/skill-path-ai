import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../app.js';

describe('Validation Middleware Unit Tests', () => {
  it('should reject invalid dailyStudyHours (negative or over 16)', async () => {
    const resNegative = await request(app)
      .post('/api/assessment/analyze')
      .send({ careerGoal: 'Frontend Developer', dailyStudyHours: -2 });

    assert.equal(resNegative.status, 400);
    assert.match(resNegative.body.message, /daily study hours must be a realistic number/i);

    const resExcess = await request(app)
      .post('/api/assessment/analyze')
      .send({ careerGoal: 'Frontend Developer', dailyStudyHours: 25 });

    assert.equal(resExcess.status, 400);
    assert.match(resExcess.body.message, /daily study hours must be a realistic number/i);
  });

  it('should reject invalid learningDurationWeeks (zero, negative, or over 52)', async () => {
    const resZero = await request(app)
      .post('/api/assessment/analyze')
      .send({ careerGoal: 'Frontend Developer', learningDurationWeeks: 0 });

    assert.equal(resZero.status, 400);
    assert.match(resZero.body.message, /learning duration must be a realistic number of weeks/i);
  });

  it('should accept valid dailyStudyHours and learningDurationWeeks', async () => {
    const res = await request(app)
      .post('/api/assessment/analyze')
      .send({
        careerGoal: 'Frontend Developer',
        dailyStudyHours: 3,
        learningDurationWeeks: 12,
        useDemo: true
      });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
  });
});
