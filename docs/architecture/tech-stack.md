# Technology Stack

## Overview

Docsbuilder uses a modern, type-safe frontend stack optimized for developer experience and application performance.

## Core Technologies

### React 18.3.1
**Why React**: Industry-standard UI library with excellent TypeScript support, large ecosystem, and great tooling.

**Key Features Used**:
- Functional components with hooks
- Context API for state management
- Concurrent features (future)
- Strict mode for development checks

**Usage Pattern**:
```typescript
import React, { useState, useEffect } from 'react';

export const MyComponent: React.FC<Props> = ({ data }) => {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  return <div>{/* JSX */}</div>;
};
```

### TypeScript 5.5.3
**Why TypeScript**: Type safety, better IDE support, catch errors at compile time, improved maintainability.

**Configuration**: Strict mode enabled (`tsconfig.json`)

**Key Features Used**:
- Interface definitions for props and data structures
- Type inference
- Union types for state variants
- Generic types for reusable components
- Strict null checking

**Usage Pattern**:
```typescript
interface ComponentProps {
  title: string;
  count: number;
  onAction: (id: string) => void;
  optional?: boolean;
}

export const Component: React.FC<ComponentProps> = (props) => {
  // Props are fully typed
};
```

### Vite 5.4.1
**Why Vite**: Lightning-fast dev server, optimized builds, modern architecture, great DX.

**Features**:
- Hot Module Replacement (HMR)
- Fast cold start
- Optimized production builds
- Plugin ecosystem
- Native ESM support

**Configuration**: `vite.config.ts`
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  // Path aliases, build options, etc.
})
```

## Styling

### Tailwind CSS 3.4.11
**Why Tailwind**: Utility-first CSS, rapid development, consistent design system, excellent customization.

**Features Used**:
- Utility classes for styling
- Responsive design utilities
- Dark mode support (`dark:` prefix)
- Custom color palette
- Typography plugin

**Configuration**: `tailwind.config.ts`
```typescript
{
  theme: {
    extend: {
      colors: {
        // Custom color scheme with cyan accent
      }
    }
  },
  darkMode: 'class',
  plugins: [typography]
}
```

**Usage Pattern**:
```tsx
<div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-900 rounded-lg">
  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
    Title
  </h1>
</div>
```

### PostCSS 8.4.47
**Purpose**: Process Tailwind directives, add vendor prefixes, optimize CSS.

**Plugins**:
- `tailwindcss` - Process Tailwind utilities
- `autoprefixer` - Add vendor prefixes for browser compatibility

### shadcn/ui Components
**Why shadcn/ui**: Accessible, customizable, copy-paste components built on Radix UI.

**Key Components Used**:
- `button`, `card`, `dialog`, `dropdown-menu`
- `tabs`, `toast`, `tooltip`, `accordion`
- `input`, `label`, `checkbox`, `radio-group`
- And 30+ more components

**Architecture**: 
- Components copied into `src/components/ui/`
- Customizable via code (not package dependency)
- Built on Radix UI primitives
- Styled with Tailwind CSS

**Configuration**: `components.json`
```json
{
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css",
    "baseColor": "slate"
  }
}
```

## UI Component Library

### Radix UI
**Why Radix**: Unstyled, accessible UI primitives that work with any styling solution.

**Key Packages**:
- `@radix-ui/react-dialog` - Modal dialogs
- `@radix-ui/react-dropdown-menu` - Dropdown menus
- `@radix-ui/react-tabs` - Tab interfaces
- `@radix-ui/react-toast` - Toast notifications
- `@radix-ui/react-select` - Select dropdowns
- And 20+ more primitives

**Benefits**:
- WAI-ARIA compliant
- Keyboard navigation
- Focus management
- Screen reader support
- Flexible styling

### Lucide React 0.462.0
**Why Lucide**: Beautiful, consistent icon set with React components.

**Usage**:
```tsx
import { Check, X, ChevronRight } from 'lucide-react';

