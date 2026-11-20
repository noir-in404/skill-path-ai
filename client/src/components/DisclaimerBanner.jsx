import React from 'react';
import { Info } from 'lucide-react';

export const DisclaimerBanner = ({ className = '' }) => {
  return (
    <div className={`p-3.5 rounded-xl bg-surface-secondary border border-charcoal-border/70 text-xs text-charcoal-muted flex items-start gap-2.5 ${className}`}>
      <Info className="w-4 h-4 text-charcoal-muted shrink-0 mt-0.5" />
      <div className="leading-relaxed">
        <span className="font-semibold text-charcoal-heading">Advisory Disclaimer:</span>{' '}
        Skill levels displayed are based on self-reported estimates. SkillPath AI provides actionable guidance and personalized learning roadmaps based on industry standards, but does not guarantee employment, job placement, or certified competence.
      </div>
    </div>
  );
};
