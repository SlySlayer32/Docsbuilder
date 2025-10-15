import { TechStack } from '../types/components';
import { getComponentById } from '../data/boilerplateComponents';
import { frontendMaps, backendMaps, databaseMaps } from '../data/technologyMaps';

export const generateDocumentation = (
  componentIds: string[],
  techStack: TechStack,
  projectName: string
) => {
  const docs: { [path: string]: string } = {};

  // Get selected components
  const selectedComponents = componentIds
    .map(id => getComponentById(id))
    .filter(Boolean);
  
  console.log('🔍 [docGenerator] Starting documentation generation...');
  console.log('📝 [docGenerator] Project name:', projectName);
  console.log('🧩 [docGenerator] Selected components:', componentIds);
  console.log('⚙️ [docGenerator] Tech stack:', techStack);

  // Get technology maps
  const frontendMap = frontendMaps[techStack.frontend];
  const backendMap = backendMaps[techStack.backend];
  const databaseMap = databaseMaps[techStack.database];

  // Project Overview
  const componentList = selectedComponents.map(c => `- **${c!.name}**: ${c!.description}`).join('\n');
  
  docs['/project/overview.md'] = `# ${projectName}

## Project Overview

This document provides a comprehensive overview of the ${projectName} project, built using a modular component-based architecture.

## Selected Components

This project includes the following components:

${componentList}

## Technology Stack

### Frontend
**${frontendMap?.name || techStack.frontend}**: ${frontendMap?.description || 'Frontend framework'}

### Backend
**${backendMap?.name || techStack.backend}**: ${backendMap?.description || 'Backend technology'}

### Database
**${databaseMap?.name || techStack.database}**: ${databaseMap?.description || 'Database system'}

## Architecture Approach

This project follows a modular, component-based architecture where each feature is implemented as a self-contained component with clear interfaces and responsibilities.

## Goals

- Deliver exceptional user experience
- Build scalable and maintainable architecture
- Ensure high performance and reliability
- Maintain security and data privacy
- Follow best practices for ${frontendMap?.name || 'frontend'}, ${backendMap?.name || 'backend'}, and ${databaseMap?.name || 'database'}

## Success Metrics

- User satisfaction score > 4.5/5
- System uptime > 99.9%
- Page load time < 2 seconds
- Zero critical security vulnerabilities`;

  // Generate component-specific documentation
  selectedComponents.forEach(component => {
    if (!component) return;
    
    const techStackKey = `${techStack.frontend}-${techStack.backend}-${techStack.database}`;
    const componentDoc = component.documentation;
    
    // Create component-specific documentation file
    const categoryPath = component.category.replace(/-/g, '_');
    docs[`/components/${categoryPath}/${component.id}.md`] = componentDoc.overview;
    
    // Add technical implementation (use the most relevant tech stack or first available)
    const implementationKey = Object.keys(componentDoc.technicalImplementation)[0] || '';
    if (implementationKey) {
      docs[`/components/${categoryPath}/${component.id}_implementation.md`] = 
        componentDoc.technicalImplementation[implementationKey];
    }
    
    // Add architecture documentation
    docs[`/components/${categoryPath}/${component.id}_architecture.md`] = componentDoc.architecture;
    
    // Add security documentation
    docs[`/components/${categoryPath}/${component.id}_security.md`] = componentDoc.security;
    
    // Add testing documentation
    docs[`/components/${categoryPath}/${component.id}_testing.md`] = componentDoc.testing;
    
    // Add configuration documentation
    docs[`/components/${categoryPath}/${component.id}_configuration.md`] = componentDoc.configuration;
    
    // Add API endpoints if available
    if (componentDoc.apiEndpoints && componentDoc.apiEndpoints.length > 0) {
      const apiDoc = `# ${component.name} - API Endpoints

## Endpoints

${componentDoc.apiEndpoints.map(endpoint => `### ${endpoint.method} ${endpoint.endpoint}

**Description**: ${endpoint.description}

${endpoint.request ? `**Request**:\n\`\`\`json\n${endpoint.request}\n\`\`\`` : ''}

${endpoint.response ? `**Response**:\n\`\`\`json\n${endpoint.response}\n\`\`\`` : ''}
`).join('\n')}`;
      docs[`/api/${component.id}_endpoints.md`] = apiDoc;
    }
    
    // Add database schema if available
    if (componentDoc.databaseSchema) {
      docs[`/database/${component.id}_schema.md`] = `# ${component.name} - Database Schema\n\n${componentDoc.databaseSchema}`;
    }
  });

  // Technical Architecture Summary
  // Create compatibility objects for old template references
  const frontendAnswer = { selectedOptions: [techStack.frontend] };
  const backendAnswer = { selectedOptions: [techStack.backend] };
  const databaseAnswer = { selectedOptions: [techStack.database] };
  const purposeAnswer = { details: `A modern ${projectName} application built with selected components` };
  const targetUsersAnswer = { details: 'Application users who need the selected features' };
  
  // Create a compatibility getAnswer function for old code
  const getAnswer = (questionId: string) => {
    // Map question IDs to component-based answers
    const hasAuth = selectedComponents.some(c => c!.category === 'authentication');
    const hasPayments = selectedComponents.some(c => c!.category === 'payments');
    const hasApi = selectedComponents.some(c => c!.category === 'api');
    
    switch (questionId) {
      case 'auth':
        return hasAuth ? { selectedOptions: ['email', 'social'] } : { selectedOptions: [] };
      case 'payments':
        return hasPayments ? { selectedOptions: ['yes-stripe'] } : { selectedOptions: ['no'] };
      case 'api-design':
        return hasApi ? { selectedOptions: ['rest'] } : { selectedOptions: ['rest'] };
      case 'real-time':
        return { selectedOptions: ['no'] };
      case 'file-storage':
        return { selectedOptions: ['no'] };
      case 'search':
        return { selectedOptions: ['no'] };
      case 'email-service':
        return { selectedOptions: ['no'] };
      default:
        return { selectedOptions: [], details: '' };
    }
  };

  docs['/architecture/tech-stack.md'] = `# Technology Stack

## Frontend

**Framework**: ${frontendMap?.name || frontendAnswer}

${frontendMap?.description || 'Modern frontend framework'}

**Rationale**: ${frontendMap?.rationale || 'Chosen for its robustness and ecosystem'}

### Best Practices
${frontendMap?.bestPractices.map(practice => `- ${practice}`).join('\n') || '- Follow framework best practices'}

## Backend

**Technology**: ${backendMap?.name || backendAnswer}

${backendMap?.description || 'Backend technology'}

**Rationale**: ${backendMap?.rationale || 'Chosen for its performance and scalability'}

### Best Practices
${backendMap?.bestPractices.map(practice => `- ${practice}`).join('\n') || '- Follow backend best practices'}

## Database

**System**: ${databaseAnswer?.selectedOptions[0] || 'PostgreSQL'}

Data persistence with:
- Normalized schema design
- Indexing for performance
- Backup and recovery
- Migration management

## Infrastructure

- Cloud hosting platform
- CI/CD pipeline
- Monitoring and alerting
- Load balancing and scaling`;

  // Authentication
  const authAnswer = getAnswer('auth');
  
  docs['/security/authentication.md'] = `# Authentication

## Authentication Methods

${authAnswer?.selectedOptions.join(', ') || 'Email/Password'}

## Implementation

- Secure password hashing (bcrypt/argon2)
- JWT tokens for session management
- Refresh token rotation
- Account verification via email

## Security Measures

- Rate limiting on auth endpoints
- CAPTCHA for bot prevention
- Multi-factor authentication (optional)
- Password strength requirements

## Session Management

- Token expiration: 24 hours
- Refresh token: 30 days
- Automatic logout on security events`;

  docs['/project/requirements.md'] = `# Project Requirements

## Functional Requirements

1. User authentication and authorization
2. Core business functionality
3. Data management and persistence
4. API endpoints for client communication
5. Admin dashboard for management

## Non-Functional Requirements

1. **Performance**: Response time < 200ms for 95% of requests
2. **Scalability**: Support 10,000+ concurrent users
3. **Security**: OWASP Top 10 compliance
4. **Reliability**: 99.9% uptime SLA
5. **Maintainability**: Clean code, documentation, tests`;

  // Business Context (arc42 Section 1-3)
  docs['/project/goals-and-constraints.md'] = `# Goals and Constraints

## Business Goals

1. **Primary Goal**: ${purposeAnswer?.details || 'Deliver value to target users'}
2. **User Satisfaction**: Provide excellent user experience
3. **Market Position**: Establish competitive advantage
4. **Scalability**: Support growth in user base
5. **Revenue**: Achieve sustainable business model

## Technical Goals

- Build maintainable and extensible architecture
- Ensure high performance and reliability
- Implement robust security measures
- Enable rapid feature development
- Maintain code quality standards

## Constraints

### Technical Constraints
- **Technology Stack**: ${frontendAnswer?.selectedOptions[0]}, ${backendAnswer?.selectedOptions[0]}, ${databaseAnswer?.selectedOptions[0]}
- **Performance**: Must handle expected load
- **Security**: Must comply with data protection regulations
- **Compatibility**: Support modern browsers and devices

### Business Constraints
- **Budget**: Development within allocated resources
- **Timeline**: MVP delivery in planned timeframe
- **Team**: Development with available team size
- **Compliance**: Adherence to industry regulations`;

  docs['/project/stakeholders.md'] = `# Stakeholders

## Primary Stakeholders

### End Users
**Role**: ${targetUsersAnswer?.details || 'Primary users of the application'}

**Needs**:
- Intuitive and responsive interface
- Reliable and fast performance
- Secure data handling
- Excellent user experience

### Development Team
**Role**: Build and maintain the application

**Needs**:
- Clear technical specifications
- Modern development tools
- Good code documentation
- Efficient deployment pipeline

### Business Owners
**Role**: Define requirements and business goals

**Needs**:
- Feature delivery on schedule
- Metrics and analytics
- Cost-effective solution
- Competitive advantage

## Secondary Stakeholders

### System Administrators
**Role**: Maintain infrastructure and operations

**Needs**:
- Monitoring and logging tools
- Deployment automation
- System documentation
- Alert mechanisms

### Support Team
**Role**: Assist users with issues

**Needs**:
- User documentation
- Issue tracking system
- Access to user data (with permissions)
- Training materials`;

  docs['/project/context-and-scope.md'] = `# System Context and Scope

## Business Context

${projectName} is designed to ${purposeAnswer?.details || 'solve specific user needs through a modern web application'}.

### Target Market
${targetUsersAnswer?.details || 'The application serves various user segments with specific needs'}

## System Scope

### In Scope
- User authentication and management
- Core business functionality
- Data persistence and management
- API for client communication
- Admin dashboard and tools
${authAnswer?.selectedOptions.includes('email') ? '- Email/password authentication' : ''}
${authAnswer?.selectedOptions.includes('social') ? '- Social login integration' : ''}
${getAnswer('payments')?.selectedOptions[0] !== 'no' ? '- Payment processing' : ''}
${getAnswer('file-storage')?.selectedOptions[0] !== 'no' ? '- File upload and storage' : ''}
${getAnswer('search')?.selectedOptions[0] !== 'no' ? '- Search functionality' : ''}

### Out of Scope
- Features not in MVP requirements
- Third-party integrations (unless specified)
- Mobile native applications (web-first approach)

## External Interfaces

### Users
- Web browser interface
- Mobile-responsive design
- API access (if applicable)

### External Systems
${getAnswer('payments')?.selectedOptions[0] !== 'no' ? '- Payment gateway integration' : ''}
${getAnswer('file-storage')?.selectedOptions[0] === 's3' ? '- AWS S3 for file storage' : ''}
${getAnswer('file-storage')?.selectedOptions[0] === 'cloudinary' ? '- Cloudinary for media management' : ''}
${getAnswer('email-service')?.selectedOptions.includes('transactional') ? '- Email service provider' : ''}
${getAnswer('search')?.selectedOptions[0] === 'elastic' ? '- Elasticsearch cluster' : ''}
${getAnswer('search')?.selectedOptions[0] === 'algolia' ? '- Algolia search service' : ''}`;

  // Architecture (arc42 Section 4-8)
  // Using tech stack from component selection (already defined above)

  docs['/architecture/solution-strategy.md'] = `# Solution Strategy

## Technology Decisions

### Frontend: ${frontendMap?.name || frontendTech}
**Rationale**: ${frontendMap?.rationale || 'Selected based on project requirements'}

### Backend: ${backendMap?.name || backendTech}
**Rationale**: ${backendMap?.rationale || 'Selected based on project requirements'}

### Database: ${databaseMap?.name || databaseTech}
**Rationale**: ${databaseMap?.rationale || 'Selected based on project requirements'}

## Architectural Approach

### Architecture Style
- **Pattern**: ${getAnswer('api-design')?.selectedOptions[0] === 'graphql' ? 'GraphQL API' : 'RESTful API'} with layered architecture
- **Separation**: Clear separation between frontend and backend
- **Communication**: ${getAnswer('api-design')?.selectedOptions[0] === 'graphql' ? 'GraphQL queries and mutations' : 'HTTP/JSON API calls'}
${getAnswer('real-time')?.selectedOptions[0] === 'websockets' ? '- **Real-time**: WebSocket connections for live updates' : ''}

### Design Principles
1. **Separation of Concerns**: Clear boundaries between layers
2. **DRY (Don't Repeat Yourself)**: Reusable components and functions
3. **SOLID Principles**: Object-oriented design best practices
4. **Security First**: Security considerations in all design decisions
5. **Scalability**: Design for horizontal scaling

## Quality Goals

| Priority | Quality Goal | Motivation |
|----------|-------------|------------|
| 1 | Security | Protect user data and prevent breaches |
| 2 | Performance | Fast response times and smooth UX |
| 3 | Reliability | High uptime and error recovery |
| 4 | Maintainability | Easy to update and extend |
| 5 | Scalability | Handle growing user base |`;

  docs['/architecture/building-blocks.md'] = `# Building Block View

## Level 1: System Overview

\`\`\`
┌─────────────────────────────────────────┐
│         ${projectName}                    │
├─────────────────────────────────────────┤
│  ┌──────────┐      ┌──────────────┐    │
│  │ Frontend │ ←──→ │   Backend    │    │
│  │  ${frontendTech}    │      │   API Server │    │
│  └──────────┘      └──────┬───────┘    │
│                           │             │
│                      ┌────▼─────┐       │
│                      │ Database │       │
│                      │ ${databaseTech}     │       │
│                      └──────────┘       │
└─────────────────────────────────────────┘
\`\`\`

## Level 2: Frontend Structure

### Components
- **Pages**: Top-level route components
- **Features**: Feature-specific components
- **Common**: Shared/reusable components
- **Layouts**: Page layout components

### State Management
${frontendMap?.patterns.stateManagement || 'Application state management'}

### Routing
${frontendMap?.patterns.routing || 'Client-side routing'}

## Level 3: Backend Structure

### API Layer
- **Controllers**: Handle HTTP requests
- **Routes**: Define API endpoints
- **Middleware**: Auth, validation, error handling

### Business Logic Layer
- **Services**: Core business logic
- **Domain Models**: Business entities
- **Validation**: Input validation rules

### Data Access Layer
- **Repositories**: Database operations
- **Models**: Data schemas
- **Migrations**: Database version control

## External Components

${[
  getAnswer('payments')?.selectedOptions[0] !== 'no' ? '- **Payment Gateway**: Process payments' : null,
  getAnswer('file-storage')?.selectedOptions[0] !== 'no' && getAnswer('file-storage')?.selectedOptions[0] !== 'local' ? '- **File Storage**: Store uploaded files' : null,
  getAnswer('email-service')?.selectedOptions.length > 0 && !getAnswer('email-service')?.selectedOptions.includes('no') ? '- **Email Service**: Send notifications' : null,
  getAnswer('search')?.selectedOptions[0] !== 'no' && getAnswer('search')?.selectedOptions[0] !== 'database' ? '- **Search Engine**: Full-text search' : null
].filter(Boolean).join('\n') || '- No external components required for MVP'}`;

  docs['/architecture/runtime-view.md'] = `# Runtime View

## User Authentication Flow

\`\`\`
User → Frontend → Backend API → Database
  │         │           │
  │    1. Submit credentials
  │         │           │
  │         │      2. Validate
  │         │           │
  │         │      3. Query user
  │         │           │
  │         │    ← 4. User data
  │         │           │
  │         │    5. Generate token
  │         │           │
  │    ← 6. Return token & user
  │         │           │
  7. Store token locally
\`\`\`

## Data Retrieval Flow

\`\`\`
User → Frontend → Backend API → Database
  │         │           │
  │    1. Request data
  │         │           │
  │         │    2. Verify auth
  │         │           │
  │         │    3. Query data
  │         │           │
  │         │    ← 4. Return data
  │         │           │
  │    ← 5. Display data
\`\`\`

${getAnswer('real-time')?.selectedOptions[0] === 'websockets' ? `## Real-time Update Flow

\`\`\`
User A → Frontend ←→ WebSocket Server ←→ Backend
  │           │              │
  │    1. Connect WS         │
  │           │              │
  │    2. Subscribe to events │
  │           │              │
                           3. Event occurs
                              │
User B triggers update  →  Backend
                              │
                    4. Broadcast to subscribers
                              │
  │    ← 5. Receive update   │
  │           │              │
  6. Update UI automatically
\`\`\`` : ''}

