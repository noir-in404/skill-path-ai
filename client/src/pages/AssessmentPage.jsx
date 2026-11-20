import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Briefcase,
  Layers,
  Clock,
  BookOpen,
  Info
} from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import {
  CAREER_ROLES,
  PROFICIENCY_LEVELS,
  EDUCATION_LEVELS,
  STUDY_HOURS_OPTIONS,
  DURATION_OPTIONS,
  LEARNING_STYLES
} from '../utils/constants';

export const AssessmentPage = () => {
  const {
    assessment,
    submitAssessment,
    loading,
    loadingStage,
    error,
    serverHealth,
    showToast
  } = useAssessment();

  // Wizard step state (1 to 4)
  const [currentStep, setCurrentStep] = useState(1);

  // Form state initialized from existing assessment if present
  const [formData, setFormData] = useState({
    name: assessment?.name || '',
    educationLevel: assessment?.educationLevel || 'Undergraduate Student',
    fieldOfStudy: assessment?.fieldOfStudy || '',
    careerGoal: assessment?.careerGoal || 'Frontend Developer',
    isCustomRole: false,
    customCareerGoal: '',
    currentSkills: assessment?.currentSkills || [
      { skill: 'HTML & CSS', level: 'Intermediate' },
      { skill: 'JavaScript', level: 'Basic' },
      { skill: 'Git', level: 'Basic' }
    ],
    dailyStudyHours: assessment?.dailyStudyHours || 2,
    learningDurationWeeks: assessment?.learningDurationWeeks || 8,
    learningStyle: assessment?.learningStyle || 'Practical projects',
    additionalNotes: assessment?.additionalNotes || ''
  });

  // New skill input state
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('Basic');
  const [formErrors, setFormErrors] = useState({});

  // Force demo mode toggle if API key is not found or user wants sample run
  const [forceDemo, setForceDemo] = useState(!serverHealth.hasGeminiKey);

  // Update demo flag if server health changes
  useEffect(() => {
    if (!serverHealth.hasGeminiKey) {
      setForceDemo(true);
    }
  }, [serverHealth.hasGeminiKey]);

  // Selected career role suggestions
  const selectedRoleObj = CAREER_ROLES.find(
    (r) => r.title.toLowerCase() === (formData.careerGoal || '').toLowerCase()
  );

  const suggestedSkills = selectedRoleObj?.suggestedSkills || [];

  // Add skill helper
  const handleAddSkill = (skillName, level = 'Basic') => {
    const trimmed = (skillName || newSkillName).trim();
    if (!trimmed) return;

    // Check duplicate
    if (formData.currentSkills.some((s) => s.skill.toLowerCase() === trimmed.toLowerCase())) {
      showToast(`"${trimmed}" is already in your skills list.`, 'info');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      currentSkills: [...prev.currentSkills, { skill: trimmed, level }]
    }));

    setNewSkillName('');
    setNewSkillLevel('Basic');
  };

  // Remove skill helper
  const handleRemoveSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      currentSkills: prev.currentSkills.filter((_, i) => i !== index)
    }));
  };

  // Change skill level helper
  const handleSkillLevelChange = (index, newLevel) => {
    setFormData((prev) => {
      const updated = [...prev.currentSkills];
      updated[index].level = newLevel;
      return { ...prev, currentSkills: updated };
    });
  };

  // Step validation
  const validateStep = (step) => {
    const errors = {};
    if (step === 2) {
      const role = formData.isCustomRole ? formData.customCareerGoal : formData.careerGoal;
      if (!role || !role.trim()) {
        errors.careerGoal = 'Please select or enter a career role.';
      }
    }
    if (step === 3) {
      if (!formData.currentSkills || formData.currentSkills.length === 0) {
        errors.skills = 'Please add at least one current skill or concept.';
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validateStep(3)) {
      setCurrentStep(3);
      return;
    }

    const effectiveRole = formData.isCustomRole
      ? formData.customCareerGoal.trim()
      : formData.careerGoal;

    const payload = {
      ...formData,
      careerGoal: effectiveRole
    };

    try {
      await submitAssessment(payload, forceDemo);
    } catch (err) {
      // Handled in context & toast
    }
  };

  // Render Full Screen Loading State during AI Generation
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center mx-auto text-brand-600 shadow-card animate-pulse">
          <Sparkles className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-charcoal-heading">
            Analyzing Career Readiness with Gemini
          </h2>
          <p className="text-sm text-charcoal-muted max-w-md mx-auto">
            {loadingStage || 'Processing your skills against industry benchmarks...'}
          </p>
        </div>

        {/* Progress step indicators */}
        <div className="max-w-md mx-auto space-y-3 pt-4 text-left">
          <div className="p-3 rounded-xl bg-white border border-charcoal-border shadow-subtle flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-olive-100 text-olive-700 flex items-center justify-center text-xs font-bold">
              ✓
            </div>
            <span className="text-xs font-medium text-charcoal-heading">
              Role competency mapping loaded
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white border border-charcoal-border shadow-subtle flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold animate-spin">
              ◌
            </div>
            <span className="text-xs font-medium text-brand-700">
              Evaluating skill gaps & importance with Gemini
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white border border-charcoal-border shadow-subtle flex items-center gap-3 opacity-60">
            <div className="w-5 h-5 rounded-full bg-surface-tertiary text-charcoal-muted flex items-center justify-center text-xs">
              3
            </div>
            <span className="text-xs font-medium text-charcoal-muted">
              Generating personalized milestones & projects
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Wizard Progress Bar */}
      <div className="bg-white p-4 rounded-2xl border border-charcoal-border shadow-subtle">
        <div className="flex items-center justify-between text-xs font-semibold text-charcoal-muted mb-2">
          <span>Step {currentStep} of 4: {['Background', 'Career Goal', 'Current Skills', 'Learning Preferences'][currentStep - 1]}</span>
          <span className="text-brand-600 font-bold">{currentStep * 25}%</span>
        </div>
        <div className="w-full bg-surface-tertiary h-2 rounded-full overflow-hidden">
          <div
            className="bg-brand-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${currentStep * 25}%` }}
          />
        </div>

        {/* Step Icons */}
        <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-charcoal-border/50 text-[11px] text-center font-medium">
          <button
            onClick={() => setCurrentStep(1)}
            className={`flex flex-col items-center gap-1 ${
              currentStep >= 1 ? 'text-brand-700 font-semibold' : 'text-charcoal-muted'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center text-[10px]">1</span>
            <span className="hidden sm:inline">Background</span>
          </button>
          <button
            onClick={() => validateStep(1) && setCurrentStep(2)}
            className={`flex flex-col items-center gap-1 ${
              currentStep >= 2 ? 'text-brand-700 font-semibold' : 'text-charcoal-muted'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center text-[10px]">2</span>
            <span className="hidden sm:inline">Goal</span>
          </button>
          <button
            onClick={() => validateStep(2) && setCurrentStep(3)}
            className={`flex flex-col items-center gap-1 ${
              currentStep >= 3 ? 'text-brand-700 font-semibold' : 'text-charcoal-muted'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center text-[10px]">3</span>
            <span className="hidden sm:inline">Skills</span>
          </button>
          <button
            onClick={() => validateStep(3) && setCurrentStep(4)}
            className={`flex flex-col items-center gap-1 ${
              currentStep === 4 ? 'text-brand-700 font-semibold' : 'text-charcoal-muted'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center text-[10px]">4</span>
            <span className="hidden sm:inline">Plan</span>
          </button>
        </div>
      </div>

      {/* API Key Missing Alert if applicable */}
      {!serverHealth.hasGeminiKey && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Demo Mode Enabled:</span> No <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[10px]">GEMINI_API_KEY</code> found in server/.env. You can proceed seamlessly with curated sample assessments or add your key for live AI generation.
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-amber-200/70 text-amber-900 font-bold text-[10px] shrink-0">
            Sample Ready
          </span>
        </div>
      )}

      {/* Wizard Step 1: Basic Information */}
      {currentStep === 1 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-charcoal-border shadow-card space-y-6 animate-fade-in">
          <div>
            <h2 className="text-lg font-bold text-charcoal-heading">Step 1: Basic Information</h2>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Tell us a little about your current learning background.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal-heading mb-1.5">
                Your Name <span className="text-charcoal-muted font-normal">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Alex Rivera"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-charcoal-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-heading mb-1.5">
                Education Level <span className="text-brand-600">*</span>
              </label>
              <select
                value={formData.educationLevel}
                onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-charcoal-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white"
              >
                {EDUCATION_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-heading mb-1.5">
                Field of Study or Current Domain <span className="text-charcoal-muted font-normal">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Computer Science, Graphic Design, Electrical Engineering, Self-learning"
                value={formData.fieldOfStudy}
                onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-charcoal-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-charcoal-border/70 flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-semibold text-xs sm:text-sm shadow-subtle flex items-center gap-1.5 transition-colors"
            >
              <span>Continue to Career Goal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Wizard Step 2: Career Goal */}
      {currentStep === 2 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-charcoal-border shadow-card space-y-6 animate-fade-in">
          <div>
            <h2 className="text-lg font-bold text-charcoal-heading">Step 2: Choose Your Target Career Role</h2>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Select one of the in-demand industry tracks or enter a custom career title.
            </p>
          </div>

          {formErrors.careerGoal && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formErrors.careerGoal}</span>
            </div>
          )}

          {/* Grid of Preset Roles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CAREER_ROLES.map((role) => {
              const isSelected = !formData.isCustomRole && formData.careerGoal === role.title;
              return (
                <div
                  key={role.id}
                  onClick={() => {
                    setFormData({
                      ...formData,
                      isCustomRole: false,
                      careerGoal: role.title
                    });
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-brand-50/70 border-brand-500 shadow-subtle ring-1 ring-brand-500'
                      : 'bg-white border-charcoal-border hover:border-brand-300 hover:bg-surface-secondary'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs sm:text-sm text-charcoal-heading">
                      {role.title}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-charcoal-muted mt-1 line-clamp-2">
                    {role.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Custom Role Input */}
          <div className="pt-2 border-t border-charcoal-border/70">
            <div className="flex items-center gap-2 mb-2">
              <input
                type="radio"
                id="custom-role-radio"
                name="role-selection"
                checked={formData.isCustomRole}
                onChange={() => setFormData({ ...formData, isCustomRole: true })}
                className="text-brand-600 focus:ring-brand-500 cursor-pointer"
              />
              <label htmlFor="custom-role-radio" className="text-xs font-semibold text-charcoal-heading cursor-pointer">
                Enter a custom or specialized role
              </label>
            </div>

            {formData.isCustomRole && (
              <input
                type="text"
                placeholder="e.g. Cloud Solutions Architect, Blockchain Developer, Embedded Systems Engineer"
                value={formData.customCareerGoal}
                onChange={(e) => setFormData({ ...formData, customCareerGoal: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-charcoal-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                autoFocus
              />
            )}
          </div>

          <div className="pt-4 border-t border-charcoal-border/70 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrev}
              className="px-4 py-2 border border-charcoal-border rounded-xl text-xs sm:text-sm font-medium hover:bg-surface-secondary transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-semibold text-xs sm:text-sm shadow-subtle flex items-center gap-1.5 transition-colors"
            >
              <span>Continue to Skills</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Wizard Step 3: Current Skills */}
      {currentStep === 3 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-charcoal-border shadow-card space-y-6 animate-fade-in">
          <div>
            <h2 className="text-lg font-bold text-charcoal-heading">Step 3: What Skills Do You Already Have?</h2>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Add your current competencies and self-reported proficiency levels. (Even if you are a total beginner, add the tools or fundamentals you are somewhat familiar with).
            </p>
          </div>

          {formErrors.skills && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formErrors.skills}</span>
            </div>
          )}

          {/* Quick Suggested Skills Pills */}
          {suggestedSkills.length > 0 && (
            <div className="p-4 rounded-xl bg-surface-secondary border border-charcoal-border/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-charcoal-heading">
                  Common Skills for {formData.careerGoal} (Click to add):
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {suggestedSkills.map((suggested) => {
                  const alreadyAdded = formData.currentSkills.some(
                    (s) => s.skill.toLowerCase() === suggested.toLowerCase()
                  );
                  return (
                    <button
                      key={suggested}
                      type="button"
                      disabled={alreadyAdded}
                      onClick={() => handleAddSkill(suggested, 'Basic')}
                      className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                        alreadyAdded
                          ? 'bg-olive-50 text-olive-800 border-olive-200 opacity-60 cursor-default'
                          : 'bg-white text-charcoal hover:border-brand-500 hover:text-brand-600 border-charcoal-border shadow-subtle'
                      }`}
                    >
                      {alreadyAdded ? '✓ ' : '+ '}
                      {suggested}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Custom Add Skill Form */}
          <div className="p-4 rounded-xl border border-charcoal-border bg-surface/50 space-y-3">
            <span className="text-xs font-semibold text-charcoal-heading block">
              Add a Skill or Concept
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
              <div className="sm:col-span-6">
                <input
                  type="text"
                  placeholder="e.g. Python, SQL, React, Figma, Docker"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill(newSkillName, newSkillLevel);
                    }
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-charcoal-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white"
                />
              </div>

              <div className="sm:col-span-4">
                <select
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-charcoal-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white"
                >
                  {PROFICIENCY_LEVELS.map((lvl) => (
                    <option key={lvl.level} value={lvl.level}>
                      {lvl.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <button
                  type="button"
                  onClick={() => handleAddSkill(newSkillName, newSkillLevel)}
                  className="w-full py-2 bg-charcoal hover:bg-charcoal/90 text-white rounded-xl font-medium text-xs flex items-center justify-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>

          {/* Current Skills List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-charcoal-heading">
              <span>Your Current Skills ({formData.currentSkills.length})</span>
              <span className="text-[11px] text-charcoal-muted font-normal">
                Self-reported estimates
              </span>
            </div>

            {formData.currentSkills.length === 0 ? (
              <p className="p-4 rounded-xl bg-surface-secondary text-center text-xs text-charcoal-muted">
                No skills added yet. Click one of the suggestions above or type your own.
              </p>
            ) : (
              <div className="divide-y divide-charcoal-border/50 border border-charcoal-border rounded-xl bg-white overflow-hidden">
                {formData.currentSkills.map((item, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between gap-3 text-xs">
                    <span className="font-semibold text-charcoal-heading truncate">
                      {item.skill}
                    </span>

                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={item.level}
                        onChange={(e) => handleSkillLevelChange(idx, e.target.value)}
                        className="px-2 py-1 rounded-lg border border-charcoal-border text-xs bg-surface-secondary font-medium focus:outline-none"
                      >
                        {PROFICIENCY_LEVELS.map((lvl) => (
                          <option key={lvl.level} value={lvl.level}>
                            {lvl.label}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(idx)}
                        className="p-1 text-charcoal-muted hover:text-red-600 rounded transition-colors"
                        title="Remove skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-charcoal-border/70 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrev}
              className="px-4 py-2 border border-charcoal-border rounded-xl text-xs sm:text-sm font-medium hover:bg-surface-secondary transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-semibold text-xs sm:text-sm shadow-subtle flex items-center gap-1.5 transition-colors"
            >
              <span>Continue to Learning Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Wizard Step 4: Learning Preferences */}
      {currentStep === 4 && (
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-charcoal-border shadow-card space-y-6 animate-fade-in">
          <div>
            <h2 className="text-lg font-bold text-charcoal-heading">Step 4: Learning Schedule & Preferences</h2>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Customize how fast and in what style you wish to master these competencies.
            </p>
          </div>

          {/* Daily Study Time */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-charcoal-heading">
              Available Study Time per Day
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {STUDY_HOURS_OPTIONS.map((opt) => {
                const isSelected = formData.dailyStudyHours === opt.value;
                return (
                  <div
                    key={opt.value}
                    onClick={() => setFormData({ ...formData, dailyStudyHours: opt.value })}
                    className={`p-3 rounded-xl border cursor-pointer text-center transition-all ${
                      isSelected
                        ? 'bg-brand-50 border-brand-500 shadow-subtle ring-1 ring-brand-500 font-bold text-brand-700'
                        : 'bg-white border-charcoal-border hover:border-brand-300 text-charcoal'
                    }`}
                  >
                    <div className="text-xs sm:text-sm">{opt.label}</div>
                    <div className="text-[10px] text-charcoal-muted mt-0.5">{opt.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preferred Duration */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-charcoal-heading">
              Preferred Learning Timeline
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {DURATION_OPTIONS.map((opt) => {
                const isSelected = formData.learningDurationWeeks === opt.value;
                return (
                  <div
                    key={opt.value}
                    onClick={() => setFormData({ ...formData, learningDurationWeeks: opt.value })}
                    className={`p-3 rounded-xl border cursor-pointer text-center transition-all ${
                      isSelected
                        ? 'bg-olive-50 border-olive-500 shadow-subtle ring-1 ring-olive-500 font-bold text-olive-800'
                        : 'bg-white border-charcoal-border hover:border-olive-300 text-charcoal'
                    }`}
                  >
                    <div className="text-xs sm:text-sm">{opt.label}</div>
                    <div className="text-[10px] text-charcoal-muted mt-0.5">{opt.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Learning Style */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-charcoal-heading">
              Preferred Learning Style
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {LEARNING_STYLES.map((style) => {
                const isSelected = formData.learningStyle === style.id;
                return (
                  <div
                    key={style.id}
                    onClick={() => setFormData({ ...formData, learningStyle: style.id })}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-slateaccent-50 border-slateaccent-600 shadow-subtle ring-1 ring-slateaccent-600'
                        : 'bg-white border-charcoal-border hover:border-slateaccent-300 text-charcoal'
                    }`}
                  >
                    <div className="font-semibold text-xs sm:text-sm text-charcoal-heading">
                      {style.title}
                    </div>
                    <div className="text-[11px] text-charcoal-muted mt-0.5">
                      {style.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-xs font-semibold text-charcoal-heading mb-1.5">
              Specific Interests or Goals <span className="text-charcoal-muted font-normal">(optional)</span>
            </label>
            <textarea
              rows={2}
              placeholder="e.g. I want to build interactive dashboards, prepare for junior frontend interviews, or create mobile-friendly web apps."
              value={formData.additionalNotes}
              onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-charcoal-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>

          {/* Mode Switcher */}
          <div className="p-3.5 rounded-xl bg-surface-secondary border border-charcoal-border/70 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <div>
                <span className="font-semibold text-charcoal-heading">Execution Mode:</span>{' '}
                <span className="text-charcoal-muted">
                  {forceDemo ? 'Curated Demo Mode (Sample Data)' : 'Live Google Gemini 2.5 Flash'}
                </span>
              </div>
            </div>

            <label className="inline-flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={forceDemo}
                onChange={(e) => setForceDemo(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-charcoal-border"
              />
              <span className="text-xs text-charcoal font-medium">Force Demo</span>
            </label>
          </div>

          {/* Navigation & Submit CTA */}
          <div className="pt-4 border-t border-charcoal-border/70 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrev}
              className="px-4 py-2 border border-charcoal-border rounded-xl text-xs sm:text-sm font-medium hover:bg-surface-secondary transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-sm shadow-card flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Analyse My Career Readiness</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
