# AI Guidelines for Docsbuilder

## Introduction

This document provides specific guidance for AI assistants (like GitHub Copilot, ChatGPT, Claude, etc.) working on the Docsbuilder codebase. It complements the `.github/copilot-instructions.md` file with detailed patterns, examples, and decision-making frameworks.

## Understanding the Codebase

### Mental Model for AI

Think of Docsbuilder as:
```
Linear User Journey → Structured Data Collection → Template-Based Generation → Interactive Viewing
```

**Key Insight**: The app transforms user selections into markdown documentation through a predictable pipeline.

### Core Data Transformations

```
User Clicks → Answer Object → Documentation Object → Markdown String → Visual Display
```

Each step is:
- **Deterministic**: Same input → Same output
- **Immutable**: State updates create new objects
- **Type-safe**: TypeScript enforces contracts

## AI-Friendly Code Patterns

### 1. Component Creation Pattern

When creating a new component, follow this template:

```typescript
import React from 'react';

interface [ComponentName]Props {
  // Required props first
  data: DataType;
  onAction: (value: string) => void;
  
  // Optional props with ?
  className?: string;
  disabled?: boolean;
}

/**
 * [Brief description of what this component does]
 * 
 * @example
 * <ComponentName data={data} onAction={handleAction} />
 */
export const [ComponentName]: React.FC<[ComponentName]Props> = ({
  data,
  onAction,
  className,
  disabled = false,
}) => {
  // Local state
  const [localState, setLocalState] = React.useState(initialValue);
  
  // Event handlers
  const handleClick = () => {
    // Logic here
    onAction(value);
  };
  
  // Render
  return (
    <div className={cn('base-classes', className)}>
      {/* JSX here */}
    </div>
  );
};
```

### 2. State Update Pattern

Always use immutable updates:

```typescript
// ❌ DON'T: Mutate state
answers.push(newAnswer);
setAnswers(answers);

// ✅ DO: Create new array
setAnswers([...answers, newAnswer]);

// ✅ DO: Filter and add
const newAnswers = answers.filter(a => a.id !== id);
newAnswers.push(updatedAnswer);
setAnswers(newAnswers);

// ✅ DO: Map to update
setAnswers(answers.map(a => 
  a.id === id ? { ...a, ...updates } : a
));
```

### 3. Documentation Generator Extension Pattern

To add a new documentation file:

```typescript
// In src/utils/docGenerator.ts

export const generateDocumentation = (answers: Answer[], projectName: string) => {
  const docs: { [path: string]: string } = {};
  
  // Helper functions at top
  const getAnswer = (questionId: string) => 
    answers.find(a => a.questionId === questionId);
  
  // ... existing docs generation ...
  
  // Add your new documentation
  const yourAnswer = getAnswer('your-question-id');
  
  docs['/your-section/your-file.md'] = `# Your Title

## Section

${yourAnswer?.details || 'Default content'}

## Another Section

- Point 1
- Point 2
- Point 3
`;

  return docs;
};
```

### 4. Interview Question Addition Pattern

To add a new question:

```typescript
// In src/data/interviewSections.ts

export const interviewSections: Section[] = [
  {
    id: 'section-id',
    title: 'Section Title',
    icon: '🎯',
    questions: [
      // ... existing questions ...
      {
        id: 'your-question-id',  // Must be unique
        title: 'Your question text?',
        description: 'Optional explanation',
        type: 'single',  // or 'multiple'
        options: [
          {
            id: 'option-1',
            label: 'Option Label',
            icon: '📱',  // Optional emoji
            description: 'Optional description',
          },
          // ... more options ...
        ],
        allowDetails: true,  // Enable text input
      },
    ],
  },
];
```

## Decision-Making Framework

### When to Create a New Component

Create a new component if:
- ✅ Logic/markup is reused in 2+ places
- ✅ Component is complex (>100 lines)
- ✅ Component has distinct responsibility
- ✅ Component benefits from isolated state

Keep inline if:
- ❌ Used only once
- ❌ Very simple (<20 lines)
- ❌ Tightly coupled to parent
- ❌ No reusability potential

### When to Use Context vs Props

**Use Context when**:
- Data needed by many components
- Deeply nested component access
- Global UI state (theme, sidebar)

**Use Props when**:
- Parent-child relationship
- 1-2 levels deep
- Clear data flow desired

### When to Extract to Utility Function

Extract to `utils/` if:
- ✅ Pure function (no side effects)
- ✅ Reusable logic
- ✅ Complex transformation
- ✅ Testable independently

Example:
```typescript
// utils/helpers.ts
export const formatDocPath = (path: string): string => {
  return path.startsWith('/') ? path : `/${path}`;
};
```

## Common AI Mistakes to Avoid

### 1. Over-Engineering

```typescript
// ❌ DON'T: Add unnecessary abstractions
class DocumentGenerator {
  private strategy: GenerationStrategy;
  constructor(strategy: GenerationStrategy) { }
  generate() { }
}

// ✅ DO: Keep it simple
export const generateDocumentation = (answers, name) => {
  // Direct implementation
};
```

### 2. Breaking Existing Patterns

```typescript
// ❌ DON'T: Mix patterns
const MyComponent = ({ data }) => {
  return <div>{data}</div>;
};

// ✅ DO: Match existing style
export const MyComponent: React.FC<MyComponentProps> = ({ data }) => {
  return <div>{data}</div>;
};
```

### 3. Forgetting Dark Mode

```typescript
// ❌ DON'T: Light mode only
<div className="bg-white text-black">

// ✅ DO: Include dark mode
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
```

### 4. Ignoring TypeScript

```typescript
// ❌ DON'T: Use any
const data: any = getData();

// ✅ DO: Define proper types
interface Data {
  id: string;
  value: number;
}
const data: Data = getData();
```