## Error Handling Flow

\`\`\`
Error occurs in Backend
       │
   1. Catch error
       │
   2. Log error details
       │
   3. Format error response
       │
   4. Send to Frontend
       │
Frontend receives error
       │
   5. Display user-friendly message
       │
   6. Optional: Send to error tracking
\`\`\``;

  docs['/architecture/deployment-view.md'] = `# Deployment View

## Deployment Architecture

### Environment: ${getAnswer('deployment')?.selectedOptions[0] || 'Cloud Platform'}

\`\`\`
Internet
   │
   ▼
┌─────────────────┐
│  Load Balancer  │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼──┐  ┌──▼───┐
│ Web  │  │ Web  │  (Frontend)
│Server│  │Server│
└───┬──┘  └──┬───┘
    │        │
    └───┬────┘
        │
    ┌───▼────┐
    │   API  │
    │ Server │  (Backend)
    └───┬────┘
        │
    ┌───▼────┐
    │Database│
    └────────┘
\`\`\`

## Infrastructure Components

### Frontend Hosting
- **Platform**: ${getAnswer('deployment')?.selectedOptions[0] === 'vercel' ? 'Vercel' : getAnswer('deployment')?.selectedOptions[0] === 'netlify' ? 'Netlify' : 'Cloud provider'}
- **CDN**: Global content delivery
- **SSL**: HTTPS encryption

### Backend Hosting
- **Platform**: ${getAnswer('deployment')?.selectedOptions[0] || 'Cloud infrastructure'}
- **Scaling**: Auto-scaling based on load
- **Monitoring**: Health checks and metrics

### Database
- **Type**: ${databaseMap?.name || databaseTech}
- **Backup**: Automated daily backups
- **Replication**: ${databaseTech === 'postgresql' || databaseTech === 'mysql' ? 'Master-replica setup' : 'Replica sets'}

${getAnswer('file-storage')?.selectedOptions[0] !== 'no' ? `### File Storage
- **Service**: ${getAnswer('file-storage')?.selectedOptions[0] === 's3' ? 'AWS S3' : getAnswer('file-storage')?.selectedOptions[0] === 'cloudinary' ? 'Cloudinary' : 'File storage service'}
- **CDN**: Fast file delivery
- **Backup**: Redundant storage` : ''}

## Deployment Environments

### Development
- Local development servers
- Development database
- Mock external services

### Staging
- Production-like environment
- Test data
- Integration testing

### Production
- Live user traffic
- Production database
- Real external services
- Monitoring and alerting`;

  docs['/architecture/cross-cutting-concepts.md'] = `# Cross-cutting Concepts

## Security

### Authentication
${authAnswer?.selectedOptions.map(opt => `- ${opt}`).join('\n') || '- Email/Password authentication'}

### Authorization
- Role-based access control (RBAC)
- Resource-level permissions
- API endpoint protection

### Data Protection
- Encryption at rest
- Encryption in transit (HTTPS)
- Secure password hashing
- Input sanitization

## Error Handling

### Frontend
- User-friendly error messages
- Error boundaries for React
- Fallback UI states
- Error logging

### Backend
- Structured error responses
- HTTP status codes
- Error logging and tracking
- Graceful degradation

## Logging and Monitoring

### Application Logs
- Request/response logging
- Error tracking
- Performance metrics
- User activity logs

### Monitoring
${getAnswer('monitoring')?.selectedOptions[0] === 'full' ? `- Application Performance Monitoring (APM)
- Error tracking service
- Uptime monitoring
- Resource utilization` : '- Basic application logging\n- Error tracking'}

## Performance

### Frontend Optimization
- Code splitting and lazy loading
- Image optimization
- Caching strategies
- Minification and compression

### Backend Optimization
- Database query optimization
- Response caching
- Connection pooling
- Efficient algorithms

### Caching Strategy
- Browser caching
- API response caching
- Database query caching
- CDN for static assets

## Testing Strategy

${getAnswer('testing-strategy')?.selectedOptions.includes('unit') ? '### Unit Testing\n- Test individual functions and components\n- High code coverage target\n- Fast feedback loop\n' : ''}
${getAnswer('testing-strategy')?.selectedOptions.includes('integration') ? '### Integration Testing\n- Test component interactions\n- API endpoint testing\n- Database integration tests\n' : ''}
${getAnswer('testing-strategy')?.selectedOptions.includes('e2e') ? '### End-to-End Testing\n- Test complete user workflows\n- Critical path coverage\n- Automated browser testing\n' : ''}

## Documentation

### Code Documentation
- Inline comments for complex logic
- Function/method documentation
- README files
- API documentation

### Architecture Documentation
- This documentation set
- Architecture decision records (ADRs)
- Diagrams and visualizations`;

  // API Documentation
  const apiDesign = getAnswer('api-design')?.selectedOptions[0] || 'rest';
  
  docs['/api/overview.md'] = `# API Overview

## API Type
${apiDesign === 'graphql' ? 'GraphQL API' : apiDesign === 'grpc' ? 'gRPC API' : 'RESTful API'}

## Base URL
- **Development**: \`http://localhost:3000/api\`
- **Staging**: \`https://staging-api.example.com\`
- **Production**: \`https://api.example.com\`

## API Design Principles
${apiDesign === 'rest' ? `
- RESTful resource naming
- HTTP methods for operations (GET, POST, PUT, DELETE)
- JSON request/response format
- Proper status codes
` : apiDesign === 'graphql' ? `
- Single endpoint for all queries
- Type-safe schema
- Flexible data fetching
- Real-time subscriptions
` : ''}

## Authentication
All API endpoints require authentication unless marked as public.

**Method**: Bearer token in Authorization header
\`\`\`
Authorization: Bearer <your-token-here>
\`\`\`

## Response Format
\`\`\`json
{
  "success": true,
  "data": { ... },
  "message": "Success message",
  "timestamp": "2024-01-01T00:00:00Z"
}
\`\`\`

## Rate Limiting
- **Authenticated**: 1000 requests per hour
- **Unauthenticated**: 100 requests per hour`;

  docs['/api/rest-endpoints.md'] = `# REST API Endpoints

## Authentication Endpoints

### POST /api/auth/register
Register a new user account.

**Request:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "user": { "id": "123", "email": "user@example.com" },
    "token": "jwt-token-here"
  }
}
\`\`\`

### POST /api/auth/login
Authenticate user and receive token.

**Request:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
\`\`\`

### POST /api/auth/logout
Invalidate current session.

### POST /api/auth/refresh
Refresh access token using refresh token.

## User Endpoints

### GET /api/users/me
Get current user profile.

### PUT /api/users/me
Update current user profile.

### DELETE /api/users/me
Delete user account.

## Resource Endpoints

### GET /api/resources
List all resources with pagination.

**Query Parameters:**
- \`page\`: Page number (default: 1)
- \`limit\`: Items per page (default: 20)
- \`sort\`: Sort field
- \`order\`: Sort order (asc/desc)

### GET /api/resources/:id
Get single resource by ID.

### POST /api/resources
Create new resource.

### PUT /api/resources/:id
Update existing resource.

### DELETE /api/resources/:id
Delete resource.

## Error Responses

All endpoints may return these error responses:

- **400 Bad Request**: Invalid input
- **401 Unauthorized**: Missing or invalid token
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server error`;

  docs['/api/authentication.md'] = `# API Authentication

## Authentication Methods

${authAnswer?.selectedOptions.map(id => {
    if (id === 'email') return '### Email/Password\nStandard email and password authentication with secure hashing.';
    if (id === 'social') return '### Social Login\nOAuth integration with popular providers (Google, GitHub, etc.).';
    if (id === 'magic') return '### Magic Link\nPasswordless authentication via email link.';
    if (id === 'sso') return '### Enterprise SSO\nSAML/OAuth integration for enterprise customers.';
    return '';
  }).join('\n\n') || '### Email/Password\nStandard email and password authentication.'}

## Token-Based Authentication

### Access Tokens
- **Type**: JWT (JSON Web Token)
- **Expiration**: 1 hour
- **Storage**: HTTP-only cookie or localStorage
- **Format**: Bearer token

### Refresh Tokens
- **Expiration**: 30 days
- **Storage**: HTTP-only cookie
- **Usage**: Obtain new access token

## Token Structure

\`\`\`json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user-id",
    "email": "user@example.com",
    "role": "user",
    "iat": 1234567890,
    "exp": 1234571490
  }
}
\`\`\`

## Security Measures

1. **Password Requirements**
   - Minimum 8 characters
   - Must include: uppercase, lowercase, number, special character
   - Not in common password list

2. **Rate Limiting**
   - Max 5 failed login attempts per hour
   - Account lockout after repeated failures

3. **Token Security**
   - Secure token generation
   - Token rotation on refresh
   - Automatic expiration
   - Revocation support

4. **Session Management**
   - Device tracking
   - Active session list
   - Remote logout capability
   - Suspicious activity detection`;

  docs['/api/error-handling.md'] = `# API Error Handling

## Error Response Format

\`\`\`json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": { ... },
    "timestamp": "2024-01-01T00:00:00Z",
    "requestId": "req-123"
  }
}
\`\`\`

## Error Codes

### Authentication Errors (401)
- \`AUTH_TOKEN_MISSING\`: No authentication token provided
- \`AUTH_TOKEN_INVALID\`: Token is malformed or invalid
- \`AUTH_TOKEN_EXPIRED\`: Token has expired
- \`AUTH_CREDENTIALS_INVALID\`: Invalid email or password

### Authorization Errors (403)
- \`AUTH_INSUFFICIENT_PERMISSIONS\`: User lacks required permissions
- \`AUTH_RESOURCE_FORBIDDEN\`: Access to resource denied

### Validation Errors (400)
- \`VALIDATION_FAILED\`: Input validation failed
- \`VALIDATION_MISSING_FIELD\`: Required field missing
- \`VALIDATION_INVALID_FORMAT\`: Field format invalid

### Resource Errors (404)
- \`RESOURCE_NOT_FOUND\`: Requested resource doesn't exist
- \`ENDPOINT_NOT_FOUND\`: API endpoint doesn't exist

### Rate Limiting (429)
- \`RATE_LIMIT_EXCEEDED\`: Too many requests

### Server Errors (500)
- \`INTERNAL_SERVER_ERROR\`: Unexpected server error
- \`DATABASE_ERROR\`: Database operation failed
- \`EXTERNAL_SERVICE_ERROR\`: Third-party service failed

## Error Handling Best Practices

### Client-Side
1. Always check response status
2. Handle errors gracefully
3. Display user-friendly messages
4. Log errors for debugging
5. Implement retry logic for transient errors

### Server-Side
1. Catch and handle all errors
2. Log error details
3. Return consistent error format
4. Don't expose sensitive information
5. Use appropriate HTTP status codes`;

  // Frontend Documentation
  docs['/frontend/components.md'] = `# Frontend Component Library

## Component Architecture

### Component Structure
${frontendMap?.patterns.component || 'Component pattern for the chosen framework'}

### Best Practices
${frontendMap?.bestPractices.map(practice => `- ${practice}`).join('\n') || '- Follow framework best practices'}

## Core Components

### Layout Components
- **AppLayout**: Main application layout wrapper
- **Navbar**: Navigation bar with menu items
- **Sidebar**: Side navigation for dashboard
- **Footer**: Page footer component

### Page Components
- **HomePage**: Landing/home page
- **DashboardPage**: User dashboard
- **ProfilePage**: User profile management
- **SettingsPage**: Application settings

### Feature Components
- **AuthForm**: Authentication forms (login/register)
- **DataTable**: Reusable data table with sorting/filtering
- **Modal**: Modal dialog component
- **Form**: Form with validation

### UI Components
- **Button**: Reusable button component
- **Input**: Form input fields
- **Card**: Content card component
- **Badge**: Status badge component
- **Alert**: Alert/notification component

## Component Guidelines

### Props Interface
Define clear TypeScript interfaces for all props:

\`\`\`typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}
\`\`\`

### Component Organization
\`\`\`
src/components/
├── common/        # Shared components
├── layout/        # Layout components
├── features/      # Feature-specific components
└── ui/            # Base UI components
\`\`\`

## Styling Approach

- **CSS Framework**: Tailwind CSS / styled-components
- **Responsive**: Mobile-first design
- **Theme**: Support for dark/light mode
- **Consistency**: Design system tokens`;

  docs['/frontend/routing.md'] = `# Frontend Routing

## Routing Strategy
${frontendMap?.patterns.routing || 'Client-side routing'}

## Routes Structure

### Public Routes
- \`/\` - Home/Landing page
- \`/login\` - Login page
- \`/register\` - Registration page
- \`/forgot-password\` - Password reset

### Protected Routes
- \`/dashboard\` - User dashboard
- \`/profile\` - User profile
- \`/settings\` - User settings

### Admin Routes
- \`/admin\` - Admin dashboard
- \`/admin/users\` - User management
- \`/admin/settings\` - System settings

## Route Protection

### Authentication Guard
Redirect unauthenticated users to login page:

\`\`\`typescript
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};
\`\`\`

### Authorization Guard
Check user permissions for routes:

\`\`\`typescript
const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  return user?.role === 'admin' ? children : <Navigate to="/" />;
};
\`\`\`

## Navigation

### Programmatic Navigation
\`\`\`typescript
const navigate = useNavigate();
navigate('/dashboard');
\`\`\`

### Link Components
\`\`\`typescript
<Link to="/profile">View Profile</Link>
\`\`\`

## Route Parameters

### Dynamic Routes
\`\`\`
/users/:userId
/posts/:postId/edit
\`\`\`

### Query Parameters
\`\`\`
/search?q=query&page=1
\`\`\``;

  docs['/frontend/state-management.md'] = `# Frontend State Management

## State Management Strategy
${frontendMap?.patterns.stateManagement || 'Application state management approach'}

## State Categories

### Local Component State
- Use for UI-specific state
- Component lifecycle bound
- Not shared between components

\`\`\`typescript
const [isOpen, setIsOpen] = useState(false);
\`\`\`

### Global Application State
- User authentication state
- Theme preferences
- App configuration
- Shared UI state

### Server State
- Data from API
- Cached responses
- Loading/error states
- Optimistic updates

## State Management Tools

${frontendTech === 'react' ? `### Context API
For simple global state:

