import React from 'react';
import { ComponentSelector } from '../components/boilerplate/ComponentSelector';
import { TechStack } from '../types/components';

interface ComponentSelectionProps {
  onComplete: (componentIds: string[], techStack: TechStack) => void;
}

export const ComponentSelection: React.FC<ComponentSelectionProps> = ({ onComplete }) => {
  return <ComponentSelector onGenerate={onComplete} />;
};
