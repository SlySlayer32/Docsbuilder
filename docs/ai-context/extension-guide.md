# Extension Guide for AI Assistants

## Introduction

This guide provides step-by-step instructions for AI assistants to extend Docsbuilder with new features. It covers common extension scenarios with concrete examples and checklists.

## Prerequisites

Before extending, understand:
1. Project architecture ([Architecture Docs](../architecture/system-overview.md))
2. Component patterns ([Component Overview](../components/overview.md))
3. Code style ([AI Guidelines](./ai-guidelines.md))
4. Common patterns ([Common Patterns](./common-patterns.md))

## Extension Scenarios

### 1. Adding a New Interview Question

**Scenario**: Add a question about API integration preferences

**Steps**:

1. **Open interview sections file**
   ```bash
   src/data/interviewSections.ts
   ```

2. **Choose or create section**
   - Add to existing section (e.g., 'tech' for technical questions)
   - Or create new section with unique `id`, `title`, and `icon`

3. **Add question object**
   ```typescript
   {
     id: 'api-integration',  // Unique ID
     title: 'What API integration do you need?',
     description: 'Select your primary API requirements',
     type: 'multiple',  // 'single' or 'multiple'
     options: [
       {
         id: 'rest',
         label: 'REST API',
         icon: '🔌',
         description: 'Traditional RESTful endpoints',
       },
       {
         id: 'graphql',
         label: 'GraphQL',
         icon: '📊',
         description: 'Flexible query language',
       },
       {
         id: 'websocket',
         label: 'WebSocket',
         icon: '🔄',
         description: 'Real-time bidirectional communication',
       },
     ],
     allowDetails: true,  // Enable text input for additional context
   }
   ```

4. **Test the question**
   - Run dev server: `npm run dev`
   - Navigate through interview
   - Verify question appears correctly
   - Test selection and details input

5. **Update documentation generator** (see next section)

**Checklist**:
- [ ] Unique question ID
- [ ] Clear, concise question text
- [ ] 4-8 well-labeled options
- [ ] Appropriate icons/emojis
- [ ] Helpful descriptions
- [ ] Correct type (single/multiple)
- [ ] Tested in browser

### 2. Extending Documentation Generator

**Scenario**: Generate API integration documentation from new question

**Steps**:

1. **Open doc generator**
   ```bash
   src/utils/docGenerator.ts
   ```

2. **Add documentation generation logic**
   ```typescript
   export const generateDocumentation = (answers: Answer[], projectName: string) => {
     const docs: { [path: string]: string } = {};
     
     // Helper function (already exists in docGenerator.ts)
     const getAnswer = (questionId: string) => 
       answers.find(a => a.questionId === questionId);
     
     // ... existing code ...
     
     // Get answer for new question
     const apiAnswer = getAnswer('api-integration');
     const selectedAPIs = apiAnswer?.selectedOptions || [];
     const apiDetails = apiAnswer?.details;
     
     // API type labels for display
     const apiLabels: { [key: string]: string } = {
       rest: 'REST API',
       graphql: 'GraphQL',
       websocket: 'WebSocket',
     };
     
     // Generate documentation
     docs['/api/integration.md'] = `# API Integration

## Overview

This document outlines the API integration strategy for ${projectName}.

## Selected Integration Methods

${selectedAPIs.length > 0 ? selectedAPIs.map(api => {
  const label = apiLabels[api] || api;
  return `### ${label}

Implementation details for ${label} integration...
`;
}).join('\n') : 'No API integration method selected.'}

${apiDetails ? `## Additional Requirements

${apiDetails}
` : ''}

## Implementation Steps

1. Set up API client
2. Configure authentication
3. Implement endpoints/queries
4. Add error handling
5. Test integration

## Best Practices

- Use environment variables for API keys
- Implement retry logic
- Cache responses when appropriate
- Monitor API usage and errors
`;

     return docs;
   };
   ```

3. **Test generation**
   - Complete interview with new question
   - Verify documentation is generated
   - Check markdown formatting
   - Ensure all content displays correctly

**Checklist**:
- [ ] Answer retrieved correctly
- [ ] Path follows convention (`/section/file.md`)
- [ ] Markdown properly formatted
- [ ] Handles empty/missing answers
- [ ] Uses optional chaining (`?.`)
- [ ] Provides default content
- [ ] Tested in viewer