\`\`\`typescript
const AppContext = createContext<AppState | null>(null);

export const AppProvider = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);
  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};
\`\`\`

### State Management Library
For complex state: Zustand, Redux Toolkit, or Jotai

### React Query
For server state management:

\`\`\`typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers
});
\`\`\`
` : ''}

## Best Practices

1. **Separation of Concerns**
   - Keep UI state separate from business logic
   - Server state managed separately

2. **Immutability**
   - Never mutate state directly
   - Use immutable update patterns

3. **Performance**
   - Memoize expensive computations
   - Optimize re-renders
   - Use code splitting

4. **Type Safety**
   - Define clear TypeScript types
   - Use discriminated unions for complex state`;

  docs['/frontend/forms-validation.md'] = `# Forms and Validation

## Form Handling

### Form Library
- **Library**: React Hook Form / Formik
- **Validation**: Zod / Yup schemas
- **Features**: Validation, error handling, submission

## Form Example

\`\`\`typescript
interface FormData {
  email: string;
  password: string;
  remember: boolean;
}

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    await loginUser(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: true })} />
      {errors.email && <span>Email is required</span>}
      
      <input type="password" {...register('password', { required: true })} />
      {errors.password && <span>Password is required</span>}
      
      <button type="submit">Login</button>
    </form>
  );
};
\`\`\`

## Validation Rules

### Client-Side Validation
- Required fields
- Email format
- Password strength
- Field length limits
- Custom validation rules

### Schema Validation

\`\`\`typescript
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match"
});
\`\`\`

## Form Best Practices

1. **User Experience**
   - Show validation errors clearly
   - Provide helpful error messages
   - Disable submit during processing
   - Show loading states

2. **Accessibility**
   - Proper label associations
   - ARIA attributes
   - Keyboard navigation
   - Screen reader support

3. **Performance**
   - Debounce validation
   - Optimize re-renders
   - Lazy validation`;

  docs['/frontend/styling-guide.md'] = `# Styling Guide

## Styling Approach

### CSS Framework
Tailwind CSS with utility-first approach

### Design System
- **Colors**: Consistent color palette
- **Typography**: Font scales and weights
- **Spacing**: Standard spacing scale
- **Breakpoints**: Responsive design breakpoints

## Theme Configuration

### Colors
\`\`\`
Primary: cyan-500
Secondary: gray-600
Success: green-500
Warning: yellow-500
Error: red-500
\`\`\`

### Dark Mode
Full dark mode support with theme toggle:

\`\`\`typescript
<div className="bg-white dark:bg-gray-900">
  <p className="text-gray-900 dark:text-white">Content</p>
</div>
\`\`\`

## Component Styling

### Utility Classes
\`\`\`typescript
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Click Me
</button>
\`\`\`

### Custom Components
Use component libraries like shadcn/ui for consistency

## Responsive Design

### Breakpoints
- \`sm\`: 640px - Mobile
- \`md\`: 768px - Tablet
- \`lg\`: 1024px - Desktop
- \`xl\`: 1280px - Large desktop

### Mobile-First
Start with mobile styles, add larger breakpoints:

\`\`\`typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Responsive grid */}
</div>
\`\`\`

## Best Practices

1. **Consistency**: Use design tokens
2. **Reusability**: Create reusable style patterns
3. **Performance**: Minimize CSS bundle size
4. **Accessibility**: Maintain contrast ratios`;

  // Backend Documentation
  docs['/backend/business-logic.md'] = `# Backend Business Logic

## Architecture Pattern
Layered architecture with clear separation of concerns:

\`\`\`
Controllers → Services → Repositories → Database
\`\`\`

## Service Layer

### Responsibilities
- Implement core business rules
- Coordinate between repositories
- Handle transactions
- Validate business constraints
- Transform data

### Example Service

\`\`\`${backendTech === 'python' ? 'python' : 'typescript'}
${backendTech === 'nodejs' ? `class UserService {
  async createUser(data: CreateUserDTO) {
    // Validate business rules
    await this.validateUniqueEmail(data.email);
    
    // Hash password
    const hashedPassword = await hash(data.password);
    
    // Create user
    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword
    });
    
    // Send welcome email
    await this.emailService.sendWelcome(user);
    
    return user;
  }
}` : backendTech === 'python' ? `class UserService:
    async def create_user(self, data: CreateUserDTO) -> User:
        # Validate business rules
        await self.validate_unique_email(data.email)
        
        # Hash password
        hashed_password = hash_password(data.password)
        
        # Create user
        user = await self.user_repository.create(
            **data.dict(),
            password=hashed_password
        )
        
        # Send welcome email
        await self.email_service.send_welcome(user)
        
        return user` : `// Service implementation based on ${backendTech}
