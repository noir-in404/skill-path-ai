import React from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  Map,
  CheckSquare,
  Sparkles,
  RotateCcw,
  Compass,
  ArrowRight
} from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';

export const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { activeTab, setActiveTab, assessment, analysis, stats, resetAllData } = useAssessment();

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'assessment',
      label: 'Career Assessment',
      icon: ClipboardList,
      badge: assessment ? 'Active' : null
    },
    {
      id: 'analysis',
      label: 'Skill Gap Analysis',
      icon: BarChart3,
      badge: analysis ? `${stats.skillsCount} skills` : null,
      disabled: !analysis
    },
    {
      id: 'roadmap',
      label: 'Learning Roadmap',
      icon: Map,
      badge: stats.totalTasks > 0 ? `${stats.completedTasksCount}/${stats.totalTasks}` : null,
      disabled: !analysis
    },
    {
      id: 'progress',
      label: 'Progress Tracker',
      icon: CheckSquare,
      badge: stats.hasData ? `${stats.overallProgress}%` : null,
      disabled: !analysis
    }
  ];

  const handleNavClick = (id, disabled) => {
    if (disabled) {
      setActiveTab('assessment');
      if (setMobileOpen) setMobileOpen(false);
      return;
    }
    setActiveTab(id);
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-surface-secondary border-r border-charcoal-border/70 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand logo & tagline */}
        <div className="p-5 border-b border-charcoal-border/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-subtle">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-charcoal-heading flex items-center gap-1.5">
                SkillPath <span className="text-xs uppercase tracking-wider px-1.5 py-0.5 rounded bg-brand-100 text-brand-700 font-semibold">AI</span>
              </span>
              <p className="text-[11px] text-charcoal-muted leading-tight font-medium">Career Readiness Platform</p>
            </div>
          </div>
        </div>

        {/* Current Career Goal Pill (if selected) */}
        {assessment?.careerGoal && (
          <div className="mx-4 mt-4 p-3 rounded-xl bg-white border border-charcoal-border/80 shadow-subtle">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-charcoal-muted">Target Career</div>
            <div className="text-sm font-semibold text-charcoal-heading mt-0.5 truncate">{assessment.careerGoal}</div>
            {analysis && (
              <div className="mt-2 flex items-center justify-between text-xs text-charcoal-muted">
                <span>Progress</span>
                <span className="font-semibold text-brand-600">{stats.overallProgress}%</span>
              </div>
            )}
            {analysis && (
              <div className="w-full bg-surface-tertiary h-1.5 rounded-full mt-1 overflow-hidden">
                <div
                  className="bg-brand-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${stats.overallProgress}%` }}
                />
              </div>
            )}
          </div>
        )}

        {/* Navigation Links */}
        <nav aria-label="Main navigation" className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.disabled)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                  isActive
                    ? 'bg-white text-brand-700 shadow-subtle font-semibold border border-charcoal-border/50'
                    : item.disabled
                    ? 'text-charcoal-muted/60 hover:bg-black/5 hover:text-charcoal-muted cursor-pointer'
                    : 'text-charcoal-muted hover:bg-black/5 hover:text-charcoal-heading'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-brand-600' : item.disabled ? 'text-charcoal-muted/50' : 'text-charcoal-muted'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                      isActive
                        ? 'bg-brand-50 text-brand-700'
                        : 'bg-surface-tertiary text-charcoal-muted'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Prompt to start assessment if empty */}
        {!analysis && (
          <div className="mx-3 mb-3 p-3.5 rounded-xl bg-brand-50/70 border border-brand-200/60 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-brand-800">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Get Started</span>
            </div>
            <p className="text-charcoal-muted mt-1 text-[11px] leading-relaxed">
              Complete your assessment to unlock Gemini AI skill analysis & roadmaps.
            </p>
            <button
              onClick={() => setActiveTab('assessment')}
              className="mt-2.5 w-full py-1.5 px-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium text-xs flex items-center justify-center gap-1 transition-colors"
            >
              <span>Take Assessment</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Footer actions */}
        <div className="p-3 border-t border-charcoal-border/60 flex items-center justify-between text-xs text-charcoal-muted">
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-olive-500 animate-pulse"></span>
            <span>SkillPath v1.0</span>
          </div>

          {(assessment || analysis) && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to reset all your assessment data and progress?')) {
                  resetAllData();
                }
              }}
              title="Reset all saved data"
              className="p-1.5 text-charcoal-muted hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1 text-[11px]"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
