import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { checkHealth, analyzeCareerAssessment } from '../services/api';

const AssessmentContext = createContext(null);

export const AssessmentProvider = ({ children }) => {
  // Navigation tab state
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('skillpath_active_tab') || 'dashboard';
  });

  // User assessment form input state
  const [assessment, setAssessment] = useState(() => {
    try {
      const saved = localStorage.getItem('skillpath_assessment');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // AI analysis output state
  const [analysis, setAnalysis] = useState(() => {
    try {
      const saved = localStorage.getItem('skillpath_analysis');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Completed task IDs (Set serialized to Array)
  const [completedTasks, setCompletedTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('skillpath_completed_tasks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Project statuses: { [projectId]: 'Not Started' | 'In Progress' | 'Completed' }
  const [projectStatuses, setProjectStatuses] = useState(() => {
    try {
      const saved = localStorage.getItem('skillpath_project_statuses');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Server health & Gemini status
  const [serverHealth, setServerHealth] = useState({
    status: 'checking',
    hasGeminiKey: false,
    model: 'gemini-2.5-flash'
  });

  // Loading and Error UI states
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState('');
  const [error, setError] = useState(null);

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('skillpath_active_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (assessment) {
      localStorage.setItem('skillpath_assessment', JSON.stringify(assessment));
    } else {
      localStorage.removeItem('skillpath_assessment');
    }
  }, [assessment]);

  useEffect(() => {
    if (analysis) {
      localStorage.setItem('skillpath_analysis', JSON.stringify(analysis));
    } else {
      localStorage.removeItem('skillpath_analysis');
    }
  }, [analysis]);

  useEffect(() => {
    localStorage.setItem('skillpath_completed_tasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  useEffect(() => {
    localStorage.setItem('skillpath_project_statuses', JSON.stringify(projectStatuses));
  }, [projectStatuses]);

  // Initial health check
  const refreshHealth = async () => {
    const health = await checkHealth();
    setServerHealth(health);
    return health;
  };

  useEffect(() => {
    refreshHealth();
  }, []);

  // Submit assessment and trigger Gemini / Demo analysis
  const submitAssessment = async (formData, forceDemo = false) => {
    setLoading(true);
    setError(null);
    setLoadingStage('Connecting to Gemini AI Engine...');

    try {
      // Stage 1
      setTimeout(() => {
        setLoadingStage('Evaluating required industry competencies for ' + formData.careerGoal + '...');
      }, 700);

      // Stage 2
      setTimeout(() => {
        setLoadingStage('Identifying missing & underdeveloped skill gaps...');
      }, 1500);

      // Stage 3
      setTimeout(() => {
        setLoadingStage('Synthesizing structured roadmap & practical project recommendations...');
      }, 2300);

      const response = await analyzeCareerAssessment(formData, forceDemo);

      if (response && response.success && response.data) {
        setAssessment(formData);
        setAnalysis(response.data);

        // Reset completion status for new assessment run if career changed
        if (!assessment || assessment.careerGoal !== formData.careerGoal) {
          setCompletedTasks([]);
          setProjectStatuses({});
        }

        showToast(
          response.source === 'demo'
            ? 'Loaded sample analysis in Demo Mode.'
            : 'Personalized AI Career Plan generated with Gemini!',
          response.source === 'demo' ? 'info' : 'success'
        );

        setActiveTab('analysis');
      } else {
        throw new Error('Received invalid data from server.');
      }
    } catch (err) {
      console.error('Assessment submission error:', err);
      setError({
        message: err.message,
        code: err.code,
        canUseDemo: err.canUseDemo
      });
      showToast(err.message, 'error');
      throw err;
    } finally {
      setLoading(false);
      setLoadingStage('');
    }
  };

  // Toggle a roadmap task completed
  const toggleTask = (taskId) => {
    setCompletedTasks((prev) => {
      const isCompleted = prev.includes(taskId);
      const next = isCompleted
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId];
      
      showToast(
        isCompleted ? 'Task marked incomplete.' : 'Milestone completed! Great job! 🎉',
        isCompleted ? 'info' : 'success'
      );
      return next;
    });
  };

  // Set project status ('Not Started' | 'In Progress' | 'Completed')
  const setProjectStatus = (projectId, status) => {
    setProjectStatuses((prev) => ({
      ...prev,
      [projectId]: status
    }));
    showToast(`Project status updated to ${status}.`, 'info');
  };

  // Clear all data and reset to fresh state
  const resetAllData = () => {
    setAssessment(null);
    setAnalysis(null);
    setCompletedTasks([]);
    setProjectStatuses({});
    localStorage.removeItem('skillpath_assessment');
    localStorage.removeItem('skillpath_analysis');
    localStorage.removeItem('skillpath_completed_tasks');
    localStorage.removeItem('skillpath_project_statuses');
    setActiveTab('dashboard');
    showToast('All stored data and progress have been reset.', 'info');
  };

  // Quick helper to load sample Frontend Developer demo
  const loadDemoSample = async (careerGoal = 'Frontend Developer') => {
    const demoPayload = {
      name: 'Alex Rivera',
      educationLevel: 'Undergraduate Student',
      fieldOfStudy: 'Computer Science',
      careerGoal,
      currentSkills: [
        { skill: 'HTML & CSS', level: 'Intermediate' },
        { skill: 'JavaScript', level: 'Basic' },
        { skill: 'Git', level: 'Basic' },
        { skill: 'React', level: 'Beginner' }
      ],
      dailyStudyHours: 2,
      learningDurationWeeks: 8,
      learningStyle: 'Practical projects',
      additionalNotes: 'Aiming for a junior frontend engineer role.'
    };

    return await submitAssessment(demoPayload, true);
  };

  // Derived progress analytics
  const stats = useMemo(() => {
    if (!analysis) {
      return {
        hasData: false,
        totalTasks: 0,
        completedTasksCount: 0,
        taskPercentage: 0,
        totalHours: 0,
        completedHours: 0,
        totalProjects: 0,
        completedProjectsCount: 0,
        inProgressProjectsCount: 0,
        overallProgress: 0,
        skillsCount: 0,
        strongSkillsCount: 0,
        needsImprovementCount: 0,
        missingSkillsCount: 0,
        highImportanceCount: 0,
        allTasks: []
      };
    }

    const allTasks = [];
    let totalHours = 0;
    let completedHours = 0;

    if (Array.isArray(analysis.roadmap)) {
      analysis.roadmap.forEach((phase) => {
        if (Array.isArray(phase.tasks)) {
          phase.tasks.forEach((t) => {
            const isDone = completedTasks.includes(t.id);
            const hours = Number(t.estimatedHours) || 4;
            totalHours += hours;
            if (isDone) completedHours += hours;
            allTasks.push({
              ...t,
              phaseTitle: phase.title,
              phaseNumber: phase.phase,
              isCompleted: isDone
            });
          });
        }
      });
    }

    const totalTasks = allTasks.length;
    const completedTasksCount = completedTasks.filter((id) =>
      allTasks.some((t) => t.id === id)
    ).length;

    const taskPercentage = totalTasks > 0 ? Math.round((completedTasksCount / totalTasks) * 100) : 0;

    const projects = Array.isArray(analysis.projects) ? analysis.projects : [];
    const totalProjects = projects.length;
    let completedProjectsCount = 0;
    let inProgressProjectsCount = 0;

    projects.forEach((p) => {
      const st = projectStatuses[p.id] || 'Not Started';
      if (st === 'Completed') completedProjectsCount++;
      if (st === 'In Progress') inProgressProjectsCount++;
    });

    // Weighted overall progress: 75% tasks + 25% practical projects
    let overallProgress = taskPercentage;
    if (totalProjects > 0) {
      const projectPercentage = (completedProjectsCount / totalProjects) * 100;
      overallProgress = Math.round(taskPercentage * 0.75 + projectPercentage * 0.25);
    }

    // Skill counts
    const skills = Array.isArray(analysis.skillAnalysis) ? analysis.skillAnalysis : [];
    const skillsCount = skills.length;
    const strongSkillsCount = skills.filter((s) => s.status === 'Strong').length;
    const needsImprovementCount = skills.filter((s) => s.status === 'Needs Improvement').length;
    const missingSkillsCount = skills.filter((s) => s.status === 'Missing').length;
    const highImportanceCount = skills.filter((s) => s.importance === 'High').length;

    return {
      hasData: true,
      totalTasks,
      completedTasksCount,
      taskPercentage,
      totalHours,
      completedHours,
      totalProjects,
      completedProjectsCount,
      inProgressProjectsCount,
      overallProgress,
      skillsCount,
      strongSkillsCount,
      needsImprovementCount,
      missingSkillsCount,
      highImportanceCount,
      allTasks
    };
  }, [analysis, completedTasks, projectStatuses]);

  return (
    <AssessmentContext.Provider
      value={{
        activeTab,
        setActiveTab,
        assessment,
        analysis,
        completedTasks,
        projectStatuses,
        serverHealth,
        refreshHealth,
        loading,
        loadingStage,
        error,
        setError,
        toast,
        showToast,
        submitAssessment,
        toggleTask,
        setProjectStatus,
        resetAllData,
        loadDemoSample,
        stats
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};
