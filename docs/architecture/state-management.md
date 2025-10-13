# State Management

## Overview

Docsbuilder uses a pragmatic state management approach combining React's built-in tools with minimal external dependencies. State is managed at appropriate levels based on scope and sharing needs.

## State Management Layers

```
┌────────────────────────────────────────┐
│         Application State              │
│    (AppLayout Component State)         │
│  - currentView                         │
│  - isAuthenticated                     │
│  - documentation                       │
│  - projectName                         │
└────────────────────────────────────────┘
                  ↕
┌────────────────────────────────────────┐
│          Context State                 │
│         (AppContext)                   │
│  - sidebarOpen                         │
│  - toggleSidebar                       │
└────────────────────────────────────────┘
                  ↕
┌────────────────────────────────────────┐
│         Component State                │
│        (Local useState)                │
│  - currentStep (InterviewFlow)         │
│  - answers (InterviewFlow)             │
│  - selectedPath (DocumentationViewer)  │
│  - isEditing (DocumentationViewer)     │
└────────────────────────────────────────┘
```

## Application State

### Location
`src/components/AppLayout.tsx`

### Purpose
Manages high-level application state that affects multiple views.

### State Variables

```typescript
const [currentView, setCurrentView] = useState<View>('landing');
// Controls which top-level view is displayed
// Values: 'landing' | 'dashboard' | 'interview' | 'documentation'

const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
// Controls authentication modal visibility

const [isAuthenticated, setIsAuthenticated] = useState(false);
// Tracks authentication status (currently mock)

const [documentation, setDocumentation] = useState<{ [path: string]: string }>({});
// Stores generated documentation
// Key: file path, Value: markdown content

const [projectName, setProjectName] = useState('My Project');
// Current project name for documentation
```

### State Updates

**View Navigation**
```typescript
// Landing → Dashboard
const handleGetStarted = () => {
  if (isAuthenticated) {
    setCurrentView('dashboard');
  } else {
    setIsAuthModalOpen(true);
  }
};

// Dashboard → Interview
const handleStartProject = (template?: string) => {
  setCurrentView('interview');
};

// Interview → Documentation
const handleInterviewComplete = (answers: Answer[]) => {
  const docs = generateDocumentation(answers, projectName);
  setDocumentation(docs);
  setCurrentView('documentation');
};
```

**Authentication**
```typescript
const handleAuth = (email: string, password: string, isSignUp: boolean) => {
  // Mock authentication - always succeeds
  setIsAuthenticated(true);
  setCurrentView('dashboard');
};
```

### Props Drilling

State and handlers are passed down to child views:

```typescript
<Landing onGetStarted={handleGetStarted} />
<Dashboard onStartProject={handleStartProject} />
<Interview onComplete={handleInterviewComplete} />
<Documentation documentation={documentation} onExport={handleExport} />
```

## Context State

### AppContext

**Location**: `src/contexts/AppContext.tsx`

**Purpose**: Share UI state across components without prop drilling.

**Implementation**:
```typescript
interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <AppContext.Provider value={{ sidebarOpen, toggleSidebar }}>
      {children}
    </AppContext.Provider>
  );
};
```

**Usage**:
```typescript
// In any component
const { sidebarOpen, toggleSidebar } = useAppContext();

// Toggle sidebar
<button onClick={toggleSidebar}>Menu</button>

// Conditional rendering
{sidebarOpen && <Sidebar />}
```

### Theme Context

**Location**: `src/components/theme-provider.tsx` (next-themes)

**Purpose**: Manage dark/light theme state and persistence.

**Implementation**:
```typescript
import { ThemeProvider as NextThemesProvider } from 'next-themes';

<ThemeProvider defaultTheme="light" storageKey="docsbuilder-theme">
  <App />
</ThemeProvider>
```

**Usage**:
```typescript
import { useTheme } from 'next-themes';

const { theme, setTheme } = useTheme();

// Toggle theme
<button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
  Toggle Theme
</button>
```

## Component State

### InterviewFlow State

**Location**: `src/components/interview/InterviewFlow.tsx`

**Purpose**: Manage interview progression and answers.

**State Variables**:
```typescript
const [currentStep, setCurrentStep] = useState(0);
// Current question index (0-based)

const [answers, setAnswers] = useState<Answer[]>([]);
// All answers collected so far
```

