# Common Patterns for AI Code Generation

## Introduction

This document provides copy-paste patterns for AI assistants to use when generating code for Docsbuilder. These patterns are proven, follow project conventions, and handle common scenarios correctly.

## Component Patterns

### Basic Component Template

```typescript
import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentNameProps {
  // Required props first
  data: DataType;
  onAction: (value: string) => void;
  
  // Optional props with default values
  className?: string;
  disabled?: boolean;
}

/**
 * Brief description of what this component does
 * 
 * @param data - Description of data prop
 * @param onAction - Description of callback
 * @param className - Additional CSS classes
 * @param disabled - Whether component is disabled
 * 
 * @example
 * <ComponentName 
 *   data={myData} 
 *   onAction={handleAction} 
 * />
 */
export const ComponentName: React.FC<ComponentNameProps> = ({
  data,
  onAction,
  className,
  disabled = false,
}) => {
  return (
    <div className={cn('base-classes', className)}>
      {/* Component content */}
    </div>
  );
};
```

### Component with State

```typescript
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ComponentNameProps {
  initialValue: string;
  onChange: (value: string) => void;
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  initialValue,
  onChange,
}) => {
  const [value, setValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync with parent when value changes
  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  if (error) {
    return <div className="text-red-500 dark:text-red-400">{error}</div>;
  }

  if (isLoading) {
    return <div className="text-gray-500">Loading...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Component content */}
    </div>
  );
};
```

### Controlled Component

```typescript
import React from 'react';

interface ControlledInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const ControlledInput: React.FC<ControlledInputProps> = ({
  value,
  onChange,
  placeholder = '',
  disabled = false,
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
        rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white
        focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
        disabled:opacity-50 disabled:cursor-not-allowed"
    />
  );
};
```

## State Management Patterns

### Local State

```typescript
const [state, setState] = useState<Type>(initialValue);

// Update state
setState(newValue);

// Update based on previous state
setState(prev => ({ ...prev, key: newValue }));
```

### Array State (Immutable Updates)

```typescript
// Add item
setItems([...items, newItem]);

// Remove item
setItems(items.filter(item => item.id !== idToRemove));

// Update item
setItems(items.map(item => 
  item.id === idToUpdate ? { ...item, ...updates } : item
));

// Replace all
setItems(newItems);
```

### Object State (Immutable Updates)

```typescript
// Update single property
setState({ ...state, key: newValue });

// Update multiple properties
setState({ ...state, key1: value1, key2: value2 });

// Update nested property
setState({
  ...state,
  nested: { ...state.nested, key: newValue }
});
```

## Event Handler Patterns

### Click Handler

```typescript
const handleClick = () => {
  // Logic here
  onAction(value);
};

<button onClick={handleClick}>
  Click Me
</button>
```

### Input Change Handler

```typescript
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setValue(value);
  onChange?.(value); // Optional chaining for optional callback
};

<input onChange={handleChange} />
```

### Form Submit Handler

```typescript
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  // Validation
  if (!isValid) {
    setError('Validation error message');
    return;
  }
  
  // Submit logic
  onSubmit(formData);
};

<form onSubmit={handleSubmit}>
  {/* Form fields */}
</form>
```

### Keyboard Handler

```typescript
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleSubmit();
  }
  
  if (e.key === 'Escape') {
    onClose();
  }
};

<input onKeyDown={handleKeyDown} />
```

## Styling Patterns

### Base Styles

```typescript
// Card
className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 
  dark:border-gray-700 p-6 shadow-md"

// Container
className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"

// Section
className="py-12 md:py-24"

// Grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

### Interactive Elements

```typescript
// Button (Primary)
className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg 
  hover:bg-cyan-600 active:bg-cyan-700 transition-colors duration-200
  disabled:opacity-50 disabled:cursor-not-allowed"

// Button (Secondary)
className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 
  text-gray-900 dark:text-white font-semibold rounded-lg 
  hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"

// Link
className="text-cyan-500 hover:text-cyan-600 dark:text-cyan-400 
  dark:hover:text-cyan-300 underline transition-colors"

// Selection Card
className="p-6 border-2 rounded-xl cursor-pointer transition-all duration-200
  bg-white dark:bg-gray-800 
  border-gray-200 dark:border-gray-700
  hover:border-cyan-500 hover:shadow-lg"

// Selected State
className="border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20"
```

### Conditional Styling

```typescript
import { cn } from '@/lib/utils';

// Simple condition
className={cn(
  'base-classes',
  isActive && 'active-classes'
)}

// Multiple conditions
className={cn(
  'base-classes',
  isActive && 'active-classes',
  isDisabled && 'disabled-classes',
  variant === 'primary' && 'primary-classes'
)}

// With object syntax
className={cn(
  'base-classes',
  {
    'active-classes': isActive,
    'disabled-classes': isDisabled,
    'primary-classes': variant === 'primary',
  }
)}
```

## Data Fetching Patterns

### Simple Fetch (Future)

```typescript
const [data, setData] = useState<DataType | null>(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/endpoint');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  fetchData();
}, []);
```

### React Query Pattern (Future)

```typescript
import { useQuery } from '@tanstack/react-query';

const { data, isLoading, error } = useQuery({
  queryKey: ['keyName', id],
  queryFn: async () => {
    const response = await fetch(`/api/endpoint/${id}`);
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
  },
});

