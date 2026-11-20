import React, { useState } from 'react';
import {
  CheckSquare,
  Award,
  Code2,
  Clock,
  CheckCircle2,
  AlertCircle,
  FolderGit2,
  Sparkles,
  BarChart2,
  Layers,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  BookOpen
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
import { ManualModal } from '../components/ManualModal';

export const ProgressPage = () => {
  const {
    analysis,
    assessment,
    stats,
    completedTasks,
    toggleTask,
    projectStatuses,
    setProjectStatus,
    setActiveTab
  } = useAssessment();

  const [activeTabSection, setActiveTabSection] = useState('overview'); // 'overview' | 'projects' | 'checklist'
  const [selectedProject, setSelectedProject] = useState(null);

  if (!analysis) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-surface-secondary text-charcoal-muted flex items-center justify-center mx-auto">
          <CheckSquare className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-charcoal-heading">No Progress Data Found</h2>
        <p className="text-xs text-charcoal-muted">
          Complete an assessment to start tracking your learning progress and portfolio projects.
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

  // Phase completion chart data
  const phaseChartData = (analysis.roadmap || []).map((phase) => {
    const tasks = Array.isArray(phase.tasks) ? phase.tasks : [];
    const doneCount = tasks.filter((t) => completedTasks.includes(t.id)).length;
    return {
      name: `Phase ${phase.phase}`,
      completed: doneCount,
      total: tasks.length,
      percentage: tasks.length > 0 ? Math.round((doneCount / tasks.length) * 100) : 0
    };
  });

  const projects = Array.isArray(analysis.projects) ? analysis.projects : [];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-white border border-charcoal-border shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-olive-50 text-olive-800 text-xs font-semibold border border-olive-200">
            <Award className="w-3.5 h-3.5 text-olive-600" />
            <span>Progress & Verification</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-charcoal-heading">
            Career Readiness Progress Tracker
          </h2>

          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            Real-time tracking of completed curriculum milestones and portfolio projects. All progress is calculated from actual completed tasks and persisted in your browser.
          </p>
        </div>

        {/* Big Overall Progress Dial */}
        <div className="p-5 rounded-xl bg-surface-secondary border border-charcoal-border/70 text-center shrink-0 min-w-[190px]">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-muted">
            Total Mastery Index
          </div>
          <div className="text-4xl font-extrabold text-charcoal-heading mt-1">
            {stats.overallProgress}%
          </div>
          <div className="w-full bg-surface-tertiary h-2 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-brand-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${stats.overallProgress}%` }}
            />
          </div>
          <div className="text-[10px] text-charcoal-muted mt-1">
            {stats.completedTasksCount}/{stats.totalTasks} tasks • {stats.completedProjectsCount}/{stats.totalProjects} projects
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center justify-between gap-3 border-b border-charcoal-border/70 pb-3">
        <div className="flex items-center gap-2 text-xs font-semibold">
          {[
            { id: 'overview', label: 'Progress Overview & Charts' },
            { id: 'projects', label: `Portfolio Projects (${stats.completedProjectsCount}/${stats.totalProjects})` },
            { id: 'checklist', label: `Task Checklist (${stats.completedTasksCount}/${stats.totalTasks})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabSection(tab.id)}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                activeTabSection === tab.id
                  ? 'bg-charcoal text-white shadow-subtle'
                  : 'bg-white border border-charcoal-border text-charcoal-muted hover:text-charcoal'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 1: OVERVIEW & CHARTS */}
      {activeTabSection === 'overview' && (
        <div className="space-y-6 animate-fade-in">
          {/* 4 Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white border border-charcoal-border shadow-subtle space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-muted">Tasks Completed</span>
              <div className="text-2xl font-bold text-charcoal-heading">
                {stats.completedTasksCount} <span className="text-xs font-normal text-charcoal-muted">/ {stats.totalTasks}</span>
              </div>
              <p className="text-[10px] text-olive-700 font-medium">{stats.taskPercentage}% completion</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-charcoal-border shadow-subtle space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-muted">Hours Invested</span>
              <div className="text-2xl font-bold text-charcoal-heading">
                {stats.completedHours}h <span className="text-xs font-normal text-charcoal-muted">/ {stats.totalHours}h</span>
              </div>
              <p className="text-[10px] text-charcoal-muted">{stats.totalHours - stats.completedHours} hours remaining</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-charcoal-border shadow-subtle space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-muted">Portfolio Projects</span>
              <div className="text-2xl font-bold text-charcoal-heading">
                {stats.completedProjectsCount} <span className="text-xs font-normal text-charcoal-muted">/ {stats.totalProjects}</span>
              </div>
              <p className="text-[10px] text-brand-600 font-medium">{stats.inProgressProjectsCount} in development</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-charcoal-border shadow-subtle space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-muted">Target Role</span>
              <div className="text-base sm:text-lg font-bold text-charcoal-heading truncate">
                {analysis.careerGoal}
              </div>
              <p className="text-[10px] text-charcoal-muted">{assessment?.learningDurationWeeks || 8}-week curriculum</p>
            </div>
          </div>

          {/* Phase Completion Recharts Bar Chart */}
          <div className="p-6 rounded-2xl bg-white border border-charcoal-border shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-charcoal-heading text-sm sm:text-base">
                  Milestone Completion by Phase
                </h3>
                <p className="text-xs text-charcoal-muted">
                  Tracking your progress across structured learning phases.
                </p>
              </div>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={phaseChartData} margin={{ top: 15, right: 20, left: -10, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      border: '1px solid #e4e1db',
                      fontSize: '12px'
                    }}
                    formatter={(val, name) => [val, name === 'completed' ? 'Tasks Done' : 'Total Tasks']}
                  />
                  <Bar dataKey="completed" fill="#c85a32" radius={[6, 6, 0, 0]} name="Completed Tasks" />
                  <Bar dataKey="total" fill="#eae6de" radius={[6, 6, 0, 0]} name="Total Tasks" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: PRACTICAL PROJECTS (Feature E) */}
      {activeTabSection === 'projects' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-4 rounded-xl bg-surface-secondary border border-charcoal-border/70 text-xs text-charcoal-muted flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-charcoal-heading">Practical Portfolio Application:</span>{' '}
              A career roadmap must not remain theoretical. Gemini curates these hands-on capstone projects to prove your mastery of target skills to hiring managers. Update your project status below.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj) => {
              const currentStatus = projectStatuses[proj.id] || 'Not Started';

              const difficultyColors = {
                Beginner: 'bg-olive-50 text-olive-800 border-olive-200',
                Intermediate: 'bg-amber-50 text-amber-800 border-amber-200',
                Advanced: 'bg-red-50 text-red-800 border-red-200'
              };

              return (
                <div
                  key={proj.id}
                  className="p-5 rounded-2xl bg-white border border-charcoal-border shadow-subtle space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-600">
                          Portfolio Capstone
                        </span>
                        <h3 className="font-bold text-base text-charcoal-heading mt-0.5">
                          {proj.title}
                        </h3>
                      </div>

                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold shrink-0 ${
                          difficultyColors[proj.difficulty] || 'bg-surface-secondary text-charcoal-muted'
                        }`}
                      >
                        {proj.difficulty}
                      </span>
                    </div>

                    <p className="text-xs text-charcoal-muted leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Skills Tagged */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-surface-tertiary text-charcoal-muted font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        ~{proj.estimatedHours}h
                      </span>
                    </div>

                    {/* Deliverables Checklist */}
                    {Array.isArray(proj.deliverables) && proj.deliverables.length > 0 && (
                      <div className="p-3 rounded-xl bg-surface/60 border border-charcoal-border/50 text-xs space-y-1.5">
                        <span className="font-semibold text-charcoal-heading text-[11px] block">
                          Expected Portfolio Deliverables:
                        </span>
                        <ul className="space-y-1">
                          {proj.deliverables.map((deliv, dIdx) => (
                            <li key={dIdx} className="text-charcoal-muted flex items-start gap-1.5 text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-olive-600 shrink-0 mt-0.5" />
                              <span>{deliv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Career Relevance */}
                    {proj.careerRelevance && (
                      <div className="text-[11px] text-charcoal-muted border-t border-charcoal-border/40 pt-2">
                        <span className="font-semibold text-charcoal">Why it matters:</span>{' '}
                        {proj.careerRelevance}
                      </div>
                    )}
                  </div>

                  {/* Project Status Selector & Odin Manual Trigger */}
                  <div className="pt-3 border-t border-charcoal-border/60 space-y-2">
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="font-semibold text-charcoal-heading">Current Status:</span>
                      <select
                        value={currentStatus}
                        onChange={(e) => setProjectStatus(proj.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-semibold focus:outline-none transition-colors cursor-pointer ${
                          currentStatus === 'Completed'
                            ? 'bg-olive-50 border-olive-300 text-olive-800'
                            : currentStatus === 'In Progress'
                            ? 'bg-amber-50 border-amber-300 text-amber-800'
                            : 'bg-white border-charcoal-border text-charcoal-muted'
                        }`}
                      >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed ✓</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedProject(proj)}
                      className="w-full py-2 px-3 rounded-xl bg-surface-secondary hover:bg-brand-50 hover:text-brand-800 text-charcoal border border-charcoal-border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-subtle"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-brand-600" />
                      <span>View Step-by-Step Blueprint & Manual</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 3: COMPLETE TASK CHECKLIST */}
      {activeTabSection === 'checklist' && (
        <div className="p-6 rounded-2xl bg-white border border-charcoal-border shadow-card space-y-4 animate-fade-in">
          <div>
            <h3 className="font-bold text-base text-charcoal-heading">
              Complete Curriculum Task Checklist
            </h3>
            <p className="text-xs text-charcoal-muted">
              Check off tasks as you finish them. Changes persist across browser sessions.
            </p>
          </div>

          <div className="divide-y divide-charcoal-border/60 border border-charcoal-border rounded-xl overflow-hidden">
            {stats.allTasks.map((task) => (
              <div
                key={task.id}
                className={`p-3.5 flex items-start gap-3 transition-colors ${
                  task.isCompleted ? 'bg-olive-50/30' : 'hover:bg-surface-secondary'
                }`}
              >
                <input
                  type="checkbox"
                  id={`chk-task-${task.id}`}
                  checked={task.isCompleted}
                  onChange={() => toggleTask(task.id)}
                  className="mt-1 w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-charcoal-border cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <label
                      htmlFor={`chk-task-${task.id}`}
                      className={`font-semibold text-xs sm:text-sm cursor-pointer ${
                        task.isCompleted ? 'line-through text-charcoal-muted' : 'text-charcoal-heading'
                      }`}
                    >
                      {task.title}
                    </label>
                    <div className="flex items-center gap-2 text-[10px] text-charcoal-muted">
                      <span>{task.phaseTitle}</span>
                      <span>•</span>
                      <span>{task.estimatedHours}h</span>
                    </div>
                  </div>
                  <p className="text-xs text-charcoal-muted mt-0.5 line-clamp-1">
                    {task.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project Blueprint Modal */}
      <ManualModal
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        item={selectedProject}
        type="project"
        onToggleComplete={(id) => {
          const current = projectStatuses[id] || 'Not Started';
          setProjectStatus(id, current === 'Completed' ? 'Not Started' : 'Completed');
        }}
        isCompleted={(projectStatuses[selectedProject?.id] || 'Not Started') === 'Completed'}
      />

      <DisclaimerBanner />
    </div>
  );
};
