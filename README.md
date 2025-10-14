# Docsbuilder 🚀

> **"Describe your project in plain English, and AI generates complete, production-ready documentation."**

Transform project ideas into comprehensive, AI-optimized documentation with arc42+C4 architecture diagrams and code patterns.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

## 🎯 What Makes Docsbuilder Different

Instead of clicking through questionnaires, just **type one sentence**:

```
"A mobile Flutter Pacman-style game with user login, subscriptions, and leaderboards"
```

**AI expands this into:**
- ✅ 45+ production-ready documentation files
- ✅ arc42 architecture documentation
- ✅ C4 model diagrams (Context, Container, Component)
- ✅ 15+ code patterns (technology-specific)
- ✅ Rich metadata for AI tools (GitHub Copilot, ChatGPT)

**⏱️ Time: 2 minutes total** (5 seconds to describe, 10 seconds AI expansion, 1 minute review, 5 seconds generation)

---

## 🚀 Overview

**Docsbuilder** is the first AI-powered documentation generator that understands your project idea and creates complete, production-ready documentation optimized for:
- 🤖 **AI-Assisted Development** - GitHub Copilot, ChatGPT, Claude
- � **Project Planning** - arc42 + C4 compliant specifications
- �👥 **Stakeholder Communication** - Clear, comprehensive project documentation
- ⚡ **Rapid Prototyping** - From idea to architecture in minutes

---

## ✨ Key Features

### Current (Phase 1 - ✅ Complete)
- **📝 45+ Documentation Files** - Comprehensive coverage of all project aspects
- **🏗️ arc42 Structure** - Industry-standard architecture documentation
- **🎨 Modern UI** - Beautiful interface with dark mode support
- **✏️ Live Editor** - Edit and refine docs with real-time markdown preview
- **📦 Multiple Export Options** - JSON, Markdown, ZIP
- **⚙️ Technology Maps** - Framework-specific best practices and patterns

### Coming Soon (Phase 2-3 - ⏳ In Progress)
- **� Freeform Input** - Describe projects in plain English
- **🤖 AI Expansion** - GPT-4/Claude intelligently expands requirements
- **🧠 Smart Clarification** - AI asks only essential follow-up questions
- **🎨 C4 Diagrams** - Auto-generated Context, Container, and Component diagrams
- **📚 Pattern Library** - 30+ production-ready code patterns
- **🔗 Pattern Injection** - Technology-specific code examples in documentation
- **🎯 Metadata Blocks** - Rich metadata for optimal AI comprehension

👉 **See the full vision**: [AI Vision Document](./AI-VISION.md)  
👉 **Implementation details**: [AI-Powered Roadmap](./docs/research/AI-POWERED-ROADMAP.md)

## 📸 Screenshots

<!-- Add screenshots here when available -->

## 🏗️ Tech Stack

- **Framework**: React 18.3 + TypeScript 5.5
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: React Context API + React Query
- **Icons**: Lucide React
- **Markdown**: Marked + Highlight.js

## 🚦 Quick Start

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/SlySlayer32/Docsbuilder.git
cd Docsbuilder

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the app in action!

## 📚 Documentation

Comprehensive documentation is available in the `/docs` folder:

### 🏛️ [Architecture](./docs/architecture/)
- [System Overview](./docs/architecture/system-overview.md) - Complete architecture guide
- [Data Flow](./docs/architecture/data-flow.md) - How data moves through the app
- [Tech Stack](./docs/architecture/tech-stack.md) - Technology choices and rationale
- [State Management](./docs/architecture/state-management.md) - State patterns and strategies

### 🧩 [Components](./docs/components/)
- [Component Overview](./docs/components/overview.md) - All components documented

### 💻 [Development](./docs/development/)
- [Getting Started](./docs/development/getting-started.md) - Setup and installation guide

### ✨ [Features](./docs/features/)
- [Interview Flow](./docs/features/interview-flow.md) - How the interview system works

### 🎨 [UI/UX](./docs/ui-ux/)
- [Design System](./docs/ui-ux/design-system.md) - Complete design guidelines

### 🤖 [AI Context](./docs/ai-context/)
- [AI Guidelines](./docs/ai-context/ai-guidelines.md) - How AI should approach this codebase
- [Common Patterns](./docs/ai-context/common-patterns.md) - Copy-paste code patterns
- [Extension Guide](./docs/ai-context/extension-guide.md) - How to extend the system

### 📖 GitHub Copilot Instructions
- [.github/copilot-instructions.md](./.github/copilot-instructions.md) - AI assistant guidance

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Project Structure

```
Docsbuilder/
├── .github/                  # GitHub configuration
│   └── copilot-instructions.md
├── docs/                     # Comprehensive documentation
│   ├── architecture/
│   ├── components/
│   ├── development/
│   ├── features/
│   ├── ui-ux/
│   └── ai-context/
├── src/
│   ├── components/          # React components
│   │   ├── auth/
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── docs/
│   │   ├── interview/
│   │   ├── landing/
│   │   ├── templates/
│   │   └── ui/             # shadcn/ui components
│   ├── contexts/           # React contexts
│   ├── data/               # Static data
│   ├── hooks/              # Custom hooks
│   ├── lib/                # Utilities
│   ├── pages/              # Page components
│   ├── types/              # TypeScript types
│   └── utils/              # Helper functions
└── ...config files
```

## 🤝 Contributing

Contributions are welcome! Please:

1. Read the [Development Guide](./docs/development/getting-started.md)
2. Follow the [Code Style Guide](./docs/ai-context/ai-guidelines.md)
3. Check [Common Patterns](./docs/ai-context/common-patterns.md)
4. Submit a Pull Request

## 🔮 Roadmap

- [ ] Supabase integration for persistence
- [ ] User authentication and authorization
- [ ] Project sharing and collaboration
- [ ] Advanced export options (PDF, HTML)
- [ ] Custom templates
- [ ] AI-powered documentation suggestions
- [ ] Version control for documentation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [Lucide](https://lucide.dev) - Icon library
- [Vite](https://vitejs.dev) - Next-generation frontend tooling

## 📞 Contact

- **GitHub**: [@SlySlayer32](https://github.com/SlySlayer32)
- **Project**: [Docsbuilder](https://github.com/SlySlayer32/Docsbuilder)

---

**Made with ❤️ for developers and AI assistants**
