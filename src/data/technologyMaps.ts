export interface TechnologyMap {
  name: string;
  description: string;
  rationale: string;
  bestPractices: string[];
  patterns: {
    [key: string]: string;
  };
  libraries?: string[];
}

export const frontendMaps: { [key: string]: TechnologyMap } = {
  react: {
    name: 'React',
    description: 'Component-based UI library',
    rationale: 'Large ecosystem, excellent TypeScript support, component reusability',
    bestPractices: [
      'Use functional components with hooks',
      'Implement proper prop types with TypeScript',
      'Follow component composition patterns',
      'Use React.memo for performance optimization',
      'Keep components small and focused',
      'Use custom hooks for reusable logic',
    ],
    patterns: {
      component: `export const MyComponent: React.FC<Props> = ({ data }) => {
  const [state, setState] = useState<State>({});
  
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  return <div>{content}</div>;
};`,
      stateManagement: 'Context API or Zustand for global state',
      routing: 'React Router v6 with nested routes',
    },
    libraries: [
      'react-router-dom - Routing',
      'zustand - State management',
      'react-hook-form - Form handling',
      'react-query - Server state management',
    ],
  },
  vue: {
    name: 'Vue.js',
    description: 'Progressive JavaScript framework',
    rationale: 'Gentle learning curve, excellent documentation, reactive data binding',
    bestPractices: [
      'Use Composition API for better TypeScript support',
      'Keep components single-responsibility',
      'Use computed properties for derived state',
      'Leverage Vue 3 features like Suspense',
    ],
    patterns: {
      component: `<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
</script>`,
      stateManagement: 'Pinia for state management',
      routing: 'Vue Router with composition API',
    },
    libraries: [
      'vue-router - Routing',
      'pinia - State management',
      'vueuse - Composition utilities',
    ],
  },
  nextjs: {
    name: 'Next.js',
    description: 'React framework with SSR and SSG',
    rationale: 'Built-in routing, SEO optimization, excellent performance',
    bestPractices: [
      'Use App Router for new projects',
      'Leverage Server Components when possible',
      'Implement proper data fetching strategies',
      'Use Image component for optimization',
    ],
    patterns: {
      component: `export default async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}`,
      stateManagement: 'Server state with Server Components, client state with Context/Zustand',
      routing: 'File-based routing with App Router',
    },
    libraries: [
      'next-auth - Authentication',
      'swr - Client-side data fetching',
      'zustand - Client state management',
    ],
  },
  svelte: {
    name: 'Svelte',
    description: 'Compile-time framework',
    rationale: 'No virtual DOM, smaller bundle sizes, simpler syntax',
    bestPractices: [
      'Use stores for global state',
      'Leverage reactive declarations',
      'Keep components simple',
      'Use SvelteKit for full-stack apps',
    ],
    patterns: {
      component: `<script lang="ts">
  let count = 0
  $: doubled = count * 2
</script>`,
      stateManagement: 'Svelte stores',
      routing: 'SvelteKit file-based routing',
    },
    libraries: [
      'sveltekit - Full-stack framework',
      'svelte-forms-lib - Form handling',
    ],
  },
};

