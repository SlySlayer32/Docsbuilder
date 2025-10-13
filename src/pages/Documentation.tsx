import React from 'react';
import { DocumentationViewer } from '../components/docs/DocumentationViewer';

interface DocumentationProps {
  documentation: { [path: string]: string };
  onExport: () => void;
}

export const Documentation: React.FC<DocumentationProps> = ({ documentation, onExport }) => {
  return (
    <div className="h-screen">
      <DocumentationViewer documentation={documentation} onExport={onExport} />
    </div>
  );
};
