import React from 'react';
import {
  X,
  Code2,
  CheckCircle2,
  XCircle,
  Clock,
  Layers,
  Sparkles,
  CheckSquare,
  Square,
  AlertCircle
} from 'lucide-react';

export const ExerciseGuideModal = ({
  isOpen,
  onClose,
  item,
  type = 'task',
  onToggleComplete,
  isCompleted
}) => {
  // Close modal on Escape key press (WCAG 2.1 AA)
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const isProject = type === 'project';
  const steps = item.stepByStepGuide || [];
  const whatToDo = item.whatToDo || [];
  const whatNotToDo = item.whatNotToDo || [];
  const deliverables = item.deliverables || [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exercise-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-charcoal/60 backdrop-blur-sm animate-fade-in overflow-y-auto"
    >
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] shadow-elevated border border-charcoal-border flex flex-col overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-6 bg-surface-secondary/80 border-b border-charcoal-border/80 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-olive-100 text-olive-800 border border-olive-200 flex items-center gap-1">
                <Code2 className="w-3 h-3 text-olive-700" />
                <span>{isProject ? 'Portfolio Project Execution Guide' : 'Practical Exercise Guide'}</span>
              </span>

              {item.skill && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-charcoal-border text-charcoal-heading">
                  {item.skill}
                </span>
              )}

              {item.difficulty && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-brand-50 text-brand-800 border border-brand-200">
                  {item.difficulty}
                </span>
              )}

              <span className="text-[10px] text-charcoal-muted flex items-center gap-1 font-medium">
                <Clock className="w-3 h-3 text-brand-600" />
                ~{item.estimatedHours} Hours
              </span>
            </div>

            <h2 id="exercise-modal-title" className="text-lg sm:text-xl font-extrabold text-charcoal-heading tracking-tight">
              {item.title}
            </h2>

            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed max-w-2xl">
              {item.description}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close exercise guide modal"
            className="p-2 rounded-xl text-charcoal-muted hover:text-charcoal hover:bg-black/5 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          
          {/* SECTION 1: DETAILED EXERCISE DESCRIPTION */}
          <div className="p-5 rounded-2xl bg-surface-secondary/70 border border-charcoal-border/70 space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-charcoal-heading flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Detailed Exercise Objective & Scope</span>
            </h3>
            <p className="text-xs sm:text-sm text-charcoal leading-relaxed font-medium">
              {item.practicalTask || item.description}
            </p>
            {item.careerRelevance && (
              <p className="text-[11px] text-charcoal-muted pt-1 border-t border-charcoal-border/40">
                <strong className="text-charcoal">Why this matters:</strong> {item.careerRelevance}
              </p>
            )}
          </div>

          {/* SECTION 2: COMPLETE STEP-BY-STEP BUILD GUIDE */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-charcoal-heading flex items-center gap-2">
              <Code2 className="w-4 h-4 text-olive-600" />
              <span>Step-by-Step Execution Guide</span>
            </h3>
            <p className="text-xs text-charcoal-muted">
              Follow this step-by-step process from setup to completion:
            </p>

            <div className="space-y-2.5 pt-1">
              {steps.length > 0 ? (
                steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-charcoal-border/80 bg-white hover:border-brand-300 transition-colors shadow-subtle flex items-start gap-3.5"
                  >
                    <div className="w-7 h-7 rounded-xl bg-charcoal text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-charcoal leading-relaxed font-medium flex-1">
                      {step}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-2xl bg-white border border-charcoal-border text-xs text-charcoal">
                  {item.practicalTask || item.description}
                </div>
              )}
            </div>
          </div>

          {/* SECTION 3: WHAT TO DO vs WHAT NOT TO DO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* What to DO */}
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
                      <span>Write clean, modular code and test each function independently.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-olive-700 font-bold mt-0.5">✓</span>
                      <span>Test edge cases and error states before declaring the task done.</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* What NOT to Do */}
            <div className="p-5 rounded-2xl bg-red-50/50 border border-red-200 space-y-3">
              <div className="flex items-center gap-2 text-red-800 font-bold text-sm">
                <XCircle className="w-4 h-4 text-red-600" />
                <span>What NOT To Do (Pitfalls)</span>
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
                      <span>DO NOT copy code blindly without understanding every line.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-700 font-bold mt-0.5">✗</span>
                      <span>DO NOT skip error handling or leave unhandled console exceptions.</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* SECTION 4: ACCEPTANCE VERIFICATION */}
          <div className="p-5 rounded-2xl bg-white border border-charcoal-border shadow-subtle space-y-3">
            <h4 className="font-bold text-charcoal-heading text-sm flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-olive-600" />
              <span>Completion & Verification Checklist</span>
            </h4>

            {deliverables.length > 0 ? (
              <ul className="space-y-2 text-xs">
                {deliverables.map((deliv, i) => (
                  <li key={i} className="flex items-start gap-2 text-charcoal font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-olive-600 shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-3.5 rounded-xl bg-surface-secondary text-xs text-charcoal">
                <strong>Completion Criteria:</strong> {item.completionCriteria || 'Code compiles, runs without console errors, and passes all edge cases.'}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
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
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
