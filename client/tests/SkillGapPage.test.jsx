import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SkillGapPage } from '../src/pages/SkillGapPage.jsx';
import * as AssessmentContextModule from '../src/context/AssessmentContext.jsx';

vi.mock('../src/context/AssessmentContext.jsx', () => ({
  useAssessment: vi.fn()
}));

const mockAnalysis = {
  isDemo: true,
  careerGoal: 'Frontend Developer',
  readinessScore: 65,
  summary: 'Solid foundational skills with gaps in asynchronous state.',
  skillAnalysis: [
    {
      skill: 'HTML / CSS',
      currentLevel: 'Intermediate',
      requiredLevel: 'Intermediate',
      status: 'Strong',
      importance: 'High',
      reason: 'Critical for responsive layout and semantics.'
    },
    {
      skill: 'JavaScript',
      currentLevel: 'Basic',
      requiredLevel: 'Advanced',
      status: 'Needs Improvement',
      importance: 'High',
      reason: 'Essential for async operations and closures.'
    },
    {
      skill: 'React',
      currentLevel: 'None',
      requiredLevel: 'Intermediate',
      status: 'Missing',
      importance: 'High',
      reason: 'Core UI component framework.'
    }
  ]
};

describe('SkillGapPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render empty state when no analysis is available', () => {
    AssessmentContextModule.useAssessment.mockReturnValue({
      analysis: null,
      assessment: null,
      stats: { hasData: false },
      setActiveTab: vi.fn()
    });

    render(<SkillGapPage />);
    expect(screen.getByText('No Skill Analysis Found')).toBeDefined();
    expect(screen.getByText('Take Assessment')).toBeDefined();
  });

  it('should render table layout with SKILL, CURRENT, and TARGET headers', () => {
    AssessmentContextModule.useAssessment.mockReturnValue({
      analysis: mockAnalysis,
      assessment: { careerGoal: 'Frontend Developer' },
      stats: { hasData: true },
      setActiveTab: vi.fn()
    });

    render(<SkillGapPage />);

    expect(screen.getByText('Skill Gap Benchmark')).toBeDefined();
    expect(screen.getByText(/Target Role: Frontend Developer/i)).toBeDefined();
    expect(screen.getByText('Skill')).toBeDefined();
    expect(screen.getByText('Current')).toBeDefined();
    expect(screen.getByText('Target')).toBeDefined();
  });

  it('should render formatted current and target proficiency tiers', () => {
    AssessmentContextModule.useAssessment.mockReturnValue({
      analysis: mockAnalysis,
      assessment: { careerGoal: 'Frontend Developer' },
      stats: { hasData: true },
      setActiveTab: vi.fn()
    });

    render(<SkillGapPage />);

    // Skills
    expect(screen.getByText('HTML / CSS')).toBeDefined();
    expect(screen.getByText('JavaScript')).toBeDefined();
    expect(screen.getByText('React')).toBeDefined();

    // Check tiers
    expect(screen.getByText('Not started')).toBeDefined(); // React is None -> Not started
    expect(screen.getAllByText('Intermediate').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Advanced')).toBeDefined();
  });

  it('should expand row to reveal diagnostic rationale when clicked', () => {
    AssessmentContextModule.useAssessment.mockReturnValue({
      analysis: mockAnalysis,
      assessment: { careerGoal: 'Frontend Developer' },
      stats: { hasData: true },
      setActiveTab: vi.fn()
    });

    render(<SkillGapPage />);

    const jsRow = screen.getByText('JavaScript');
    fireEvent.click(jsRow);

    expect(screen.getByText(/Essential for async operations and closures/i)).toBeDefined();
  });
});
