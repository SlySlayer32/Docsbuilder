import React, { useState } from 'react';

interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileNode[];
}

interface FileTreeProps {
  files: FileNode[];
  selectedPath: string;
  onFileSelect: (path: string) => void;
}

const TreeNode: React.FC<{
  node: FileNode;
  level: number;
  selectedPath: string;
  onFileSelect: (path: string) => void;
}> = ({ node, level, selectedPath, onFileSelect }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const isSelected = selectedPath === node.path;

  return (
    <div>
      <div
        className={`flex items-center py-2 px-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded ${
          isSelected ? 'bg-cyan-50 dark:bg-cyan-900/20' : ''
        }`}
        style={{ paddingLeft: `${level * 20 + 12}px` }}
        onClick={() => {
          if (node.type === 'folder') {
            setIsExpanded(!isExpanded);
          } else {
            onFileSelect(node.path);
          }
        }}
      >
        {node.type === 'folder' && (
          <span className="mr-2">{isExpanded ? '📂' : '📁'}</span>
        )}
        {node.type === 'file' && <span className="mr-2">📄</span>}
        <span className="text-sm text-gray-700 dark:text-gray-300">{node.name}</span>
      </div>
      {node.type === 'folder' && isExpanded && node.children && (
        <div>
          {node.children.map(child => (
            <TreeNode
              key={child.path}
              node={child}
              level={level + 1}
              selectedPath={selectedPath}
              onFileSelect={onFileSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const FileTree: React.FC<FileTreeProps> = ({ files, selectedPath, onFileSelect }) => {
  return (
    <div className="bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto">
      {files.map(node => (
        <TreeNode
          key={node.path}
          node={node}
          level={0}
          selectedPath={selectedPath}
          onFileSelect={onFileSelect}
        />
      ))}
    </div>
  );
};
