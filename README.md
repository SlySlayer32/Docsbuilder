# Docsbuilder 🚀

> **"Select components, get instant documentation. No AI needed, just production-ready templates."**

Transform project ideas into comprehensive documentation by selecting pre-built components and combining them into complete, production-ready documentation.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

## 🎯 What Makes Docsbuilder Different

**The New Approach**: Visual component selection instead of complex questionnaires.

### Select Components Like Building Blocks:
```
✅ Basic Login/Signup
✅ User Dashboard
✅ CRUD Operations
✅ Stripe Integration
✅ REST API
```

**Instantly generates:**
- ✅ 40+ production-ready documentation files
- ✅ arc42 architecture documentation
- ✅ Technology-specific code examples
- ✅ API endpoint specifications
- ✅ Security best practices
- ✅ Testing strategies

**⏱️ Time: 2 minutes total** (30 seconds to select components, 5 seconds generation, 1 minute review)

**🆓 No AI Costs** - 100% free, works offline, consistent results

---

## 🚀 Overview

**Docsbuilder** is a modular documentation generator that creates complete, production-ready documentation through visual component selection. It's optimized for:
- 🧩 **Component-Based Architecture** - Select pre-built components like LEGO blocks
- 📋 **Project Planning** - arc42 compliant documentation structure
- 👥 **Stakeholder Communication** - Clear, comprehensive project documentation
- ⚡ **Rapid Development** - Instant generation with zero AI costs
- 🤖 **AI-Friendly Output** - Perfect for GitHub Copilot, ChatGPT, Claude

---

## ✨ Key Features

### Current (Phase 1 - ✅ Complete)
- **🧩 Component Selection** - Visual selection of 5 core boilerplate components
- **📝 40+ Documentation Files** - Comprehensive coverage based on selected components
- **🏗️ arc42 Structure** - Industry-standard architecture documentation
- **🎨 Modern UI** - Beautiful interface with dark mode support
- **✏️ Live Editor** - Edit and refine docs with real-time markdown preview
- **📦 Multiple Export Options** - JSON, Markdown, ZIP
- **⚙️ Technology Maps** - Framework-specific best practices and patterns
- **⚡ Instant Generation** - No AI needed, < 5 second generation time

### Core Components Available
1. **Basic Login/Signup** - Authentication with email/password, social login
2. **User Dashboard** - User profile, settings, navigation
3. **CRUD Operations** - Create, Read, Update, Delete patterns
4. **Stripe Integration** - Payment processing and subscriptions
5. **REST API** - RESTful API endpoint templates

### Coming Soon (Phase 2+)
- **📚 Expanded Library** - 60+ components across 14 categories
- **🔗 Smart Dependencies** - Auto-resolve component dependencies
- **⚠️ Conflict Detection** - Warn about incompatible component combinations
- **🎨 C4 Diagrams** - Visual architecture diagrams
- **💾 Project Saving** - Save and load projects with Supabase
- **🤝 Collaboration** - Share projects with team members

👉 **See the approach**: [Boilerplate Approach Document](./BOILERPLATE-APPROACH.md)

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
