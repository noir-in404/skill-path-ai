import React, { useState } from 'react';
import {
  Map,
  CheckCircle2,
  Clock,
  BookOpen,
  Code2,
  Calendar,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Filter,
  CheckSquare
} from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { DisclaimerBanner } from '../components/DisclaimerBanner';

export const RoadmapPage = () => {
  const { analysis, assessment, stats, toggleTask, completedTasks, setActiveTab } = useAssessment();
  const [filter, setFilter] = useState('All'); // 'All' | 'Incomplete' | 'Completed'
  const [expandedPhases, setExpandedPhases] = useState({});

  if (!analysis || !Array.isArray(analysis.roadmap) || analysis.roadmap.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-surface-secondary text-charcoal-muted flex items-center justify-center mx-auto">
          <Map className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-charcoal-heading">No Learning Roadmap Found</h2>
        <p className="text-xs text-charcoal-muted">
          Complete a quick career assessment to let Google Gemini generate your personalized roadmap.
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

  const togglePhase = (phaseNum) => {
    setExpandedPhases((prev) => ({
      ...prev,
      [phaseNum]: prev[phaseNum] === false ? true : false
    }));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header & Progress Summary */}
      <div className="p-6 rounded-2xl bg-white border border-charcoal-border shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold border border-brand-200">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>AI Curriculum: {analysis.careerGoal}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-charcoal-heading">
            Personalized Learning Roadmap
          </h2>

          <p className="text-xs sm:text-sm text-charcoal-muted max-w-xl leading-relaxed">
            Phased curriculum tailored to your {assessment?.dailyStudyHours || 2}h/day commitment and {assessment?.learningDurationWeeks || 8}-week timeline. Foundational competencies are prioritized before advanced topics.
          </p>
        </div>

        {/* Milestone Completion Stat */}
        <div className="p-4 rounded-xl bg-surface-secondary border border-charcoal-border/70 text-center shrink-0 min-w-[170px]">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-muted">
            Milestones Completed
          </div>
          <div className="text-3xl font-extrabold text-charcoal-heading mt-1">
            {stats.completedTasksCount} / {stats.totalTasks}
          </div>
          <div className="w-full bg-surface-tertiary h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-brand-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${stats.taskPercentage}%` }}
            />
          </div>
          <div className="text-[10px] text-charcoal-muted mt-1">
            {stats.taskPercentage}% roadmap complete
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-surface-secondary border border-charcoal-border/80 rounded-xl text-xs font-medium">
          {[
            { id: 'All', label: `All Tasks (${stats.totalTasks})` },
            { id: 'Incomplete', label: `Remaining (${stats.totalTasks - stats.completedTasksCount})` },
            { id: 'Completed', label: `Completed (${stats.completedTasksCount})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === tab.id
                  ? 'bg-white text-charcoal-heading font-semibold shadow-subtle'
                  : 'text-charcoal-muted hover:text-charcoal'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setActiveTab('progress')}
          className="text-xs text-brand-600 hover:text-brand-700 font-semibold flex items-center gap-1"
        >
          <span>View Progress Analytics</span>
          <CheckSquare className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Phased Timeline */}
      <div className="space-y-6">
        {analysis.roadmap.map((phase, pIdx) => {
          const isCollapsed = expandedPhases[phase.phase] === false;
          const tasks = Array.isArray(phase.tasks) ? phase.tasks : [];

          const displayedTasks = tasks.filter((t) => {
            const isDone = completedTasks.includes(t.id);
            if (filter === 'Completed') return isDone;
            if (filter === 'Incomplete') return !isDone;
            return true;
          });

          const phaseCompletedCount = tasks.filter((t) => completedTasks.includes(t.id)).length;
          const phasePercent = tasks.length > 0 ? Math.round((phaseCompletedCount / tasks.length) * 100) : 0;

          return (
            <div
              key={phase.phase || pIdx}
              className="rounded-2xl bg-white border border-charcoal-border shadow-subtle overflow-hidden"
            >
              {/* Phase Header */}
              <div
                onClick={() => togglePhase(phase.phase)}
                className="p-5 bg-surface-secondary/70 border-b border-charcoal-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-surface-secondary transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-charcoal text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {phase.phase}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm sm:text-base text-charcoal-heading">
                        {phase.title}
                      </h3>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-surface-tertiary text-charcoal-muted font-medium">
                        {phase.duration}
                      </span>
                    </div>
                    {phase.focus && (
                      <p className="text-xs text-charcoal-muted mt-0.5">
                        {phase.focus}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="text-right text-xs">
                    <span className="font-semibold text-charcoal-heading">
                      {phaseCompletedCount} / {tasks.length} done
                    </span>
                    <div className="text-[10px] text-charcoal-muted">{phasePercent}%</div>
                  </div>
                  {isCollapsed ? (
                    <ChevronDown className="w-4 h-4 text-charcoal-muted" />
                  ) : (
                    <ChevronUp className="w-4 h-4 text-charcoal-muted" />
                  )}
                </div>
              </div>

              {/* Phase Content */}
              {!isCollapsed && (
                <div className="p-5 space-y-4">
                  {/* Objectives list */}
                  {Array.isArray(phase.objectives) && phase.objectives.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-surface/60 border border-charcoal-border/50 text-xs">
                      <span className="font-semibold text-charcoal-heading block mb-1">
                        Phase Learning Objectives:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 list-disc list-inside text-charcoal-muted">
                        {phase.objectives.map((obj, oIdx) => (
                          <li key={oIdx} className="leading-relaxed">
                            {obj}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tasks List */}
                  <div className="space-y-3 pt-1">
                    {displayedTasks.length === 0 ? (
                      <p className="p-4 rounded-xl text-center text-xs text-charcoal-muted">
                        No tasks match the active filter ({filter}).
                      </p>
                    ) : (
                      displayedTasks.map((task) => {
                        const isDone = completedTasks.includes(task.id);
                        return (
                          <div
                            key={task.id}
                            className={`p-4 rounded-xl border transition-all ${
                              isDone
                                ? 'bg-olive-50/40 border-olive-200'
                                : 'bg-white border-charcoal-border hover:border-brand-300'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {/* Task Checkbox */}
                              <input
                                type="checkbox"
                                id={`task-${task.id}`}
                                checked={isDone}
                                onChange={() => toggleTask(task.id)}
                                className="mt-1 w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-charcoal-border cursor-pointer"
                              />

                              <div className="flex-1 min-w-0 space-y-2">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                  <label
                                    htmlFor={`task-${task.id}`}
                                    className={`font-bold text-xs sm:text-sm cursor-pointer ${
                                      isDone ? 'line-through text-charcoal-muted' : 'text-charcoal-heading'
                                    }`}
                                  >
                                    {task.title}
                                  </label>

                                  <div className="flex items-center gap-2 text-[10px]">
                                    <span className="px-2 py-0.5 rounded bg-surface-tertiary font-medium text-charcoal-muted">
                                      {task.skill}
                                    </span>
                                    <span className="px-2 py-0.5 rounded bg-brand-50 font-semibold text-brand-700 flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {task.estimatedHours}h
                                    </span>
                                  </div>
                                </div>

                                <p className="text-xs text-charcoal-muted leading-relaxed">
                                  {task.description}
                                </p>

                                {/* Recommended activities & practical exercises */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-charcoal-border/50 text-[11px]">
                                  {task.recommendedActivities && (
                                    <div className="p-2.5 rounded-lg bg-surface-secondary/70 border border-charcoal-border/40">
                                      <div className="flex items-center gap-1 font-semibold text-charcoal-heading mb-0.5">
                                        <BookOpen className="w-3 h-3 text-brand-600" />
                                        <span>Recommended Study:</span>
                                      </div>
                                      <p className="text-charcoal-muted">{task.recommendedActivities}</p>
                                    </div>
                                  )}

                                  {task.practicalTask && (
                                    <div className="p-2.5 rounded-lg bg-surface-secondary/70 border border-charcoal-border/40">
                                      <div className="flex items-center gap-1 font-semibold text-charcoal-heading mb-0.5">
                                        <Code2 className="w-3 h-3 text-olive-600" />
                                        <span>Practical Exercise:</span>
                                      </div>
                                      <p className="text-charcoal-muted">{task.practicalTask}</p>
                                    </div>
                                  )}
                                </div>

                                {task.completionCriteria && (
                                  <div className="text-[11px] text-charcoal-muted flex items-start gap-1">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-olive-600 shrink-0 mt-0.5" />
                                    <span>
                                      <strong>Criteria:</strong> {task.completionCriteria}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <DisclaimerBanner />
    </div>
  );
};