### 3. Adding a New Page Component

**Scenario**: Add a "Templates" page for project templates

**Steps**:

1. **Create page component**
   ```bash
   src/pages/Templates.tsx
   ```
   
   ```typescript
   import React from 'react';
   import { TemplateCard } from '@/components/templates/TemplateCard';
   
   interface TemplatesProps {
     onSelectTemplate: (template: string) => void;
   }
   
   const templates = [
     { id: 'saas', name: 'SaaS Application', icon: '💼' },
     { id: 'ecommerce', name: 'E-commerce', icon: '🛍️' },
     // ... more templates
   ];
   
   export const Templates: React.FC<TemplatesProps> = ({ onSelectTemplate }) => {
     return (
       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 
         dark:from-gray-900 dark:to-gray-800">
         <div className="container mx-auto px-4 py-12">
           <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
             Choose a Template
           </h1>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {templates.map(template => (
               <TemplateCard
                 key={template.id}
                 template={template}
                 onClick={() => onSelectTemplate(template.id)}
               />
             ))}
           </div>
         </div>
       </div>
     );
   };
   ```

2. **Add to AppLayout**
   ```typescript
   // In src/components/AppLayout.tsx
   
   type View = 'landing' | 'dashboard' | 'templates' | 'interview' | 'documentation';
   
   const [currentView, setCurrentView] = useState<View>('landing');
   
   const handleSelectTemplate = (template: string) => {
     setSelectedTemplate(template);
     setCurrentView('interview');
   };
   
   // In render
   {currentView === 'templates' && (
     <Templates onSelectTemplate={handleSelectTemplate} />
   )}
   ```

3. **Add navigation**
   ```typescript
   // In Dashboard or wherever navigation triggers
   <button onClick={() => setCurrentView('templates')}>
     Browse Templates
   </button>
   ```

4. **Test navigation**
   - Navigate to new page
   - Test all interactions
   - Verify back navigation works

**Checklist**:
- [ ] Page component created
- [ ] Props interface defined
- [ ] Added to View union type
- [ ] Integrated in AppLayout
- [ ] Navigation handlers added
- [ ] Styled consistently
- [ ] Dark mode support
- [ ] Responsive layout
- [ ] Tested in browser

### 4. Adding a UI Component

**Scenario**: Add a "Badge" component for status indicators

**Steps**:

1. **Check if shadcn/ui has it**
   ```bash
   # Check available components
   npx shadcn-ui@latest add badge
   ```

2. **If not available, create custom**
   ```bash
   src/components/ui/badge.tsx
   ```
   
   ```typescript
   import React from 'react';
   import { cn } from '@/lib/utils';
   
   interface BadgeProps {
     children: React.ReactNode;
     variant?: 'default' | 'success' | 'warning' | 'error';
     className?: string;
   }
   
   const variants = {
     default: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white',
     success: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400',
     warning: 'bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400',
     error: 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400',
   };
   
   export const Badge: React.FC<BadgeProps> = ({ 
     children, 
     variant = 'default',
     className 
   }) => {
     return (
       <span className={cn(
         'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
         variants[variant],
         className
       )}>
         {children}
       </span>
     );
   };
   ```

3. **Use in components**
   ```typescript
   import { Badge } from '@/components/ui/badge';
   
   <Badge variant="success">Active</Badge>
   <Badge variant="error">Failed</Badge>
   ```

**Checklist**:
- [ ] Component created or added via shadcn
- [ ] TypeScript interface defined
- [ ] Variants/props documented
- [ ] Dark mode support
- [ ] Uses cn() utility
- [ ] Exported properly
- [ ] Used in at least one place
- [ ] Tested visually

### 5. Adding State to AppLayout

**Scenario**: Add selected template state

**Steps**:

1. **Add state variable**
   ```typescript
   const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
   ```

2. **Pass to children**
   ```typescript
   <Interview 
     template={selectedTemplate}
     onComplete={handleInterviewComplete} 
   />
   ```

3. **Use in logic**
   ```typescript
   const handleInterviewComplete = (answers: Answer[]) => {
     const docs = generateDocumentation(
       answers, 
       projectName,
       selectedTemplate  // Pass template
     );
     setDocumentation(docs);
     setCurrentView('documentation');
   };
   ```

