# Component Overview

## Introduction

Docsbuilder components follow a modular, hierarchical structure organized by feature and responsibility. This document provides a comprehensive overview of all components in the application.

## Component Architecture

### Directory Structure

```
src/components/
├── auth/                    # Authentication components
│   └── AuthModal.tsx
├── common/                  # Shared/reusable components
│   ├── DarkModeToggle.tsx
│   └── Navbar.tsx
├── dashboard/               # Dashboard-specific components
│   └── ProjectCard.tsx
├── docs/                    # Documentation viewer components
│   ├── DocumentationViewer.tsx
│   ├── ExportOptions.tsx
│   ├── FileTree.tsx
│   ├── MarkdownPreview.tsx
│   └── SearchBar.tsx
├── interview/               # Interview flow components
│   ├── InterviewFlow.tsx
│   ├── ProgressBar.tsx
│   ├── QuestionStep.tsx
│   ├── SectionProgress.tsx
│   └── SelectionCard.tsx
├── landing/                 # Landing page sections
│   ├── CTA.tsx
│   ├── Features.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── HowItWorks.tsx
│   └── Stats.tsx
├── templates/               # Template selection components
│   └── TemplateCard.tsx
├── theme-provider.tsx       # Theme context provider
└── ui/                      # shadcn/ui component library
    ├── accordion.tsx
    ├── alert.tsx
    ├── button.tsx
    ├── card.tsx
    ├── dialog.tsx
    └── ... (30+ components)
```

## Component Categories

### 1. Page-Level Components

**Location**: `src/pages/`

These are top-level views managed by AppLayout:

#### Landing (`Landing.tsx`)
- **Purpose**: User acquisition and onboarding
- **Props**: `{ onGetStarted: () => void }`
- **Children**: Hero, Features, HowItWorks, Stats, CTA, Footer
- **State**: None (presentational)

#### Dashboard (`Dashboard.tsx`)
- **Purpose**: Project management hub
- **Props**: `{ onStartProject: (template?: string) => void }`
- **Features**: Project list, template selection
- **State**: None (future: project list)

#### Interview (`Interview.tsx`)
- **Purpose**: Wrapper for interview flow
- **Props**: `{ onComplete: (answers: Answer[]) => void }`
- **Children**: InterviewFlow
- **State**: None (delegated to InterviewFlow)

#### Documentation (`Documentation.tsx`)
- **Purpose**: Wrapper for documentation viewer
- **Props**: `{ documentation: { [path: string]: string }, onExport: () => void }`
- **Children**: DocumentationViewer
- **State**: None (delegated to viewer)

### 2. Feature Components

**Location**: `src/components/[feature]/`

#### Interview System

**InterviewFlow** (`interview/InterviewFlow.tsx`)
- **Purpose**: Main orchestrator for interview process
- **State**: 
  - `currentStep: number` - Current question index
  - `answers: Answer[]` - Collected answers
- **Children**: ProgressBar, QuestionStep
- **Key Logic**: 
  - Question navigation
  - Answer validation
  - Completion handling

**QuestionStep** (`interview/QuestionStep.tsx`)
- **Purpose**: Displays single question with options
- **Props**: Question data, selected options, handlers
- **Children**: SelectionCard[] (for each option)
- **Pattern**: Controlled component

**SelectionCard** (`interview/SelectionCard.tsx`)
- **Purpose**: Selectable option card
- **Props**: Option data, selected state, onClick handler
- **Features**: Visual feedback, icon/emoji support
- **Variants**: Single-select, multi-select

**ProgressBar** (`interview/ProgressBar.tsx`)
- **Purpose**: Visual progress indicator
- **Props**: `currentStep`, `totalSteps`, `sections`
- **Children**: SectionProgress[]
- **Display**: Shows completion percentage

**SectionProgress** (`interview/SectionProgress.tsx`)
- **Purpose**: Section-specific progress display
- **Props**: Section data, completion status
- **Display**: Icon, title, progress indicator

#### Documentation System

**DocumentationViewer** (`docs/DocumentationViewer.tsx`)
- **Purpose**: Main documentation display interface
- **State**:
  - `selectedPath: string` - Current file
  - `isEditing: boolean` - Edit mode toggle
  - `editContent: string` - Content being edited
- **Children**: FileTree, MarkdownPreview
- **Features**: Navigation, editing, export
- **Key Logic**: File tree generation, path management

