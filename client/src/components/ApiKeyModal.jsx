import React, { useState } from 'react';
import { X, Sparkles, CheckCircle, AlertTriangle, ExternalLink, RefreshCw, Copy, Check } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';

export const ApiKeyModal = ({ isOpen, onClose }) => {
  const { serverHealth, refreshHealth, showToast } = useAssessment();
  const [copied, setCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  if (!isOpen) return null;

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await refreshHealth();
      if (res.hasGeminiKey) {
        showToast('Gemini API Key detected on server!', 'success');
      } else {
        showToast('No GEMINI_API_KEY found in server/.env yet.', 'info');
      }
    } finally {
      setRefreshing(false);
    }
  };

  const copyEnvSnippet = () => {
    navigator.clipboard.writeText('GEMINI_API_KEY=your_actual_gemini_key_here\nGEMINI_MODEL=gemini-2.5-flash');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-elevated border border-charcoal-border overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-charcoal-border/70 flex items-center justify-between bg-surface-secondary">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center text-brand-700">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-charcoal-heading text-sm sm:text-base">
                Google Gemini API Integration
              </h3>
              <p className="text-[11px] text-charcoal-muted">Official @google/genai SDK on Node.js backend</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-charcoal-muted hover:text-charcoal hover:bg-black/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs sm:text-sm">
          {/* Status Box */}
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 ${
              serverHealth.hasGeminiKey
                ? 'bg-olive-50 border-olive-200 text-olive-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            {serverHealth.hasGeminiKey ? (
              <CheckCircle className="w-5 h-5 text-olive-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="font-semibold text-xs sm:text-sm">
                {serverHealth.hasGeminiKey
                  ? 'Gemini API Connected & Ready'
                  : 'GEMINI_API_KEY Not Detected in server/.env'}
              </div>
              <p className="text-xs mt-1 text-charcoal-muted leading-relaxed">
                {serverHealth.hasGeminiKey
                  ? `Active model: ${serverHealth.model || 'gemini-2.5-flash'}. Assessments are processed directly via Google Gemini.`
                  : 'The application is ready to run in Demo Mode (with curated sample data) or with live Gemini API once you supply your key in server/.env.'}
              </p>
            </div>
          </div>

          {/* Setup Instructions */}
          <div className="space-y-2">
            <h4 className="font-semibold text-charcoal-heading text-xs uppercase tracking-wider">
              How to configure your API Key:
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-charcoal-muted">
              <li>
                Get a free Gemini API key from{' '}
                <a
                  href="https://aistudio.google.com/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-600 font-medium underline inline-flex items-center gap-0.5"
                >
                  Google AI Studio <ExternalLink className="w-2.5 h-2.5" />
                </a>.
              </li>
              <li>
                Open the file <code className="bg-surface-tertiary px-1 py-0.5 rounded text-charcoal font-mono text-[11px]">server/.env</code> in the project.
              </li>
              <li>Set your key:</li>
            </ol>

            {/* Code Snippet Box */}
            <div className="relative mt-2 p-3 rounded-xl bg-charcoal text-stone-200 font-mono text-xs">
              <pre className="text-[11px]">
GEMINI_API_KEY=AIzaSy...<br/>
GEMINI_MODEL=gemini-2.5-flash
              </pre>
              <button
                onClick={copyEnvSnippet}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1 text-[10px]"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Curated Demo Mode Note */}
          <div className="p-3 bg-surface-secondary rounded-xl border border-charcoal-border/70 text-xs text-charcoal-muted">
            <span className="font-semibold text-charcoal-heading">Hackathon Demo Mode:</span> Even without an API key, you can test the entire workflow with full interactive roadmaps, gap analysis, and progress tracking using curated sample data.
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-charcoal-border/70 bg-surface flex items-center justify-between">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-charcoal-border bg-white text-charcoal text-xs font-medium hover:bg-surface-secondary transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Re-check Server Status</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-charcoal hover:bg-charcoal/90 text-white rounded-lg text-xs font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
