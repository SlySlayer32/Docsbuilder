import React from 'react';
import { InterviewFlow } from '../components/interview/InterviewFlow';
import { Answer } from '../types/interview';

interface InterviewProps {
  onComplete: (answers: Answer[]) => void;
}

export const Interview: React.FC<InterviewProps> = ({ onComplete }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto">
        <InterviewFlow onComplete={onComplete} />
      </div>
    </div>
  );
};