class UserService {
  async createUser(data: CreateUserDTO) {
    // Validate and process user creation
    const user = await this.userRepository.create(data);
    return user;
  }
}`}
\`\`\`

## Business Rules

### User Management
- Email must be unique
- Password must meet strength requirements
- Account verification required
- Role-based permissions

### Data Validation
- Input sanitization
- Type checking
- Business constraint validation
- Cross-field validation

## Transaction Management

\`\`\`typescript
async transferData(from: string, to: string) {
  const transaction = await db.transaction();
  try {
    await this.deduct(from, transaction);
    await this.add(to, transaction);
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
\`\`\`

## Error Handling

- Business logic errors with clear messages
- Rollback on transaction failures
- Logging for debugging
- User-friendly error responses`;

  docs['/backend/data-access.md'] = `# Backend Data Access Layer

## Database Technology
${databaseMap?.name || databaseTech}

${databaseMap?.rationale ? `**Rationale**: ${databaseMap.rationale}` : ''}

## Data Access Pattern
${databaseMap?.patterns.database || 'Repository pattern for data access'}

## Repository Pattern

\`\`\`typescript
interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserDTO): Promise<User>;
  update(id: string, data: UpdateUserDTO): Promise<User>;
  delete(id: string): Promise<void>;
  list(filters: ListFilters): Promise<User[]>;
}
\`\`\`

## Database Schema

### Users Table
\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

## Query Optimization

### Indexing Strategy
${databaseMap?.bestPractices.find(p => p.includes('index')) || '- Index frequently queried columns'}
- Index foreign keys
- Composite indexes for common queries
- Avoid over-indexing

### Query Best Practices
- Use prepared statements
- Avoid N+1 queries
- Implement pagination
- Use database-level aggregations
- Cache frequent queries

## Migrations

### Migration Management
${databaseMap?.patterns.migrations || 'Version-controlled database migrations'}

\`\`\`typescript
// Example migration
export async function up(db: Database) {
  await db.schema.createTable('users', (table) => {
    table.uuid('id').primary();
    table.string('email').unique().notNullable();
    table.string('password_hash').notNullable();
    table.timestamps(true, true);
  });
}
\`\`\`

## Connection Management

- Connection pooling
- Automatic reconnection
- Query timeout handling
- Resource cleanup`;

  docs['/backend/validation.md'] = `# Backend Validation

## Validation Strategy

### Input Validation
All user input must be validated before processing:

1. **Type validation**: Ensure correct data types
2. **Format validation**: Check format patterns
3. **Range validation**: Validate numeric ranges
4. **Length validation**: Check string lengths
5. **Business rules**: Apply business constraints

## Validation Library

\`\`\`typescript
import { z } from 'zod';

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
  name: z.string().min(2).max(100),
  age: z.number().int().min(18).max(120).optional()
});

// Validate input
const result = createUserSchema.safeParse(input);
if (!result.success) {
  throw new ValidationError(result.error);
}
\`\`\`

## Validation Rules

### Email Validation
- Valid email format
- Domain verification (optional)
- Disposable email blocking (optional)

### Password Validation
- Minimum 8 characters
- At least one uppercase letter
- At least one number
- At least one special character
- Not in common password list

### Data Sanitization
- Trim whitespace
- Escape HTML entities
- Remove dangerous characters
- Normalize Unicode

## Error Responses

\`\`\`json
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Validation failed",
    "details": {
      "email": ["Invalid email format"],
      "password": ["Password must contain at least one uppercase letter"]
    }
  }
}
\`\`\``;

  docs['/backend/background-jobs.md'] = `# Background Jobs

## Job Processing

### Use Cases
- Email sending
- Data processing
- Report generation
- Scheduled tasks
- Cleanup operations

## Job Queue System

### Technology Options
- **Bull** (Redis-based for Node.js)
- **Celery** (Python)
- **Sidekiq** (Ruby)

### Job Structure

\`\`\`typescript
interface Job {
  id: string;
  type: string;
  data: any;
  priority: number;
  attempts: number;
  maxAttempts: number;
  createdAt: Date;
}
\`\`\`

## Job Types

### Email Jobs
\`\`\`typescript
queue.add('send-email', {
  to: 'user@example.com',
  template: 'welcome',
  data: { name: 'User' }
});
\`\`\`

### Data Processing
\`\`\`typescript
queue.add('process-data', {
  dataId: '123',
  operation: 'transform'
});
\`\`\`

## Job Configuration

- **Retry**: Automatic retry on failure
- **Timeout**: Job execution timeout
- **Priority**: Queue priority levels
- **Concurrency**: Concurrent job processing
- **Scheduling**: Cron-like scheduling

## Monitoring

- Job status tracking
- Failed job analysis
- Performance metrics
- Queue size monitoring`;

  docs['/backend/caching-strategy.md'] = `# Caching Strategy

## Caching Layers

### Application Cache
- In-memory caching
- Fast data access
- Session storage

### Database Query Cache
- Frequent query results
- Computed aggregations
- Reduce database load

### API Response Cache
- GET endpoint responses
- Public data
- Conditional caching

## Cache Implementation

### Cache Technology
- **Redis**: Distributed caching
- **Memcached**: Simple key-value
- **In-memory**: Node.js cache

### Cache Example

\`\`\`typescript
const cache = new Redis();

async function getUser(id: string) {
  // Try cache first
  const cached = await cache.get(\`user:\${id}\`);
  if (cached) return JSON.parse(cached);
  
  // Fetch from database
  const user = await db.users.findById(id);
  
  // Store in cache
  await cache.set(\`user:\${id}\`, JSON.stringify(user), 'EX', 3600);
  
  return user;
}
\`\`\`

## Cache Strategies

### Cache-Aside
Application manages cache:
1. Check cache
2. If miss, fetch from DB
3. Update cache

### Write-Through
Write to cache and DB together

### Write-Behind
Write to cache, async write to DB

## Cache Invalidation

### Time-Based (TTL)
- Set expiration time
- Automatic cleanup

### Event-Based
- Invalidate on data changes
- Clear related caches

### Manual
- Admin cache clear
- Selective invalidation

## Best Practices

1. **Cache what's expensive**
2. **Set appropriate TTL**
3. **Monitor cache hit rate**
4. **Handle cache failures gracefully**
5. **Don't cache sensitive data**`;

  docs['/backend/error-handling.md'] = `# Backend Error Handling

## Error Handling Strategy

### Error Types

1. **Validation Errors** (400)
   - Invalid input
   - Missing required fields
   - Format errors

2. **Authentication Errors** (401)
   - Missing credentials
   - Invalid token
   - Expired session

3. **Authorization Errors** (403)
   - Insufficient permissions
   - Resource access denied

4. **Not Found Errors** (404)
   - Resource doesn't exist
   - Invalid endpoint

5. **Server Errors** (500)
   - Database errors
   - External service failures
   - Unexpected errors

## Error Handling Middleware

${backendMap?.patterns.middleware ? `${backendMap.patterns.middleware}` : ''}

\`\`\`typescript
app.use((error, req, res, next) => {
  console.error(error);
  
  if (error instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: error.message,
        details: error.details
      }
    });
  }
  
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred'
    }
  });
});
\`\`\`

## Logging

### Log Levels
- **ERROR**: Application errors
- **WARN**: Warning conditions
- **INFO**: General information
- **DEBUG**: Debug information

### What to Log
- Error stack traces
- Request details
- User context (not sensitive data)
- Timestamp
- Unique request ID

## Error Recovery

- Graceful degradation
- Retry logic for transient failures
- Circuit breaker for external services
- Fallback responses`;

  // Testing Documentation
  docs['/testing/strategy.md'] = `# Testing Strategy

## Testing Approach

${getAnswer('testing-strategy')?.selectedOptions.map(id => {
  if (id === 'unit') return '### Unit Testing\n- Test individual functions and components\n- Fast feedback loop\n- High code coverage\n- Mock external dependencies';
  if (id === 'integration') return '### Integration Testing\n- Test component interactions\n- Database integration\n- API endpoint testing\n- Service integration';
  if (id === 'e2e') return '### End-to-End Testing\n- Test complete user workflows\n- Browser automation\n- Critical path coverage\n- Production-like environment';
  if (id === 'manual') return '### Manual Testing\n- Exploratory testing\n- UX validation\n- Edge case discovery\n- Visual regression';
  return '';
}).join('\n\n') || 'Comprehensive testing approach with multiple test levels'}

## Test Coverage Goals

- **Unit Tests**: 80%+ coverage
- **Integration Tests**: Critical paths
- **E2E Tests**: User journeys
- **Manual Tests**: New features

## Testing Tools

### Frontend
- **Framework**: Jest / Vitest
- **Component**: React Testing Library
- **E2E**: Playwright / Cypress

### Backend
${backendTech === 'nodejs' ? '- **Framework**: Jest / Mocha\n- **Assertions**: Chai / expect' : ''}
${backendTech === 'python' ? '- **Framework**: pytest\n- **Mocking**: unittest.mock' : ''}
- **API Testing**: Supertest
- **Database**: Test database

## Test Organization

\`\`\`
tests/
├── unit/           # Unit tests
├── integration/    # Integration tests
├── e2e/           # End-to-end tests
└── fixtures/      # Test data
\`\`\``;

  docs['/testing/unit-tests.md'] = `# Unit Testing

## Unit Test Guidelines

### What to Test
- Pure functions
- Business logic
- Utility functions
- Component behavior
- Edge cases

### Test Structure

\`\`\`typescript
describe('UserService', () => {
  describe('createUser', () => {
    it('should create a user with valid data', async () => {
      const userData = { email: 'test@example.com', password: 'Pass123!' };
      const user = await userService.createUser(userData);
      
      expect(user.email).toBe(userData.email);
      expect(user.password).not.toBe(userData.password); // hashed
    });
    
    it('should throw error for duplicate email', async () => {
      await expect(
        userService.createUser({ email: 'existing@example.com' })
      ).rejects.toThrow('Email already exists');
    });
  });
});
\`\`\`

## Mocking

### Mock External Dependencies
\`\`\`typescript
jest.mock('./database');
jest.mock('./emailService');

const mockDb = database as jest.Mocked<typeof database>;
mockDb.users.create.mockResolvedValue(mockUser);
\`\`\`

## Best Practices

1. **AAA Pattern**: Arrange, Act, Assert
2. **One assertion per test** (when possible)
3. **Clear test names**
4. **Test isolation**: Independent tests
5. **Fast execution**: No real I/O`;

  docs['/testing/integration-tests.md'] = `# Integration Testing

## Integration Test Focus

### API Endpoint Testing
Test complete request/response cycles:

\`\`\`typescript
describe('POST /api/users', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        email: 'new@example.com',
        password: 'Pass123!',
        name: 'Test User'
      })
      .expect(201);
    
    expect(response.body.data.user.email).toBe('new@example.com');
    expect(response.body.data.token).toBeDefined();
  });
});
\`\`\`

### Database Integration
Test with real test database:

\`\`\`typescript
beforeEach(async () => {
  await db.migrate.latest();
  await db.seed.run();
});

afterEach(async () => {
  await db.migrate.rollback();
});
\`\`\`

### Service Integration
Test service interactions:

\`\`\`typescript
it('should send email after user registration', async () => {
  const user = await userService.register(userData);
  
  expect(emailService.send).toHaveBeenCalledWith({
    to: userData.email,
    template: 'welcome'
  });
});
\`\`\`

## Test Database

- Separate test database
- Reset between tests
- Seed test data
- Use transactions`;

  docs['/testing/e2e-tests.md'] = `# End-to-End Testing

## E2E Test Scope

Test complete user workflows from browser perspective.

### Critical User Journeys
1. User registration and login
2. Main feature workflows
3. Payment processing (if applicable)
4. Admin operations

## E2E Test Example

\`\`\`typescript
test('user can register and login', async ({ page }) => {
  // Navigate to register
  await page.goto('/register');
  
  // Fill registration form
  await page.fill('[name=email]', 'test@example.com');
  await page.fill('[name=password]', 'Pass123!');
  await page.click('button[type=submit]');
  
  // Should redirect to dashboard
  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('h1')).toContainText('Dashboard');
});
\`\`\`

## E2E Testing Tools

### Playwright / Cypress
- Browser automation
- Network mocking
- Screenshot/video recording
- Parallel execution

## Best Practices

1. **Test real scenarios**
2. **Use data-testid attributes**
3. **Stable selectors**
4. **Independent tests**
5. **Clean up test data**
6. **Run in CI/CD pipeline**`;

  // Deployment Documentation
  const deploymentPlatform = getAnswer('deployment')?.selectedOptions[0] || 'cloud';

  docs['/deployment/environments.md'] = `# Deployment Environments

## Environment Strategy

### Development
**Purpose**: Local development and testing

- Local development servers
- Hot reload for quick iteration
- Mock external services
- Development database
- Debug mode enabled

**URLs**:
- Frontend: \`http://localhost:5173\`
- Backend: \`http://localhost:3000\`

### Staging
**Purpose**: Pre-production testing

- Production-like configuration
- Real external services (test accounts)
- Staging database with test data
- Integration testing environment
- QA validation

**URLs**:
- Frontend: \`https://staging.example.com\`
- Backend: \`https://staging-api.example.com\`

### Production
**Purpose**: Live user environment

- Optimized build
- Real external services
- Production database
- Monitoring and alerting
- Auto-scaling enabled

**URLs**:
- Frontend: \`https://example.com\`
- Backend: \`https://api.example.com\`

## Environment Configuration

### Environment Variables
\`\`\`
# Database
DATABASE_URL=
DATABASE_POOL_SIZE=

# API
API_URL=
API_TIMEOUT=

# Authentication
JWT_SECRET=
JWT_EXPIRATION=

# External Services
${getAnswer('payments')?.selectedOptions[0] !== 'no' ? 'STRIPE_SECRET_KEY=\nSTRIPE_PUBLISHABLE_KEY=' : ''}
${getAnswer('file-storage')?.selectedOptions[0] === 's3' ? 'AWS_ACCESS_KEY_ID=\nAWS_SECRET_ACCESS_KEY=\nS3_BUCKET=' : ''}
${getAnswer('email-service')?.selectedOptions.length > 0 ? 'EMAIL_SERVICE_API_KEY=' : ''}
\`\`\`

## Deployment Checklist

### Pre-Deployment
- [ ] Run all tests
- [ ] Update version number
- [ ] Review code changes
- [ ] Check environment variables
- [ ] Database migrations ready

### Post-Deployment
- [ ] Verify application is running
- [ ] Test critical functionality
- [ ] Check error logs
- [ ] Monitor performance metrics
- [ ] Validate external integrations`;

  docs['/deployment/ci-cd.md'] = `# CI/CD Pipeline

## Continuous Integration

### Build Process
1. **Code Checkout**: Pull latest code
2. **Dependencies**: Install packages
3. **Linting**: Code style check
4. **Type Check**: TypeScript compilation
5. **Tests**: Run test suite
6. **Build**: Create production build

### Automated Checks
- Code quality (ESLint)
- Type safety (TypeScript)
- Unit tests
- Integration tests
- Security scanning

## Continuous Deployment

### Deployment Flow
\`\`\`
git push → CI Tests → Build → Deploy to Staging → Tests → Deploy to Production
\`\`\`

### Deployment Strategy

${deploymentPlatform === 'vercel' || deploymentPlatform === 'netlify' ? `#### ${deploymentPlatform === 'vercel' ? 'Vercel' : 'Netlify'} Deployment
- Automatic deployments on git push
- Preview deployments for PRs
- Production deployment on main branch
- Instant rollback capability
` : deploymentPlatform === 'docker' ? `#### Docker/Kubernetes Deployment
- Build Docker images
- Push to container registry
- Deploy to Kubernetes cluster
- Rolling updates
- Health checks
` : `#### Cloud Platform Deployment
- Build artifacts
- Upload to storage
- Deploy to servers
- Health verification
- Rollback on failure
`}

### Deployment Triggers
- **Main branch**: Deploy to production
- **Develop branch**: Deploy to staging
- **Pull requests**: Create preview deployment
- **Manual**: Triggered deployment

## Pipeline Configuration

### GitHub Actions Example
\`\`\`yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test
      - run: npm run build
  
  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: npm run deploy
\`\`\`

## Rollback Strategy

- Keep previous versions
- Quick rollback capability
- Database migration rollback plan
- Communication protocol`;

  docs['/deployment/monitoring.md'] = `# Monitoring and Observability

## Monitoring Strategy

${getAnswer('monitoring')?.selectedOptions[0] === 'full' ? `### Application Performance Monitoring (APM)

