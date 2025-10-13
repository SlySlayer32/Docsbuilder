# Data Flow

## Overview

This document describes how data flows through the Docsbuilder application, from user input to generated documentation and export.

## Core Data Types

### 1. Interview Data

**Question Structure**
```typescript
interface Question {
  id: string;              // Unique identifier
  title: string;           // Question text
  description?: string;    // Optional explanation
  type: 'single' | 'multiple';  // Selection type
  options: SelectionOption[];   // Available choices
  allowDetails?: boolean;       // Enable text input
}
```

**Answer Structure**
```typescript
interface Answer {
  questionId: string;        // Links to question.id
  selectedOptions: string[]; // Selected option IDs
  details?: string;          // Additional text input
}
```

**Section Structure**
```typescript
interface Section {
  id: string;      // Section identifier
  title: string;   // Display name
  icon: string;    // Emoji or icon
  questions: Question[];  // Questions in section
}
```

### 2. Documentation Data

**Documentation Object**
```typescript
type Documentation = {
  [path: string]: string  // path -> markdown content
}

// Example:
{
  '/project/overview.md': '# Project Overview\n\n...',
  '/architecture/tech-stack.md': '# Tech Stack\n\n...',
  '/security/authentication.md': '# Authentication\n\n...'
}
```

## Complete Data Flow

### Phase 1: Application Initialization

```
App Start
    ↓
Load Static Data
    ├── interviewSections.ts
    ├── Component definitions
    └── Static assets
    ↓
Initialize State
    ├── currentView = 'landing'
    ├── isAuthenticated = false
    ├── documentation = {}
    └── projectName = 'My Project'
    ↓
Render Landing Page
```

### Phase 2: User Onboarding

```
User on Landing Page
    ↓
User Clicks "Get Started"
    ↓
handleGetStarted()
    ├── if authenticated → setCurrentView('dashboard')
    └── if not authenticated → setIsAuthModalOpen(true)
    ↓
User Authenticates (Mock)
    ↓
handleAuth(email, password, isSignUp)
    ├── setIsAuthenticated(true)
    └── setCurrentView('dashboard')
    ↓
Dashboard Rendered
```

### Phase 3: Template Selection (Optional)

```
User on Dashboard
    ↓
User Selects Template (or "Start from Scratch")
    ↓
handleStartProject(template?)
    ├── Store template selection (future)
    └── setCurrentView('interview')
    ↓
Interview Flow Rendered
```

### Phase 4: Interview Process

```
Interview Flow Initialized
    ↓
Load Questions
    ├── interviewSections loaded from data
    ├── Flatten to allQuestions array
    └── Set currentStep = 0
    ↓
Display Current Question
    ├── currentQuestion = allQuestions[currentStep]
    ├── currentAnswer = answers.find(a => a.questionId === currentQuestion.id)
    └── Render QuestionStep with question + currentAnswer
    ↓
User Selects Options
    ↓
onSelectionChange(selectedOptions)
    ↓
updateAnswer(selectedOptions, details)
    ├── Filter out old answer for this question
    ├── Create new answer object
    └── Update answers state
    ↓
User Clicks "Next"
    ↓
handleNext()
    ├── if currentStep < totalSteps - 1
    │   └── setCurrentStep(currentStep + 1)
    └── if last question
        └── onComplete(answers)
    ↓
Repeat until all questions answered
```

**Interview State Management**
```typescript
// InterviewFlow manages:
const [currentStep, setCurrentStep] = useState(0);
const [answers, setAnswers] = useState<Answer[]>([]);

// Answer updates are immutable:
const updateAnswer = (selectedOptions, details) => {
  // Remove old answer for this question
  const newAnswers = answers.filter(a => a.questionId !== currentQuestion.id);
  // Add new answer
  newAnswers.push({
    questionId: currentQuestion.id,
    selectedOptions,
    details: details || '',
  });
  setAnswers(newAnswers);
};
```

### Phase 5: Documentation Generation

```
Interview Complete
    ↓
AppLayout.handleInterviewComplete(answers: Answer[])
    ↓
Call generateDocumentation(answers, projectName)
    ↓
Document Generation Process:
    ├── Initialize docs = {}
    ├── Define helper functions
    │   ├── getAnswer(questionId) → Answer | undefined
    │   └── getOptionLabels(questionId, options) → string[]
    │
    ├── Generate /project/overview.md
    │   ├── Extract 'purpose' answer
    │   ├── Extract 'target-users' answer
    │   ├── Build markdown template
    │   └── docs['/project/overview.md'] = markdown
    │
    ├── Generate /architecture/tech-stack.md
    │   ├── Extract 'frontend' answer
    │   ├── Extract 'backend' answer
    │   ├── Extract 'database' answer
    │   ├── Build markdown template
    │   └── docs['/architecture/tech-stack.md'] = markdown
    │
    ├── Generate /security/authentication.md
    │   ├── Extract 'auth' answer
    │   ├── Build markdown template
    │   └── docs['/security/authentication.md'] = markdown
    │
    └── Generate /project/requirements.md
        ├── Build markdown template
        └── docs['/project/requirements.md'] = markdown
    ↓
Return docs: { [path: string]: string }
    ↓
AppLayout.setDocumentation(docs)
    ↓
AppLayout.setCurrentView('documentation')
    ↓
Documentation Viewer Rendered with docs
```

**Generation Logic Example**
```typescript
// Extract answer
const frontendAnswer = getAnswer('frontend');
// → { questionId: 'frontend', selectedOptions: ['react'], details: '' }

// Use in template
const techStackDoc = `
## Frontend
**Framework**: ${frontendAnswer?.selectedOptions[0] || 'React'}

