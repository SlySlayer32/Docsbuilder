# System Overview

## Introduction

Docsbuilder is a single-page application (SPA) built with React and TypeScript that generates comprehensive project documentation through an interactive interview process. The system follows a linear workflow from user onboarding to documentation export.

## System Architecture

### High-Level Components

```
┌───────────────────────────────────────────────────────┐
│                    Application Layer                   │
│  ┌─────────────────────────────────────────────────┐  │
│  │              AppLayout (Orchestrator)           │  │
│  └────────┬─────────┬──────────┬──────────┬────────┘  │
│           │         │          │          │            │
│  ┌────────v───┐ ┌──v──────┐ ┌─v────────┐ ┌v─────────┐│
│  │  Landing   │ │Dashboard│ │Interview │ │  Docs    ││
│  │   Page     │ │  Page   │ │   Flow   │ │ Viewer   ││
│  └────────────┘ └─────────┘ └────┬─────┘ └──────────┘│
│                                   │                    │
│                          ┌────────v────────┐          │
│                          │  Doc Generator  │          │
│                          └─────────────────┘          │
└───────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────┐
│                     State Layer                        │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐  │
│  │  AppContext │  │ Local State  │  │ URL State   │  │
│  │  (Sidebar)  │  │  (useState)  │  │  (Router)   │  │
│  └─────────────┘  └──────────────┘  └─────────────┘  │
└───────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────┐
│                      Data Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │   Interview  │  │  Generated   │  │  Static    │  │
│  │   Answers    │  │     Docs     │  │  Content   │  │
│  └──────────────┘  └──────────────┘  └────────────┘  │
└───────────────────────────────────────────────────────┘
```

## Core Modules

### 1. Application Orchestrator (`AppLayout.tsx`)

**Purpose**: Central controller that manages application state and navigation

**Responsibilities**:
- View state management (landing, dashboard, interview, docs)
- Authentication state (currently mock)
- Documentation state storage
- Navigation between views
- Event handler coordination

**Key State**:
```typescript
- currentView: 'landing' | 'dashboard' | 'interview' | 'documentation'
- isAuthenticated: boolean
- documentation: { [path: string]: string }
- projectName: string
```

### 2. Landing Module

**Components**: `Landing.tsx`, `Hero`, `Features`, `HowItWorks`, `Stats`, `CTA`, `Footer`

**Purpose**: User acquisition and onboarding

**Features**:
- Product introduction
- Feature highlights
- Social proof (stats)
- Call-to-action for signup

### 3. Dashboard Module

**Components**: `Dashboard.tsx`, `ProjectCard`, `TemplateCard`

**Purpose**: Project management and template selection

**Features**:
- Project overview
- Template selection (SaaS, Marketplace, E-commerce, etc.)
- Quick start options
- Project history (future feature)

### 4. Interview Module

**Components**: `InterviewFlow`, `QuestionStep`, `SelectionCard`, `ProgressBar`, `SectionProgress`

**Purpose**: Collect project requirements through structured questionnaire

**Features**:
- Multi-section questionnaire
- Progress tracking
- Answer validation
- Single/multiple choice questions
- Optional detail fields

**Data Flow**:
1. Load questions from `interviewSections.ts`
2. Display one question at a time
3. Store answers in local state
4. Validate before allowing progression
5. Complete and pass answers to generator

### 5. Documentation Generation Module

**Location**: `src/utils/docGenerator.ts`

**Purpose**: Transform interview answers into structured markdown documentation

**Process**:
```
Interview Answers
    ↓
Answer Extraction (getAnswer)
    ↓
Template Population
    ↓
Markdown Generation
    ↓
Document Structure
    ↓
Output: { [path: string]: string }
```

**Generated Documents**:
- `/project/overview.md` - Project introduction and goals
- `/project/requirements.md` - Functional and non-functional requirements
- `/architecture/tech-stack.md` - Technology choices
- `/security/authentication.md` - Authentication approach

### 6. Documentation Viewer Module

**Components**: `DocumentationViewer`, `FileTree`, `MarkdownPreview`, `ExportOptions`

**Purpose**: Display, edit, and export generated documentation

**Features**:
- Hierarchical file tree navigation
- Markdown preview with styling
- Inline editing capability
- Multiple export formats (JSON, Markdown, ZIP)
- Search functionality (future)

## System Boundaries

### In-Scope
- Single-user, client-side application
- Documentation generation from predefined templates
- Local state management
- Export functionality

### Out-of-Scope (Current)
- Server-side persistence
- Multi-user collaboration
- Real-time editing
- Version control
- Custom template creation

### Future Scope
- Supabase integration for persistence
- User authentication and authorization
- Project sharing and collaboration
- Advanced export options (PDF, HTML)
- AI-powered documentation suggestions

## Technical Architecture

### Frontend Stack
- **Framework**: React 18.3 (functional components, hooks)
- **Language**: TypeScript 5.5 (strict mode)
- **Build Tool**: Vite 5.4 (fast dev server, optimized builds)
- **Styling**: Tailwind CSS (utility-first)
- **Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router v6 (future feature)

### State Management Strategy

**Local State** (`useState`, `useReducer`)
- Component-specific UI state
- Form inputs and selections
- Modal visibility