**Checklist**:
- [ ] State added with useState
- [ ] Initial value set
- [ ] Type specified
- [ ] Passed to relevant components
- [ ] Used in logic/handlers
- [ ] Tested state changes

### 6. Adding a Context

**Scenario**: Add ProjectContext for sharing project data

**Steps**:

1. **Create context file**
   ```bash
   src/contexts/ProjectContext.tsx
   ```
   
   ```typescript
   import React, { createContext, useContext, useState } from 'react';
   import type { Project } from '@/types/interview';
   
   interface ProjectContextType {
     currentProject: Project | null;
     setCurrentProject: (project: Project | null) => void;
     projects: Project[];
     addProject: (project: Project) => void;
   }
   
   const ProjectContext = createContext<ProjectContextType | undefined>(undefined);
   
   export const useProject = () => {
     const context = useContext(ProjectContext);
     if (!context) {
       throw new Error('useProject must be used within ProjectProvider');
     }
     return context;
   };
   
   export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
     const [currentProject, setCurrentProject] = useState<Project | null>(null);
     const [projects, setProjects] = useState<Project[]>([]);
     
     const addProject = (project: Project) => {
       setProjects(prev => [...prev, project]);
     };
     
     return (
       <ProjectContext.Provider value={{
         currentProject,
         setCurrentProject,
         projects,
         addProject,
       }}>
         {children}
       </ProjectContext.Provider>
     );
   };
   ```

2. **Wrap app with provider**
   ```typescript
   // In src/pages/Index.tsx or App.tsx
   import { ProjectProvider } from '@/contexts/ProjectContext';
   
   <ProjectProvider>
     <AppLayout />
   </ProjectProvider>
   ```

3. **Use in components**
   ```typescript
   import { useProject } from '@/contexts/ProjectContext';
   
   const { currentProject, setCurrentProject } = useProject();
   ```

**Checklist**:
- [ ] Context created
- [ ] Provider component implemented
- [ ] Custom hook created
- [ ] Type safety ensured
- [ ] Provider wraps app
- [ ] Used in components
- [ ] Tested context updates

## Common Pitfalls

### ❌ Don't: Break TypeScript

```typescript
// Bad
const data: any = getData();

// Good
interface Data {
  id: string;
  value: number;
}
const data: Data = getData();
```

### ❌ Don't: Forget Dark Mode

```typescript
// Bad
<div className="bg-white text-black">

// Good
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
```

### ❌ Don't: Mutate State

```typescript
// Bad
items.push(newItem);
setItems(items);

// Good
setItems([...items, newItem]);
```

### ❌ Don't: Hardcode Colors

```typescript
// Bad
<div style={{ color: '#06b6d4' }}>

// Good
<div className="text-cyan-500">
```

## Testing Extensions

After making changes:

1. **Build**: `npm run build`
2. **Lint**: `npm run lint`
3. **Visual**: Test in browser (light + dark mode)
4. **Responsive**: Test mobile, tablet, desktop
5. **Edge Cases**: Empty states, long text, etc.
6. **Navigation**: Test full user flow

## Documentation Updates

When extending:

1. Update relevant docs in `/docs/`
2. Add examples to common-patterns.md if new pattern
3. Update README if major feature
4. Add JSDoc comments to code

## Review Checklist

Before finalizing extension:

- [ ] TypeScript has no errors
- [ ] ESLint passes
- [ ] Dark mode works
- [ ] Responsive design works
- [ ] Edge cases handled
- [ ] Follows existing patterns
- [ ] Documentation updated
- [ ] Tested thoroughly
- [ ] No console.log left in code
- [ ] Comments added where needed

## Getting Help

If stuck:

1. Check similar existing code
2. Review [Common Patterns](./common-patterns.md)
3. Check [Architecture Docs](../architecture/)
4. Review [Component Docs](../components/)
5. Ask for clarification in issue/PR

## Conclusion

Extending Docsbuilder should be straightforward when following these patterns. The codebase is designed to be modular and extensible. Always match existing patterns, maintain type safety, and test thoroughly. When in doubt, reference similar existing code and documentation.
