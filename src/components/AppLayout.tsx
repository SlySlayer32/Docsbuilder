import React, { useState } from 'react';
import { Landing } from '../pages/Landing';
import { Dashboard } from '../pages/Dashboard';
import { Interview } from '../pages/Interview';
import { Documentation } from '../pages/Documentation';
import { AuthModal } from './auth/AuthModal';
import { DarkModeToggle } from './common/DarkModeToggle';
import { generateDocumentation } from '../utils/docGenerator';
import { Answer } from '../types/interview';

type View = 'landing' | 'dashboard' | 'interview' | 'documentation';


export default function AppLayout() {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [documentation, setDocumentation] = useState<{ [path: string]: string }>({});
  const [projectName, setProjectName] = useState('My Project');

  const handleGetStarted = () => {
    if (isAuthenticated) {
      setCurrentView('dashboard');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleAuth = (email: string, password: string, isSignUp: boolean) => {
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleStartProject = (template?: string) => {
    setCurrentView('interview');
  };

  const handleInterviewComplete = (answers: Answer[]) => {
    console.log('🎯 [AppLayout] Interview complete, generating documentation...');
    console.log('📋 [AppLayout] Answers:', answers);
    const docs = generateDocumentation(answers, projectName);
    console.log('📦 [AppLayout] Received docs object with', Object.keys(docs).length, 'files');
    setDocumentation(docs);
    setCurrentView('documentation');
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(documentation, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'documentation.json';
    a.click();
  };

  return (
    <>
      <DarkModeToggle />
      {currentView === 'landing' && <Landing onGetStarted={handleGetStarted} />}
      {currentView === 'dashboard' && <Dashboard onStartProject={handleStartProject} />}
      {currentView === 'interview' && <Interview onComplete={handleInterviewComplete} />}
      {currentView === 'documentation' && (
        <Documentation documentation={documentation} onExport={handleExport} />
      )}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuth={handleAuth}
      />
    </>
  );
}