**Context API** (`AppContext`)
- Sidebar visibility
- Theme preferences (via next-themes)
- Global UI state

**Props Drilling**
- View navigation handlers
- Data passing between parent-child components

### Data Flow Pattern

```
User Action
    ↓
Event Handler (Component)
    ↓
State Update (useState/Context)
    ↓
Re-render
    ↓
UI Update
```

**Example: Interview Completion**
```
User clicks "Generate Docs"
    ↓
InterviewFlow.handleNext()
    ↓
InterviewFlow.props.onComplete(answers)
    ↓
AppLayout.handleInterviewComplete(answers)
    ↓
docGenerator.generateDocumentation(answers, projectName)
    ↓
AppLayout.setDocumentation(docs)
    ↓
AppLayout.setCurrentView('documentation')
    ↓
DocumentationViewer renders with docs
```

## Component Hierarchy

```
App
└── AppProvider (Context)
    └── AppLayout
        ├── DarkModeToggle
        ├── Landing
        │   ├── Navbar
        │   ├── Hero
        │   ├── Features
        │   ├── HowItWorks
        │   ├── Stats
        │   ├── CTA
        │   └── Footer
        ├── Dashboard
        │   ├── Navbar
        │   ├── ProjectCard[]
        │   └── TemplateCard[]
        ├── Interview
        │   └── InterviewFlow
        │       ├── ProgressBar
        │       │   └── SectionProgress[]
        │       └── QuestionStep
        │           └── SelectionCard[]
        └── Documentation
            └── DocumentationViewer
                ├── FileTree
                │   └── TreeNode[]
                ├── MarkdownPreview
                └── ExportOptions (modal)
```

## Design Patterns

### 1. Container/Presentational Pattern
- **Container**: `AppLayout`, `InterviewFlow`, `DocumentationViewer`
- **Presentational**: `SelectionCard`, `MarkdownPreview`, `ProjectCard`

### 2. Composition Pattern
- Components compose smaller components
- Props drilling for callbacks and data
- Children pattern for layout components

### 3. Render Props Pattern
- Used minimally (mainly in shadcn/ui components)
- Provides flexibility for custom rendering

### 4. Custom Hooks Pattern
- `use-toast.ts` - Toast notifications
- `use-mobile.tsx` - Responsive breakpoint detection
- Future: `useDocumentationGenerator`, `useProjectState`

## Error Handling

### Current Approach
- Minimal error boundaries
- Inline validation in forms
- Disabled states for invalid inputs
- Toast notifications for user feedback

### Future Improvements
- Error boundary components
- Global error handling
- Retry mechanisms
- Better error messages

## Performance Considerations

### Current Optimizations
- Vite's fast build system
- Code splitting by route (future)
- Lazy loading for heavy components (future)
- Memoization for expensive computations (future)

### Performance Metrics
- Build time: ~5 seconds
- Bundle size: ~334 KB (gzipped: ~106 KB)
- Initial load: Fast (SPA)
- Runtime: Smooth for typical usage

## Security Considerations

### Current Implementation
- Client-side only application
- No sensitive data storage
- Mock authentication (no real credentials)

### Future Security Measures
- Supabase Row Level Security (RLS)
- Secure session management
- HTTPS enforcement
- XSS prevention (React's built-in escaping)
- CSRF protection for API calls

## Scalability

### Current Limitations
- Single-user session
- No data persistence
- Limited by browser memory
- No offline support

### Future Scalability
- Database-backed persistence
- Pagination for large projects
- Caching strategies
- Service worker for offline support

## Deployment Architecture

### Build Process
1. `npm run build` - Vite production build
2. TypeScript compilation and type checking
3. Asset optimization and minification
4. Output to `dist/` directory

### Hosting
- Static file hosting (Netlify, Vercel, etc.)
- CDN for asset delivery
- No server-side rendering (currently)

### Environment Configuration
- Development: `npm run dev` (localhost:5173)
- Production: `npm run build` + static hosting
- Preview: `npm run preview` (test production build)

## Monitoring and Observability

### Current Status
- Console logging for development
- No analytics (yet)
- No error tracking (yet)

### Future Implementation
- User analytics (privacy-focused)
- Error tracking (Sentry or similar)
- Performance monitoring
- Usage metrics

## Integration Points

### Current Integrations
- None (standalone application)

### Planned Integrations
- **Supabase**: Authentication, database, storage
- **Analytics**: User behavior tracking
- **Export APIs**: PDF generation, ZIP creation

## System Constraints

### Technical Constraints
- Browser compatibility: Modern browsers (ES2020+)
- JavaScript required
- Minimum screen size: 320px
- Internet required for initial load

### Business Constraints
- MVP feature set
- No payment processing (yet)
- No team features (yet)
- No API for external access

## Extension Points

The system is designed to be extensible in these areas:

1. **Interview Questions**: Add/modify questions in `interviewSections.ts`
2. **Documentation Templates**: Extend `docGenerator.ts`
3. **Export Formats**: Add new export handlers
4. **Templates**: Add new project templates
5. **UI Components**: Add to `src/components/ui/`

## Conclusion

Docsbuilder is architected as a modular, maintainable single-page application with clear separation of concerns. The linear user flow and straightforward data model make it easy to understand and extend. Future enhancements will add persistence, collaboration, and advanced features while maintaining the core simplicity.
