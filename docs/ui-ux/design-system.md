# Design System

## Overview

Docsbuilder uses a modern, cohesive design system built on Tailwind CSS with shadcn/ui components. The design emphasizes clarity, consistency, and accessibility across light and dark themes.

## Color Palette

### Primary Colors

**Cyan (Brand Color)**
- `cyan-50`: `#ecfeff` - Lightest backgrounds
- `cyan-100`: `#cffafe` - Hover states (light)
- `cyan-200`: `#a5f3fc` - Borders (light)
- `cyan-400`: `#22d3ee` - Secondary actions
- `cyan-500`: `#06b6d4` - **Primary brand color**
- `cyan-600`: `#0891b2` - Hover states
- `cyan-700`: `#0e7490` - Active states
- `cyan-800`: `#155e75` - Deep accents
- `cyan-900`: `#164e63` - Darkest accents

**Usage**:
- Primary CTAs and action buttons
- Active states and selections
- Progress indicators
- Links and interactive elements

### Neutral Colors

**Gray Scale (Light Mode)**
- `white`: `#ffffff` - Page backgrounds
- `gray-50`: `#f9fafb` - Card backgrounds
- `gray-100`: `#f3f4f6` - Hover backgrounds
- `gray-200`: `#e5e7eb` - Borders
- `gray-300`: `#d1d5db` - Disabled states
- `gray-600`: `#4b5563` - Secondary text
- `gray-700`: `#374151` - Body text
- `gray-900`: `#111827` - Headings

**Gray Scale (Dark Mode)**
- `gray-900`: `#111827` - Page backgrounds
- `gray-800`: `#1f2937` - Card backgrounds
- `gray-700`: `#374151` - Hover backgrounds
- `gray-600`: `#4b5563` - Borders
- `gray-400`: `#9ca3af` - Secondary text
- `gray-300`: `#d1d5db` - Body text
- `white`: `#ffffff` - Headings

### Semantic Colors

**Success** - Green
- `green-500`: `#10b981` - Success states
- `green-600`: `#059669` - Success hover

**Warning** - Amber
- `amber-500`: `#f59e0b` - Warning states
- `amber-600`: `#d97706` - Warning hover

**Error** - Red
- `red-500`: `#ef4444` - Error states
- `red-600`: `#dc2626` - Error hover

**Info** - Blue
- `blue-500`: `#3b82f6` - Info states
- `blue-600`: `#2563eb` - Info hover

## Typography

### Font Family

**Primary**: System font stack
```css
font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
  "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

**Monospace**: For code and documentation
```css
font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
  "Liberation Mono", "Courier New", monospace;
