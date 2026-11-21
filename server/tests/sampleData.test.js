import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getSampleAnalysis } from '../services/sampleDataService.js';

describe('SampleDataService - Curated Demo Mode Fallbacks', () => {
  it('should generate valid sample analysis for Frontend Developer', () => {
    const analysis = getSampleAnalysis({
      careerGoal: 'Frontend Developer',
      dailyStudyHours: 2,
      learningDurationWeeks: 8
    });

    assert.equal(analysis.isDemo, true);
    assert.equal(analysis.careerGoal, 'Frontend Developer');
    assert.ok(analysis.readinessScore > 0);
    assert.ok(analysis.skillAnalysis.length >= 5);
    assert.ok(analysis.roadmap.length >= 3);
    assert.ok(analysis.projects.length >= 2);
  });

  it('should generate valid sample analysis for Data Analyst', () => {
    const analysis = getSampleAnalysis({
      careerGoal: 'Data Analyst',
      dailyStudyHours: 3,
      learningDurationWeeks: 12
    });

    assert.equal(analysis.isDemo, true);
    assert.equal(analysis.careerGoal, 'Data Analyst');
    assert.ok(analysis.skillAnalysis.some(s => s.skill.includes('SQL')));
    assert.ok(analysis.skillAnalysis.some(s => s.skill.includes('Pandas')));
  });

  it('should guarantee all tasks have stepByStepGuide, whatToDo, and whatNotToDo', () => {
    const analysis = getSampleAnalysis({ careerGoal: 'Frontend Developer' });

    analysis.roadmap.forEach(phase => {
      phase.tasks.forEach(task => {
        assert.ok(Array.isArray(task.stepByStepGuide), `Task ${task.id} missing stepByStepGuide`);
        assert.ok(task.stepByStepGuide.length >= 3, `Task ${task.id} stepByStepGuide too short`);
        assert.ok(Array.isArray(task.whatToDo), `Task ${task.id} missing whatToDo`);
        assert.ok(Array.isArray(task.whatNotToDo), `Task ${task.id} missing whatNotToDo`);
      });
    });
  });

  it('should guarantee all projects have deliverables and stepByStepGuide', () => {
    const analysis = getSampleAnalysis({ careerGoal: 'Frontend Developer' });

    analysis.projects.forEach(project => {
      assert.ok(Array.isArray(project.deliverables), `Project ${project.id} missing deliverables`);
      assert.ok(project.deliverables.length >= 2, `Project ${project.id} deliverables too short`);
      assert.ok(Array.isArray(project.stepByStepGuide), `Project ${project.id} missing stepByStepGuide`);
      assert.ok(project.stepByStepGuide.length >= 4, `Project ${project.id} stepByStepGuide too short`);
    });
  });
});