if (isLoading) return <div>Loading...</div>;
if (error) return <div>Error: {error.message}</div>;
```

## Documentation Generator Patterns

### Adding New Documentation File

```typescript
// In src/utils/docGenerator.ts

export const generateDocumentation = (answers: Answer[], projectName: string) => {
  const docs: { [path: string]: string } = {};
  
  // Helper to get answer
  const getAnswer = (questionId: string) => 
    answers.find(a => a.questionId === questionId);
  
  // ... existing docs ...
  
  // Add your new doc
  const yourAnswer = getAnswer('your-question-id');
  const selectedOption = yourAnswer?.selectedOptions[0];
  const details = yourAnswer?.details;
  
  docs['/your-section/your-file.md'] = `# Your Document Title

## Overview

${details || 'Default content when no details provided'}

## Selected Technology

**Choice**: ${selectedOption || 'Not specified'}

## Implementation Details

- Point 1
- Point 2
- Point 3

## Best Practices

1. Practice 1
2. Practice 2
3. Practice 3
`;

  return docs;
};
```

### Template with Conditional Content

```typescript
docs['/section/file.md'] = `# Title

## Overview

${details || 'Default overview'}

${selectedOption === 'advanced' ? `
## Advanced Configuration

Advanced content here...
` : ''}

${items.length > 0 ? `
## Selected Items

${items.map(item => `- ${item.label}`).join('\n')}
` : ''}

## Summary

Final content
`;
```

## Error Handling Patterns

### Try-Catch

```typescript
const handleAction = async () => {
  try {
    const result = await riskyOperation();
    setData(result);
  } catch (error) {
    console.error('Operation failed:', error);
    setError(error instanceof Error ? error.message : 'Unknown error');
    // Show toast notification
    toast({
      title: 'Error',
      description: 'Failed to complete operation',
      variant: 'destructive',
    });
  }
};
```

### Optional Chaining

```typescript
// Safe property access
const value = obj?.property?.nested?.value;

// Safe function call
const result = callback?.(argument);

// Array safe access
const item = array?.[index];

// With default value
const name = user?.profile?.name || 'Guest';
```

### Type Guards

```typescript
// Check if value is defined
if (value !== null && value !== undefined) {
  // Use value safely
}

// Check if array has items
if (items && items.length > 0) {
  // Process items
}

// Type narrowing
if (typeof value === 'string') {
  // value is string here
}

if (Array.isArray(value)) {
  // value is array here
}
```

## Modal/Dialog Patterns

### Basic Modal

```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};
```

## List Rendering Patterns

### Simple List

```typescript
<div className="space-y-4">
  {items.map(item => (
    <ItemComponent key={item.id} item={item} />
  ))}
</div>
```

### List with Empty State

```typescript
{items.length === 0 ? (
  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
    <p>No items found</p>
  </div>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {items.map(item => (
      <ItemComponent key={item.id} item={item} />
    ))}
  </div>
)}
```

### List with Loading and Error States

```typescript
{isLoading ? (
  <div className="text-center py-12">
    <LoadingSpinner />
    <p className="mt-4 text-gray-500">Loading...</p>
  </div>
) : error ? (
  <div className="text-center py-12 text-red-500">
    <p>Error: {error}</p>
    <button onClick={retry} className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg">
      Retry
    </button>
  </div>
) : items.length === 0 ? (
  <div className="text-center py-12 text-gray-500">
    <p>No items found</p>
  </div>
) : (
  <div className="grid gap-6">
    {items.map(item => (
      <ItemComponent key={item.id} item={item} />
    ))}
  </div>
)}
```

## Type Definition Patterns

### Interface vs Type

```typescript
// Use interface for object shapes (preferred)
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Use type for unions, intersections, primitives
type ID = string | number;
type Status = 'pending' | 'active' | 'completed';
type UserWithTimestamp = User & { createdAt: Date };
```

### Props Interface

```typescript
interface ComponentProps {
  // Required props
  id: string;
  title: string;
  
  // Optional props
  subtitle?: string;
  className?: string;
  
  // Callbacks
  onClick?: () => void;
  onChange?: (value: string) => void;
  
  // Children
  children?: React.ReactNode;
}
```

### Extending Interfaces

```typescript
interface BaseProps {
  id: string;
  className?: string;
}

interface ExtendedProps extends BaseProps {
  title: string;
  description?: string;
}
```

## Custom Hook Patterns

### Simple Custom Hook

```typescript
export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = (valueOrFn: T | ((val: T) => T)) => {
    try {
      const valueToStore = valueOrFn instanceof Function ? valueOrFn(value) : valueOrFn;
      setValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [value, setStoredValue] as const;
};
```

## Testing Patterns (Future)

### Component Test

```typescript
import { render, fireEvent, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<MyComponent onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Quick Reference

### Import Statements

```typescript
// React
import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Types
import type { ComponentType } from '@/types';

// Components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Utils
import { cn } from '@/lib/utils';

// Icons
import { Check, X, ChevronRight } from 'lucide-react';
```

### Export Patterns

```typescript
// Named export (preferred for components)
export const MyComponent = () => { };

// Default export (for pages)
export default MyPage;

// Multiple exports
export { Component1, Component2, type MyType };
```

## Conclusion

These patterns represent the proven, consistent ways to write code in Docsbuilder. AI assistants should copy these patterns exactly when generating new code, adjusting only the specifics (names, content, logic) while preserving the structure and style. This ensures all generated code matches the existing codebase perfectly.