<Check className="h-4 w-4 text-green-500" />
```

**Features**:
- 1000+ icons
- Customizable size and color
- Tree-shakeable
- TypeScript support

## State Management

### React Context API
**Purpose**: Share global state without prop drilling.

**Usage in App**:
```typescript
// AppContext for sidebar state
const AppContext = createContext<AppContextType>(defaultValue);

export const useAppContext = () => useContext(AppContext);
```

**Benefits**:
- Built into React
- No external dependencies
- Simple API for small-scale state

### React Query (TanStack Query) 5.56.2
**Purpose**: Server state management (prepared for future backend).

**Current Usage**: Minimal (set up for future Supabase integration)

**Features**:
- Caching
- Background refetching
- Automatic retries
- Optimistic updates
- DevTools

## Routing

### React Router v6.26.2
**Purpose**: Client-side routing (prepared for multi-page navigation).

**Current Setup**: Basic routing in `App.tsx`

**Future Usage**:
```typescript
<Routes>
  <Route path="/" element={<Landing />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/interview/:id" element={<Interview />} />
  <Route path="/docs/:projectId" element={<Documentation />} />
</Routes>
```

## Form Management

### React Hook Form 7.53.0
**Purpose**: Performant form handling with validation.

**Features**:
- Minimal re-renders
- Easy validation
- Built-in error handling
- TypeScript support

**Usage** (prepared for future forms):
```typescript
import { useForm } from 'react-hook-form';

const { register, handleSubmit, formState: { errors } } = useForm();
```

### Zod 3.23.8
**Purpose**: Schema validation and TypeScript type inference.

**Integration**: Works with React Hook Form for type-safe validation.

**Usage** (prepared):
```typescript
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
```

## Content Processing

### Marked 12.0.1
**Purpose**: Parse and render Markdown content.

**Current Usage**: Prepared for future use (basic rendering in MarkdownPreview).

**Features**:
- GitHub Flavored Markdown
- Extensible with plugins
- Fast rendering
- Security options

### Highlight.js 11.9.0
**Purpose**: Syntax highlighting for code blocks.

**Usage**: Prepared for rendering code in documentation viewer.

**Features**:
- 190+ languages
- 240+ styles
- Automatic language detection

## Utilities

### clsx 2.1.1
**Purpose**: Conditional className construction.

**Usage**:
```typescript
import { clsx } from 'clsx';

className={clsx(
  'base-class',
  condition && 'conditional-class',
  { 'dynamic-class': isDynamic }
)}
```

### tailwind-merge 2.5.2
**Purpose**: Merge Tailwind classes intelligently.

**Usage** (in `lib/utils.ts`):
```typescript
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Benefits**: Prevents Tailwind class conflicts.

### uuid 11.1.0
**Purpose**: Generate unique identifiers.

**Usage**:
```typescript
import { v4 as uuidv4 } from 'uuid';

const projectId = uuidv4();
```

### date-fns 3.6.0
**Purpose**: Date manipulation and formatting.

**Usage** (prepared for timestamps):
```typescript
import { format, formatDistance } from 'date-fns';

format(new Date(), 'PPP'); // Mar 14, 2024
```

## Theming

### next-themes 0.3.0
**Purpose**: Dark mode implementation.

**Features**:
- System preference detection
- Persistent theme storage
- No flash of unstyled content
- CSS variable support

**Usage**:
```tsx
import { ThemeProvider } from 'next-themes';

<ThemeProvider attribute="class" defaultTheme="light">
  <App />
</ThemeProvider>
```

## Developer Tools

### ESLint 9.9.0
**Purpose**: Code linting and style enforcement.

**Plugins**:
- `@eslint/js` - Core rules
- `eslint-plugin-react-hooks` - React hooks rules
- `eslint-plugin-react-refresh` - Fast refresh compatibility
- `typescript-eslint` - TypeScript-specific rules

**Configuration**: `eslint.config.js`

### TypeScript ESLint 8.0.1
**Purpose**: TypeScript-specific linting rules.

**Benefits**:
- Type-aware linting
- TypeScript best practices
- Performance optimizations

## Build Tools

### SWC (via @vitejs/plugin-react-swc)
**Purpose**: Fast TypeScript/JSX compilation.

**Benefits**:
- 20x faster than Babel
- Native Rust implementation
- Drop-in Babel replacement

### Autoprefixer 10.4.20
**Purpose**: Add vendor prefixes to CSS.

**Benefits**:
- Browser compatibility
- Automatic based on browserslist
- No manual prefixing needed

## Backend (Prepared)

### Supabase 2.49.4
**Purpose**: Backend-as-a-Service (not currently used).

**Planned Features**:
- Authentication
- PostgreSQL database
- Real-time subscriptions
- Storage for exports
- Row Level Security

**Integration Point**:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(url, key);
```

## Package Management

### npm
**Purpose**: Package installation and script running.

**Key Scripts**:
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run lint` - Code linting
- `npm run preview` - Preview production build

## Version Control

### Git
**Purpose**: Source control and collaboration.

**Configuration**: `.gitignore` excludes:
- `node_modules/`
- `dist/`
- `.env`
- Build artifacts

## Hosting & Deployment

### Static Hosting (Planned)
**Options**:
- Vercel - Zero-config deployment
- Netlify - Continuous deployment
- GitHub Pages - Free hosting
- AWS S3 + CloudFront - Full control

**Build Output**: 
- `dist/` directory
- Static HTML, CSS, JS
- Optimized assets
- ~330KB total (gzipped: ~106KB)

## Browser Support

### Target Browsers
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (modern versions)

### Polyfills
- Not needed (targeting modern browsers)
- ES2020+ features assumed

## Performance

### Bundle Size
- **Total**: 333.83 KB
- **Gzipped**: 105.89 KB
- **CSS**: 100.38 KB (gzipped: 15.91 KB)

### Build Time
- **Development**: Instant HMR
- **Production**: ~5 seconds

### Runtime Performance
- **Initial Load**: < 1 second
- **Time to Interactive**: < 2 seconds
- **Lighthouse Score**: 90+ (estimated)

## Development Experience

### Hot Module Replacement
- Instant updates without full reload
- Preserves component state
- Fast development iteration

### Type Safety
- Compile-time error detection
- IDE autocomplete and hints
- Refactoring confidence

### Code Quality
- ESLint for style consistency
- TypeScript for type safety
- Prettier-compatible formatting

## Future Technology Additions

### Planned Integrations
- **PDF Generation**: jsPDF or similar
- **ZIP Export**: JSZip
- **Code Editor**: Monaco or CodeMirror
- **Markdown Editor**: Rich markdown editing
- **Charts/Graphs**: Recharts (already installed)

### Potential Upgrades
- React Server Components (when stable)
- Suspense for data fetching
- Concurrent rendering features
- Progressive Web App (PWA) features

## Technology Decisions Rationale

### Why Single-Page App (SPA)?
- Simple deployment (static files)
- No server required
- Fast interactions
- Offline capability (future)

### Why No Backend Initially?
- MVP speed
- Reduce complexity
- Easy testing
- Scale when needed

### Why Tailwind Over CSS-in-JS?
- Faster development
- Smaller bundle size
- Better performance
- Easier theme customization

### Why shadcn/ui Over Material-UI?
- More customizable
- Copy-paste (no package dependency)
- Modern design language
- Better accessibility

## Conclusion

The Docsbuilder tech stack is carefully chosen for developer experience, performance, and maintainability. Modern tools like Vite and SWC ensure fast builds, while TypeScript and React provide a solid foundation for scalable development. The stack is prepared for future backend integration while remaining simple and performant in its current form.
