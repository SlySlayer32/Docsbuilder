# GitHub Copilot Instructions for Docsbuilder

## Project Overview

**Docsbuilder** is a React + TypeScript application that generates comprehensive project documentation through a modular boilerplate component selection system. Users select pre-built components and combine them to create complete, production-ready documentation instantly.

### Core Purpose
- Transform project requirements into structured documentation through component selection
- Generate 40+ markdown files by combining pre-written component templates
- Provide AI-optimized documentation format for development assistance
- Enable rapid specification through visual component selection (no AI needed)

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
4. **Component Selection** → Visual selection of boilerplate components
5. **Documentation Viewer** → Generated docs with file tree and preview

### Directory Structure
```
src/
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── boilerplate/    # Component selection UI (NEW)
│   ├── common/         # Shared components (Navbar, DarkMode)
│   ├── dashboard/      # Dashboard-specific components
│   ├── docs/           # Documentation viewer components
│   ├── landing/        # Landing page sections
│   ├── templates/      # Template selection components
│   └── ui/             # shadcn/ui components
├── contexts/           # React Context providers
├── data/               # Static data (component definitions)
│   └── boilerplateComponents.ts  # Component library (NEW)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page-level components
├── types/              # TypeScript type definitions
│   └── components.ts   # Component types (NEW)
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

### 1. Component Selection System
**Location**: `src/components/boilerplate/`
- Visual selection of pre-built components
- Categorized by functionality (Auth, Dashboard, Payments, etc.)
- Tech stack selector for customization
- Real-time selection summary

**Key Components**:
- `ComponentSelector.tsx` - Main selection interface
- `ComponentCard.tsx` - Individual component card with checkbox
- `CategorySection.tsx` - Category grouping UI
- `SelectionSummary.tsx` - Shows selected components count
- `TechStackSelector.tsx` - Tech stack selection

**Core Components Available** (Phase 1 - 5 Components):
1. **Basic Login/Signup** - Authentication component
2. **User Dashboard** - Dashboard component
3. **CRUD Operations** - Data management component
4. **Stripe Integration** - Payment processing
5. **REST API** - API endpoint templates

### 2. Documentation Generation
**Location**: `src/utils/docGenerator.ts`
- Combines pre-written component documentation templates
- Applies tech stack customization to templates
- Handles component dependencies and conflicts
- Generates 40+ files from selected components

**Input**: 
```typescript
{
  selectedComponents: string[];  // Component IDs
  techStack: TechStack;          // Frontend, backend, database choices
}
```

**Output**: Complete documentation with 40+ markdown files

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

## Data Models

### Component Types
```typescript
interface BoilerplateComponent {
  id: string;
  name: string;
  category: ComponentCategory;
  description: string;
  icon: string;
  documentation: ComponentDocumentation;
  dependencies: string[];          // Required component IDs
  recommendedWith: string[];       // Suggested component IDs
  conflicts: string[];             // Conflicting component IDs
  complexity: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
}

type ComponentCategory = 
  | 'authentication' 
  | 'dashboard' 
  | 'data-management' 
  | 'payments' 
  | 'api' 
  | 'communication' 
  | 'content';

interface TechStack {
  frontend: string;   // 'react' | 'vue' | 'nextjs' | 'svelte'
  backend: string;    // 'nodejs' | 'python' | 'go' | 'firebase'
  database: string;   // 'postgresql' | 'mongodb' | 'mysql' | 'supabase'
}
```

### Documentation Types
```typescript
// Documentation structure: { [path: string]: string }
// Example:
{
  '/project/overview.md': '# Project\n\n## Overview\n...',
  '/architecture/tech-stack.md': '# Tech Stack\n...',
  '/components/authentication.md': '# Authentication\n...'
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
2. **Pattern**: Combine component templates based on selections
3. **Structure**: Use hierarchical paths (e.g., `/section/file.md`)
4. **Content**: Include detailed, actionable information
5. **AI-Friendly**: Use clear headings and structured content
6. **Tech Stack**: Apply technology-specific code examples from templates

### When Adding UI Components
1. **Use shadcn/ui** - Check if component exists in `src/components/ui/`
2. **Custom components** - Place in appropriate feature folder
3. **Styling** - Use Tailwind + dark mode classes
4. **Accessibility** - Follow Radix UI patterns for a11y
5. **Responsive** - Test mobile, tablet, and desktop views

## Common Tasks

### Adding a New Component to Library
1. Open `src/data/boilerplateComponents.ts`
2. Add component definition with complete metadata
3. Create documentation templates for multiple tech stacks
4. Define dependencies, conflicts, and recommendations
5. Add to appropriate category

### Extending Documentation Generator
1. Open `src/utils/docGenerator.ts`
2. Access selected components via parameter
3. Combine component templates into documentation
4. Apply tech stack customization to code examples
5. Handle component dependencies and conflicts

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
- Expand component library (60+ components across 14 categories)
- Supabase authentication and data persistence
- Project saving and loading
- Collaboration features
- Advanced export options (PDF, HTML)
- Custom component creation
- Component dependency auto-resolution

### Integration Points
- **Backend**: Currently mock, ready for Supabase
- **Storage**: Local state, ready for database
- **Auth**: Mock flow, Supabase integration prepared

## Key Files Reference

### Critical Files to Understand
1. `src/components/AppLayout.tsx` - Main app orchestrator
2. `src/utils/docGenerator.ts` - Documentation generation logic
3. `src/data/boilerplateComponents.ts` - Component library definitions
4. `src/types/components.ts` - Component type definitions
5. `src/components/boilerplate/ComponentSelector.tsx` - Component selection UI
6. `src/components/docs/DocumentationViewer.tsx` - Docs display

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

---

**Key Architectural Change**: This project has pivoted from an AI-powered interview system to a **modular boilerplate component selection system**. Instead of asking questions and using AI to generate documentation, users now select pre-built components and the system combines pre-written documentation templates instantly. This approach is:
- ✅ **Free**: No AI API costs
- ✅ **Fast**: Instant generation (< 5 seconds)
- ✅ **Consistent**: Same selections = same output
- ✅ **Maintainable**: Pre-written, reviewed templates
- ✅ **Testable**: Each component independently testable

**Remember**: This project generates documentation for other projects. The documentation we create should be exemplary - clear, structured, and AI-friendly. Practice what we preach!
