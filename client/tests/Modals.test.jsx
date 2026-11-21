import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StudyGuideModal } from '../src/components/StudyGuideModal.jsx';
import { ExerciseGuideModal } from '../src/components/ExerciseGuideModal.jsx';

const mockTask = {
  id: 't-1',
  title: 'Async Data Fetcher with AbortController',
  skill: 'JavaScript',
  description: 'Build a reusable async utility function that handles network timeouts.',
  estimatedHours: 6,
  practicalTask: 'Build a small CLI or browser script that fetches weather or user data.',
  completionCriteria: 'Handles 404, 500, network loss, and manual aborts gracefully.',
  stepByStepGuide: [
    'Step 1: Set up a blank JavaScript module.',
    'Step 2: Initialize AbortController.',
    'Step 3: Handle timeout and cancellation.'
  ],
  whatToDo: [
    'Always clean up setTimeout.',
    'Return standardized payload shapes.'
  ],
  whatNotToDo: [
    'DO NOT use empty catch blocks.',
    'DO NOT swallow network errors.'
  ]
};

describe('StudyGuideModal Component', () => {
  it('should render nothing when isOpen is false', () => {
    const { container } = render(
      <StudyGuideModal isOpen={false} onClose={vi.fn()} task={mockTask} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render modal with study materials and sequence when isOpen is true', () => {
    render(
      <StudyGuideModal isOpen={true} onClose={vi.fn()} task={mockTask} />
    );

    expect(screen.getByText('Recommended Study Roadmap')).toBeDefined();
    expect(screen.getByText(mockTask.title)).toBeDefined();
    expect(screen.getByText(/Recommended Sequence to Follow/i)).toBeDefined();
    expect(screen.getByText('Step 1: Core Conceptual Foundations')).toBeDefined();
  });

  it('should call onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <StudyGuideModal isOpen={true} onClose={handleClose} task={mockTask} />
    );

    const closeButtons = screen.getAllByRole('button');
    fireEvent.click(closeButtons[0]);
    expect(handleClose).toHaveBeenCalled();
  });
});

describe('ExerciseGuideModal Component', () => {
  it('should render nothing when isOpen is false', () => {
    const { container } = render(
      <ExerciseGuideModal isOpen={false} onClose={vi.fn()} item={mockTask} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render step-by-step instructions, DOs, and DON\'Ts', () => {
    render(
      <ExerciseGuideModal isOpen={true} onClose={vi.fn()} item={mockTask} type="task" />
    );

    expect(screen.getByText('Practical Exercise Guide')).toBeDefined();
    expect(screen.getByText(mockTask.title)).toBeDefined();
    expect(screen.getByText('Step 1: Set up a blank JavaScript module.')).toBeDefined();
    expect(screen.getByText('Always clean up setTimeout.')).toBeDefined();
    expect(screen.getByText('DO NOT use empty catch blocks.')).toBeDefined();
  });

  it('should toggle completion status when mark complete button is clicked', () => {
    const handleToggle = vi.fn();
    render(
      <ExerciseGuideModal
        isOpen={true}
        onClose={vi.fn()}
        item={mockTask}
        type="task"
        onToggleComplete={handleToggle}
        isCompleted={false}
      />
    );

    const markCompleteBtn = screen.getByText('Mark as Done');
    fireEvent.click(markCompleteBtn);
    expect(handleToggle).toHaveBeenCalledWith('t-1');
  });
});
