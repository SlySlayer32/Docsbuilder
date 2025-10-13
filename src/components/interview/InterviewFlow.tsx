import React, { useState } from 'react';
import { interviewSections } from '../../data/interviewSections';
import { Answer } from '../../types/interview';
import { ProgressBar } from './ProgressBar';
import { QuestionStep } from './QuestionStep';

interface InterviewFlowProps {
  onComplete: (answers: Answer[]) => void;
}

export const InterviewFlow: React.FC<InterviewFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const allQuestions = interviewSections.flatMap(section => section.questions);
  const currentQuestion = allQuestions[currentStep];
  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);

  const handleNext = () => {
    if (currentStep < allQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateAnswer = (selectedOptions: string[], details?: string) => {
    const newAnswers = answers.filter(a => a.questionId !== currentQuestion.id);
    newAnswers.push({
      questionId: currentQuestion.id,
      selectedOptions,
      details: details || '',
    });
    setAnswers(newAnswers);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <ProgressBar
        currentStep={currentStep + 1}
        totalSteps={allQuestions.length}
        sections={interviewSections}
      />

      <QuestionStep
        question={currentQuestion}
        selectedOptions={currentAnswer?.selectedOptions || []}
        details={currentAnswer?.details || ''}
        onSelectionChange={(opts) => updateAnswer(opts, currentAnswer?.details)}
        onDetailsChange={(det) => updateAnswer(currentAnswer?.selectedOptions || [], det)}
      />

      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!currentAnswer?.selectedOptions.length}
          className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50"
        >
          {currentStep === allQuestions.length - 1 ? 'Generate Docs' : 'Next'}
        </button>
      </div>
    </div>
  );
};
