# Docsbuilder Documentation

Welcome to the Docsbuilder documentation! This comprehensive guide is designed to help both humans and AI assistants understand and work with the codebase effectively.

## 📚 Documentation Structure

This documentation is organized into several key sections:

### 🏗️ [Architecture](./architecture/)
Technical architecture, system design, and infrastructure details
- [System Overview](./architecture/system-overview.md) - High-level architecture and components
- [Data Flow](./architecture/data-flow.md) - How data moves through the application
- [Tech Stack](./architecture/tech-stack.md) - Technology choices and dependencies
- [State Management](./architecture/state-management.md) - State management patterns

### 🧩 [Components](./components/)
Detailed documentation for each component in the application
- [Component Overview](./components/overview.md) - Component architecture and organization
- [Interview System](./components/interview-system.md) - Interview flow components
- [Documentation Viewer](./components/documentation-viewer.md) - Docs display components
- [UI Components](./components/ui-components.md) - Reusable UI components

### 💻 [Development](./development/)
Development setup, workflows, and best practices
- [Getting Started](./development/getting-started.md) - Setup and installation
- [Development Workflow](./development/workflow.md) - Day-to-day development practices
- [Code Style Guide](./development/code-style.md) - Coding conventions and patterns
- [Testing Guide](./development/testing.md) - Testing strategies and practices

### ✨ [Features](./features/)
Implementation guides for specific features
- [Interview Flow](./features/interview-flow.md) - How the interview system works
- [Documentation Generation](./features/doc-generation.md) - Generating documentation from answers
- [Export Functionality](./features/export.md) - Exporting documentation in various formats
- [Template System](./features/templates.md) - Project templates

### 🎨 [UI/UX](./ui-ux/)
Design guidelines and user experience documentation
- [Design System](./ui-ux/design-system.md) - Colors, typography, spacing
- [Component Patterns](./ui-ux/component-patterns.md) - UI component patterns
- [Dark Mode](./ui-ux/dark-mode.md) - Dark mode implementation
- [Responsive Design](./ui-ux/responsive-design.md) - Mobile and desktop layouts

### 🤖 [AI Context](./ai-context/)
Special documentation for AI assistants and tools
- [AI Guidelines](./ai-context/ai-guidelines.md) - How AI should approach this codebase
- [Common Patterns](./ai-context/common-patterns.md) - Frequently used patterns
- [Code Examples](./ai-context/code-examples.md) - Reference implementations
- [Extension Guide](./ai-context/extension-guide.md) - How to extend the system

## 🚀 Quick Start

### For Developers
1. Read [Getting Started](./development/getting-started.md) for setup
2. Review [System Overview](./architecture/system-overview.md) for architecture
3. Check [Component Overview](./components/overview.md) for component structure
4. Follow [Development Workflow](./development/workflow.md) for best practices

### For AI Assistants (GitHub Copilot, etc.)
1. Read `.github/copilot-instructions.md` for AI-specific guidance
2. Reference [AI Guidelines](./ai-context/ai-guidelines.md) for approach strategy
3. Use [Common Patterns](./ai-context/common-patterns.md) for code generation
4. Consult [Extension Guide](./ai-context/extension-guide.md) when adding features

## 🎯 Project Purpose

**Docsbuilder** transforms project ideas into comprehensive, AI-ready documentation through an interactive interview process. It generates structured markdown files that can be used by:
- Development teams for project planning
- AI tools for context-aware code generation
- Stakeholders for project understanding
- Documentation systems for automated updates

## 🏗️ High-Level Architecture

```
┌─────────────┐
│   Landing   │
│     Page    │
└──────┬──────┘
       │
       v
┌─────────────┐
│    Auth     │
│   (Mock)    │
└──────┬──────┘
       │
       v
┌─────────────┐
│  Dashboard  │
│  Templates  │
└──────┬──────┘
       │
       v
┌─────────────┐
│  Interview  │
│    Flow     │
└──────┬──────┘
       │
       v
┌─────────────┐
│  Generator  │
│   (Utils)   │
└──────┬──────┘
       │
       v
┌─────────────┐
│    Docs     │
│   Viewer    │
└─────────────┘
```

## 📋 Key Concepts

### Interview System
A multi-section questionnaire that collects project information through selection-based questions. Each question can have single or multiple options and optional detail fields.

### Documentation Generation
Transforms interview answers into structured markdown files. The generator uses template-based content creation with dynamic data from answers.

### Documentation Viewer
Displays generated documentation with a file tree navigation and markdown preview. Supports editing and exporting in multiple formats.

### Template System
Pre-configured project templates that provide starting points for common project types (SaaS, E-commerce, etc.).

## 🔑 Core Technologies

- **React 18.3** - UI framework
- **TypeScript 5.5** - Type-safe JavaScript
- **Vite 5.4** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component library built on Radix UI
- **React Router v6** - Client-side routing
- **marked** - Markdown parsing

## 📖 How to Use This Documentation

### When Adding a New Feature
1. Review relevant architecture docs to understand system structure
2. Check component docs for similar existing features
3. Follow development guides for code patterns
4. Reference AI context for AI-friendly implementations
5. Update documentation as you build

### When Fixing a Bug
1. Identify the affected component/feature
2. Review component documentation
3. Check data flow documentation
4. Follow debugging practices in development guide

### When Refactoring
1. Understand current architecture
2. Review code style guide
3. Ensure backwards compatibility
4. Update affected documentation

## 🤝 Contributing

When contributing to this project:
1. Follow the code style guide
2. Update relevant documentation
3. Add tests where appropriate
4. Ensure build passes (`npm run build`)
5. Run linter (`npm run lint`)

## 📝 Documentation Philosophy

This documentation follows these principles:
- **AI-First**: Structured for easy parsing by AI tools
- **Hierarchical**: Organized from high-level to detailed
- **Actionable**: Includes examples and practical guidance
- **Up-to-date**: Maintained alongside code changes
- **Comprehensive**: Covers technical and conceptual aspects

## 🔍 Finding What You Need

### I want to understand...
- **The system architecture** → [Architecture](./architecture/)
- **A specific component** → [Components](./components/)
- **How to develop** → [Development](./development/)
- **How a feature works** → [Features](./features/)
- **Design decisions** → [UI/UX](./ui-ux/)
- **AI integration** → [AI Context](./ai-context/)

### I need to...
- **Set up the project** → [Getting Started](./development/getting-started.md)
- **Add a new feature** → [Extension Guide](./ai-context/extension-guide.md)
- **Fix styling** → [Design System](./ui-ux/design-system.md)
- **Understand data flow** → [Data Flow](./architecture/data-flow.md)
- **Export documentation** → [Export Feature](./features/export.md)

## 🆘 Getting Help

If you can't find what you're looking for:
1. Check the table of contents above
2. Use search functionality (if available)
3. Review similar existing code
4. Check external resources (React docs, Tailwind docs, etc.)
5. Ask the team or community

## 📄 License

This project is part of the Docsbuilder application. Refer to the main LICENSE file for details.

---

**Last Updated**: 2025-10-13  
**Maintainers**: Docsbuilder Team  
**Version**: 1.0.0
