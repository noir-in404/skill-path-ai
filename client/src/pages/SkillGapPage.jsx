import React, { useState } from 'react';
import {
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  ArrowRight,
  Target,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { DisclaimerBanner } from '../components/DisclaimerBanner';

export const SkillGapPage = () => {
  const { analysis, assessment, stats, setActiveTab } = useAssessment();
  const [expandedSkillIdx, setExpandedSkillIdx] = useState(null);

  if (!analysis) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-surface-secondary text-charcoal-muted flex items-center justify-center mx-auto">
          <BarChart3 className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-charcoal-heading">No Skill Analysis Found</h2>
        <p className="text-xs text-charcoal-muted">
          Complete a quick career assessment to let Google Gemini benchmark your skills against industry standards.
        </p>
        <button
          onClick={() => setActiveTab('assessment')}
          className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-semibold hover:bg-brand-700 transition-colors"
        >
          Take Assessment
        </button>
      </div>
    );
  }

  const skills = Array.isArray(analysis.skillAnalysis) ? analysis.skillAnalysis : [];

  // Target necessity level: Basic, Intermediate, Advanced
  const getTargetMeta = (requiredLevel) => {
    const req = (requiredLevel || '').toLowerCase();
    
    if (req.includes('advanced') || req.includes('expert') || req.includes('strong')) {
      return {
        label: 'Advanced',
        textColor: 'text-brand-600', // Terracotta / rust
      };
    }
    if (req.includes('basic') || req.includes('foundational') || req.includes('beginner')) {
      return {
        label: 'Basic',
        textColor: 'text-amber-700', // Warm amber / ochre
      };
    }
    return {
      label: 'Intermediate',
      textColor: 'text-olive-700', // Olive green
    };
  };

  // Current baseline level: Not started, Basic, Intermediate, Advanced
  const formatCurrentLevel = (level) => {
    if (!level || level.toLowerCase() === 'none' || level.toLowerCase() === 'not started') {
      return 'Not started';
    }
    const l = level.toLowerCase();
    if (l.includes('beginner') || l.includes('basic')) {
      return 'Basic';
    }
    if (l.includes('intermediate') || l.includes('working')) {
      return 'Intermediate';
    }
    if (l.includes('advanced') || l.includes('expert') || l.includes('strong')) {
      return 'Advanced';
    }
    return 'Basic';
  };

  const toggleRow = (idx) => {
    setExpandedSkillIdx(expandedSkillIdx === idx ? null : idx);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold border border-brand-200">
            <Target className="w-3.5 h-3.5 text-brand-600" />
            <span>Target Role: {analysis.careerGoal}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-charcoal-heading tracking-tight mt-1.5">
            Skill Gap Benchmark
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
            Compare your self-reported baseline with industry target competencies.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('roadmap')}
          className="self-start sm:self-center px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-subtle flex items-center gap-1.5 transition-colors"
        >
          <span>View Learning Roadmap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Clean Table Card (Matching User's Reference Design) */}
      <div
        role="table"
        aria-label="Skill Gap Benchmark Table"
        className="bg-white rounded-3xl border border-charcoal-border shadow-card overflow-hidden"
      >
        {/* Table Column Headers */}
        <div
          role="row"
          className="grid grid-cols-12 px-6 sm:px-8 py-4 border-b border-charcoal-border/70 text-[11px] font-bold uppercase tracking-wider text-charcoal-muted"
        >
          <div role="columnheader" className="col-span-6 sm:col-span-5">Skill</div>
          <div role="columnheader" className="col-span-3 sm:col-span-4">Current</div>
          <div role="columnheader" className="col-span-3 sm:col-span-3 text-right sm:text-left">Target</div>
        </div>

        {/* Table Rows */}
        <div role="rowgroup" className="divide-y divide-charcoal-border/60">
          {skills.map((item, idx) => {
            const currentLabel = formatCurrentLevel(item.currentLevel);
            const targetMeta = getTargetMeta(item.requiredLevel, item.status);
            const isExpanded = expandedSkillIdx === idx;

            return (
              <div
                key={idx}
                role="row"
                tabIndex="0"
                aria-expanded={isExpanded}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleRow(idx);
                  }
                }}
                aria-label={`${item.skill}: Current level ${currentLabel}, Target level ${targetMeta.label}. Click or press Enter to ${isExpanded ? 'collapse' : 'expand'} rationale.`}
                className="transition-colors hover:bg-surface-secondary/40 cursor-pointer focus:outline-none focus:bg-surface-secondary/60"
                onClick={() => toggleRow(idx)}
              >
                {/* Main Row */}
                <div className="grid grid-cols-12 px-6 sm:px-8 py-4 sm:py-5 items-center">
                  
                  {/* Skill Name Column */}
                  <div role="cell" className="col-span-6 sm:col-span-5 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm sm:text-base text-charcoal-heading tracking-tight">
                        {item.skill}
                      </span>
                    </div>
                  </div>

                  {/* Current Level Column */}
                  <div role="cell" className="col-span-3 sm:col-span-4">
                    <span className="text-xs sm:text-sm font-medium text-charcoal-muted">
                      {currentLabel}
                    </span>
                  </div>

                  {/* Target Expectation Column */}
                  <div role="cell" className="col-span-3 sm:col-span-3 flex items-center justify-between">
                    <span className={`text-xs sm:text-sm font-bold tracking-tight ${targetMeta.textColor}`}>
                      {targetMeta.label}
                    </span>
                    <button
                      type="button"
                      aria-label={isExpanded ? `Collapse details for ${item.skill}` : `Expand details for ${item.skill}`}
                      className="p-1 rounded text-charcoal-muted/60 hover:text-charcoal hidden sm:block focus:outline-none"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expandable Clean Details Drawer */}
                {isExpanded && (
                  <div className="px-6 sm:px-8 pb-4 pt-1 bg-surface-secondary/60 text-xs text-charcoal-muted space-y-2 border-t border-charcoal-border/40 animate-fade-in">
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="font-semibold text-charcoal-heading">Category:</span>
                      <span className="px-2 py-0.5 rounded-md bg-white border border-charcoal-border/70 text-charcoal font-medium">
                        {item.category || 'Core Technical'}
                      </span>
                      <span className="font-semibold text-charcoal-heading ml-2">Status:</span>
                      <span className={`px-2 py-0.5 rounded-md font-semibold ${
                        item.status === 'Strong'
                          ? 'bg-olive-50 text-olive-800 border border-olive-200'
                          : item.status === 'Needs Improvement'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}>
                        {item.status}
                      </span>
                      <span className="font-semibold text-charcoal-heading ml-2">Priority:</span>
                      <span className="text-charcoal font-medium">
                        {item.importance || 'Medium'} Priority
                      </span>
                    </div>

                    <p className="text-charcoal leading-relaxed pt-1">
                      <strong className="text-charcoal-heading">Why it matters:</strong> {item.reason}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Advisory Disclaimer */}
      <DisclaimerBanner />

    </div>
  );
};
