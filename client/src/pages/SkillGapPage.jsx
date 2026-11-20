import React, { useState } from 'react';
import {
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  ArrowRight,
  Filter,
  Layers,
  ChevronDown,
  ChevronUp,
  Target,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { DisclaimerBanner } from '../components/DisclaimerBanner';

export const SkillGapPage = () => {
  const { analysis, assessment, stats, setActiveTab } = useAssessment();
  const [filterStatus, setFilterStatus] = useState('All');
  const [expandedSkill, setExpandedSkill] = useState(null);

  if (!analysis) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-surface-secondary text-charcoal-muted flex items-center justify-center mx-auto">
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
  const priorityGaps = Array.isArray(analysis.priorityGaps) ? analysis.priorityGaps : [];

  const filteredSkills = skills.filter((item) => {
    if (filterStatus === 'All') return true;
    if (filterStatus === 'Strong') return item.status === 'Strong';
    if (filterStatus === 'Needs Improvement') return item.status === 'Needs Improvement';
    if (filterStatus === 'Missing') return item.status === 'Missing';
    if (filterStatus === 'High') return item.importance === 'High';
    return true;
  });

  const levelToNum = (lvl) => {
    switch (lvl?.toLowerCase()) {
      case 'none': return 0;
      case 'beginner': return 25;
      case 'basic': return 50;
      case 'intermediate': return 75;
      case 'advanced': return 100;
      case 'expert': return 100;
      default: return 15;
    }
  };

  const statusBadge = (status) => {
    switch (status) {
      case 'Strong':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-olive-50 text-olive-800 border border-olive-200">
            <CheckCircle2 className="w-3 h-3 text-olive-600" />
            <span>Strong</span>
          </span>
        );
      case 'Needs Improvement':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            <span>Needs Improvement</span>
          </span>
        );
      case 'Missing':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-800 border border-red-200">
            <XCircle className="w-3 h-3 text-red-600" />
            <span>Missing</span>
          </span>
        );
    }
  };

  const importanceBadge = (imp) => {
    const isHigh = imp?.toLowerCase() === 'high';
    return (
      <span
        className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
          isHigh
            ? 'bg-brand-100 text-brand-800 border border-brand-200'
            : 'bg-surface-tertiary text-charcoal-muted'
        }`}
      >
        {imp || 'Medium'} Priority
      </span>
    );
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Summary Card */}
      <div className="p-6 rounded-2xl bg-white border border-charcoal-border shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slateaccent-50 text-slateaccent-800 text-xs font-semibold border border-slateaccent-200">
            <Target className="w-3.5 h-3.5 text-slateaccent-600" />
            <span>Competency Analysis: {analysis.careerGoal}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-charcoal-heading">
            AI Skill Gap Identification
          </h2>

          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            {analysis.summary}
          </p>
        </div>

        {/* Readiness Index Pill */}
        <div className="p-4 rounded-xl bg-surface-secondary border border-charcoal-border/70 text-center shrink-0 min-w-[160px]">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-muted">
            Self-Reported Alignment
          </div>
          <div className="text-3xl font-extrabold text-charcoal-heading mt-1">
            {analysis.readinessScore || 45}%
          </div>
          <div className="text-[10px] text-charcoal-muted mt-1">
            Based on {skills.length} target competencies
          </div>
        </div>
      </div>

      {/* Priority Gaps Callout Banner */}
      {priorityGaps.length > 0 && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-50/70 to-surface-secondary border border-brand-200/80 shadow-subtle space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <h3 className="font-bold text-sm text-charcoal-heading">
              Highest Priority Competencies to Tackle First
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {priorityGaps.map((gap, i) => (
              <div key={i} className="p-3 bg-white rounded-xl border border-charcoal-border/80 shadow-subtle space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-charcoal-heading truncate">{gap.skill}</span>
                  <span className="text-[10px] font-semibold text-brand-600 px-1.5 py-0.5 rounded bg-brand-50">
                    {gap.priority || 'High'}
                  </span>
                </div>
                <p className="text-[11px] text-charcoal-muted line-clamp-2">{gap.reason}</p>
                {gap.prerequisite && gap.prerequisite !== 'None' && (
                  <div className="text-[10px] text-charcoal-muted pt-1 border-t border-charcoal-border/40">
                    <span className="font-semibold text-charcoal">Prereq:</span> {gap.prerequisite}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-surface-secondary border border-charcoal-border/80 rounded-xl text-xs font-medium">
          {[
            { id: 'All', label: `All Skills (${skills.length})` },
            { id: 'Strong', label: `Strong (${stats.strongSkillsCount})` },
            { id: 'Needs Improvement', label: `Needs Improvement (${stats.needsImprovementCount})` },
            { id: 'Missing', label: `Missing (${stats.missingSkillsCount})` },
            { id: 'High', label: `High Priority (${stats.highImportanceCount})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterStatus === tab.id
                  ? 'bg-white text-charcoal-heading font-semibold shadow-subtle'
                  : 'text-charcoal-muted hover:text-charcoal'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setActiveTab('roadmap')}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-subtle flex items-center gap-1.5 transition-colors"
        >
          <span>View Personalized Roadmap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Detailed Skill Cards */}
      <div className="space-y-3">
        {filteredSkills.map((item, idx) => {
          const isExpanded = expandedSkill === idx;
          const currentVal = levelToNum(item.currentLevel);
          const requiredVal = levelToNum(item.requiredLevel);

          return (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-charcoal-border hover:border-brand-200 transition-all shadow-subtle space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm sm:text-base text-charcoal-heading">
                      {item.skill}
                    </span>
                    {item.category && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-surface-tertiary text-charcoal-muted font-medium">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-charcoal-muted line-clamp-2">
                    {item.reason}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                  {statusBadge(item.status)}
                  {importanceBadge(item.importance)}
                </div>
              </div>

              {/* Visual Level Comparison Bar */}
              <div className="pt-2 border-t border-charcoal-border/50 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="flex items-center justify-between text-charcoal-muted mb-1 text-[11px]">
                    <span>Current Self-Reported Level: <strong className="text-charcoal">{item.currentLevel || 'None'}</strong></span>
                  </div>
                  <div className="w-full bg-surface-tertiary h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        item.status === 'Strong'
                          ? 'bg-olive-500'
                          : item.status === 'Needs Improvement'
                          ? 'bg-amber-500'
                          : 'bg-red-400'
                      }`}
                      style={{ width: `${currentVal}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-charcoal-muted mb-1 text-[11px]">
                    <span>Target Industry Expectation: <strong className="text-charcoal">{item.requiredLevel || 'Intermediate'}</strong></span>
                  </div>
                  <div className="w-full bg-surface-tertiary h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-charcoal h-2 rounded-full transition-all duration-300"
                      style={{ width: `${requiredVal}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <DisclaimerBanner />
    </div>
  );
};