**Components**:
- Request tracing
- Performance metrics
- Error tracking
- User monitoring

**Metrics to Track**:
- Response time (p50, p95, p99)
- Error rate
- Throughput (requests/second)
- Resource utilization (CPU, memory)
- Database query performance

### Error Tracking
- Automatic error capture
- Stack traces
- User context
- Error grouping
- Alert on critical errors

### Infrastructure Monitoring
- Server health
- Database performance
- Cache hit rates
- Network latency
- Disk usage

### Logging
- Application logs
- Access logs
- Error logs
- Audit logs
- Structured logging (JSON)

### Alerting
- Error rate threshold
- Response time degradation
- Service unavailability
- Resource exhaustion
- Security events
` : `### Basic Monitoring

**Application Logs**:
- Error logging
- Request logging
- Application events

**Basic Metrics**:
- Error count
- Request count
- Response times

**Alerts**:
- Critical errors
- Service down
`}

## Monitoring Tools

### Options
- **Sentry**: Error tracking
- **DataDog**: Full-stack monitoring
- **New Relic**: APM
- **CloudWatch**: AWS monitoring
- **Grafana**: Metrics visualization

## Health Checks

### Endpoint
\`\`\`
GET /health
GET /health/db
GET /health/cache
\`\`\`

### Response
\`\`\`json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z",
  "services": {
    "database": "healthy",
    "cache": "healthy"
  }
}
\`\`\``;

  docs['/deployment/backup-recovery.md'] = `# Backup and Recovery

## Backup Strategy

### Database Backups
- **Frequency**: Daily automated backups
- **Retention**: 30 days
- **Type**: Full database dumps
- **Storage**: Separate from production
- **Testing**: Monthly restore tests

### File Storage Backups
${getAnswer('file-storage')?.selectedOptions[0] !== 'no' ? `- Redundant storage
- Version control
- Cross-region replication` : '- Not applicable (no file storage)'}

### Configuration Backups
- Environment variables
- Application configuration
- Infrastructure as Code

## Recovery Procedures

### Database Recovery
\`\`\`bash
# Restore from backup
pg_restore -d production backup_file.dump

# Verify data integrity
psql -d production -c "SELECT COUNT(*) FROM users;"
\`\`\`

### Disaster Recovery Plan

1. **Assess Impact**: Determine scope
2. **Notify Team**: Alert stakeholders
3. **Restore Data**: Use latest backup
4. **Verify System**: Test functionality
5. **Resume Operations**: Bring online
6. **Post-Mortem**: Analyze incident

## Recovery Time Objectives

- **RTO** (Recovery Time Objective): < 4 hours
- **RPO** (Recovery Point Objective): < 24 hours`;

  // Security Documentation
  docs['/security/overview.md'] = `# Security Overview

## Security Principles

1. **Defense in Depth**: Multiple security layers
2. **Least Privilege**: Minimal access rights
3. **Zero Trust**: Verify everything
4. **Security by Design**: Built-in from start

## Security Measures

### Authentication & Authorization
${authAnswer?.selectedOptions.map(id => `- ${id}`).join('\n') || '- Email/password authentication'}
- Role-based access control
- Secure session management
- Token-based authentication

### Data Protection
- Encryption at rest
- Encryption in transit (HTTPS/TLS)
- Secure password hashing (bcrypt/argon2)
- Sensitive data encryption

### Input Validation
- All user input validated
- SQL injection prevention
- XSS prevention
- CSRF protection

### API Security
- Rate limiting
- CORS configuration
- API authentication
- Request validation

### Infrastructure Security
- Firewall configuration
- DDoS protection
- Security updates
- Access logging

## Compliance

### Standards
- OWASP Top 10 compliance
- GDPR compliance (if EU users)
- PCI DSS (if handling payments)

### Security Audits
- Regular security scans
- Penetration testing
- Code security reviews
- Dependency vulnerability scanning`;

  docs['/security/data-protection.md'] = `# Data Protection

## Data Classification

### Sensitive Data
- Passwords (hashed)
- Payment information
- Personal identifiable information (PII)
- Authentication tokens

### Private Data
- User profile information
- User-generated content
- Activity logs

### Public Data
- Public profiles
- Published content

## Encryption

### Data at Rest
- Database encryption
- File storage encryption
- Backup encryption

### Data in Transit
- HTTPS/TLS for all connections
- Secure WebSocket connections
- Encrypted API calls

### Password Security
\`\`\`typescript
// Password hashing with bcrypt
const hashedPassword = await bcrypt.hash(password, 10);

// Password verification
const isValid = await bcrypt.compare(password, hashedPassword);
\`\`\`

## Data Privacy

### Personal Data Handling
- Data minimization
- Purpose limitation
- Storage limitation
- User consent

### User Rights
- Right to access data
- Right to rectification
- Right to erasure
- Right to data portability

## Data Retention

- User data: Retained while account active
- Logs: 90 days
- Backups: 30 days
- Deleted data: Permanently removed after 30 days`;

  docs['/security/compliance.md'] = `# Security Compliance

## Compliance Requirements

### GDPR (General Data Protection Regulation)
${targetUsersAnswer?.selectedOptions.includes('consumers') ? `
**Applicable**: Yes (serving EU users)

