import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Target,
  BarChart2,
  Clock,
  CheckCircle2,
  BookOpen,
  Code2,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  ClipboardList,
  RotateCcw
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { useAssessment } from '../context/AssessmentContext';
import { DisclaimerBanner } from '../components/DisclaimerBanner';

export const DashboardPage = () => {
  const {
    assessment,
    analysis,
    stats,
    setActiveTab,
    toggleTask,
    loadDemoSample,
    loading,
    resetAllData
  } = useAssessment();

  // If user has not completed an assessment yet, render clean empty state
  if (!analysis) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Welcome Hero for New Users */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-50 via-surface-secondary to-olive-50 p-6 sm:p-10 border border-brand-200/60 shadow-card">
          <div className="max-w-2xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>AI-Powered Career Readiness</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-charcoal-heading tracking-tight leading-tight">
              From Career Ambition to Practical Skill Development.
            </h1>

            <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
              SkillPath AI bridges the gap between where you are today and where industry demands you to be. Specify your dream career, benchmark your current competencies with Google Gemini, and receive a personalized learning roadmap with practical projects.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('assessment')}
                className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-semibold text-sm shadow-card flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>Start Career Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => loadDemoSample('Frontend Developer')}
                disabled={loading}
                className="px-4 py-2.5 bg-white hover:bg-surface-secondary text-charcoal-heading border border-charcoal-border rounded-xl font-medium text-sm shadow-subtle transition-colors flex items-center gap-2"
              >
                <span>{loading ? 'Loading...' : 'Try Demo as Frontend Developer'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-white border border-charcoal-border shadow-subtle space-y-2">
            <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 font-bold text-sm">
              1
            </div>
            <h3 className="font-semibold text-charcoal-heading text-sm">Role-Specific Gap Analysis</h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Gemini evaluates your self-reported skills against live industry requirements for your target role.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-charcoal-border shadow-subtle space-y-2">
            <div className="w-9 h-9 rounded-lg bg-olive-50 flex items-center justify-center text-olive-600 font-bold text-sm">
              2
            </div>
            <h3 className="font-semibold text-charcoal-heading text-sm">Personalized Roadmap</h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              A phased weekly study curriculum customized to your available study hours and preferred learning style.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-charcoal-border shadow-subtle space-y-2">
            <div className="w-9 h-9 rounded-lg bg-slateaccent-50 flex items-center justify-center text-slateaccent-700 font-bold text-sm">
              3
            </div>
            <h3 className="font-semibold text-charcoal-heading text-sm">Practical Portfolio Projects</h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Realistic, resume-worthy projects designed to demonstrate applied mastery to hiring managers.
            </p>
          </div>
        </div>

        <DisclaimerBanner />
      </div>
    );
  }

  // Active Dashboard with Real Stored User Data
  const chartData = [
    { name: 'Strong', count: stats.strongSkillsCount, color: '#5f8255' },
    { name: 'Improve', count: stats.needsImprovementCount, color: '#df8967' },
    { name: 'Missing', count: stats.missingSkillsCount, color: '#c85a32' }
  ];

  // Next 3 incomplete tasks
  const nextTasks = stats.allTasks.filter((t) => !t.isCompleted).slice(0, 3);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Demo Notice Banner if sample was loaded */}
      {analysis?.isDemo && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900 shadow-subtle animate-fade-in">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Sample Demo Loaded:</strong> You are currently looking at an example profile. You can take your own real assessment with Gemini anytime!
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => resetAllData()}
              className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 font-semibold text-amber-900 hover:bg-amber-100 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear Sample</span>
            </button>
            <button
              onClick={() => setActiveTab('assessment')}
              className="px-3.5 py-1.5 rounded-lg bg-brand-600 font-semibold text-white hover:bg-brand-700 transition-colors flex items-center gap-1 shadow-subtle"
            >
              <ClipboardList className="w-3 h-3" />
              <span>Take Your Assessment</span>
            </button>
          </div>
        </div>
      )}

      {/* Welcome & Career Goal Banner */}
      <div className="p-6 rounded-2xl bg-white border border-charcoal-border shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold border border-brand-200">
            <Target className="w-3.5 h-3.5 text-brand-600" />
            <span>Target Role: {analysis.careerGoal}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-charcoal-heading">
            Welcome back, {assessment?.name || 'Learner'}!
          </h2>

          <p className="text-xs sm:text-sm text-charcoal-muted max-w-2xl leading-relaxed">
            {analysis.summary}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 shrink-0">
          <button
            onClick={() => setActiveTab('assessment')}
            className="w-full sm:w-auto px-4 py-2.5 bg-white hover:bg-surface-secondary text-charcoal-heading border border-charcoal-border rounded-xl font-semibold text-xs sm:text-sm shadow-subtle flex items-center justify-center gap-1.5 transition-colors"
          >
            <ClipboardList className="w-4 h-4 text-brand-600" />
            <span>Take Your Assessment</span>
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            className="w-full sm:w-auto px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-semibold text-xs sm:text-sm shadow-subtle flex items-center justify-center gap-2 transition-colors"
          >
            <span>View Roadmap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Core Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Overall Progress */}
        <div className="p-4 rounded-xl bg-white border border-charcoal-border shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-charcoal-muted">
            <span className="text-xs font-medium uppercase tracking-wider">Overall Progress</span>
            <TrendingUp className="w-4 h-4 text-brand-600" />
          </div>
          <div className="text-2xl font-bold text-charcoal-heading">
            {stats.overallProgress}%
          </div>
          <div className="w-full bg-surface-tertiary h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-brand-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${stats.overallProgress}%` }}
            />
          </div>
          <p className="text-[11px] text-charcoal-muted">
            {stats.completedTasksCount} of {stats.totalTasks} milestones done
          </p>
        </div>

        {/* Metric 2: Skills Identified */}
        <div className="p-4 rounded-xl bg-white border border-charcoal-border shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-charcoal-muted">
            <span className="text-xs font-medium uppercase tracking-wider">Skills Evaluated</span>
            <BarChart2 className="w-4 h-4 text-slateaccent-600" />
          </div>
          <div className="text-2xl font-bold text-charcoal-heading">
            {stats.skillsCount}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-charcoal-muted">
            <span className="text-olive-700 font-semibold">{stats.strongSkillsCount} Strong</span>
            <span>•</span>
            <span className="text-brand-600 font-semibold">{stats.needsImprovementCount + stats.missingSkillsCount} Gaps</span>
          </div>
        </div>

        {/* Metric 3: Time Investment */}
        <div className="p-4 rounded-xl bg-white border border-charcoal-border shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-charcoal-muted">
            <span className="text-xs font-medium uppercase tracking-wider">Est. Study Hours</span>
            <Clock className="w-4 h-4 text-olive-600" />
          </div>
          <div className="text-2xl font-bold text-charcoal-heading">
            {stats.completedHours} / {stats.totalHours}h
          </div>
          <p className="text-[11px] text-charcoal-muted">
            Based on {assessment?.dailyStudyHours || 2}h daily schedule
          </p>
        </div>

        {/* Metric 4: Portfolio Projects */}
        <div className="p-4 rounded-xl bg-white border border-charcoal-border shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-charcoal-muted">
            <span className="text-xs font-medium uppercase tracking-wider">Projects</span>
            <Code2 className="w-4 h-4 text-brand-600" />
          </div>
          <div className="text-2xl font-bold text-charcoal-heading">
            {stats.completedProjectsCount} / {stats.totalProjects}
          </div>
          <p className="text-[11px] text-charcoal-muted">
            {stats.inProgressProjectsCount} currently in progress
          </p>
        </div>
      </div>

      {/* Main Split: Next Milestones & Skill Gap Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Milestones (2 cols) */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white border border-charcoal-border shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-charcoal-heading text-sm sm:text-base">
                Immediate Next Milestones
              </h3>
              <p className="text-xs text-charcoal-muted">
                Check off items as you study to update your progress in real time.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('roadmap')}
              className="text-xs text-brand-600 hover:text-brand-700 font-semibold flex items-center gap-1"
            >
              <span>Full Roadmap</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {nextTasks.length === 0 ? (
            <div className="p-6 text-center rounded-xl bg-surface-secondary border border-charcoal-border/50 text-xs text-charcoal-muted">
              <CheckCircle2 className="w-8 h-8 text-olive-600 mx-auto mb-2" />
              <p className="font-semibold text-charcoal-heading">All roadmap tasks completed!</p>
              <p className="mt-1">Incredible achievement. You have completed every milestone in your roadmap.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {nextTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3.5 rounded-xl border border-charcoal-border/80 hover:border-brand-300 bg-surface/50 transition-colors flex items-start gap-3"
                >
                  <input
                    type="checkbox"
                    id={`dash-task-${task.id}`}
                    checked={task.isCompleted}
                    onChange={() => toggleTask(task.id)}
                    className="mt-1 w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-charcoal-border cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-charcoal-heading truncate">
                        {task.title}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-tertiary text-charcoal-muted font-medium">
                        {task.skill}
                      </span>
                      <span className="text-[10px] text-charcoal-muted ml-auto shrink-0">
                        ~{task.estimatedHours}h
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-muted mt-1 line-clamp-2">
                      {task.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Skill Gap Breakdown Chart (1 col) */}
        <div className="p-5 rounded-2xl bg-white border border-charcoal-border shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-charcoal-heading text-sm sm:text-base">
              Competency Breakdown
            </h3>
            <button
              onClick={() => setActiveTab('analysis')}
              className="text-xs text-brand-600 hover:text-brand-700 font-semibold"
            >
              Details
            </button>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    border: '1px solid #e4e1db',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-2 border-t border-charcoal-border/60 grid grid-cols-3 text-center text-xs">
            <div>
              <div className="font-bold text-olive-700">{stats.strongSkillsCount}</div>
              <div className="text-[10px] text-charcoal-muted">Strong</div>
            </div>
            <div>
              <div className="font-bold text-amber-700">{stats.needsImprovementCount}</div>
              <div className="text-[10px] text-charcoal-muted">Improve</div>
            </div>
            <div>
              <div className="font-bold text-brand-700">{stats.missingSkillsCount}</div>
              <div className="text-[10px] text-charcoal-muted">Missing</div>
            </div>
          </div>
        </div>
      </div>

      <DisclaimerBanner />
    </div>
  );
};