**FileTree** (`docs/FileTree.tsx`)
- **Purpose**: Hierarchical file navigation
- **Props**: Files array, selected path, selection handler
- **Children**: TreeNode[] (recursive)
- **Features**: Expand/collapse folders, file selection
- **Pattern**: Recursive tree rendering

**MarkdownPreview** (`docs/MarkdownPreview.tsx`)
- **Purpose**: Render markdown content
- **Props**: `content: string`
- **Features**: Basic markdown parsing, syntax styling
- **Future**: Use `marked` library for full parsing

**ExportOptions** (`docs/ExportOptions.tsx`)
- **Purpose**: Export modal for documentation
- **State**: `exportFormat: 'json' | 'markdown' | 'zip'`
- **Features**: Format selection, download trigger
- **Formats**: JSON, combined Markdown, ZIP (future)

#### Dashboard Components

**ProjectCard** (`dashboard/ProjectCard.tsx`)
- **Purpose**: Display project summary
- **Props**: Project data, action handlers
- **Features**: Project metadata, quick actions
- **Future**: Edit, delete, duplicate

**TemplateCard** (`templates/TemplateCard.tsx`)
- **Purpose**: Display project template
- **Props**: Template data, selection handler
- **Features**: Template preview, selection
- **Types**: SaaS, E-commerce, Marketplace, etc.

### 3. Common Components

**Location**: `src/components/common/`

#### Navbar (`common/Navbar.tsx`)
- **Purpose**: Top navigation bar
- **Props**: Auth state, navigation handlers
- **Features**: Logo, navigation links, user menu
- **Responsive**: Mobile hamburger menu

#### DarkModeToggle (`common/DarkModeToggle.tsx`)
- **Purpose**: Theme switcher
- **State**: Uses next-themes context
- **Features**: Sun/moon icon, smooth transitions
- **Position**: Fixed top-right

### 4. Authentication Components

**Location**: `src/components/auth/`

#### AuthModal (`auth/AuthModal.tsx`)
- **Purpose**: Login/signup modal
- **Props**: `isOpen`, `onClose`, `onAuth`
- **Features**: Tab switching, form validation
- **Current**: Mock authentication
- **Future**: Supabase integration

### 5. Landing Page Components

**Location**: `src/components/landing/`

#### Hero (`landing/Hero.tsx`)
- **Purpose**: Main hero section
- **Features**: Headline, subheading, CTA button
- **Design**: Large, attention-grabbing

#### Features (`landing/Features.tsx`)
- **Purpose**: Feature highlights grid
- **Data**: Static feature array with icons
- **Layout**: 3-column grid, responsive

#### HowItWorks (`landing/HowItWorks.tsx`)
- **Purpose**: Step-by-step process explanation
- **Layout**: Sequential steps with numbers
- **Design**: Visual flow diagram

#### Stats (`landing/Stats.tsx`)
- **Purpose**: Social proof metrics
- **Data**: Doc count, users, templates
- **Design**: Number highlights

#### CTA (`landing/CTA.tsx`)
- **Purpose**: Call-to-action section
- **Features**: Secondary CTA with background
- **Position**: Bottom of landing page

#### Footer (`landing/Footer.tsx`)
- **Purpose**: Site footer with links
- **Sections**: Product, Resources, Company, Legal
- **Design**: Multi-column layout

### 6. UI Components

**Location**: `src/components/ui/`

**Source**: shadcn/ui (copy-paste components)

**Key Components**:
- **button** - Clickable buttons with variants
- **card** - Container component for content
- **dialog** - Modal dialogs
- **dropdown-menu** - Dropdown menus
- **input** - Form input fields
- **label** - Form labels
- **tabs** - Tabbed interfaces
- **toast** - Notification toasts
- **tooltip** - Hover tooltips

**Full List**: 40+ components available

## Component Patterns

### 1. Container/Presentational

**Container** (Smart Components):
- Manage state and logic
- Handle data fetching
- Pass data to presentational components
- Examples: InterviewFlow, DocumentationViewer, AppLayout

**Presentational** (Dumb Components):
- Receive data via props
- Render UI
- Emit events via callbacks
- Examples: SelectionCard, MarkdownPreview, ProgressBar

### 2. Compound Components

Components that work together:

```typescript
<DocumentationViewer>
  <FileTree />
  <MarkdownPreview />
</DocumentationViewer>
```

### 3. Controlled Components

Parent controls component state:

```typescript
<QuestionStep
  selectedOptions={answer.selectedOptions}
  onSelectionChange={handleChange}
/>
```

### 4. Render Props (Minimal)

Used in some shadcn/ui components:

