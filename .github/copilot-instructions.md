# Docsbuilder AI Coding Agent Instructions

## Project Overview

**Docsbuilder** is a React/TypeScript SPA that generates comprehensive arc42+C4 documentation through an interactive questionnaire. The app follows a linear workflow: Landing → Dashboard → Interview → Documentation Viewer.

**Mental Model**: User selections → Structured answers → Template-based markdown generation → Interactive viewing/export

## Architecture Essentials

### Data Flow Pipeline
```
interviewSections.ts (static questions)
  → InterviewFlow (state: Answer[])
  → AppLayout.handleInterviewComplete()
  → docGenerator.ts (Answer[] → Documentation object)
  → Documentation page (renders markdown)
```

### Key State Management
- **AppLayout.tsx**: Central orchestrator managing view state, authentication, and generated docs
- **InterviewFlow.tsx**: Manages answer collection with immutable updates (`setAnswers([...answers, newAnswer])`)
- No Redux/Zustand - uses local state + Context API for sidebar only

### Critical Files
- `src/utils/docGenerator.ts` (2937 lines): Core generator - maps answers to 45+ markdown files
- `src/data/interviewSections.ts`: Question definitions with options/icons
- `src/data/technologyMaps.ts`: Framework-specific patterns (React/Vue/Next.js, etc.)
- `src/types/interview.ts`: Core data contracts

## Development Workflows

### Run Commands
```bash
npm run dev      # Vite dev server on :8080
npm run build    # Production build
npm run lint     # ESLint (flat config)
```

### Adding Interview Questions
1. Edit `src/data/interviewSections.ts` - add question to appropriate section
2. Structure: `{ id, title, type: 'single'|'multiple', options: [{ id, label, icon?, description? }], allowDetails?: boolean }`
3. Update `src/utils/docGenerator.ts` - use `getAnswer('question-id')` helper
4. Generate markdown with answer data (see existing patterns in docGenerator.ts)

### Extending Documentation
In `docGenerator.ts`:
```typescript
const yourAnswer = getAnswer('your-question-id');
docs['/your-path/file.md'] = `# Title\n\n${yourAnswer?.details || 'default'}`;
```
Always use template literals, maintain consistent markdown structure (H1 → H2 → H3).

## Code Conventions

### Component Pattern
```tsx
export const ComponentName: React.FC<Props> = ({ data, onAction, className }) => {
  const [state, setState] = useState<Type>(initial);
  
  const handleEvent = () => {
    setState(newValue); // Immutable updates only
    onAction(result);
  };
  
  return <div className={cn('base-classes', className)}>{content}</div>;
};
```

### Styling with Tailwind + cn()
- Use `cn()` from `@/lib/utils` to merge classes: `cn('bg-white dark:bg-gray-900', className)`
- Always support dark mode: `dark:` variants for colors
- shadcn/ui components in `src/components/ui/` - don't modify, compose instead

### TypeScript Strictness
- All components use explicit `React.FC<Props>` typing
- Interface definitions in `src/types/` for shared types
- No `any` - use proper types or `unknown` with guards

### State Updates (CRITICAL)
```typescript
// ✅ Correct - immutable
setAnswers([...answers, newAnswer]);
setAnswers(answers.map(a => a.id === id ? { ...a, ...updates } : a));