**State Updates**:
```typescript
// Navigate forward
const handleNext = () => {
  if (currentStep < allQuestions.length - 1) {
    setCurrentStep(currentStep + 1);
  } else {
    onComplete(answers); // Bubble up to AppLayout
  }
};

// Navigate backward
const handleBack = () => {
  if (currentStep > 0) {
    setCurrentStep(currentStep - 1);
  }
};

// Update answer (immutable)
const updateAnswer = (selectedOptions: string[], details?: string) => {
  const newAnswers = answers.filter(a => a.questionId !== currentQuestion.id);
  newAnswers.push({
    questionId: currentQuestion.id,
    selectedOptions,
    details: details || '',
  });
  setAnswers(newAnswers);
};
```

**Derived State**:
```typescript
const allQuestions = interviewSections.flatMap(section => section.questions);
const currentQuestion = allQuestions[currentStep];
const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);
```

### DocumentationViewer State

**Location**: `src/components/docs/DocumentationViewer.tsx`

**Purpose**: Manage file navigation and editing state.

**State Variables**:
```typescript
const [selectedPath, setSelectedPath] = useState(Object.keys(documentation)[0]);
// Currently displayed file path

const [isEditing, setIsEditing] = useState(false);
// Edit mode toggle

const [editContent, setEditContent] = useState('');
// Content being edited
```

**State Updates**:
```typescript
// File selection
<FileTree onFileSelect={setSelectedPath} />

// Edit mode
const handleEdit = () => {
  setEditContent(documentation[selectedPath]);
  setIsEditing(true);
};

// Save edit
const handleSave = () => {
  setIsEditing(false);
  // Note: Currently doesn't persist to documentation object
};
```

### QuestionStep State

**Location**: `src/components/interview/QuestionStep.tsx`

**Purpose**: Manage individual question interaction.

**State Variables**:
```typescript
// Controlled by parent (InterviewFlow)
const [selectedOptions, onSelectionChange] = useState<string[]>([]);
const [details, onDetailsChange] = useState<string>('');
```

**Pattern**: Controlled component (state lifted to parent)

```typescript
// In InterviewFlow
<QuestionStep
  question={currentQuestion}
  selectedOptions={currentAnswer?.selectedOptions || []}
  details={currentAnswer?.details || ''}
  onSelectionChange={(opts) => updateAnswer(opts, currentAnswer?.details)}
  onDetailsChange={(det) => updateAnswer(currentAnswer?.selectedOptions || [], det)}
/>
```

## State Patterns

### 1. Lifting State Up

When state needs to be shared between siblings, lift it to the common parent.

```typescript
// ❌ Bad: State in both siblings
const Sibling1 = () => {
  const [sharedData, setSharedData] = useState();
};

const Sibling2 = () => {
  const [sharedData, setSharedData] = useState();
};

// ✅ Good: State in parent
const Parent = () => {
  const [sharedData, setSharedData] = useState();
  
  return (
    <>
      <Sibling1 data={sharedData} onChange={setSharedData} />
      <Sibling2 data={sharedData} />
    </>
  );
};
```

### 2. Immutable Updates

Always create new objects/arrays instead of mutating.

```typescript
// ❌ Bad: Mutating state
const updateAnswer = () => {
  answers.push(newAnswer);
  setAnswers(answers);
};

// ✅ Good: Immutable update
const updateAnswer = () => {
  setAnswers([...answers, newAnswer]);
};

// Or
const updateAnswer = () => {
  const newAnswers = answers.filter(a => a.id !== id);
  newAnswers.push(newAnswer);
  setAnswers(newAnswers);
};
```

### 3. Derived State

Calculate values from existing state instead of storing duplicates.

```typescript
// ❌ Bad: Storing derived state
const [allQuestions, setAllQuestions] = useState([]);
const [currentQuestion, setCurrentQuestion] = useState(null);

// ✅ Good: Computing derived state
const allQuestions = interviewSections.flatMap(s => s.questions);
const currentQuestion = allQuestions[currentStep];
```

### 4. Controlled Components

Parent controls component state via props.

```typescript
interface ControlledInputProps {
  value: string;
  onChange: (value: string) => void;
}

const ControlledInput: React.FC<ControlledInputProps> = ({ value, onChange }) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

// Usage
const Parent = () => {
  const [text, setText] = useState('');
  return <ControlledInput value={text} onChange={setText} />;
};
```

