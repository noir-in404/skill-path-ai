import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DashboardPage } from '../src/pages/DashboardPage.jsx';
import * as AssessmentContextModule from '../src/context/AssessmentContext.jsx';

vi.mock('../src/context/AssessmentContext.jsx', () => ({
  useAssessment: vi.fn()
}));

vi.mock('recharts', async () => {
  const actual = await vi.importActual('recharts');
  return {
    ...actual,
    ResponsiveContainer: ({ children }) => <div data-testid="recharts-wrapper">{children}</div>
  };
});

const mockStats = {
  hasData: true,
  readinessScore: 65,
  overallProgress: 25,
  completedTasksCount: 2,
  totalTasks: 8,
  taskPercentage: 25,
  completedHours: 12,
  totalHours: 48,
  totalProjects: 2,
  completedProjectsCount: 0,
  strongSkillsCount: 3,
  needsImprovementCount: 2,
  missingSkillsCount: 1,
  highImportanceCount: 3,
  allTasks: [
    {
      id: 't-1',
      title: 'Async Data Fetcher',
      skill: 'JavaScript',
      estimatedHours: 6,
      phaseTitle: 'Phase 1: Foundations',
      isCompleted: false
    }
  ]
};

const mockAnalysis = {
  isDemo: true,
  careerGoal: 'Frontend Developer',
  readinessScore: 65,
  summary: 'Solid foundational baseline. Focus on asynchronous state management.',
  skillAnalysis: [
    { skill: 'JavaScript', currentLevel: 'Basic', requiredLevel: 'Advanced', status: 'Needs Improvement' }
  ],
  priorityGaps: [],
  roadmap: [],
  projects: []
};

describe('DashboardPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render empty state welcome hero when no analysis is present', () => {
    AssessmentContextModule.useAssessment.mockReturnValue({
      analysis: null,
      assessment: null,
      stats: { hasData: false },
      setActiveTab: vi.fn(),
      loadDemoSample: vi.fn(),
      loading: false,
      resetAllData: vi.fn()
    });

    render(<DashboardPage />);

    expect(screen.getByText(/From Career Ambition to Practical Skill Development/i)).toBeDefined();
    expect(screen.getByText('Start Career Assessment')).toBeDefined();
    expect(screen.getByText('Try Demo as Frontend Developer')).toBeDefined();
  });

  it('should invoke loadDemoSample when Try Demo button is clicked', () => {
    const handleLoadDemo = vi.fn();
    AssessmentContextModule.useAssessment.mockReturnValue({
      analysis: null,
      assessment: null,
      stats: { hasData: false },
      setActiveTab: vi.fn(),
      loadDemoSample: handleLoadDemo,
      loading: false,
      resetAllData: vi.fn()
    });

    render(<DashboardPage />);
    const demoBtn = screen.getByText('Try Demo as Frontend Developer');
    fireEvent.click(demoBtn);

    expect(handleLoadDemo).toHaveBeenCalledWith('Frontend Developer');
  });

  it('should render populated dashboard with readiness score and metrics', () => {
    AssessmentContextModule.useAssessment.mockReturnValue({
      analysis: mockAnalysis,
      assessment: { name: 'Alex Rivera', careerGoal: 'Frontend Developer' },
      stats: mockStats,
      setActiveTab: vi.fn(),
      loadDemoSample: vi.fn(),
      loading: false,
      resetAllData: vi.fn(),
      toggleTask: vi.fn()
    });

    render(<DashboardPage />);

    expect(screen.getByText(/Welcome back, Alex Rivera!/i)).toBeDefined();
    expect(screen.getByText(/Target Role: Frontend Developer/i)).toBeDefined();
    expect(screen.getByText('25%')).toBeDefined(); // overall progress
    expect(screen.getByText('Overall Progress')).toBeDefined();
    expect(screen.getByText('Skills Evaluated')).toBeDefined();
    expect(screen.getByText('Est. Study Hours')).toBeDefined();
  });
});