// ❌ Wrong - mutation
answers.push(newAnswer);
setAnswers(answers);
```

## Technology Specifics

### Stack
- React 18.3 + TypeScript 5.5 + Vite 5.4
- Tailwind CSS 3.4 + shadcn/ui (Radix primitives)
- Routing: react-router-dom (single route in App.tsx, view state in AppLayout)
- Markdown: marked + highlight.js
- Path alias: `@/` → `src/`

### No Backend (Yet)
- All state in memory - no persistence layer
- Auth is mocked (planned: Supabase in Phase 2)
- Documentation generated client-side

## Common Pitfalls

1. **Don't mutate state** - always create new arrays/objects
2. **Match existing markdown patterns** in docGenerator.ts - maintain H1/H2 hierarchy
3. **Use `cn()` for className composition** - don't manually concatenate strings
4. **Test dark mode** - all new components must support `dark:` variants
5. **Flatten questions correctly** - `interviewSections.flatMap(s => s.questions)` to get all questions

## Extension Points

### Add Technology Maps
In `src/data/technologyMaps.ts`, define framework-specific patterns:
```typescript
export const yourMaps: { [key: string]: TechnologyMap } = {
  yourTech: {
    name: 'Your Tech',
    description: '...',
    bestPractices: ['...'],
    patterns: { component: '...', stateManagement: '...' },
    libraries: ['...'],
  }
};
```

### Add UI Components
Use shadcn/ui CLI or copy from `src/components/ui/`. Compose, don't modify base components.

## Reference Documentation

- **Architecture**: `docs/architecture/system-overview.md` (full component breakdown)
- **Data Flow**: `docs/architecture/data-flow.md` (detailed pipelines with diagrams)
- **AI Patterns**: `docs/ai-context/common-patterns.md` (copy-paste templates)
- **Extension Guide**: `docs/ai-context/extension-guide.md` (step-by-step scenarios)

## User-Friendly Documentation Requirements

### Goal: 10-Year-Old Test
Every generated documentation must pass the "10-year-old test" - a child with basic computer skills should be able to follow instructions and successfully set up the project.

### Required Documentation Components

#### 1. **Step-by-Step Setup Guides** (CRITICAL)
```markdown
## Prerequisites
- Node.js 18+ (Download: https://nodejs.org)
  - Windows: Run installer, click "Next" until done
  - Mac: Double-click .pkg file, follow prompts
  - Linux: `sudo apt install nodejs` or `brew install node`
- How to check: Open terminal, type `node --version`

## Installation (5 steps)
1. Download the code
   - Click green "Code" button on GitHub
   - Select "Download ZIP"
   - Extract to your Documents folder

2. Open terminal
   - Windows: Press Win+R, type "cmd", press Enter
   - Mac: Press Cmd+Space, type "terminal", press Enter
   - Linux: Press Ctrl+Alt+T

3. Navigate to folder
   ```bash
   cd Documents/project-name
   ```

4. Install dependencies
   ```bash
   npm install
   # Wait 1-2 minutes, ignore warnings
   ```

5. Start the app
   ```bash
   npm run dev
   # Open browser to http://localhost:8080
   ```
```

#### 2. **Visual Indicators**
- ✅ Success indicators for each step
- ⚠️ Warning signs for common issues
- ❌ Error explanations with solutions
- 📸 Screenshots for complex UI steps
- 🎥 Video tutorial links (future)

#### 3. **Troubleshooting Section** (ALWAYS INCLUDE)
```markdown
## Common Issues

### "Command not found: npm"
**Problem**: Node.js not installed or not in PATH
**Solution**: 
1. Install Node.js from https://nodejs.org
2. Restart terminal
3. Try again

### "Port 8080 already in use"
**Problem**: Another app using port 8080
**Solution**:
```bash
# Find and stop the process
npx kill-port 8080
# Or use different port
PORT=3000 npm run dev
```

### "Cannot find module..."
**Problem**: Dependencies not installed
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```
```

#### 4. **Boilerplate Component Documentation**
Each selectable component must include:

```typescript
interface ComponentDocumentation {
  // Basic info
  name: string;
  description: string; // 1 sentence
  category: string;
  
  // User-facing info
  whatYouGet: string[]; // Bullet points
  requiredDependencies: Dependency[];
  optionalDependencies: Dependency[];
  estimatedSetupTime: string; // "5 minutes", "30 minutes"
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  
  // Step-by-step guide
  setupSteps: SetupStep[];
  configurationGuide: ConfigSection[];
  testingInstructions: TestStep[];
  
  // Visual aids
  screenshots?: string[];
  videoUrl?: string;
  codeExamples: CodeExample[];
  
  // Troubleshooting
  commonIssues: Issue[];
  faqItems: FAQ[];
  
  // Integration
  worksWellWith: string[]; // Other component IDs
  conflicts: string[]; // Incompatible components
  
  // Reference
  externalDocs: Link[];
  relatedPatterns: string[];
}

interface SetupStep {
  number: number;
  title: string;
  description: string;
  command?: string;
  expectedOutput?: string;
  timeEstimate?: string;
  screenshot?: string;
  successIndicator: string; // "You should see..."
}
```

#### 5. **Complete File Structure Maps**
```markdown
## What You'll Have After Setup

your-project/
├── 📁 src/
│   ├── 📁 components/
│   │   ├── ✨ LoginForm.tsx        ← Email/password login
│   │   ├── 🔐 AuthProvider.tsx     ← Manages user state
│   │   └── 👤 UserProfile.tsx      ← Display user info
│   ├── 📁 pages/
│   │   ├── 🏠 Home.tsx             ← Landing page
│   │   └── 🔑 Login.tsx            ← Login page
│   ├── 📁 utils/
│   │   └── 🔧 auth.ts              ← Helper functions
│   └── 📱 App.tsx                   ← Main app
├── 📁 public/
│   └── 🖼️ logo.png
├── 📄 package.json                  ← Dependencies list
├── ⚙️ .env                          ← Your API keys (don't share!)
└── 📚 README.md                     ← This file
```

#### 6. **Technology Explanation for Non-Developers**
```markdown
## What These Technologies Do (In Plain English)

### React ⚛️
**What it is**: A tool for building user interfaces (buttons, forms, pages)
**Why we use it**: Makes it easy to create interactive websites
**Real-world example**: Facebook uses React

### TypeScript 📘
**What it is**: JavaScript with extra safety features
**Why we use it**: Catches mistakes before you run the code
**Real-world example**: Like spell-check for programming

### Tailwind CSS 🎨
**What it is**: Pre-made styles for your website
**Why we use it**: Makes things look good without writing CSS
**Real-world example**: Like using templates in PowerPoint
```

#### 7. **Quick Win Examples** (Build Confidence)
```markdown
## Your First Change (2 minutes)

Let's make a simple change to see the app update!

1. Open `src/pages/Home.tsx` in any text editor
2. Find line 15: `<h1>Welcome</h1>`
3. Change to: `<h1>Hello, I did this!</h1>`
4. Save the file
5. Look at your browser - it updated automatically! ✨

**What just happened?**
You modified the homepage title. The app automatically refreshed to show your change. This is called "hot reload" - it makes development fast!
```

## Boilerplate Component System

### Component Selection UI Requirements
```typescript
// Components grouped by category with visual indicators
interface ComponentCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  components: SelectableComponent[];
}

interface SelectableComponent {
  id: string;
  name: string;
  icon: string;
  tagline: string; // 5-word max
  description: string; // 2 sentences
  
  // Visual metadata
  popularityScore: number; // 1-5 stars
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  setupTime: string; // "5 min", "1 hour"
  
  // Selection logic
  isRecommended: boolean;
  requiresComponent?: string[]; // Dependencies
  conflictsWith?: string[]; // Incompatible
  
  // Preview
  previewImage?: string;
  demoUrl?: string;
  
  // Documentation
  quickStartUrl: string;
  fullDocsUrl: string;
}
```

### Component Categories (Pre-built Library)

Refer to `BOILERPLATE-APPROACH.md` for complete component list:
- 👤 Authentication & Users (8 components)
- 📊 Dashboard & Layout (8 components)
- 💾 Data Management (8 components)
- 💳 Payments & Subscriptions (8 components)
- 💬 Communication (8 components)
- 📝 Content Management (8 components)
- 🤝 Social Features (8 components)
- 🔌 API & Integrations (6 components)
- 🔒 Security & Privacy (6 components)
- 📈 Analytics & Monitoring (6 components)
- 🚀 DevOps & Deployment (8 components)
- 🎨 UI Components (12 components)

### Documentation Generation Pipeline

```typescript
// When user selects components, generate:
interface GeneratedDocumentation {
  // Essential docs (always included)
  readme: string;              // Main project README
  setupGuide: string;          // Step-by-step setup
  quickStart: string;          // 5-minute tutorial
  troubleshooting: string;     // Common issues
  architecture: string;        // System overview
  
  // Component-specific docs
  componentDocs: ComponentDoc[];
  
  // Integration guides
  integrationGuides: string[]; // How components work together
  
  // Reference
  apiReference: string;        // If has API
  environmentVariables: string; // .env setup
  deploymentGuide: string;     // How to publish
  
  // Maintenance
  updateGuide: string;         // How to update
  securityChecklist: string;   // Security best practices
}
```

### AI-Assisted Enhancement (Future)

When AI integration is added, it should:
1. **Analyze user description** → Suggest relevant components
2. **Detect conflicts** → Warn about incompatibilities
3. **Generate custom docs** → Merge component docs intelligently
4. **Create diagrams** → Visual architecture based on selections
5. **Provide examples** → Show real code for selected stack
6. **Estimate complexity** → Time, cost, team size needed

## Phase 2 Goals (Coming Soon)

- AI-powered freeform input (GPT-4/Claude expansion)
- C4 diagram generation with visual architecture
- Pattern injection (30+ code patterns embedded in docs)
- Metadata blocks for AI comprehension
- Interactive component selection UI
- One-click project generation with all selected components
- Video tutorials for each component
- Live preview of component combinations

See `AI-VISION.md` for full roadmap and `BOILERPLATE-APPROACH.md` for component library details.
