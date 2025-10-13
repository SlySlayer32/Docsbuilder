import { Answer } from '../types/interview';

export const generateDocumentation = (answers: Answer[], projectName: string) => {
  const docs: { [path: string]: string } = {};

  const getAnswer = (questionId: string) => answers.find(a => a.questionId === questionId);
  const getOptionLabels = (questionId: string, options: any[]) => {
    const answer = getAnswer(questionId);
    if (!answer) return [];
    return answer.selectedOptions.map(id => options.find(o => o.id === id)?.label || id);
  };

  // Project Overview
  const purposeAnswer = getAnswer('purpose');
  const targetUsersAnswer = getAnswer('target-users');
  
  docs['/project/overview.md'] = `# ${projectName}

## Project Overview

This document provides a comprehensive overview of the ${projectName} project.

## Purpose

${purposeAnswer?.details || 'A modern software application designed to solve specific user needs.'}

## Target Users

${targetUsersAnswer?.details || 'Our application serves a diverse user base with varying needs and technical expertise.'}

## Goals

- Deliver exceptional user experience
- Build scalable and maintainable architecture
- Ensure high performance and reliability
- Maintain security and data privacy

## Success Metrics

- User satisfaction score > 4.5/5
- System uptime > 99.9%
- Page load time < 2 seconds
- Zero critical security vulnerabilities`;

  // Technical Architecture
  const frontendAnswer = getAnswer('frontend');
  const backendAnswer = getAnswer('backend');
  const databaseAnswer = getAnswer('database');

  docs['/architecture/tech-stack.md'] = `# Technology Stack

## Frontend

**Framework**: ${frontendAnswer?.selectedOptions[0] || 'React'}

Modern, component-based architecture with:
- TypeScript for type safety
- Responsive design with Tailwind CSS
- State management solution
- Routing and navigation

## Backend

**Technology**: ${backendAnswer?.selectedOptions[0] || 'Node.js'}

RESTful API architecture with:
- Authentication and authorization
- Database integration
- Business logic layer
- Error handling and logging

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

  return docs;
};
