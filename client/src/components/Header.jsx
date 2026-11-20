import React from 'react';
import { Menu, Sparkles, Key, UserCheck, ShieldAlert, Cpu } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';

export const Header = ({ onOpenMobileNav, onOpenApiModal }) => {
  const { activeTab, setActiveTab, assessment, analysis, serverHealth } = useAssessment();

  const getPageInfo = () => {
    switch (activeTab) {
      case 'dashboard':
        return {
          title: 'Career Readiness Dashboard',
          subtitle: 'From Career Ambition to Practical Skill Development'
        };
      case 'assessment':
        return {
          title: 'Career Assessment',
          subtitle: 'Define your target role, self-reported skills, and study constraints'
        };
      case 'analysis':
        return {
          title: 'AI Skill Gap Analysis',
          subtitle: 'Gemini comparison between your current skills and industry requirements'
        };
      case 'roadmap':
        return {
          title: 'Personalized Learning Roadmap',
          subtitle: 'Phase-by-phase actionable milestones and study tasks'
        };
      case 'progress':
        return {
          title: 'Progress & Project Tracker',
          subtitle: 'Track your completed milestones and practical portfolio projects'
        };
      default:
        return {
          title: 'SkillPath AI',
          subtitle: 'Career Readiness Platform'
        };
    }
  };

  const { title, subtitle } = getPageInfo();

  return (
    <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur-md border-b border-charcoal-border/70 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileNav}
          className="p-2 -ml-2 rounded-lg text-charcoal-muted hover:text-charcoal-heading hover:bg-black/5 lg:hidden"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-charcoal-heading tracking-tight leading-snug">
            {title}
          </h1>
          <p className="hidden sm:block text-xs text-charcoal-muted">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right: Engine Status Pill & Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Gemini Engine Indicator */}
        <button
          onClick={onOpenApiModal}
          className={`flex items-center gap-1.5 px-2.5 py-1 sm:py-1.5 rounded-full text-xs font-medium border transition-colors ${
            analysis?.isDemo
              ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
              : serverHealth.hasGeminiKey
              ? 'bg-olive-50 text-olive-800 border-olive-200 hover:bg-olive-100'
              : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200'
          }`}
          title="Click to view Gemini API status and configuration"
        >
          {analysis?.isDemo ? (
            <>
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Demo Mode</span>
              <span className="text-[10px] bg-amber-200/70 px-1 rounded text-amber-900 font-semibold">Sample</span>
            </>
          ) : serverHealth.hasGeminiKey ? (
            <>
              <Sparkles className="w-3.5 h-3.5 text-olive-600" />
              <span className="hidden sm:inline">Gemini AI</span>
              <span className="text-[10px] bg-olive-200/60 px-1.5 py-0.2 rounded text-olive-900 font-semibold">Live</span>
            </>
          ) : (
            <>
              <Cpu className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden sm:inline">API Setup</span>
              <span className="text-[10px] bg-stone-200 px-1 rounded text-stone-700 font-semibold">Ready</span>
            </>
          )}
        </button>

        {/* Action: New / Edit Assessment */}
        {assessment && (
          <button
            onClick={() => setActiveTab('assessment')}
            className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-lg border border-charcoal-border/80 bg-white text-charcoal text-xs font-medium hover:bg-surface-secondary transition-colors shadow-subtle"
          >
            <span>Edit Assessment</span>
          </button>
        )}

        {/* User Pill */}
        <div className="flex items-center gap-2 pl-1 border-l border-charcoal-border/60">
          <div className="w-7 h-7 rounded-full bg-brand-100 border border-brand-200 flex items-center justify-center text-brand-800 font-semibold text-xs">
            {assessment?.name ? assessment.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <span className="hidden md:inline text-xs font-medium text-charcoal-heading">
            {assessment?.name || 'Learner'}
          </span>
        </div>
      </div>
    </header>
  );
};
