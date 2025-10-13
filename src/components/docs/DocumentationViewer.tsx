import React, { useState } from 'react';
import { FileTree } from './FileTree';
import { MarkdownPreview } from './MarkdownPreview';

interface DocumentationViewerProps {
  documentation: { [path: string]: string };
  onExport: () => void;
}

export const DocumentationViewer: React.FC<DocumentationViewerProps> = ({
  documentation,
  onExport,
}) => {
  const [selectedPath, setSelectedPath] = useState(Object.keys(documentation)[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');

  const buildFileTree = () => {
    const root: any[] = [];
    Object.keys(documentation).forEach(path => {
      const parts = path.split('/').filter(p => p);
      let current = root;
      parts.forEach((part, idx) => {
        let existing = current.find((n: any) => n.name === part);
        if (!existing) {
          existing = {
            name: part,
            path: '/' + parts.slice(0, idx + 1).join('/'),
            type: idx === parts.length - 1 ? 'file' : 'folder',
            children: [],
          };
          current.push(existing);
        }
        current = existing.children;
      });
    });
    return root;
  };

  const handleEdit = () => {
    setEditContent(documentation[selectedPath]);
    setIsEditing(true);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Documentation Viewer</h1>
        <div className="flex gap-3">
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
          >
            Edit
          </button>
          <button
            onClick={onExport}
            className="px-4 py-2 bg-cyan-500 rounded-lg hover:bg-cyan-600"
          >
            Export
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-64">
          <FileTree
            files={buildFileTree()}
            selectedPath={selectedPath}
            onFileSelect={setSelectedPath}
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {isEditing ? (
            <div className="p-4">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full h-96 p-4 font-mono text-sm border rounded"
              />
              <button
                onClick={() => setIsEditing(false)}
                className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <MarkdownPreview content={documentation[selectedPath] || ''} />
          )}
        </div>
      </div>
    </div>
  );
};