```typescript
<Dialog>
  {({ isOpen }) => <div>{isOpen && 'Content'}</div>}
</Dialog>
```

### 5. Higher-Order Components (None)

Not used - prefer composition and hooks

### 6. Custom Hooks

- `useAppContext()` - Access AppContext
- `useTheme()` - Access theme state
- `useToast()` - Show toast notifications
- `useMobile()` - Detect mobile viewport

## Component Communication

### Parent to Child (Props)

```typescript
<Child data={parentData} onAction={parentHandler} />
```

### Child to Parent (Callbacks)

```typescript
// Child
<button onClick={() => props.onAction('value')}>Click</button>

// Parent
<Child onAction={(value) => handleAction(value)} />
```

### Sibling to Sibling (Lift State Up)

```typescript
// Parent manages shared state
const Parent = () => {
  const [shared, setShared] = useState();
  return (
    <>
      <Sibling1 data={shared} onChange={setShared} />
      <Sibling2 data={shared} />
    </>
  );
};
```

### Cross-Component (Context)

```typescript
// Provider
<AppProvider>
  <App />
</AppProvider>

// Consumer
const { value } = useAppContext();
```

## Component Lifecycle

### Mounting

```typescript
useEffect(() => {
  // Run on mount
  return () => {
    // Cleanup on unmount
  };
}, []); // Empty deps = mount/unmount only
```

### Updating

```typescript
useEffect(() => {
  // Run when dependency changes
}, [dependency]);
```

### Cleanup

```typescript
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe();
}, []);
```

## Component Styling

### Tailwind Classes

```typescript
<div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-900">
  <h1 className="text-2xl font-bold">Title</h1>
</div>
```

### Conditional Classes

```typescript
import { cn } from '@/lib/utils';

<div className={cn(
  'base-class',
  isActive && 'active-class',
  'another-class'
)}>
```

### Dark Mode

```typescript
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
```

## Component Testing

### Unit Tests (Future)

```typescript
import { render, fireEvent } from '@testing-library/react';

test('SelectionCard selects on click', () => {
  const onClick = jest.fn();
  const { getByText } = render(
    <SelectionCard option={option} onClick={onClick} />
  );
  
  fireEvent.click(getByText(option.label));
  expect(onClick).toHaveBeenCalledWith(option.id);
});
```

### Integration Tests (Future)

```typescript
test('Interview flow completes', async () => {
  const onComplete = jest.fn();
  const { getByText } = render(<InterviewFlow onComplete={onComplete} />);
  
  // Answer all questions
  // ...
  
  expect(onComplete).toHaveBeenCalled();
});
```

## Component Performance

### Optimization Techniques (Future)

1. **React.memo** - Prevent unnecessary re-renders
```typescript
export const MemoizedComponent = React.memo(Component);
```

2. **useMemo** - Memoize expensive computations
```typescript
const fileTree = useMemo(() => buildFileTree(), [documentation]);
```

3. **useCallback** - Stable function references
```typescript
const handleClick = useCallback(() => {}, [deps]);
```

4. **Code Splitting** - Lazy load components
```typescript
const DocumentationViewer = lazy(() => import('./DocumentationViewer'));
```

## Component Documentation

### JSDoc Comments

```typescript
/**
 * SelectionCard displays a selectable option with icon and description
 * @param option - The option to display
 * @param isSelected - Whether this option is selected
 * @param onClick - Callback when option is clicked
 */
interface SelectionCardProps {
  option: SelectionOption;
  isSelected: boolean;
  onClick: (id: string) => void;
}
```

### Storybook (Future)

Component stories for visual testing and documentation.

## Accessibility

### ARIA Labels

```typescript
<button aria-label="Close modal" onClick={onClose}>
  <X className="h-4 w-4" />
</button>
```

### Keyboard Navigation

Radix UI components handle keyboard nav automatically.

### Screen Readers

```typescript
<div role="navigation" aria-label="Documentation navigation">
  <FileTree />
</div>
```

## Component Checklist

When creating a new component:

- [ ] Define TypeScript interface for props
- [ ] Use React.FC typing
- [ ] Handle loading and error states
- [ ] Include dark mode styling
- [ ] Make it responsive
- [ ] Add accessibility attributes
- [ ] Document props with JSDoc
- [ ] Extract reusable logic to hooks
- [ ] Keep components small and focused
- [ ] Write tests (future)

## Conclusion

Docsbuilder components are organized by feature, follow consistent patterns, and leverage modern React practices. The component architecture is modular, testable, and maintainable, with clear separation of concerns between smart containers and presentational components.
