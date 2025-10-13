import React, { useState } from 'react';

interface ExportOptionsProps {
  documentation: { [path: string]: string };
  onClose: () => void;
}

export const ExportOptions: React.FC<ExportOptionsProps> = ({ documentation, onClose }) => {
  const [exportFormat, setExportFormat] = useState<'json' | 'markdown' | 'zip'>('json');

  const handleExport = () => {
    if (exportFormat === 'json') {
      const blob = new Blob([JSON.stringify(documentation, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'documentation.json';
      a.click();
    } else if (exportFormat === 'markdown') {
      const combined = Object.entries(documentation)
        .map(([path, content]) => `# ${path}\n\n${content}\n\n---\n\n`)
        .join('');
      const blob = new Blob([combined], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'documentation.md';
      a.click();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Export Documentation</h2>
        <div className="space-y-4 mb-6">
          <button
            onClick={() => setExportFormat('json')}
            className={`w-full p-4 rounded-lg border-2 text-left ${
              exportFormat === 'json' ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20' : 'border-gray-300'
            }`}
          >
            <div className="font-semibold">JSON Format</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Structured data format</div>
          </button>
          <button
            onClick={() => setExportFormat('markdown')}
            className={`w-full p-4 rounded-lg border-2 text-left ${
              exportFormat === 'markdown' ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20' : 'border-gray-300'
            }`}
          >
            <div className="font-semibold">Single Markdown</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Combined document</div>
          </button>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 border rounded-lg">Cancel</button>
          <button onClick={handleExport} className="flex-1 py-3 bg-cyan-500 text-white rounded-lg">
            Export
          </button>
        </div>
      </div>
    </div>
  );
};