```

### Font Sizes

```
text-xs:    0.75rem  (12px)  - Captions, labels
text-sm:    0.875rem (14px)  - Small text, descriptions
text-base:  1rem     (16px)  - Body text (default)
text-lg:    1.125rem (18px)  - Large body text
text-xl:    1.25rem  (20px)  - Section headings
text-2xl:   1.5rem   (24px)  - Card titles
text-3xl:   1.875rem (30px)  - Page headings
text-4xl:   2.25rem  (36px)  - Hero headings
text-5xl:   3rem     (48px)  - Large hero text
```

### Font Weights

```
font-normal:    400 - Body text
font-medium:    500 - Emphasized text
font-semibold:  600 - Subheadings
font-bold:      700 - Headings, buttons
font-extrabold: 800 - Hero text
```

### Line Heights

```
leading-none:   1       - Tight headings
leading-tight:  1.25    - Headings
leading-snug:   1.375   - Compact text
leading-normal: 1.5     - Body text (default)
leading-relaxed: 1.625  - Comfortable reading
leading-loose:  2       - Spacious text
```

### Text Styles

**Headings**
```tsx
<h1 className="text-4xl font-bold text-gray-900 dark:text-white">
<h2 className="text-3xl font-bold text-gray-900 dark:text-white">
<h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
<h4 className="text-xl font-semibold text-gray-900 dark:text-white">
```

**Body Text**
```tsx
<p className="text-base text-gray-700 dark:text-gray-300">
<span className="text-sm text-gray-600 dark:text-gray-400">
```

**Links**
```tsx
<a className="text-cyan-500 hover:text-cyan-600 underline">
```

## Spacing

### Base Unit: 0.25rem (4px)

```
p-0:  0
p-1:  0.25rem  (4px)
p-2:  0.5rem   (8px)
p-3:  0.75rem  (12px)
p-4:  1rem     (16px)
p-6:  1.5rem   (24px)
p-8:  2rem     (32px)
p-12: 3rem     (48px)
p-16: 4rem     (64px)
```

### Spacing Guidelines

**Component Padding**
- Cards: `p-6` or `p-8`
- Buttons: `px-4 py-2` or `px-6 py-3`
- Modals: `p-6` or `p-8`
- Sections: `py-12` or `py-24`

**Component Gaps**
- Inline elements: `gap-2` or `gap-3`
- Card grids: `gap-6` or `gap-8`
- Sections: `gap-12` or `gap-16`

**Margins**
- Headings: `mb-4` to `mb-6`
- Paragraphs: `mb-3` or `mb-4`
- Sections: `mb-12` to `mb-24`

## Borders

### Border Widths

```
border:   1px
border-2: 2px
border-4: 4px
```

### Border Radius

```
rounded-none: 0
rounded-sm:   0.125rem (2px)
rounded:      0.25rem  (4px)
rounded-md:   0.375rem (6px)
rounded-lg:   0.5rem   (8px)
rounded-xl:   0.75rem  (12px)
rounded-2xl:  1rem     (16px)
rounded-full: 9999px
```

### Border Usage

**Cards**
```tsx
className="rounded-xl border border-gray-200 dark:border-gray-700"
```

**Buttons**
```tsx
className="rounded-lg"
```

**Inputs**
```tsx
className="rounded-md border border-gray-300 dark:border-gray-600"
```

## Shadows

### Shadow Scale

```
shadow-sm:   0 1px 2px rgba(0,0,0,0.05)
shadow:      0 1px 3px rgba(0,0,0,0.1)
shadow-md:   0 4px 6px rgba(0,0,0,0.1)
shadow-lg:   0 10px 15px rgba(0,0,0,0.1)
shadow-xl:   0 20px 25px rgba(0,0,0,0.1)
shadow-2xl:  0 25px 50px rgba(0,0,0,0.25)
```

### Shadow Usage

**Cards**
```tsx
className="shadow-md hover:shadow-xl transition-shadow"
```

**Modals**
```tsx
className="shadow-2xl"
```

**Buttons**
```tsx
// Subtle elevation
className="shadow-sm hover:shadow-md"
```

## Transitions

### Transition Properties

```
transition-none:     none
transition-all:      all 150ms
transition-colors:   color, background-color, border-color
transition-opacity:  opacity
transition-shadow:   box-shadow
transition-transform: transform
```

### Duration

```
duration-75:   75ms
duration-100:  100ms
duration-150:  150ms  (default)
duration-200:  200ms
duration-300:  300ms
duration-500:  500ms
```

### Timing Functions

```
ease-linear:    linear
ease-in:        cubic-bezier(0.4, 0, 1, 1)
ease-out:       cubic-bezier(0, 0, 0.2, 1)
ease-in-out:    cubic-bezier(0.4, 0, 0.2, 1)
```

### Common Transitions

**Hover States**
```tsx
className="transition-colors duration-200 hover:bg-cyan-600"
```

**Shadow Transitions**
```tsx
className="transition-shadow duration-300 hover:shadow-xl"
```

**Transform Transitions**
```tsx
className="transition-transform duration-200 hover:scale-105"
```

## Components

### Buttons

**Primary Button**
```tsx
<button className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg 
  hover:bg-cyan-600 active:bg-cyan-700 transition-colors duration-200
  disabled:opacity-50 disabled:cursor-not-allowed">
  Button Text
</button>
```

**Secondary Button**
```tsx
<button className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 
  text-gray-900 dark:text-white font-semibold rounded-lg 
  hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
  Button Text
</button>
```

**Ghost Button**
```tsx
<button className="px-4 py-2 text-gray-700 dark:text-gray-300 
  hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
  Button Text
</button>
```

### Cards

**Standard Card**
```tsx
<div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 
  dark:border-gray-700 p-6 shadow-md hover:shadow-xl transition-shadow">
  {/* Card content */}