### 5. Callback Memoization

Prevent unnecessary re-renders with useCallback (future optimization).

```typescript
import { useCallback } from 'react';

const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);
```

## State Persistence

### Current Implementation

**No Persistence**: All state is lost on page refresh.

### Future Implementation

**LocalStorage** (for client-side persistence):
```typescript
// Save state
useEffect(() => {
  localStorage.setItem('docsbuilder-state', JSON.stringify(state));
}, [state]);

// Load state
useEffect(() => {
  const saved = localStorage.getItem('docsbuilder-state');
  if (saved) {
    setState(JSON.parse(saved));
  }
}, []);
```

**Supabase** (for cloud persistence):
```typescript
// Save to database
const saveProject = async (project: Project) => {
  const { data, error } = await supabase
    .from('projects')
    .insert([project]);
};

// Load from database
const loadProject = async (id: string) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();
};
```

## State Debugging

### React DevTools

1. Install React DevTools browser extension
2. Open DevTools → Components tab
3. Inspect component state and props
4. Track state changes in real-time

### Console Logging

```typescript
// Add useEffect to log state changes
useEffect(() => {
  console.log('Current state:', { currentView, answers, documentation });
}, [currentView, answers, documentation]);
```

### Redux DevTools (Future)

If using Redux or similar:
```typescript
import { devToolsEnhancer } from 'redux-devtools-extension';
```

## State Management Anti-Patterns

### ❌ Don't: Sync State Between Components
```typescript
// Bad: Duplicating state
const Parent = () => {
  const [data, setData] = useState();
  return <Child initialData={data} />;
};

const Child = ({ initialData }) => {
  const [data, setData] = useState(initialData); // Duplicate!
};
```

### ✅ Do: Single Source of Truth
```typescript
// Good: One source of truth
const Parent = () => {
  const [data, setData] = useState();
  return <Child data={data} onChange={setData} />;
};
```

### ❌ Don't: Store Derived Data
```typescript
// Bad: Storing computed values
const [items, setItems] = useState([]);
const [count, setCount] = useState(0); // Derived from items!
```

### ✅ Do: Compute Derived Data
```typescript
// Good: Compute on render
const [items, setItems] = useState([]);
const count = items.length;
```

### ❌ Don't: Mutate State Directly
```typescript
// Bad: Mutation
state.value = newValue;
setState(state);
```

### ✅ Do: Create New Objects
```typescript
// Good: Immutable update
setState({ ...state, value: newValue });
```

## Future State Management

### When to Consider Redux/Zustand

Consider more robust state management when:
- State becomes complex (many nested objects)
- Many components need the same state
- State updates come from multiple sources
- Need time-travel debugging
- Need middleware (logging, persistence)

### Potential Migration Path

1. Start with Context for global UI state
2. Add React Query for server state
3. Evaluate Redux/Zustand if complexity grows
4. Keep component state local when possible

## Performance Considerations

### Re-render Optimization

**Current**: Minimal optimization needed (app is fast)

**Future Optimizations**:
- `useMemo` for expensive computations
- `useCallback` for stable function references
- `React.memo` for pure components
- Code splitting for large components

### State Update Batching

React automatically batches state updates in event handlers:
```typescript
const handleClick = () => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // Both updates batched into single re-render
};
```

## Testing State

### Unit Testing State Logic

```typescript
import { renderHook, act } from '@testing-library/react-hooks';

test('updates answer', () => {
  const { result } = renderHook(() => useInterviewState());
  
  act(() => {
    result.current.updateAnswer('question-1', ['option-1']);
  });
  
  expect(result.current.answers).toHaveLength(1);
});
```

### Integration Testing State Flow

```typescript
import { render, fireEvent } from '@testing-library/react';

test('completes interview flow', () => {
  const onComplete = jest.fn();
  const { getByText } = render(<InterviewFlow onComplete={onComplete} />);
  
  // Answer questions...
  fireEvent.click(getByText('Next'));
  
  expect(onComplete).toHaveBeenCalledWith(expect.any(Array));
});
```

## Conclusion

Docsbuilder's state management is intentionally simple, using React's built-in tools effectively. State is managed at appropriate levels: component state for local concerns, Context for cross-cutting UI state, and AppLayout state for application-wide data. This approach provides the right balance of simplicity and scalability for the current application needs, with a clear path for enhancement as requirements grow.
