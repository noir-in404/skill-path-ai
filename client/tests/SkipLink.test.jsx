import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SkipLink } from '../src/components/SkipLink.jsx';

describe('SkipLink Accessible Component (WCAG 2.1 AA)', () => {
  it('should render skip link targeting main-content by default', () => {
    render(<SkipLink />);
    const link = screen.getByText('Skip to main content');
    expect(link).toBeDefined();
    expect(link.getAttribute('href')).toBe('#main-content');
  });

  it('should support custom targetId', () => {
    render(<SkipLink targetId="custom-target" />);
    const link = screen.getByText('Skip to main content');
    expect(link.getAttribute('href')).toBe('#custom-target');
  });
});