</div>
```

**Interactive Card**
```tsx
<div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 
  dark:border-gray-700 p-6 cursor-pointer hover:border-cyan-500 
  hover:shadow-xl transition-all">
  {/* Card content */}
</div>
```

### Inputs

**Text Input**
```tsx
<input
  type="text"
  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
    rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white
    focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
/>
```

**Textarea**
```tsx
<textarea
  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
    rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white
    font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500
    focus:border-transparent resize-vertical"
  rows={4}
/>
```

## Icons

### Icon Library: Lucide React

**Size Guidelines**
- Small: `h-4 w-4` (16px)
- Medium: `h-5 w-5` (20px)
- Large: `h-6 w-6` (24px)
- XL: `h-8 w-8` (32px)

**Usage**
```tsx
import { Check, X, ChevronRight } from 'lucide-react';

<Check className="h-5 w-5 text-green-500" />
<X className="h-4 w-4 text-red-500" />
```

### Emoji Icons

Used in interview sections and options:
- `🎯` Vision/Goals
- `⚙️` Technical
- `✨` Features
- `📧` Email
- `🔗` Links
- etc.

## Dark Mode

### Implementation

Uses `next-themes` with class-based strategy:
```tsx
<html class="dark">
```

### Dark Mode Patterns

**Backgrounds**
```tsx
bg-white dark:bg-gray-900        // Page backgrounds
bg-gray-50 dark:bg-gray-800      // Card backgrounds
bg-gray-100 dark:bg-gray-700     // Hover states
```

**Text**
```tsx
text-gray-900 dark:text-white    // Headings
text-gray-700 dark:text-gray-300 // Body text
text-gray-600 dark:text-gray-400 // Secondary text
```

**Borders**
```tsx
border-gray-200 dark:border-gray-700  // Default borders
border-gray-300 dark:border-gray-600  // Input borders
```

### Dark Mode Checklist

When styling a component:
- [ ] Background colors defined for both themes
- [ ] Text colors readable in both themes
- [ ] Border colors visible in both themes
- [ ] Hover states work in both themes
- [ ] Icons/images visible in both themes

## Responsive Design

### Breakpoints

```
sm:  640px   - Small tablets
md:  768px   - Tablets
lg:  1024px  - Laptops
xl:  1280px  - Desktops
2xl: 1536px  - Large screens
```

### Mobile-First Approach

Start with mobile styles, add larger screens:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

### Responsive Patterns

**Navigation**
```tsx
className="hidden md:flex"  // Hide on mobile, show on tablet+
className="flex md:hidden"  // Show on mobile, hide on tablet+
```

**Typography**
```tsx
className="text-2xl md:text-3xl lg:text-4xl"  // Scale up on larger screens
```

**Spacing**
```tsx
className="px-4 md:px-6 lg:px-8"  // More padding on larger screens
```

## Accessibility

### Focus States

Always include visible focus indicators:
```tsx
focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2
```

### Color Contrast

- Text on white: >= 4.5:1 contrast ratio
- Text on colored backgrounds: >= 4.5:1
- Large text: >= 3:1

### Interactive Elements

- Minimum touch target: 44x44px
- Clear hover states
- Keyboard accessible
- Screen reader labels

## Animation Guidelines

### When to Animate

- State changes (hover, active, focus)
- Content appearance/disappearance
- Navigation transitions
- Loading states

### When NOT to Animate

- Reading content
- Form inputs (while typing)
- Continuous states
- Heavy animations on low-end devices

### Animation Duration

- Micro-interactions: 100-200ms
- UI transitions: 200-300ms
- Page transitions: 300-500ms
- Never: >1000ms

## Design Tokens (Future)

For design system consistency:

```typescript
export const tokens = {
  colors: {
    primary: 'cyan-500',
    secondary: 'gray-700',
    // ...
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    // ...
  },
  // ...
};
```

## Conclusion

The Docsbuilder design system prioritizes:
- **Consistency**: Predictable patterns across the app
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Lightweight, optimized styling
- **Maintainability**: Clear patterns, easy to extend
- **Dark Mode**: First-class support, not an afterthought

Follow these guidelines when adding new UI to maintain consistency and quality.