### 5. Not Handling Edge Cases

```typescript
// ❌ DON'T: Assume data exists
const name = user.profile.name;

// ✅ DO: Use optional chaining
const name = user?.profile?.name || 'Guest';
```

## AI Code Generation Best Practices

### 1. Always Include Types

```typescript
// When generating a function
export const myFunction = (
  param1: string,
  param2: number
): ReturnType => {
  // Implementation
};
```

### 2. Include Error Handling

```typescript
// Wrap risky operations
try {
  const data = JSON.parse(input);
  return processData(data);
} catch (error) {
  console.error('Failed to process:', error);
  return defaultValue;
}
```

### 3. Add Comments for Complex Logic

```typescript
// Calculate progress as percentage
// Each section has equal weight, progress within section is interpolated
const progress = Math.floor(
  ((currentSection + (currentStep / totalStepsInSection)) / totalSections) * 100
);
```

### 4. Provide Examples in JSDoc

```typescript
/**
 * Formats a file path for display
 * 
 * @param path - The file path to format
 * @returns Formatted path string
 * 
 * @example
 * formatPath('/project/overview.md') // → 'project/overview.md'
 */
export const formatPath = (path: string): string => {
  return path.replace(/^\//, '');
};
```

## AI Testing Strategies

### Manual Testing Checklist

When AI generates code, test:

1. **Functionality**: Does it work as expected?
2. **Types**: No TypeScript errors?
3. **Dark Mode**: Does it look good in both themes?
4. **Responsive**: Works on mobile and desktop?
5. **Edge Cases**: Handles empty/null/undefined?
6. **Build**: `npm run build` succeeds?
7. **Lint**: `npm run lint` passes?

### Example Test Cases

```typescript
// Test the function with various inputs
formatPath('/path/to/file.md');    // Normal case
formatPath('path/to/file.md');     // No leading slash
formatPath('');                     // Empty string
formatPath('/');                    // Root
formatPath(undefined);              // Edge case (should handle)
```

## AI-Assisted Debugging

### Debug Process

1. **Identify**: What's the error message?
2. **Locate**: Which file/component?
3. **Reproduce**: Can you reproduce it?
4. **Isolate**: Simplify to minimal case
5. **Fix**: Apply targeted fix
6. **Verify**: Test the fix works

### Common Fixes

**Type Error**:
```typescript
// Error: Type 'string' is not assignable to type 'number'
// Fix: Update type or convert value
const value: number = parseInt(stringValue, 10);
```

**Undefined Error**:
```typescript
// Error: Cannot read property 'x' of undefined
// Fix: Add optional chaining
const value = obj?.property?.nested;
```

**Hook Error**:
```typescript
// Error: Hooks can only be called inside function body
// Fix: Move hook to component body
const MyComponent = () => {
  const [state, setState] = useState(); // ✅ Correct location
  
  const handler = () => {
    // Not here ❌
  };
};
```

## AI Code Review Checklist

Before committing AI-generated code:

- [ ] TypeScript types are correct and not `any`
- [ ] Dark mode classes included (`dark:`)
- [ ] Responsive design considered
- [ ] Props interface defined
- [ ] JSDoc comments for complex functions
- [ ] Error handling for edge cases
- [ ] Consistent with existing patterns
- [ ] No console.log statements (use for debug only)
- [ ] Build succeeds (`npm run build`)
- [ ] Lint passes (`npm run lint`)

## AI Context Refresh

If AI seems confused, provide this context:

```
You're working on Docsbuilder, a React + TypeScript app that generates 
project documentation through an interview process. Key files:
- src/components/AppLayout.tsx - Main app orchestrator
- src/utils/docGenerator.ts - Documentation generator
- src/data/interviewSections.ts - Questions
- src/types/interview.ts - Type definitions

Use Tailwind for styling with dark mode support. Follow existing patterns 
in similar components. TypeScript strict mode is enabled.
```

## AI Prompt Templates

### For Adding a Feature

```
Add [feature name] to Docsbuilder. Requirements:
1. [Requirement 1]
2. [Requirement 2]

Context:
- Location: src/components/[feature]/
- Similar to: [existing similar feature]
- Must support: dark mode, TypeScript, responsive

Follow existing patterns in [reference file].
```

### For Fixing a Bug

```
Fix bug in [component]: [description]

Error: [error message]

Expected behavior: [description]
Actual behavior: [description]

File: src/components/[path]
```

### For Refactoring

```
Refactor [component/function] to [goal].

Current implementation: [description]
Desired: [description]

Constraints:
- Maintain existing API
- Keep types strict
- No breaking changes
```

## AI Learning Resources

To understand Docsbuilder better, AI should study:

1. **Type Definitions** (`src/types/interview.ts`)
   - Understand core data structures

2. **AppLayout** (`src/components/AppLayout.tsx`)
   - See how app state is managed

3. **docGenerator** (`src/utils/docGenerator.ts`)
   - Understand documentation generation

4. **Interview Flow** (`src/components/interview/InterviewFlow.tsx`)
   - See state management in action

5. **Documentation Viewer** (`src/components/docs/DocumentationViewer.tsx`)
   - Understand complex component patterns

## Conclusion

AI assistants working on Docsbuilder should:
- Follow existing patterns strictly
- Use TypeScript properly (no `any`)
- Include dark mode in all styling
- Test before committing
- Keep code simple and maintainable
- Document complex logic
- Handle edge cases gracefully

When in doubt, reference existing similar code and match its style exactly. The codebase is intentionally simple and consistent - maintain that simplicity.

Remember: This project generates documentation for others. Our code should be exemplary - clear, well-documented, and maintainable. AI-generated code should meet the same standards as human-written code.
