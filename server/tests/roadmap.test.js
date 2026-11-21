import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../app.js';

describe('POST /api/roadmap/generate - Roadmap & Project Generation', () => {
  it('should return 400 Bad Request if careerGoal is missing', async () => {
    const res = await request(app)
      .post('/api/roadmap/generate')
      .send({});

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.equal(res.body.error, 'VALIDATION_ERROR');
  });

  it('should generate roadmap with ordered phases, tasks, and project recommendations', async () => {
    const payload = {
      careerGoal: 'Frontend Developer',
      dailyStudyHours: 2,
      learningDurationWeeks: 8,
      learningStyle: 'Practical projects',
      useDemo: true
    };

    const res = await request(app)
      .post('/api/roadmap/generate')
      .send(payload);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.roadmap);
    assert.ok(res.body.data.projects);

    const roadmap = res.body.data.roadmap;
    assert.ok(Array.isArray(roadmap));
    assert.ok(roadmap.length > 0);

    // Validate phase structure
    roadmap.forEach((phase, index) => {
      assert.equal(phase.phase, index + 1);
      assert.ok(typeof phase.title === 'string');
      assert.ok(typeof phase.duration === 'string');
      assert.ok(Array.isArray(phase.objectives));
      assert.ok(Array.isArray(phase.tasks));

      // Validate task structure
      phase.tasks.forEach(task => {
        assert.ok(task.id, 'Task must have a unique id');
        assert.ok(task.title, 'Task must have a title');
        assert.ok(task.skill, 'Task must reference a target skill');
        assert.ok(typeof task.estimatedHours === 'number' && task.estimatedHours > 0);
        assert.ok(task.practicalTask, 'Task must include a practical exercise');
        assert.ok(task.completionCriteria, 'Task must include completion criteria');
        assert.ok(Array.isArray(task.stepByStepGuide), 'Task must include step-by-step instructions');
        assert.ok(Array.isArray(task.whatToDo), 'Task must include DOs');
        assert.ok(Array.isArray(task.whatNotToDo), 'Task must include DON\'Ts');
      });
    });

    // Validate projects structure
    const projects = res.body.data.projects;
    assert.ok(Array.isArray(projects));
    assert.ok(projects.length >= 2, 'Should provide at least 2 practical projects');
    projects.forEach(proj => {
      assert.ok(proj.id);
      assert.ok(proj.title);
      assert.ok(proj.description);
      assert.ok(Array.isArray(proj.skills) && proj.skills.length > 0);
      assert.ok(['Beginner', 'Intermediate', 'Advanced'].includes(proj.difficulty));
      assert.ok(typeof proj.estimatedHours === 'number' && proj.estimatedHours > 0);
      assert.ok(Array.isArray(proj.deliverables) && proj.deliverables.length > 0);
      assert.ok(proj.careerRelevance);
      assert.ok(Array.isArray(proj.stepByStepGuide));
      assert.ok(Array.isArray(proj.whatToDo));
      assert.ok(Array.isArray(proj.whatNotToDo));
    });
  });
});
