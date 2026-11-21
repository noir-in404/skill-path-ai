import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../app.js';

describe('GET /api/health - Health & Configuration Endpoint', () => {
  it('should return 200 OK with server health metadata', async () => {
    const res = await request(app).get('/api/health');

    assert.equal(res.status, 200);
    assert.equal(res.body.status, 'ok');
    assert.equal(res.body.product, 'SkillPath AI');
    assert.equal(res.body.tagline, 'From Career Ambition to Practical Skill Development');
    assert.equal(typeof res.body.hasGeminiKey, 'boolean');
    assert.equal(typeof res.body.model, 'string');
    assert.ok(res.body.timestamp);
  });

  it('should include correct API headers and content-type', async () => {
    const res = await request(app).get('/api/health');
    assert.match(res.headers['content-type'], /json/);
  });
});