export const backendMaps: { [key: string]: TechnologyMap } = {
  nodejs: {
    name: 'Node.js with Express',
    description: 'JavaScript runtime for building scalable server-side applications',
    rationale: 'JavaScript everywhere, large ecosystem, excellent for APIs',
    bestPractices: [
      'Use async/await for asynchronous operations',
      'Implement proper error handling middleware',
      'Use environment variables for configuration',
      'Follow MVC or layered architecture',
      'Use TypeScript for type safety',
      'Implement request validation',
    ],
    patterns: {
      controller: `export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};`,
      middleware: 'Express middleware for auth, validation, error handling',
      database: 'TypeORM or Prisma for database access',
    },
    libraries: [
      'express - Web framework',
      'prisma - Database ORM',
      'joi - Validation',
      'jsonwebtoken - JWT handling',
    ],
  },
  python: {
    name: 'Python with Django/FastAPI',
    description: 'High-level Python web framework',
    rationale: 'Rapid development, batteries included, excellent for data-heavy apps',
    bestPractices: [
      'Follow Django/FastAPI conventions',
      'Use virtual environments',
      'Implement proper authentication',
      'Use type hints with FastAPI',
      'Follow PEP 8 style guide',
    ],
    patterns: {
      controller: `@router.post("/users/")
async def create_user(user: UserCreate):
    db_user = await user_service.create(user)
    return db_user`,
      middleware: 'Middleware for auth, CORS, and validation',
      database: 'Django ORM or SQLAlchemy',
    },
    libraries: [
      'fastapi - Modern web framework',
      'sqlalchemy - Database ORM',
      'pydantic - Data validation',
      'uvicorn - ASGI server',
    ],
  },
  go: {
    name: 'Go',
    description: 'Compiled language for high-performance services',
    rationale: 'Excellent concurrency, fast compilation, strong typing',
    bestPractices: [
      'Follow Go idioms and conventions',
      'Use goroutines for concurrency',
      'Implement proper error handling',
      'Keep packages focused',
    ],
    patterns: {
      controller: `func CreateUser(w http.ResponseWriter, r *http.Request) {
    var user User
    json.NewDecoder(r.Body).Decode(&user)
    // Process user
    json.NewEncoder(w).Encode(user)
}`,
      middleware: 'Middleware pattern for HTTP handlers',
      database: 'GORM or sqlx for database access',
    },
    libraries: [
      'gin - Web framework',
      'gorm - ORM library',
      'jwt-go - JWT handling',
    ],
  },
  ruby: {
    name: 'Ruby on Rails',
    description: 'Convention over configuration web framework',
    rationale: 'Rapid development, mature ecosystem, developer happiness',
    bestPractices: [
      'Follow Rails conventions',
      'Use ActiveRecord effectively',
      'Implement proper validations',
      'Keep controllers thin',
    ],
    patterns: {
      controller: `def create
  @user = User.new(user_params)
  if @user.save
    render json: @user, status: :created
  else
    render json: @user.errors, status: :unprocessable_entity
  end
end`,
      middleware: 'Rails middleware stack',
      database: 'ActiveRecord ORM',
    },
    libraries: [
      'devise - Authentication',
      'sidekiq - Background jobs',
      'rspec - Testing',
    ],
  },
};

export const databaseMaps: { [key: string]: TechnologyMap } = {
  postgresql: {
    name: 'PostgreSQL',
    description: 'Advanced open-source relational database',
    rationale: 'ACID compliance, JSON support, powerful features',
    bestPractices: [
      'Use proper indexing strategies',
      'Implement database migrations',
      'Use connection pooling',
      'Regular backups and monitoring',
      'Use transactions for data integrity',
    ],
    patterns: {
      schema: 'Normalized relational schema with proper constraints',
      migrations: 'Version-controlled database migrations',
      queries: 'Use prepared statements to prevent SQL injection',
    },
    libraries: [
      'pg - PostgreSQL client',
      'node-postgres - Node.js driver',
    ],
  },
  mongodb: {
    name: 'MongoDB',
    description: 'Document-oriented NoSQL database',
    rationale: 'Flexible schema, horizontal scaling, JSON-like documents',
    bestPractices: [
      'Design schema for your queries',
      'Use proper indexing',
      'Implement data validation',
      'Use aggregation pipeline for complex queries',
    ],
    patterns: {
      schema: 'Embedded documents and references',
      migrations: 'Schema versioning in application code',
      queries: 'Use MongoDB query language',
    },
    libraries: [
      'mongoose - ODM library',
      'mongodb - Native driver',
    ],
  },
  mysql: {
    name: 'MySQL',
    description: 'Popular open-source relational database',
    rationale: 'Widespread adoption, good performance, easy to use',
    bestPractices: [
      'Use InnoDB storage engine',
      'Implement proper indexing',
      'Use transactions',
      'Regular optimization',
    ],
    patterns: {
      schema: 'Normalized relational schema',
      migrations: 'Version-controlled migrations',
      queries: 'Prepared statements',
    },
    libraries: [
      'mysql2 - MySQL client',
      'sequelize - ORM',
    ],
  },
  supabase: {
    name: 'Supabase',
    description: 'Open-source Firebase alternative with PostgreSQL',
    rationale: 'Built-in auth, real-time, storage, PostgreSQL power',
    bestPractices: [
      'Use Row Level Security (RLS)',
      'Leverage real-time subscriptions',
      'Use Edge Functions for backend logic',
      'Implement proper authentication flows',
    ],
    patterns: {
      schema: 'PostgreSQL schema with RLS policies',
      migrations: 'Supabase migration system',
      queries: 'Supabase client with TypeScript',
    },
    libraries: [
      '@supabase/supabase-js - Client library',
      '@supabase/auth-helpers - Auth utilities',
    ],
  },
};
