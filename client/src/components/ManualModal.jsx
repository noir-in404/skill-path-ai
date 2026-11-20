import React, { useState } from 'react';
import {
  X,
  BookOpen,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Code2,
  Layers,
  ArrowRight,
  Sparkles,
  ExternalLink,
  CheckSquare,
  Square
} from 'lucide-react';

export const ManualModal = ({ isOpen, onClose, item, type = 'task', onToggleComplete, isCompleted }) => {
  if (!isOpen || !item) return null;

  const [activeTab, setActiveTab] = useState('steps'); // 'steps' | 'guidelines' | 'resources'

  const isProject = type === 'project';
  const steps = item.stepByStepGuide || [];
  const whatToDo = item.whatToDo || [];
  const whatNotToDo = item.whatNotToDo || [];
  const deliverables = item.deliverables || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-charcoal/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] shadow-elevated border border-charcoal-border flex flex-col overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-surface-secondary/80 border-b border-charcoal-border/80 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-100 text-brand-800 border border-brand-200">
                {isProject ? 'Project Execution Blueprint' : 'Skill Learning Manual'}
              </span>
              {item.skill && (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white border border-charcoal-border text-charcoal-muted">
                  {item.skill}
                </span>
              )}
              {item.difficulty && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-olive-50 text-olive-800 border border-olive-200">
                  {item.difficulty}
                </span>
              )}
              <span className="text-[10px] text-charcoal-muted flex items-center gap-1 font-medium">
                <Clock className="w-3 h-3 text-brand-600" />
                ~{item.estimatedHours} Hours
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-extrabold text-charcoal-heading tracking-tight mt-1">
              {item.title}
            </h2>

            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed max-w-2xl">
              {item.description}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-charcoal-muted hover:text-charcoal hover:bg-black/5 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-2.5 bg-surface border-b border-charcoal-border/60 flex items-center gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('steps')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'steps'
                ? 'bg-charcoal text-white shadow-subtle'
                : 'text-charcoal-muted hover:text-charcoal hover:bg-black/5'
            }`}
          >
            Step-by-Step Instructions ({steps.length || 'Guide'})
          </button>

          <button
            onClick={() => setActiveTab('guidelines')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'guidelines'
                ? 'bg-charcoal text-white shadow-subtle'
                : 'text-charcoal-muted hover:text-charcoal hover:bg-black/5'
            }`}
          >
            What To Do vs What NOT To Do
          </button>

          <button
            onClick={() => setActiveTab('resources')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'resources'
                ? 'bg-charcoal text-white shadow-subtle'
                : 'text-charcoal-muted hover:text-charcoal hover:bg-black/5'
            }`}
          >
            Verification & Criteria
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          
          {/* TAB 1: STEP-BY-STEP INSTRUCTIONS */}
          {activeTab === 'steps' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-brand-50/60 border border-brand-200/60 text-xs text-charcoal-heading flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-bold">Odin-Style Guided Progression:</span> Follow each numbered phase in sequence. Do not skip ahead until your current milestone builds, runs, and passes its self-check.
                </div>
              </div>

              {steps.length > 0 ? (
                <div className="space-y-3">
                  {steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl border border-charcoal-border/80 bg-white hover:border-brand-300 transition-colors shadow-subtle flex items-start gap-3.5"
                    >
                      <div className="w-7 h-7 rounded-xl bg-charcoal text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div className="space-y-1 flex-1">
                        <p className="text-xs sm:text-sm text-charcoal leading-relaxed font-medium">
                          {step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Fallback if item has practicalTask */
                <div className="p-5 rounded-2xl border border-charcoal-border bg-surface-secondary space-y-3">
                  <h4 className="font-bold text-charcoal-heading text-sm">Implementation Task:</h4>
                  <p className="text-xs text-charcoal leading-relaxed">
                    {item.practicalTask || item.description}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WHAT TO DO vs WHAT NOT TO DO */}
          {activeTab === 'guidelines' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* What TO Do Column */}
              <div className="p-5 rounded-2xl bg-olive-50/50 border border-olive-200 space-y-3">
                <div className="flex items-center gap-2 text-olive-800 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-olive-600" />
                  <span>What To Do (Best Practices)</span>
                </div>
                <ul className="space-y-2.5 text-xs text-charcoal leading-relaxed">
                  {whatToDo.length > 0 ? (
                    whatToDo.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-olive-700 font-bold mt-0.5">✓</span>
                        <span>{point}</span>
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-olive-700 font-bold mt-0.5">✓</span>
                        <span>Break problems down into tiny, independently testable functions before combining them.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-olive-700 font-bold mt-0.5">✓</span>
                        <span>Test failure modes (empty data, network timeouts, invalid inputs) early.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-olive-700 font-bold mt-0.5">✓</span>
                        <span>Document why architectural decisions were made using concise code comments.</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* What NOT To Do Column */}
              <div className="p-5 rounded-2xl bg-red-50/50 border border-red-200 space-y-3">
                <div className="flex items-center gap-2 text-red-800 font-bold text-sm">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span>What NOT To Do (Common Pitfalls)</span>
                </div>
                <ul className="space-y-2.5 text-xs text-charcoal leading-relaxed">
                  {whatNotToDo.length > 0 ? (
                    whatNotToDo.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-700 font-bold mt-0.5">✗</span>
                        <span>{point}</span>
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-red-700 font-bold mt-0.5">✗</span>
                        <span>DO NOT blindly copy-paste code from AI or StackOverflow without understanding every line.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-700 font-bold mt-0.5">✗</span>
                        <span>DO NOT install third-party helper libraries for things you can write in 10 lines of native code.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-700 font-bold mt-0.5">✗</span>
                        <span>DO NOT neglect edge cases or ignore red error messages in the browser console.</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: VERIFICATION & RESOURCES */}
          {activeTab === 'resources' && (
            <div className="space-y-4">
              {/* Completion Criteria / Deliverables */}
              <div className="p-5 rounded-2xl bg-white border border-charcoal-border shadow-subtle space-y-3">
                <h4 className="font-bold text-charcoal-heading text-sm flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-olive-600" />
                  <span>Acceptance Verification Checklist</span>
                </h4>
                <p className="text-xs text-charcoal-muted">
                  You are officially ready to mark this completed when you satisfy:
                </p>

                {deliverables.length > 0 ? (
                  <ul className="space-y-2 text-xs">
                    {deliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-charcoal font-medium">
                        <CheckCircle2 className="w-4 h-4 text-olive-600 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-3 rounded-xl bg-surface-secondary text-xs text-charcoal">
                    <strong>Completion Criteria:</strong> {item.completionCriteria || 'Code compiles, runs without console errors, and achieves practical goal.'}
                  </div>
                )}
              </div>

              {/* Study Recommendations */}
              {item.recommendedActivities && (
                <div className="p-5 rounded-2xl bg-surface-secondary border border-charcoal-border/70 space-y-2">
                  <h4 className="font-bold text-charcoal-heading text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-brand-600" />
                    <span>Recommended Study & References</span>
                  </h4>
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    {item.recommendedActivities}
                  </p>
                </div>
              )}

              {/* Career Relevance */}
              {item.careerRelevance && (
                <div className="p-4 rounded-xl bg-brand-50/50 border border-brand-200/50 text-xs text-charcoal">
                  <span className="font-bold text-brand-900">Why Hiring Managers Care:</span>{' '}
                  <span className="text-charcoal-muted">{item.careerRelevance}</span>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-surface border-t border-charcoal-border/80 flex items-center justify-between gap-3">
          {onToggleComplete && (
            <button
              onClick={() => {
                onToggleComplete(item.id);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isCompleted
                  ? 'bg-olive-100 text-olive-900 border border-olive-300 hover:bg-olive-200'
                  : 'bg-charcoal text-white hover:bg-charcoal/90'
              }`}
            >
              {isCompleted ? <CheckCircle2 className="w-4 h-4 text-olive-700" /> : <Square className="w-4 h-4" />}
              <span>{isCompleted ? 'Marked as Completed ✓' : 'Mark as Done'}</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white border border-charcoal-border text-charcoal-heading text-xs font-semibold hover:bg-surface-secondary transition-colors"
          >
            Close Manual
          </button>
        </div>

      </div>
    </div>
  );
};
