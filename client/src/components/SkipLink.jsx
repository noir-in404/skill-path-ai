import React from 'react';

/**
 * Accessible Skip Link Component (WCAG 2.1 AA 2.4.1 Bypass Blocks)
 * Allows screen reader and keyboard-only users to bypass sidebar/header navigation
 * and skip directly to the primary page content.
 */
export const SkipLink = ({ targetId = 'main-content' }) => {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-charcoal focus:text-white focus:rounded-xl focus:shadow-elevated focus:font-semibold focus:text-xs focus:ring-2 focus:ring-brand-500 transition-all"
    >
      Skip to main content
    </a>
  );
};
