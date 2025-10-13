# GitHub Copilot Instructions for Docsbuilder

## Project Overview

**Docsbuilder** is a React + TypeScript application that generates comprehensive project documentation through an interactive interview process. It creates AI-ready documentation optimized for development tools like GitHub Copilot.

### Core Purpose
- Transform project ideas into structured documentation
- Generate 40+ markdown files covering all aspects of a project
- Provide AI-optimized documentation format for development assistance
- Enable rapid specification through smart selection-based interviews

## Tech Stack

### Frontend
- **Framework**: React 18.3+ with TypeScript 5.5+
- **Build Tool**: Vite 5.4+
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context API + React Query
- **Routing**: React Router v6
- **Theme**: Next-themes for dark/light mode
- **UI Components**: Radix UI primitives via shadcn/ui

### Key Dependencies
- `marked` - Markdown parsing and rendering
- `highlight.js` - Code syntax highlighting
- `uuid` - Unique identifier generation
- `lucide-react` - Icon library
- `date-fns` - Date manipulation

## Project Architecture

### Core Application Flow
1. **Landing Page** → User introduction and CTA
2. **Authentication** → Mock authentication (future Supabase integration)
3. **Dashboard** → Project management and templates
4. **Interview Flow** → Multi-step questionnaire
5. **Documentation Viewer** → Generated docs with file tree and preview

### Directory Structure
```
src/
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── common/         # Shared components (Navbar, DarkMode)
│   ├── dashboard/      # Dashboard-specific components
│   ├── docs/           # Documentation viewer components
│   ├── interview/      # Interview flow components
│   ├── landing/        # Landing page sections
│   ├── templates/      # Template selection components
│   └── ui/             # shadcn/ui components
├── contexts/           # React Context providers
├── data/               # Static data (interview questions)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page-level components
├── types/              # TypeScript type definitions
└── utils/              # Helper utilities (doc generator)
```

## Key Patterns and Conventions

### Component Structure
- Use functional components with TypeScript
- Props interfaces defined inline or exported
- Follow shadcn/ui patterns for UI components
- Use `React.FC` for component typing

```typescript
interface MyComponentProps {
  data: string;
  onAction: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ data, onAction }) => {
  // Component logic
};
```

### State Management
- Local state with `useState` for component-specific state
- Context API for cross-component state (AppContext)
- React Query for server state management (future)

### Styling Conventions
- Tailwind CSS utility classes
- Dark mode support with `dark:` prefix
- Custom color scheme: cyan-500 as primary accent
- Responsive design: mobile-first approach

### File Naming
- Components: PascalCase (e.g., `DocumentationViewer.tsx`)
- Utilities: camelCase (e.g., `docGenerator.ts`)
- Types: PascalCase interfaces (e.g., `Answer`, `Section`)
- Pages: PascalCase (e.g., `Landing.tsx`)

## Core Features

### 1. Interview System
**Location**: `src/components/interview/`
- Multi-section questionnaire with progress tracking
- Selection-based questions (single/multiple choice)
- Optional detail fields for additional context
- Real-time answer validation

**Key Components**:
- `InterviewFlow.tsx` - Main orchestrator
- `QuestionStep.tsx` - Individual question rendering
- `SelectionCard.tsx` - Option selection UI
- `ProgressBar.tsx` - Visual progress indicator

### 2. Documentation Generation
**Location**: `src/utils/docGenerator.ts`
- Generates markdown files based on interview answers
- Creates structured documentation hierarchy
- Outputs 5+ core documentation files
- Includes: overview, tech stack, authentication, requirements

**Generated Structure**:
```
/project/overview.md
/project/requirements.md
/architecture/tech-stack.md
/security/authentication.md
```

### 3. Documentation Viewer
**Location**: `src/components/docs/`
- File tree navigation
- Markdown preview with syntax highlighting
- Inline editing capability
- Export functionality (JSON, Markdown, ZIP)

**Key Components**:
- `DocumentationViewer.tsx` - Main viewer
- `FileTree.tsx` - Hierarchical file navigation
- `MarkdownPreview.tsx` - Markdown rendering
- `ExportOptions.tsx` - Export modal

### 4. Template System
**Location**: `src/components/templates/`
- Pre-configured project templates
- Quick-start options for common project types
- Template categories: SaaS, Marketplace, E-commerce, etc.

## Data Models

### Interview Types
```typescript
interface Question {
  id: string;
  title: string;
  description?: string;
  type: 'single' | 'multiple';
  options: SelectionOption[];
  allowDetails?: boolean;
}

interface Answer {
  questionId: string;
  selectedOptions: string[];
  details?: string;
}

interface Section {
  id: string;
  title: string;
  icon: string;
  questions: Question[];
}
```

### Documentation Types
```typescript
// Documentation structure: { [path: string]: string }
// Example:
{
  '/project/overview.md': '# Project\n\n## Overview\n...',
  '/architecture/tech-stack.md': '# Tech Stack\n...'
}
```