**Requirements**:
- User consent for data processing
- Right to access personal data
- Right to data portability
- Right to be forgotten
- Data breach notification (72 hours)
- Privacy by design

**Implementation**:
- Cookie consent banner
- Privacy policy
- Data export functionality
- Account deletion
- Consent management
` : '**Applicable**: Review if serving EU users'}

### OWASP Top 10
Protect against common vulnerabilities:

1. Broken Access Control
2. Cryptographic Failures
3. Injection
4. Insecure Design
5. Security Misconfiguration
6. Vulnerable Components
7. Authentication Failures
8. Software and Data Integrity Failures
9. Security Logging and Monitoring Failures
10. Server-Side Request Forgery

${getAnswer('payments')?.selectedOptions[0] !== 'no' ? `### PCI DSS (Payment Card Industry Data Security Standard)

**Applicable**: Yes (processing payments)

**Requirements**:
- Never store full card numbers
- Use PCI-compliant payment processor
- Secure transmission of card data
- Regular security testing
- Access control measures

**Implementation**:
- Use Stripe/payment processor tokenization
- No direct card data handling
- PCI-compliant hosting
` : ''}

## Security Testing

- Automated security scans
- Dependency vulnerability checks
- Penetration testing (annual)
- Security code reviews`;

  // Design Documentation
  docs['/design/ui-ux-guidelines.md'] = `# UI/UX Guidelines

## Design Principles

1. **Clarity**: Clear and understandable interface
2. **Consistency**: Consistent patterns and behaviors
3. **Efficiency**: Minimize user effort
4. **Feedback**: Provide clear feedback
5. **Accessibility**: Usable by everyone

## Visual Design

### Color Palette
- **Primary**: Brand color for main actions
- **Secondary**: Supporting actions
- **Success**: Positive actions and states
- **Warning**: Caution states
- **Error**: Error states and destructive actions
- **Neutral**: Text and backgrounds

### Typography
- **Headings**: Clear hierarchy
- **Body**: Readable font size (16px minimum)
- **Labels**: Form field labels
- **Helper**: Secondary information

### Spacing
- Consistent spacing scale
- Adequate whitespace
- Clear visual grouping

## User Experience

### Navigation
- Clear primary navigation
- Breadcrumbs for deep pages
- Search functionality
- Mobile-friendly menu

### Forms
- Clear labels
- Inline validation
- Helpful error messages
- Progressive disclosure

### Loading States
- Loading spinners
- Skeleton screens
- Progress indicators

### Empty States
- Helpful messaging
- Call to action
- Illustration or icon

## Responsive Design

- Mobile-first approach
- Touch-friendly targets (44x44px minimum)
- Responsive images
- Adaptive layouts

## Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Sufficient color contrast (4.5:1)
- Focus indicators
- Alternative text for images`;

  docs['/design/user-flows.md'] = `# User Flows

## Primary User Flows

### Registration Flow
\`\`\`
1. Land on homepage
2. Click "Sign Up"
3. Fill registration form
4. Submit form
5. Verify email (if required)
6. Complete profile
7. Arrive at dashboard
\`\`\`

### Login Flow
\`\`\`
1. Click "Login"
2. Enter credentials
3. Submit
4. [Success] → Dashboard
5. [Failed] → Error message → Retry
\`\`\`

### Main Feature Flow
\`\`\`
1. Navigate to feature
2. View list/dashboard
3. Select item or create new
4. Edit/interact with feature
5. Save changes
6. Confirmation → Return to list
\`\`\`

## Error Handling Flows

### Network Error
\`\`\`
1. User action triggers request
2. Network failure
3. Show error message
4. Offer retry option
5. Log error for debugging
\`\`\`

### Validation Error
\`\`\`
1. User submits form
2. Validation fails
3. Highlight invalid fields
4. Show error messages
5. User corrects and resubmits
\`\`\``;

  // Integrations Documentation
  docs['/integrations/third-party-services.md'] = `# Third-Party Integrations

## Payment Processing
${getAnswer('payments')?.selectedOptions[0] !== 'no' ? `
### ${getAnswer('payments')?.selectedOptions[0] === 'yes-stripe' ? 'Stripe' : 'Payment Gateway'}

