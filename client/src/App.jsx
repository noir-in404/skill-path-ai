import React, { useState } from 'react';
import { AssessmentProvider, useAssessment } from './context/AssessmentContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ApiKeyModal } from './components/ApiKeyModal';
import { Toast } from './components/Toast';

import { DashboardPage } from './pages/DashboardPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { SkillGapPage } from './pages/SkillGapPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { ProgressPage } from './pages/ProgressPage';

const AppContent = () => {
  const { activeTab, toast } = useAssessment();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [apiModalOpen, setApiModalOpen] = useState(false);

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'assessment':
        return <AssessmentPage />;
      case 'analysis':
        return <SkillGapPage />;
      case 'roadmap':
        return <RoadmapPage />;
      case 'progress':
        return <ProgressPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen flex bg-surface text-charcoal">
      {/* Left Sidebar */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Navbar */}
        <Header
          onOpenMobileNav={() => setMobileOpen(true)}
          onOpenApiModal={() => setApiModalOpen(true)}
        />

        {/* Dynamic Page Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderActivePage()}
        </main>
      </div>

      {/* API Key Instructions Modal */}
      <ApiKeyModal
        isOpen={apiModalOpen}
        onClose={() => setApiModalOpen(false)}
      />

      {/* Toast Notification Container */}
      <Toast toast={toast} />
    </div>
  );
};

export default function App() {
  return (
    <AssessmentProvider>
      <AppContent />
    </AssessmentProvider>
  );
}
