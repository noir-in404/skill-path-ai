import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RoadmapPage } from '../src/pages/RoadmapPage.jsx';
import * as AssessmentContextModule from '../src/context/AssessmentContext.jsx';

vi.mock('../src/context/AssessmentContext.jsx', () => ({
  useAssessment: vi.fn()
}));

const mockAnalysis = {
  isDemo: true,
  careerGoal: 'Frontend Developer',
  roadmap: [
    {
      phase: 1,
      title: 'Phase 1: JavaScript Mastery & Async Foundations',
      duration: 'Weeks 1-2',
      focus: 'Solidifying core language mechanics and async data handling.',
      objectives: ['Master event loop', 'Handle async operations'],
      tasks: [
        {
          id: 't-1',
          title: 'Async Data Fetcher with AbortController',
          skill: 'JavaScript',
          description: 'Build a reusable async utility function with timeouts.',
          estimatedHours: 6,
          recommendedActivities: 'Practice exponential backoff in vanilla JS.',
          practicalTask: 'Build a small CLI or browser script with error recovery.',
          completionCriteria: 'Handles 404, 500, network loss gracefully.',
          stepByStepGuide: ['Step 1: Set up module', 'Step 2: Init controller', 'Step 3: Handle error'],
          whatToDo: ['Clean up timeouts'],
          whatNotToDo: ['Do not use empty catch blocks']
        }
      ]
    }
  ]
};

describe('RoadmapPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render empty state when no roadmap is available', () => {
    AssessmentContextModule.useAssessment.mockReturnValue({
      analysis: null,
      assessment: null,
      stats: { totalTasks: 0, completedTasksCount: 0, taskPercentage: 0 },
      completedTasks: [],
      toggleTask: vi.fn(),
      setActiveTab: vi.fn()
    });

    render(<RoadmapPage />);
    expect(screen.getByText('No Learning Roadmap Found')).toBeDefined();
    expect(screen.getByText('Take Assessment')).toBeDefined();
  });

  it('should render curriculum phases and task cards', () => {
    AssessmentContextModule.useAssessment.mockReturnValue({
      analysis: mockAnalysis,
      assessment: { dailyStudyHours: 2, learningDurationWeeks: 8 },
      stats: { totalTasks: 1, completedTasksCount: 0, taskPercentage: 0 },
      completedTasks: [],
      toggleTask: vi.fn(),
      setActiveTab: vi.fn()
    });

    render(<RoadmapPage />);
    expect(screen.getByText('Personalized Learning Roadmap')).toBeDefined();
    expect(screen.getByText('Phase 1: JavaScript Mastery & Async Foundations')).toBeDefined();
    expect(screen.getByText('Async Data Fetcher with AbortController')).toBeDefined();
  });

  it('should toggle task completion when checkbox is clicked', () => {
    const handleToggle = vi.fn();
    AssessmentContextModule.useAssessment.mockReturnValue({
      analysis: mockAnalysis,
      assessment: { dailyStudyHours: 2, learningDurationWeeks: 8 },
      stats: { totalTasks: 1, completedTasksCount: 0, taskPercentage: 0 },
      completedTasks: [],
      toggleTask: handleToggle,
      setActiveTab: vi.fn()
    });

    render(<RoadmapPage />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(handleToggle).toHaveBeenCalledWith('t-1');
  });

  it('should open Study Guide Modal when Recommended Study card is clicked', () => {
    AssessmentContextModule.useAssessment.mockReturnValue({
      analysis: mockAnalysis,
      assessment: { dailyStudyHours: 2, learningDurationWeeks: 8 },
      stats: { totalTasks: 1, completedTasksCount: 0, taskPercentage: 0 },
      completedTasks: [],
      toggleTask: vi.fn(),
      setActiveTab: vi.fn()
    });

    render(<RoadmapPage />);
    const studyCard = screen.getByText('Recommended Study');
    fireEvent.click(studyCard);

    expect(screen.getByText('Recommended Study Roadmap')).toBeDefined();
    expect(screen.getByText('Step 1: Core Conceptual Foundations')).toBeDefined();
  });

  it('should open Exercise Guide Modal when Practical Exercise card is clicked', () => {
    AssessmentContextModule.useAssessment.mockReturnValue({
      analysis: mockAnalysis,
      assessment: { dailyStudyHours: 2, learningDurationWeeks: 8 },
      stats: { totalTasks: 1, completedTasksCount: 0, taskPercentage: 0 },
      completedTasks: [],
      toggleTask: vi.fn(),
      setActiveTab: vi.fn()
    });

    render(<RoadmapPage />);
    const exerciseCard = screen.getByText('Practical Exercise');
    fireEvent.click(exerciseCard);

    expect(screen.getByText('Practical Exercise Guide')).toBeDefined();
    expect(screen.getByText('Step 1: Set up module')).toBeDefined();
  });
});