**Purpose**: Process payments

**Integration**:
- Client-side: Stripe Elements
- Server-side: Stripe API
- Webhooks: Payment events

**Features**:
- Credit card processing
- Subscription management
- Invoice generation
- Payment history
` : 'Not required for MVP'}

## File Storage
${getAnswer('file-storage')?.selectedOptions[0] !== 'no' ? `
### ${getAnswer('file-storage')?.selectedOptions[0] === 's3' ? 'AWS S3' : getAnswer('file-storage')?.selectedOptions[0] === 'cloudinary' ? 'Cloudinary' : 'File Storage'}

**Purpose**: Store uploaded files

**Features**:
- Secure file upload
- Public/private files
- CDN delivery
${getAnswer('file-storage')?.selectedOptions[0] === 'cloudinary' ? '- Image transformations' : ''}
` : 'Not required for MVP'}

## Email Service
${getAnswer('email-service')?.selectedOptions.length > 0 && !getAnswer('email-service')?.selectedOptions.includes('no') ? `
**Purpose**: Send emails and notifications

**Types**:
${getAnswer('email-service')?.selectedOptions.map(id => {
  if (id === 'transactional') return '- Transactional emails (welcome, password reset)';
  if (id === 'marketing') return '- Marketing campaigns';
  return '';
}).filter(Boolean).join('\n')}

