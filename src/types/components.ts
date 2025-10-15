/**
 * Component-based documentation system types
 */

export type ComponentCategory =
  | 'authentication'
  | 'dashboard'
  | 'data-management'
  | 'payments'
  | 'api'
  | 'communication'
  | 'content'
  | 'social'
  | 'mobile'
  | 'gaming'
  | 'ecommerce'
  | 'admin'
  | 'security'
  | 'devops';

export type Complexity = 'beginner' | 'intermediate' | 'advanced';

export interface TechStack {
  frontend: string;  // e.g., 'react', 'vue', 'nextjs', 'svelte'
  backend: string;   // e.g., 'nodejs', 'python', 'go', 'firebase'
  database: string;  // e.g., 'postgresql', 'mongodb', 'mysql', 'supabase'
}

export interface ComponentDocumentation {
  overview: string;
  technicalImplementation: {
    [techStack: string]: string;  // Code examples for different tech stacks
  };
  architecture: string;
  apiEndpoints?: Array<{
    method: string;
    endpoint: string;
    description: string;
    request?: string;
    response?: string;
  }>;
  databaseSchema?: string;
  security: string;
  testing: string;
  configuration: string;
}

export interface BoilerplateComponent {
  id: string;
  name: string;
  category: ComponentCategory;
  description: string;
  icon: string;
  documentation: ComponentDocumentation;
  dependencies: string[];        // Required component IDs
  recommendedWith: string[];     // Suggested component IDs
  conflicts: string[];           // Conflicting component IDs
  complexity: Complexity;
  estimatedHours: number;
  tags: string[];               // For searching/filtering
}

export interface ComponentSelection {
  componentIds: string[];
  techStack: TechStack;
  projectName: string;
}

export interface GeneratedDocumentation {
  [path: string]: string;  // file path -> markdown content
}