## Development Guidelines

### When Adding New Features
1. **Check existing patterns** - Review similar components for consistency
2. **Update types** - Add/modify TypeScript interfaces in `src/types/`
3. **Follow component structure** - Match existing component organization
4. **Use shadcn/ui** - Leverage existing UI components when possible
5. **Test dark mode** - Ensure dark mode styling works correctly
6. **Document in docs/** - Add feature documentation

### When Modifying Documentation Generator
1. **Location**: `src/utils/docGenerator.ts`
2. **Pattern**: Map answers to markdown content
3. **Structure**: Use hierarchical paths (e.g., `/section/file.md`)
4. **Content**: Include detailed, actionable information
5. **AI-Friendly**: Use clear headings and structured content

### When Adding UI Components
1. **Use shadcn/ui** - Check if component exists in `src/components/ui/`
2. **Custom components** - Place in appropriate feature folder
3. **Styling** - Use Tailwind + dark mode classes
4. **Accessibility** - Follow Radix UI patterns for a11y
5. **Responsive** - Test mobile, tablet, and desktop views

## Common Tasks

### Adding a New Interview Question
1. Open `src/data/interviewSections.ts`
2. Add question to appropriate section
3. Define options with labels and optional icons
4. Set `type: 'single' | 'multiple'`
5. Set `allowDetails: true` if text input needed

### Extending Documentation Generator
1. Open `src/utils/docGenerator.ts`
2. Get answer using `getAnswer(questionId)`
3. Add new path and markdown content to `docs` object
4. Use template literals for dynamic content
5. Follow markdown best practices

### Creating a New Page
1. Create component in `src/pages/`
2. Add to routing in `src/components/AppLayout.tsx`
3. Add view type to `View` union type
4. Implement navigation handlers

## AI Assistance Guidelines

### When GitHub Copilot Should Reference
- **Architecture Docs** - When modifying core structure or adding major features
- **Component Docs** - When creating/modifying specific components
- **Development Guides** - When implementing new patterns or workflows
- **UI/UX Guidelines** - When designing new interfaces
- **Feature Docs** - When extending existing features

### Best Practices for AI-Generated Code
1. **Follow existing patterns** - Match component structure and naming
2. **Use TypeScript strictly** - No `any` types unless absolutely necessary
3. **Implement dark mode** - Always include `dark:` variants
4. **Mobile-first** - Responsive design from the start
5. **Accessibility** - Follow ARIA standards via Radix UI
6. **Error handling** - Add try-catch blocks and user feedback

### Code Style Preferences
- **Imports**: Group by external, internal, types
- **Formatting**: Prettier-compatible (2-space indent)
- **Comments**: Minimal - code should be self-documenting
- **Variables**: Descriptive names over abbreviations
- **Functions**: Single responsibility principle

## Testing and Quality

### Before Committing
1. **Build**: Run `npm run build` to check for type errors
2. **Lint**: Run `npm run lint` to check code style
3. **Visual Test**: Check both light and dark themes
4. **Responsive**: Test on different screen sizes

### Build Scripts
- `npm run dev` - Development server with hot reload
- `npm run build` - Production build with type checking
- `npm run lint` - ESLint validation
- `npm run preview` - Preview production build

## Future Enhancements

### Planned Features
- Supabase authentication and data persistence
- Project saving and loading
- Collaboration features
- Advanced export options (PDF, HTML)
- Custom templates
- AI-powered documentation suggestions

### Integration Points
- **Backend**: Currently mock, ready for Supabase
- **Storage**: Local state, ready for database
- **Auth**: Mock flow, Supabase integration prepared

## Key Files Reference

### Critical Files to Understand
1. `src/components/AppLayout.tsx` - Main app orchestrator
2. `src/utils/docGenerator.ts` - Documentation generation logic
3. `src/data/interviewSections.ts` - Interview questions definition
4. `src/types/interview.ts` - Type definitions
5. `src/components/docs/DocumentationViewer.tsx` - Docs display

### Configuration Files
- `vite.config.ts` - Build configuration
- `tailwind.config.ts` - Styling configuration
- `tsconfig.json` - TypeScript configuration
- `components.json` - shadcn/ui configuration

## Getting Help

### When Stuck
1. Check `/docs/` folder for detailed guides
2. Review similar existing components
3. Examine type definitions in `src/types/`
4. Look at data structures in `src/data/`
5. Consult shadcn/ui documentation for UI components

### Resources
- **Docs**: `/docs/` folder for comprehensive guides
- **Types**: `src/types/` for data models
- **Examples**: Existing components for patterns
- **UI Components**: [shadcn/ui docs](https://ui.shadcn.com)
- **Tailwind**: [Tailwind CSS docs](https://tailwindcss.com)

---

**Remember**: This project generates documentation for other projects. The documentation we create should be exemplary - clear, structured, and AI-friendly. Practice what we preach!