Modern, component-based architecture with:
- TypeScript for type safety
- Responsive design with Tailwind CSS
...
`;
```

### Phase 6: Documentation Viewing

```
Documentation Viewer Initialized
    ↓
Build File Tree
    ├── Process documentation paths
    ├── Split paths into parts
    ├── Create hierarchical structure
    │   Example: '/project/overview.md'
    │   → { name: 'project', type: 'folder', children: [
    │        { name: 'overview.md', type: 'file', path: '/project/overview.md' }
    │      ]}
    └── Return tree structure
    ↓
Set Initial Selection
    ├── selectedPath = first path in documentation
    └── Render FileTree and MarkdownPreview
    ↓
User Clicks File in Tree
    ↓
onFileSelect(path)
    ↓
setSelectedPath(path)
    ↓
Re-render with new content
    ├── FileTree highlights new selection
    └── MarkdownPreview shows documentation[path]
```

**File Tree Building Algorithm**
```typescript
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
```

### Phase 7: Documentation Editing

```
User Clicks "Edit" Button
    ↓
handleEdit()
    ├── setEditContent(documentation[selectedPath])
    └── setIsEditing(true)
    ↓
Render Textarea with Content
    ↓
User Modifies Content
    ↓
onChange(e => setEditContent(e.target.value))
    ↓
User Clicks "Save"
    ↓
setIsEditing(false)
    ↓
Switch back to Preview Mode
    ↓
Preview shows documentation[selectedPath]
```

**Note**: Current implementation doesn't persist edits to `documentation` state. This is a known limitation for future enhancement.

### Phase 8: Documentation Export

```
User Clicks "Export" Button
    ↓
handleExport() (Basic)
    ├── Create JSON blob from documentation
    ├── Create download URL
    └── Trigger download
    ↓
Or User Opens Export Options Modal
    ↓
ExportOptions Component
    ├── User Selects Format
    │   ├── JSON → Export as JSON file
    │   ├── Markdown → Combine all docs into single file
    │   └── ZIP → Bundle all files (future)
    ├── Generate Blob
    ├── Create Download Link
    └── Trigger Download
```

**Export Format Examples**

**JSON Export**
```json
{
  "/project/overview.md": "# Project\n\n## Overview\n...",
  "/architecture/tech-stack.md": "# Tech Stack\n..."
}
```

**Markdown Export**
```markdown
# /project/overview.md

# Project

## Overview
...

---

# /architecture/tech-stack.md

# Tech Stack
...
```

## State Synchronization

### Parent-Child Communication

**Downward (Props)**
```
AppLayout
    ↓ currentView, handlers
Interview
    ↓ onComplete callback
InterviewFlow
    ↓ question, answer, handlers
QuestionStep
    ↓ question, selectedOptions
SelectionCard
```

**Upward (Callbacks)**
```
SelectionCard
    ↑ onClick(optionId)
QuestionStep
    ↑ onSelectionChange(options)
InterviewFlow
    ↑ onComplete(answers)
Interview
    ↑ handled by AppLayout
AppLayout
```

### Context Data Flow

**AppContext** (Sidebar State)
```
Provider (AppProvider)
    ↓ sidebarOpen, toggleSidebar
Consumer (any component)
    ↑ const { sidebarOpen, toggleSidebar } = useAppContext()
```

## Data Persistence

### Current State: No Persistence
- All data lives in React state
- Lost on page refresh
- No backend storage

### Future Implementation
```
Local State
    ↓
Supabase Client
    ↓
API Request
    ↓
Supabase Database
    ↓
Row Level Security
    ↓
Data Stored
```

## Data Validation

### Interview Validation
```
User Selects Option
    ↓
Check if answer exists
    ├── if answer.selectedOptions.length > 0
    │   └── Enable "Next" button
    └── if answer.selectedOptions.length === 0
        └── Disable "Next" button
```

### Export Validation
- No validation currently
- All documentation objects are valid markdown strings

## Performance Considerations

### Data Size
- Interview answers: ~1-5 KB
- Generated documentation: ~10-50 KB
- Total state size: < 100 KB (well within React limits)

### Update Frequency
- Interview: 1 update per question answer
- Documentation: 1 generation per interview completion
- Viewer: 1 update per file selection

### Optimization Opportunities
- Memoize file tree generation
- Cache markdown rendering
- Debounce edit input
- Lazy load large documents

## Error Handling

### Data Flow Error Points

1. **Question Loading**: Static data, unlikely to fail
2. **Answer Update**: Immutable pattern prevents issues
3. **Generation**: Safe with optional chaining and defaults
4. **File Tree Building**: Robust path splitting
5. **Export**: Browser API calls may fail (blocked downloads, etc.)

### Error Recovery
```typescript
// Example: Safe answer extraction
const getAnswer = (questionId: string) => 
  answers.find(a => a.questionId === questionId);

// Usage with fallback
const purposeAnswer = getAnswer('purpose');
const purposeText = purposeAnswer?.details || 'Default purpose text';
```

## Debugging Data Flow

### Useful Debug Points

1. **Interview Answers**: Add `console.log(answers)` in `InterviewFlow`
2. **Generation Input**: Log `answers` at start of `generateDocumentation`
3. **Generated Docs**: Log `docs` at end of `generateDocumentation`
4. **File Tree**: Log result of `buildFileTree()`
5. **Export**: Log blob and URL creation

### React DevTools
- Inspect `AppLayout` state for complete application state
- Track prop changes in component hierarchy
- Profile re-renders for performance issues

## Conclusion

Data flows unidirectionally through Docsbuilder, from user input to generated output. The linear workflow and immutable state updates make the data flow predictable and debuggable. Future enhancements will add persistence and real-time sync while maintaining this clear data flow pattern.