**Provider Options**:
- SendGrid
- AWS SES
- Mailgun
- Postmark
` : 'Not required for MVP'}

## Search Service
${getAnswer('search')?.selectedOptions[0] !== 'no' && getAnswer('search')?.selectedOptions[0] !== 'database' ? `
### ${getAnswer('search')?.selectedOptions[0] === 'elastic' ? 'Elasticsearch' : 'Algolia'}

**Purpose**: Full-text search

**Features**:
- Fast search queries
- Relevance ranking
- Filters and facets
- Auto-complete
` : ''}

## Authentication Providers
${authAnswer?.selectedOptions.includes('social') ? `
### Social Login

**Providers**:
- Google OAuth
- GitHub OAuth
- Facebook Login

**Implementation**:
- OAuth 2.0 flow
- User profile import
- Account linking
` : ''}`;

  docs['/integrations/api-clients.md'] = `# API Clients and SDKs

## Backend API Client

### Usage in Frontend

\`\`\`typescript
import { apiClient } from './api/client';

// Make authenticated request
const user = await apiClient.get('/users/me');

// With error handling
try {
  const data = await apiClient.post('/resources', body);
} catch (error) {
  if (error.status === 401) {
    // Handle unauthorized
  }
}
\`\`\`

### Client Configuration

\`\`\`typescript
const apiClient = {
  baseURL: process.env.VITE_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  },
  interceptors: {
    request: addAuthToken,
    response: handleErrors
  }
};
\`\`\`

## Third-Party SDKs

${getAnswer('payments')?.selectedOptions[0] !== 'no' ? '### Payment SDK\n- Stripe SDK\n- Payment form components\n- Webhook handling\n' : ''}
${getAnswer('file-storage')?.selectedOptions[0] === 's3' ? '### AWS SDK\n- S3 client\n- File upload utilities\n- Signed URLs\n' : ''}
${getAnswer('file-storage')?.selectedOptions[0] === 'cloudinary' ? '### Cloudinary SDK\n- Image upload\n- Transformations\n- Delivery optimization\n' : ''}`;

  // Development Documentation
  docs['/development/setup-guide.md'] = `# Development Setup Guide

## Prerequisites

- Node.js ${backendTech === 'nodejs' ? '18+' : '(if using Node tools)'}
${backendTech === 'python' ? '- Python 3.9+' : ''}
${backendTech === 'go' ? '- Go 1.20+' : ''}
${backendTech === 'ruby' ? '- Ruby 3.0+' : ''}
- ${databaseMap?.name || 'Database'}
- Git

## Initial Setup

### 1. Clone Repository
\`\`\`bash
git clone <repository-url>
cd ${projectName.toLowerCase().replace(/\s+/g, '-')}
\`\`\`

### 2. Install Dependencies

**Frontend**:
\`\`\`bash
cd frontend
npm install
\`\`\`

**Backend**:
\`\`\`bash
cd backend
${backendTech === 'nodejs' ? 'npm install' : ''}
${backendTech === 'python' ? 'pip install -r requirements.txt' : ''}
${backendTech === 'go' ? 'go mod download' : ''}
${backendTech === 'ruby' ? 'bundle install' : ''}
\`\`\`

### 3. Environment Configuration

Copy \`.env.example\` to \`.env\` and configure:

\`\`\`bash
cp .env.example .env
\`\`\`

Edit \`.env\` with your local configuration.

### 4. Database Setup

\`\`\`bash
# Run migrations
${backendTech === 'nodejs' ? 'npm run migrate' : ''}
${backendTech === 'python' ? 'python manage.py migrate' : ''}

# Seed database (optional)
${backendTech === 'nodejs' ? 'npm run seed' : ''}
${backendTech === 'python' ? 'python manage.py seed' : ''}
\`\`\`

### 5. Run Development Servers

**Frontend**:
\`\`\`bash
cd frontend
npm run dev
# Access at http://localhost:5173
\`\`\`

**Backend**:
\`\`\`bash
cd backend
${backendTech === 'nodejs' ? 'npm run dev' : ''}
${backendTech === 'python' ? 'python manage.py runserver' : ''}
${backendTech === 'go' ? 'go run main.go' : ''}
${backendTech === 'ruby' ? 'rails server' : ''}
# Access at http://localhost:3000
\`\`\`

## Development Workflow

1. Create feature branch
2. Make changes
3. Run tests
4. Commit and push
5. Create pull request`;

  docs['/development/coding-standards.md'] = `# Coding Standards

## General Principles

1. **Readability**: Code is read more than written
2. **Simplicity**: Simple solutions over clever ones
3. **Consistency**: Follow established patterns
4. **DRY**: Don't Repeat Yourself
5. **SOLID**: Object-oriented design principles

## Code Style

### Naming Conventions
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Functions**: camelCase
- **Classes**: PascalCase
- **Files**: kebab-case

### Formatting
- Indentation: 2 spaces
- Line length: 100 characters max
- Use semicolons
- Trailing commas in multi-line

## Best Practices

### Functions
- Small and focused
- Single responsibility
- Descriptive names
- Max 3 parameters (use object for more)

### Comments
- Explain why, not what
- Keep comments up to date
- Use JSDoc for functions

### Error Handling
- Always handle errors
- Provide context in error messages
- Log errors appropriately
- Don't swallow errors

## TypeScript Guidelines

- Enable strict mode
- Avoid \`any\` type
- Define interfaces for objects
- Use union types appropriately

## Git Commit Messages

Format:
\`\`\`
type: subject

body (optional)
\`\`\`

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Tests
- chore: Maintenance`;

  docs['/development/git-workflow.md'] = `# Git Workflow

## Branching Strategy

### Main Branches
- **main**: Production-ready code
- **develop**: Integration branch

### Feature Branches
- **feature/**: New features
- **fix/**: Bug fixes
- **hotfix/**: Urgent fixes

## Workflow

### Starting New Feature
\`\`\`bash
git checkout develop
git pull origin develop
git checkout -b feature/my-feature
\`\`\`

### Making Changes
\`\`\`bash
# Make changes
git add .
git commit -m "feat: add new feature"
git push origin feature/my-feature
\`\`\`

### Pull Request
1. Create PR to develop
2. Request code review
3. Address feedback
4. Merge when approved

## Commit Guidelines

- Small, focused commits
- Clear commit messages
- Test before committing
- Keep commits atomic

## Code Review Checklist

- [ ] Code follows standards
- [ ] Tests included
- [ ] Documentation updated
- [ ] No console.logs
- [ ] Error handling present`;

  docs['/development/troubleshooting.md'] = `# Troubleshooting Guide

## Common Issues

### Database Connection Failed
**Symptoms**: Cannot connect to database

**Solutions**:
1. Check database is running
2. Verify connection string
3. Check firewall rules
4. Verify credentials

### Port Already in Use
**Symptoms**: Error starting dev server

**Solutions**:
\`\`\`bash
# Find process using port
lsof -i :3000
# Kill process
kill -9 <PID>
\`\`\`

### Module Not Found
**Symptoms**: Import errors

**Solutions**:
\`\`\`bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Build Failures
**Symptoms**: Build command fails

**Solutions**:
1. Check for TypeScript errors
2. Verify all dependencies installed
3. Clear build cache
4. Check for circular dependencies

## Debugging

### Frontend Debugging
- Use browser DevTools
- React DevTools extension
- Network tab for API calls
- Console for errors

### Backend Debugging
${backendTech === 'nodejs' ? `- Use \`console.log\` or debugger
- Node.js inspector
- \`DEBUG=*\` for verbose logging` : ''}

## Getting Help

1. Check documentation
2. Search error messages
3. Ask team members
4. Create detailed issue report`;

  const fileCount = Object.keys(docs).length;
  console.log('✅ [docGenerator] Documentation generation complete!');
  console.log('📁 [docGenerator] Total files generated:', fileCount);
  console.log('📂 [docGenerator] Files:', Object.keys(docs).sort());
  
  return docs;
};
