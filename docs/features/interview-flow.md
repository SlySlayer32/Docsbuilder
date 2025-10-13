# Interview Flow Feature

## Overview

The Interview Flow is the core feature of Docsbuilder that collects project information through an interactive, multi-step questionnaire. It provides a guided experience for users to specify their project requirements.

## Architecture

### Component Hierarchy

```
Interview (Page)
└── InterviewFlow (Container)
    ├── ProgressBar (Display)
    │   └── SectionProgress[] (Display)
    └── QuestionStep (Controlled)
        ├── SelectionCard[] (Presentational)
        └── Textarea (Optional details input)
```

### Data Flow

```
User Interaction
    ↓
SelectionCard onClick
    ↓
QuestionStep onSelectionChange
    ↓
InterviewFlow updateAnswer
    ↓
InterviewFlow state update
    ↓
Re-render with new selection
```

## Key Components

### InterviewFlow

**Location**: `src/components/interview/InterviewFlow.tsx`

**Purpose**: Orchestrates the entire interview process

**State**:
```typescript
const [currentStep, setCurrentStep] = useState(0);  // Question index
const [answers, setAnswers] = useState<Answer[]>([]); // All answers
```

**Key Methods**:

```typescript
// Navigate to next question or complete
const handleNext = () => {
  if (currentStep < allQuestions.length - 1) {
    setCurrentStep(currentStep + 1);
  } else {
    onComplete(answers);  // Pass to parent
  }
};

// Navigate to previous question
const handleBack = () => {
  if (currentStep > 0) {
    setCurrentStep(currentStep - 1);
  }
};

// Update answer for current question
const updateAnswer = (selectedOptions: string[], details?: string) => {
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

### QuestionStep

**Location**: `src/components/interview/QuestionStep.tsx`

**Purpose**: Displays a single question with its options

**Props**:
```typescript
interface QuestionStepProps {
  question: Question;
  selectedOptions: string[];
  details: string;
  onSelectionChange: (options: string[]) => void;
  onDetailsChange: (details: string) => void;
}
```

**Features**:
- Renders question title and description
- Displays all options as SelectionCards
- Shows optional details textarea
- Handles single vs multiple selection logic

### SelectionCard

**Location**: `src/components/interview/SelectionCard.tsx`

**Purpose**: Individual selectable option card

**Props**:
```typescript
interface SelectionCardProps {
  option: SelectionOption;
  isSelected: boolean;
  onClick: (id: string) => void;
}
```

**Features**:
- Visual indication of selection state
- Icon/emoji display
- Label and description
- Hover effects
- Keyboard accessible

### ProgressBar

**Location**: `src/components/interview/ProgressBar.tsx`

**Purpose**: Shows progress through interview

**Props**:
```typescript
interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  sections: Section[];
}
```

**Display**:
- Overall progress percentage
- Section-by-section progress
- Visual progress bar

## User Experience

### Flow Sequence

1. **Start**: User clicks "Get Started" on landing page
2. **Authentication**: Mock auth (future: real auth)
3. **Dashboard**: Option to select template
4. **Interview Start**: First question displayed
5. **Question Loop**:
   - Read question
   - Select option(s)
   - Optionally add details
   - Click "Next"
   - Repeat until all questions answered
6. **Complete**: Click "Generate Docs"
7. **Documentation**: View generated docs

### Navigation

**Forward Navigation**:
- "Next" button enabled when answer selected
- Last question shows "Generate Docs" button
- Auto-advances on selection (future feature)

**Backward Navigation**:
- "Back" button always available (except first question)
- Previous answers preserved
- Can modify previous answers

**Progress Tracking**:
- Visual progress bar at top
- "Question X of Y" indicator
- Section grouping shown

## Question Types

### Single Selection

```typescript
{
  type: 'single',
  options: [/* options */]
}
```

**Behavior**:
- Only one option can be selected
- Selecting new option deselects previous
- Like radio buttons

**Example**: "Choose your frontend framework"

### Multiple Selection

```typescript
{
  type: 'multiple',
  options: [/* options */]
}
```

**Behavior**:
- Multiple options can be selected
- Toggle on/off independently
- Like checkboxes

**Example**: "What authentication methods do you need?"

### With Details

```typescript
{
  allowDetails: true
}
```

**Behavior**:
- Shows textarea below options
- Optional additional context
- Stored in `answer.details`

**Example**: Purpose question with custom description

## State Management

### Answer Storage

```typescript
interface Answer {
  questionId: string;        // Links to Question.id
  selectedOptions: string[]; // Array of selected option IDs
  details?: string;          // Optional text input
}
```

**Storage Strategy**:
- Array of answer objects
- One answer per question
- Updates replace old answers for same question
- Immutable updates (create new array)

### Validation

**Current Validation**:
- Must select at least one option
- "Next" button disabled if no selection
- Details field optional (no validation)

**Future Validation**:
- Custom validation per question
- Required details fields
- Format validation (email, URL, etc.)

## Customization

### Adding a New Question

1. Open `src/data/interviewSections.ts`
2. Find appropriate section or create new one
3. Add question object:

```typescript
{
  id: 'unique-question-id',
  title: 'Your question text?',
  description: 'Optional explanation',
  type: 'single', // or 'multiple'
  options: [
    {
      id: 'option-1-id',
      label: 'Option 1 Label',
      icon: '🎯',
      description: 'Optional description',
    },
    // ... more options
  ],
  allowDetails: true, // Optional
}
```

### Adding a New Section

```typescript
export const interviewSections: Section[] = [
  // ... existing sections
  {
    id: 'new-section-id',
    title: 'New Section Title',
    icon: '🎨',
    questions: [
      // ... questions
    ],
  },
];
```

### Customizing UI

**Colors**: Modify Tailwind classes in components
- Primary: `cyan-500`
- Background: `white` / `gray-900` (dark)
- Text: `gray-900` / `white` (dark)

**Layout**: Adjust grid/flex classes
- Questions: Single column
- Options: Grid responsive layout
- Mobile-first approach

## Performance

### Current Performance

- Fast: ~50ms per question render
- No lag on option selection
- Smooth transitions
- Small state size (<5KB)

### Optimization Opportunities

1. **Memoization**: Memoize derived values
```typescript
const allQuestions = useMemo(() => 
  interviewSections.flatMap(s => s.questions),
  []
);
```

2. **Virtualization**: For 100+ options (unlikely)
3. **Code Splitting**: Lazy load interview flow
4. **Prefetch**: Preload next question assets

## Accessibility

### Keyboard Navigation

- Tab through options
- Enter/Space to select
- Arrow keys for navigation (future)

### Screen Readers

- ARIA labels on interactive elements
- Role attributes on cards
- Live region for progress updates

### Focus Management

- Focus moves to next question on advance
- Focus preserved on back navigation
- Clear focus indicators

## Testing

### Manual Testing

1. **Happy Path**: Complete all questions
2. **Back Navigation**: Go back and change answers
3. **Edge Cases**: Empty state, single question
4. **Responsive**: Test on mobile and desktop
5. **Dark Mode**: Verify both themes
6. **Accessibility**: Test with keyboard only

### Automated Tests (Future)

```typescript
describe('InterviewFlow', () => {
  it('advances to next question on click', () => {
    // Test implementation
  });
  
  it('stores answer correctly', () => {
    // Test implementation
  });
  
  it('completes and calls onComplete', () => {
    // Test implementation
  });
});
```

## Known Issues

### Current Limitations

1. **No Validation**: Details field accepts any input
2. **No Auto-Save**: Answers lost on refresh
3. **No Skip**: Must answer all questions
4. **No Branching**: Linear flow only

### Future Enhancements

1. **Conditional Questions**: Show based on previous answers
2. **Auto-Save**: Save progress to localStorage
3. **Skip Option**: Allow skipping optional questions
4. **Validation**: Custom validation rules
5. **Rich Input**: Date pickers, file uploads, etc.

## Extension Guide

### Adding Question Validation

```typescript
// In QuestionStep
const validateAnswer = (answer: Answer): boolean => {
  // Add custom validation
  if (question.required && !answer.selectedOptions.length) {
    return false;
  }
  
  if (question.validateDetails && !answer.details) {
    return false;
  }
  
  return true;
};
```

### Adding Conditional Logic

```typescript
// In InterviewFlow
const shouldShowQuestion = (question: Question): boolean => {
  if (!question.condition) return true;
  
  const dependentAnswer = answers.find(a => 
    a.questionId === question.condition.questionId
  );
  
  return question.condition.values.some(v =>
    dependentAnswer?.selectedOptions.includes(v)
  );
};
```

### Adding Progress Persistence

```typescript
// Save to localStorage
useEffect(() => {
  localStorage.setItem('interview-progress', JSON.stringify({
    currentStep,
    answers,
  }));
}, [currentStep, answers]);

// Load from localStorage
useEffect(() => {
  const saved = localStorage.getItem('interview-progress');
  if (saved) {
    const { currentStep, answers } = JSON.parse(saved);
    setCurrentStep(currentStep);
    setAnswers(answers);
  }
}, []);
```

## Best Practices

### For Maintainers

1. **Keep Questions Clear**: Short, specific questions
2. **Limit Options**: 4-8 options per question optimal
3. **Group Logically**: Related questions in same section
4. **Test Thoroughly**: Every question and option
5. **Update Docs**: Keep documentation in sync

### For AI Assistants

1. **Preserve Patterns**: Match existing question structure
2. **Maintain Types**: Use TypeScript interfaces
3. **Test Flow**: Complete entire interview after changes
4. **Consider UX**: Don't make questions too long
5. **Update Generator**: Add new questions to docGenerator

## Conclusion

The Interview Flow is the heart of Docsbuilder, collecting structured information through an intuitive, step-by-step process. Its design prioritizes user experience with clear progress indication, easy navigation, and flexible question types. The component architecture is modular and extensible, making it easy to add new questions or customize the experience.
