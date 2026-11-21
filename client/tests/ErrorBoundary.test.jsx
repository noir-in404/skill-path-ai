import React from 'react';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../src/components/ErrorBoundary.jsx';

const ProblemChild = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Simulated test error in child component');
  }
  return <div>Healthy Child Content</div>;
};

describe('ErrorBoundary Component', () => {
  // Suppress expected console.error during error boundary tests
  const originalError = console.error;
  beforeAll(() => {
    console.error = vi.fn();
  });
  afterAll(() => {
    console.error = originalError;
  });

  it('should render children normally when there is no error', () => {
    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Healthy Child Content')).toBeDefined();
  });

  it('should catch rendering errors and display fallback recovery UI', () => {
    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went unexpected')).toBeDefined();
    expect(screen.getByText('Reload Application')).toBeDefined();
  });
});
