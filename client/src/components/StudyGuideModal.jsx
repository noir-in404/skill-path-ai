import React from 'react';
import {
  X,
  BookOpen,
  ExternalLink,
  CheckCircle2,
  ListOrdered,
  Sparkles,
  Clock,
  Compass,
  ArrowRight,
  Bookmark
} from 'lucide-react';

export const StudyGuideModal = ({ isOpen, onClose, task }) => {
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

  if (!isOpen || !task) return null;

  // Generate authoritative documentation link and title based on task.skill
  const getSourceMaterials = (skill) => {
    const s = (skill || '').toLowerCase();
    
    if (s.includes('react')) {
      return [
        {
          title: 'React Official Documentation',
          type: 'Official Documentation',
          description: 'Interactive guides and modern hooks API reference.',
          url: 'https://react.dev/learn'
        },
        {
          title: 'React Custom Hooks Guide',
          type: 'Deep-Dive Article',
          description: 'Reusing logic across components with custom hooks.',
          url: 'https://react.dev/learn/reusing-logic-with-custom-hooks'
        },
        {
          title: 'React Developer Tools & Profiler',
          type: 'Tooling Guide',
          description: 'Inspecting component hierarchy, props, and re-renders.',
          url: 'https://react.dev/learn/react-developer-tools'
        }
      ];
    }

    if (s.includes('script') || s.includes('js') || s.includes('async')) {
      return [
        {
          title: 'MDN Web Docs – JavaScript Guide',
          type: 'Official Documentation',
          description: 'Complete reference for ES6+ syntax, closures, and object models.',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide'
        },
        {
          title: 'MDN Web Docs – Asynchronous JavaScript',
          type: 'Deep-Dive Guide',
          description: 'Mastering Promises, async/await, and the Fetch API.',
          url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous'
        },
        {
          title: 'JavaScript Event Loop Visualized',
          type: 'Architectural Guide',
          description: 'Understanding call stacks, microtask queues, and callback execution.',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop'
        }
      ];
    }

    if (s.includes('html') || s.includes('css') || s.includes('tailwind')) {
      return [
        {
          title: 'MDN Web Docs – HTML5 & Accessibility (a11y)',
          type: 'Official Documentation',
          description: 'Semantic tags, ARIA attributes, and accessible structure.',
          url: 'https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML'
        },
        {
          title: 'Tailwind CSS Official Documentation',
          type: 'Documentation & Cheatsheet',
          description: 'Utility-first CSS framework configuration and class reference.',
          url: 'https://tailwindcss.com/docs'
        },
        {
          title: 'CSS Grid & Flexbox Deep Dive',
          type: 'Visual Guide',
          description: 'Constructing resilient responsive two-dimensional layouts.',
          url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout'
        }
      ];
    }

    if (s.includes('sql') || s.includes('data') || s.includes('pandas')) {
      return [
        {
          title: 'PostgreSQL Official Documentation',
          type: 'Official Documentation',
          description: 'Query syntax, window functions, CTEs, and index strategies.',
          url: 'https://www.postgresql.org/docs/current/'
        },
        {
          title: 'Pandas User Guide (PyData)',
          type: 'Official Documentation',
          description: 'Data manipulation, groupby aggregations, and time-series analysis.',
          url: 'https://pandas.pydata.org/docs/user_guide/index.html'
        },
        {
          title: 'SQL Window Functions Interactive Tutorial',
          type: 'Practice Guide',
          description: 'Mastering ROW_NUMBER, RANK, DENSE_RANK, and LAG/LEAD.',
          url: 'https://mode.com/sql-tutorial/sql-window-functions/'
        }
      ];
    }

    // Default high-quality engineering references
    return [
      {
        title: `Official Documentation for ${task.skill || 'Web Technologies'}`,
        type: 'Authoritative Reference',
        description: `Core API specification, standard guidelines, and code examples for ${task.skill}.`,
        url: 'https://developer.mozilla.org/en-US/'
      },
      {
        title: 'Industry Best Practices & Architectural Patterns',
        type: 'Engineering Standard',
        description: 'Design principles, clean code conventions, and testing strategies.',
        url: 'https://github.com/goldbergyoni/javascript-testing-best-practices'
      }
    ];
  };

  const sources = getSourceMaterials(task.skill);

  // Structured sequence to study this topic
  const learningSequence = [
    {
      phase: 'Step 1: Core Conceptual Foundations',
      description: `Before writing code, study the underlying theory of ${task.skill}. Understand why this tool exists, what problems it solves, and its basic lifecycle or syntax principles.`
    },
    {
      phase: 'Step 2: Deep-Dive into Primary Source Documentation',
      description: `Read the official documentation sections linked below. Focus on input parameters, return values, and edge cases rather than passively watching video tutorials.`
    },
    {
      phase: 'Step 3: Sandbox Reproduction & Active Experimentation',
      description: 'Open a blank browser console, Node script, or CodeSandbox. Type each example out by hand — do not copy-paste. Deliberately break the code to observe the error messages.'
    },
    {
      phase: 'Step 4: Synthesis & Transition to Practical Exercise',
      description: 'Once you can reproduce the core concept without looking at the reference documentation, proceed immediately to the Practical Exercise card in your roadmap.'
    }
  ];

  // Actionable process to follow the materials
  const studyProcessTips = [
    'Always type code manually into an editor rather than copying or just reading.',
    'Keep your browser developer tools open (F12) to inspect network calls and console logs.',
    'When you encounter a confusing term, look up its formal definition on MDN instead of guessing.',
    'Spend 30% of your available study time reading theory and 70% building and testing.'
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="study-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-charcoal/60 backdrop-blur-sm animate-fade-in overflow-y-auto"
    >
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] shadow-elevated border border-charcoal-border flex flex-col overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-6 bg-surface-secondary/80 border-b border-charcoal-border/80 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800 border border-brand-200 flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-brand-600" />
                <span>Recommended Study Roadmap</span>
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-charcoal-border text-charcoal-heading">
                {task.skill}
              </span>
              <span className="text-[10px] text-charcoal-muted flex items-center gap-1">
                <Clock className="w-3 h-3 text-brand-600" />
                ~{task.estimatedHours} Hours
              </span>
            </div>

            <h2 id="study-modal-title" className="text-lg sm:text-xl font-extrabold text-charcoal-heading tracking-tight">
              {task.title}
            </h2>

            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed max-w-2xl">
              {task.recommendedActivities || task.description}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close study guide modal"
            className="p-2 rounded-xl text-charcoal-muted hover:text-charcoal hover:bg-black/5 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          
          {/* SECTION 1: SEQUENTIAL LEARNING ORDER */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-charcoal-heading flex items-center gap-2">
              <ListOrdered className="w-4 h-4 text-brand-600" />
              <span>Recommended Sequence to Follow</span>
            </h3>
            <p className="text-xs text-charcoal-muted">
              Follow this progression in order so you never feel confused about what to study first.
            </p>

            <div className="space-y-2.5 pt-1">
              {learningSequence.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-charcoal-border/80 bg-white hover:border-brand-300 transition-colors shadow-subtle flex items-start gap-3.5"
                >
                  <div className="w-7 h-7 rounded-xl bg-charcoal text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs sm:text-sm text-charcoal-heading">
                      {step.phase}
                    </h4>
                    <p className="text-xs text-charcoal-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: CURATED SOURCE MATERIALS */}
          <div className="space-y-3 pt-2">
            <h3 className="font-bold text-sm text-charcoal-heading flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-olive-600" />
              <span>Curated Source Materials & Official References</span>
            </h3>
            <p className="text-xs text-charcoal-muted">
              Authoritative industry documentation and specifications for this competency:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {sources.map((src, i) => (
                <a
                  key={i}
                  href={src.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-2xl border border-charcoal-border hover:border-brand-500 bg-surface-secondary/40 hover:bg-white transition-all group flex flex-col justify-between shadow-subtle"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700">
                        {src.type}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-charcoal-muted group-hover:text-brand-600 transition-colors" />
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-charcoal-heading group-hover:text-brand-600 transition-colors">
                      {src.title}
                    </h4>
                    <p className="text-[11px] text-charcoal-muted leading-relaxed">
                      {src.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-charcoal-border/50 text-[10px] font-semibold text-brand-600 flex items-center gap-1">
                    <span>Open official documentation</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* SECTION 3: STEP-BY-STEP PROCESS TO ABSORB THE MATERIAL */}
          <div className="p-5 rounded-2xl bg-olive-50/50 border border-olive-200/80 space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-olive-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-olive-600" />
              <span>How to Follow and Study These Materials Effectively</span>
            </h3>
            <ul className="space-y-2 text-xs text-charcoal leading-relaxed">
              {studyProcessTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-olive-700 font-bold mt-0.5">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-surface border-t border-charcoal-border/80 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-charcoal text-white text-xs font-semibold hover:bg-charcoal/90 transition-colors shadow-subtle"
          >
            Done Studying
          </button>
        </div>

      </div>
    </div>
  );
};
