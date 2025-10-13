# Getting Started

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ (LTS recommended)
- **npm** 9+ (comes with Node.js)
- **Git** (for version control)
- **VS Code** (recommended editor) with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/SlySlayer32/Docsbuilder.git
cd Docsbuilder
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages (~386 packages, takes ~30-60 seconds).

### 3. Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### 4. Open in Browser

Navigate to `http://localhost:5173` in your browser. You should see the Docsbuilder landing page.

## Project Structure

```
Docsbuilder/
├── .github/                 # GitHub configuration
│   └── copilot-instructions.md
├── docs/                    # Documentation (this folder)
├── public/                  # Static assets
├── src/                     # Source code
│   ├── components/          # React components
│   ├── contexts/            # React contexts
│   ├── data/                # Static data
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Utility functions
│   ├── pages/               # Page components
│   ├── types/               # TypeScript types
│   ├── utils/               # Helper utilities
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite config
└── tailwind.config.ts       # Tailwind config
```

## Available Scripts

### Development

```bash
npm run dev
```
- Starts Vite dev server with hot reload
- Runs on port 5173
- Fast refresh enabled

### Build

```bash
npm run build
```
- Creates production build in `dist/`
- Performs type checking
- Optimizes and minifies assets
- Takes ~5 seconds

### Lint

```bash
npm run lint
```
- Runs ESLint on all source files
- Checks code style and potential errors
- Configure in `eslint.config.js`

### Preview

```bash
npm run preview
```
- Previews production build locally
- Useful for testing before deployment

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

Edit files in `src/` directory. The dev server will hot-reload changes.

### 3. Test Locally

- Check functionality in browser
- Test both light and dark modes
- Test responsive layouts (mobile, tablet, desktop)
- Run `npm run lint` to check code style
- Run `npm run build` to ensure no type errors

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add your feature description"
```

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Editor Setup

### VS Code (Recommended)

#### Required Extensions

1. **ESLint** (`dbaeumer.vscode-eslint`)
   - Auto-fix on save
   - Inline error highlighting

2. **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
   - Class name autocomplete
   - CSS preview on hover

3. **TypeScript and JavaScript Language Features** (built-in)
   - Type checking
   - IntelliSense

#### Recommended Extensions

4. **Prettier** (`esbenp.prettier-vscode`)
   - Code formatting

5. **Auto Rename Tag** (`formulahendry.auto-rename-tag`)
   - Rename paired HTML/JSX tags

6. **Path Intellisense** (`christian-kohler.path-intellisense`)
   - File path autocomplete

7. **GitLens** (`eamodio.gitlens`)
   - Enhanced Git integration

#### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

### WebStorm / IntelliJ IDEA

1. Enable TypeScript support (auto-detected)
2. Enable ESLint in Settings → Languages & Frameworks → JavaScript → Code Quality Tools
3. Install Tailwind CSS plugin

## Common Issues

### Port Already in Use

```bash
Error: Port 5173 is already in use
```

**Solution**: Kill the process on port 5173 or use a different port:
```bash
npm run dev -- --port 5174
```

### Module Not Found

```bash
Error: Cannot find module 'module-name'
```

**Solution**: Reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Type Errors

```bash
Error: Type 'X' is not assignable to type 'Y'
```

**Solution**: 
- Check TypeScript interfaces match usage
- Update type definitions in `src/types/`
- Use type assertions if needed: `value as Type`

### Tailwind Classes Not Working

**Solution**:
- Ensure `tailwind.config.ts` content includes your files
- Check that class names are complete strings (not concatenated)
- Restart dev server

### Dark Mode Not Working

**Solution**:
- Check `class="dark"` is on `<html>` element
- Verify `next-themes` provider wraps app
- Use `dark:` prefix on classes

## Environment Variables

### Current Setup

No environment variables needed for local development.

### Future (with Supabase)

Create `.env.local`:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

Access in code:
```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
```

## Browser Support

### Supported Browsers

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome)

### Not Supported

- IE 11 (deprecated)
- Very old mobile browsers

### Testing

Test on:
- Latest Chrome (desktop & mobile)
- Latest Firefox
- Latest Safari (Mac & iOS)
- Latest Edge

## Hot Reload

Vite provides instant hot module replacement:

- **Component changes**: React Fast Refresh updates without losing state
- **CSS changes**: Updates instantly without refresh
- **Non-component changes**: Page refreshes automatically

## TypeScript

### Type Checking

Vite doesn't type-check during dev for speed. Check types with:

```bash
npm run build
# or
npx tsc --noEmit
```

### Type Errors

Fix type errors before committing:

```bash
# Check all files
npx tsc --noEmit

# Check specific file
npx tsc --noEmit src/components/MyComponent.tsx
```

## Linting

### Run Linter

```bash
npm run lint
```

### Auto-fix Issues

```bash
npx eslint . --fix
```

### ESLint Rules

Configured in `eslint.config.js`:
- TypeScript recommended rules
- React hooks rules
- React refresh rules
- No explicit `any` types

## Build Output

Production build creates:

```
dist/
├── assets/
│   ├── index-[hash].css
│   └── index-[hash].js
└── index.html
```

### Build Metrics

- Total: ~334 KB
- Gzipped: ~106 KB
- Build time: ~5 seconds

## Deployment

### Static Hosting

Build output (`dist/`) can be deployed to:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Push `dist/` to `gh-pages` branch
- **AWS S3**: Upload `dist/` contents

### Build for Production

```bash
npm run build
```

Test production build:

```bash
npm run preview
```

## Git Workflow

### Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `test/` - Adding tests

### Commit Messages

Follow conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Tests
- `chore:` - Maintenance

Example:
```bash
git commit -m "feat: add export to PDF functionality"
git commit -m "fix: resolve dark mode flicker on load"
git commit -m "docs: update component documentation"
```

## Getting Help

### Documentation

1. Check `/docs/` folder for guides
2. Read inline code comments
3. Review similar components

### External Resources

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Guide](https://vitejs.dev/guide)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com)

### Community

- GitHub Issues: Report bugs
- GitHub Discussions: Ask questions
- Pull Requests: Contribute code

## Next Steps

After setting up:

1. ✅ Read [Development Workflow](./workflow.md)
2. ✅ Review [Code Style Guide](./code-style.md)
3. ✅ Understand [Architecture](../architecture/system-overview.md)
4. ✅ Explore [Components](../components/overview.md)
5. ✅ Check [AI Guidelines](../ai-context/ai-guidelines.md)

## Troubleshooting

### Clean Install

If you encounter persistent issues:

```bash
# Remove all installed packages
rm -rf node_modules

# Remove lock file
rm package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall
npm install
```

### Reset Git State

To undo uncommitted changes:

```bash
# Discard all changes
git reset --hard HEAD

# Remove untracked files
git clean -fd
```

### Check Node Version

Ensure you're using Node 18+:

```bash
node --version
# Should show v18.x.x or higher
```

If wrong version, use nvm:

```bash
nvm install 18
nvm use 18
```

## Performance Tips

### Dev Server

- Close unused apps/tabs
- Disable browser extensions (if slow)
- Use production build for performance testing

### Build Performance

- Don't commit `node_modules/`
- Don't commit `dist/`
- Use `.gitignore` properly

## Conclusion

You should now have Docsbuilder running locally! The dev server provides instant feedback, and the TypeScript + ESLint setup catches errors early. Follow the development workflow for contributing code, and refer to other documentation pages for detailed guidance on specific topics.

Happy coding! 🚀
