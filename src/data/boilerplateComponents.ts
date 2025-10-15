import { BoilerplateComponent } from '../types/components';

/**
 * Core boilerplate components library
 * Phase 1: 5 essential components
 */

export const boilerplateComponents: BoilerplateComponent[] = [
  {
    id: 'basic-auth',
    name: 'Basic Login/Signup',
    category: 'authentication',
    description: 'Email/password authentication with registration, login, password reset, and email verification',
    icon: '🔐',
    complexity: 'beginner',
    estimatedHours: 8,
    tags: ['authentication', 'login', 'signup', 'security', 'email'],
    dependencies: [],
    recommendedWith: ['user-dashboard', 'rest-api'],
    conflicts: [],
    documentation: {
      overview: `# Basic Login/Signup Component

## Overview
Provides a complete authentication system with email/password login, user registration, password reset, and email verification.

## Features
- **User Registration**: Email/password signup with validation
- **Login**: Secure authentication with session management
- **Password Reset**: Email-based password recovery flow
- **Email Verification**: Confirm user email addresses
- **Session Management**: JWT-based authentication tokens
- **Security**: Password hashing, rate limiting, CSRF protection`,
      
      technicalImplementation: {
        'react-nodejs-postgresql': `## React + Node.js + PostgreSQL

### Frontend (React)
\`\`\`typescript
// src/components/auth/LoginForm.tsx
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};
\`\`\`

### Backend (Node.js/Express)
\`\`\`typescript
// src/routes/auth.ts
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../db';

const router = express.Router();

// Register endpoint
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  
  // Validate input
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    // Check if user exists
    const existingUser = await db.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );
    
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const result = await db.query(
      'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name',
      [email, hashedPassword, name]
    );
    
    const user = result.rows[0];
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
    
    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const result = await db.query(
      'SELECT id, email, name, password_hash FROM users WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
    
    res.json({
      user: { id: user.id, email: user.email, name: user.name },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
\`\`\``,
      },
      
      architecture: `## Architecture

### Authentication Flow
\`\`\`
1. User submits credentials → Frontend
2. Frontend sends POST /api/auth/login → Backend
3. Backend validates credentials → Database
4. Backend generates JWT token
5. Frontend stores token in localStorage
6. Frontend includes token in subsequent requests
\`\`\`

### Components
- **Frontend**: Login/Signup forms, password reset UI
- **Backend**: Auth API endpoints, JWT middleware
- **Database**: Users table with hashed passwords
- **Email Service**: Password reset and verification emails`,
      
      apiEndpoints: [
        {
          method: 'POST',
          endpoint: '/api/auth/register',
          description: 'Register a new user',
          request: '{ email: string, password: string, name: string }',
          response: '{ user: User, token: string }',
        },
        {
          method: 'POST',
          endpoint: '/api/auth/login',
          description: 'Login with email and password',
          request: '{ email: string, password: string }',
          response: '{ user: User, token: string }',
        },
        {
          method: 'POST',
          endpoint: '/api/auth/forgot-password',
          description: 'Request password reset email',
          request: '{ email: string }',
          response: '{ message: string }',
        },
        {
          method: 'POST',
          endpoint: '/api/auth/reset-password',
          description: 'Reset password with token',
          request: '{ token: string, newPassword: string }',
          response: '{ message: string }',
        },
      ],
      
      databaseSchema: `### Users Table
\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  verification_token VARCHAR(255),
  reset_token VARCHAR(255),
  reset_token_expires TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_verification_token ON users(verification_token);
CREATE INDEX idx_users_reset_token ON users(reset_token);
\`\`\``,
      
      security: `## Security Considerations

### Password Security
- **Hashing**: Use bcrypt with salt rounds >= 10
- **Minimum Length**: Enforce 8+ characters
- **Complexity**: Require mix of letters, numbers, symbols
- **Storage**: Never store plain text passwords

### JWT Security
- **Secret Key**: Use strong, random JWT_SECRET
- **Expiration**: Set reasonable token expiry (7-30 days)
- **Refresh Tokens**: Implement for long-lived sessions
- **HTTPS Only**: Always use HTTPS in production

### Rate Limiting
- **Login Attempts**: Max 5 failed attempts per 15 minutes
- **Registration**: Max 3 registrations per hour per IP
- **Password Reset**: Max 3 requests per hour per email

### Additional Security
- **CSRF Protection**: Use CSRF tokens for state-changing operations
- **Email Verification**: Require email confirmation before full access
- **Account Lockout**: Temporary lockout after multiple failed logins
- **Audit Logs**: Log all authentication events`,
      
      testing: `## Testing Strategy

### Unit Tests
\`\`\`typescript
// tests/auth.test.ts
describe('Authentication', () => {
  describe('Registration', () => {
    it('should create a new user with valid data', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'SecurePass123!',
        name: 'Test User'
      };
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe(userData.email);
    });
    
    it('should reject registration with existing email', async () => {
      // Test duplicate email
    });
    
    it('should reject weak passwords', async () => {
      // Test password validation
    });
  });
  
  describe('Login', () => {
    it('should login with correct credentials', async () => {
      // Test successful login
    });
    
    it('should reject invalid credentials', async () => {
      // Test failed login
    });
  });
});
\`\`\`

### Integration Tests
- Test complete authentication flow
- Test JWT token validation
- Test password reset flow
- Test email verification

### E2E Tests
- Test user registration through UI
- Test login/logout flow
- Test password reset through email`,
      
      configuration: `## Configuration

### Environment Variables
\`\`\`bash
# .env
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRY=7d

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/myapp

# Email Service (for password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# App URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000
\`\`\`

### Dependencies
\`\`\`json
{
  "dependencies": {
    "express": "^4.18.0",
    "bcrypt": "^5.1.0",
    "jsonwebtoken": "^9.0.0",
    "pg": "^8.11.0",
    "nodemailer": "^6.9.0"
  }
}
\`\`\``,
    },
  },
  
  {
    id: 'user-dashboard',
    name: 'User Dashboard',
    category: 'dashboard',
    description: 'User profile management dashboard with settings, preferences, and account information',
    icon: '📊',
    complexity: 'beginner',
    estimatedHours: 6,
    tags: ['dashboard', 'profile', 'settings', 'ui'],
    dependencies: ['basic-auth'],
    recommendedWith: ['crud-operations'],
    conflicts: [],
    documentation: {
      overview: `# User Dashboard Component

## Overview
A comprehensive user dashboard that provides profile management, settings, and personalized content.

## Features
- **Profile Management**: View and edit user information
- **Settings**: Configure account preferences
- **Activity Feed**: Recent user activities
- **Statistics**: User-specific metrics and data
- **Navigation**: Easy access to all user features`,
      
      technicalImplementation: {
        'react-nodejs-postgresql': `## React + Node.js + PostgreSQL

### Frontend (React)
\`\`\`typescript
// src/pages/Dashboard.tsx
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui/card';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {user?.name}!
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h2>Profile</h2>
          <p>Email: {user?.email}</p>
          <p>Member since: {user?.createdAt}</p>
        </Card>
        
        <Card>
          <h2>Activity</h2>
          <p>Recent actions and updates</p>
        </Card>
        
        <Card>
          <h2>Quick Actions</h2>
          <button>Edit Profile</button>
          <button>Settings</button>
        </Card>
      </div>
    </div>
  );
};
\`\`\``,
      },
      
      architecture: `## Architecture

### Dashboard Structure
\`\`\`
Dashboard
├── Header (User info, notifications)
├── Sidebar (Navigation menu)
├── Main Content
│   ├── Overview Cards (Stats, activity)
│   ├── Profile Section
│   └── Settings Panel
└── Footer
\`\`\``,
      
      security: `## Security

- **Authentication Required**: All dashboard routes require valid JWT
- **User Data Isolation**: Users can only access their own data
- **Input Validation**: Validate all profile updates
- **XSS Protection**: Sanitize user-generated content`,
      
      testing: `## Testing

### Component Tests
- Test dashboard renders with user data
- Test navigation between sections
- Test profile update forms
- Test responsive layout

### Integration Tests
- Test dashboard loads after login
- Test data fetching from API
- Test real-time updates`,
      
      configuration: `## Configuration

No additional environment variables required.
Inherits authentication configuration from basic-auth component.`,
    },
  },
  
  {
    id: 'crud-operations',
    name: 'CRUD Operations',
    category: 'data-management',
    description: 'Complete Create, Read, Update, Delete operations with list views, forms, and validation',
    icon: '📝',
    complexity: 'intermediate',
    estimatedHours: 10,
    tags: ['crud', 'data', 'forms', 'validation'],
    dependencies: ['basic-auth'],
    recommendedWith: ['rest-api', 'user-dashboard'],
    conflicts: [],
    documentation: {
      overview: `# CRUD Operations Component

## Overview
Complete CRUD (Create, Read, Update, Delete) functionality for managing data entities.

## Features
- **List View**: Paginated, sortable, filterable data tables
- **Create**: Forms with validation for new records
- **Read**: Detail views for individual records
- **Update**: Edit forms with validation
- **Delete**: Confirmation dialogs and soft delete support
- **Search**: Full-text search across records
- **Filters**: Advanced filtering options`,
      
      technicalImplementation: {
        'react-nodejs-postgresql': `## React + Node.js + PostgreSQL

### Frontend (React)
\`\`\`typescript
// src/components/crud/ItemList.tsx
import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface Item {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchItems();
  }, []);
  
  const fetchItems = async () => {
    try {
      const data = await api.get('/items');
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      await api.delete(\`/items/\${id}\`);
      fetchItems();
    }
  };
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <h2>Items</h2>
      <button onClick={() => /* navigate to create */}>
        Add New Item
      </button>
      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <button onClick={() => /* edit */}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
\`\`\`

### Backend (Node.js/Express)
\`\`\`typescript
// src/routes/items.ts
import express from 'express';
import { db } from '../db';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Get all items (with pagination)
router.get('/', authenticate, async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;
  const offset = (Number(page) - 1) * Number(limit);
  
  try {
    let query = 'SELECT * FROM items WHERE user_id = $1';
    const params: any[] = [req.userId];
    
    if (search) {
      query += ' AND (name ILIKE $2 OR description ILIKE $2)';
      params.push(\`%\${search}%\`);
    }
    
    query += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(Number(limit), offset);
    
    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create item
router.post('/', authenticate, async (req, res) => {
  const { name, description } = req.body;
  
  try {
    const result = await db.query(
      'INSERT INTO items (name, description, user_id) VALUES ($1, $2, $3) RETURNING *',
      [name, description, req.userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update item
router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  
  try {
    const result = await db.query(
      'UPDATE items SET name = $1, description = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 AND user_id = $4 RETURNING *',
      [name, description, id, req.userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete item
router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await db.query(
      'DELETE FROM items WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
\`\`\``,
      },
      
      architecture: `## Architecture

### CRUD Flow
\`\`\`
Client → API → Business Logic → Database
         ↓
    Validation
         ↓
    Authorization
\`\`\`

### Data Flow
- **Create**: Form → Validation → API → Database
- **Read**: API Request → Database → Transform → Client
- **Update**: Form → Validation → API → Database → Update UI
- **Delete**: Confirmation → API → Database → Remove from UI`,
      
      apiEndpoints: [
        {
          method: 'GET',
          endpoint: '/api/items',
          description: 'Get all items (paginated)',
          request: 'Query params: page, limit, search',
          response: 'Array<Item>',
        },
        {
          method: 'GET',
          endpoint: '/api/items/:id',
          description: 'Get single item by ID',
          response: 'Item',
        },
        {
          method: 'POST',
          endpoint: '/api/items',
          description: 'Create new item',
          request: '{ name: string, description: string }',
          response: 'Item',
        },
        {
          method: 'PUT',
          endpoint: '/api/items/:id',
          description: 'Update existing item',
          request: '{ name: string, description: string }',
          response: 'Item',
        },
        {
          method: 'DELETE',
          endpoint: '/api/items/:id',
          description: 'Delete item',
          response: '{ message: string }',
        },
      ],
      
      databaseSchema: `### Items Table
\`\`\`sql
CREATE TABLE items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_items_user_id ON items(user_id);
CREATE INDEX idx_items_name ON items(name);
\`\`\``,
      
      security: `## Security

- **Authorization**: Users can only access their own items
- **Input Validation**: Validate all input fields
- **SQL Injection Protection**: Use parameterized queries
- **Rate Limiting**: Limit create/update operations`,
      
      testing: `## Testing

### Unit Tests
- Test CRUD operations
- Test validation logic
- Test authorization checks

### Integration Tests
- Test API endpoints
- Test database operations
- Test error handling

### E2E Tests
- Test complete user workflows
- Test form submissions
- Test list filtering and sorting`,
      
      configuration: `## Configuration

### Environment Variables
\`\`\`bash
# Pagination
DEFAULT_PAGE_SIZE=10
MAX_PAGE_SIZE=100
\`\`\``,
    },
  },
  
  {
    id: 'stripe-integration',
    name: 'Stripe Integration',
    category: 'payments',
    description: 'Complete Stripe payment processing with subscriptions, one-time payments, and webhook handling',
    icon: '💳',
    complexity: 'advanced',
    estimatedHours: 16,
    tags: ['payments', 'stripe', 'subscriptions', 'billing'],
    dependencies: ['basic-auth'],
    recommendedWith: ['user-dashboard'],
    conflicts: [],
    documentation: {
      overview: `# Stripe Integration Component

## Overview
Complete payment processing system using Stripe for subscriptions and one-time payments.

## Features
- **Subscription Plans**: Multiple pricing tiers
- **One-Time Payments**: Single payment processing
- **Payment Methods**: Credit cards, digital wallets
- **Webhooks**: Real-time payment event handling
- **Customer Portal**: Self-service subscription management
- **Invoice Generation**: Automatic invoicing`,
      
      technicalImplementation: {
        'react-nodejs-postgresql': `## React + Node.js + PostgreSQL

### Frontend (React)
\`\`\`typescript
// src/components/payments/CheckoutForm.tsx
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);

const CheckoutFormInner: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) return;
    
    setProcessing(true);
    
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: \`\${window.location.origin}/payment/success\`,
      },
    });
    
    if (error) {
      setError(error.message || 'Payment failed');
    }
    
    setProcessing(false);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || processing}>
        {processing ? 'Processing...' : 'Pay now'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export const CheckoutForm: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutFormInner />
    </Elements>
  );
};
\`\`\`

### Backend (Node.js/Express)
\`\`\`typescript
// src/routes/payments.ts
import express from 'express';
import Stripe from 'stripe';
import { db } from '../db';
import { authenticate } from '../middleware/auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const router = express.Router();

// Create payment intent
router.post('/create-payment-intent', authenticate, async (req, res) => {
  const { amount, currency = 'usd' } = req.body;
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency,
      metadata: {
        userId: req.userId!,
      },
    });
    
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

// Create subscription
router.post('/create-subscription', authenticate, async (req, res) => {
  const { priceId } = req.body;
  
  try {
    // Get or create Stripe customer
    let customer;
    const userResult = await db.query(
      'SELECT stripe_customer_id FROM users WHERE id = $1',
      [req.userId]
    );
    
    if (userResult.rows[0]?.stripe_customer_id) {
      customer = await stripe.customers.retrieve(
        userResult.rows[0].stripe_customer_id
      );
    } else {
      customer = await stripe.customers.create({
        metadata: { userId: req.userId! },
      });
      
      await db.query(
        'UPDATE users SET stripe_customer_id = $1 WHERE id = $2',
        [customer.id, req.userId]
      );
    }
    
    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });
    
    res.json({
      subscriptionId: subscription.id,
      clientSecret: (subscription.latest_invoice as any).payment_intent.client_secret,
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: 'Failed to create subscription' });
  }
});

// Webhook handler
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature']!;
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return res.status(400).send(\`Webhook Error: \${err.message}\`);
  }
  
  // Handle specific events
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent.id);
      // Update database
      break;
      
    case 'customer.subscription.updated':
      const subscription = event.data.object;
      console.log('Subscription updated:', subscription.id);
      // Update user subscription status
      break;
      
    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object;
      console.log('Subscription cancelled:', deletedSubscription.id);
      // Handle cancellation
      break;
  }
  
  res.json({ received: true });
});

export default router;
\`\`\``,
      },
      
      architecture: `## Architecture

### Payment Flow
\`\`\`
1. User selects plan/product
2. Frontend requests payment intent from backend
3. Backend creates Stripe payment intent
4. Frontend displays Stripe payment form
5. User enters payment details
6. Stripe processes payment
7. Webhook notifies backend of result
8. Backend updates database
9. Frontend shows confirmation
\`\`\`

### Webhook Processing
- Real-time event handling
- Idempotent operations
- Retry logic for failures
- Event logging for audit`,
      
      apiEndpoints: [
        {
          method: 'POST',
          endpoint: '/api/payments/create-payment-intent',
          description: 'Create payment intent for one-time payment',
          request: '{ amount: number, currency?: string }',
          response: '{ clientSecret: string }',
        },
        {
          method: 'POST',
          endpoint: '/api/payments/create-subscription',
          description: 'Create subscription',
          request: '{ priceId: string }',
          response: '{ subscriptionId: string, clientSecret: string }',
        },
        {
          method: 'POST',
          endpoint: '/api/payments/webhook',
          description: 'Stripe webhook endpoint',
          request: 'Stripe event payload',
          response: '{ received: true }',
        },
      ],
      
      databaseSchema: `### Payment-related Schema
\`\`\`sql
-- Add to users table
ALTER TABLE users ADD COLUMN stripe_customer_id VARCHAR(255);
ALTER TABLE users ADD COLUMN subscription_status VARCHAR(50);
ALTER TABLE users ADD COLUMN subscription_id VARCHAR(255);

-- Create payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  stripe_payment_intent_id VARCHAR(255) UNIQUE NOT NULL,
  amount INTEGER NOT NULL,
  currency VARCHAR(3) NOT NULL,
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_stripe_intent ON payments(stripe_payment_intent_id);
\`\`\``,
      
      security: `## Security

### PCI Compliance
- **Never store card data**: Use Stripe.js for secure collection
- **Use Stripe Elements**: Pre-built, PCI-compliant UI components
- **HTTPS only**: All payment pages must use HTTPS

### Webhook Security
- **Verify signatures**: Always verify Stripe webhook signatures
- **Idempotency**: Handle duplicate webhook events
- **Rate limiting**: Limit webhook endpoint

### API Security
- **Authentication required**: All payment endpoints require authentication
- **Amount validation**: Validate payment amounts server-side
- **User authorization**: Verify user can perform payment action`,
      
      testing: `## Testing

### Unit Tests
\`\`\`typescript
describe('Payments', () => {
  it('should create payment intent', async () => {
    // Test payment intent creation
  });
  
  it('should handle successful payment', async () => {
    // Test webhook handling
  });
});
\`\`\`

### Integration Tests
- Test Stripe API integration
- Test webhook processing
- Test subscription lifecycle

### Test Mode
Use Stripe test mode for all development and testing:
- Test card: 4242 4242 4242 4242
- Use test API keys
- Webhook testing with Stripe CLI`,
      
      configuration: `## Configuration

### Environment Variables
\`\`\`bash
# Stripe Keys
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Pricing
STRIPE_PRICE_BASIC=price_...
STRIPE_PRICE_PRO=price_...
STRIPE_PRICE_ENTERPRISE=price_...
\`\`\`

### Dependencies
\`\`\`json
{
  "dependencies": {
    "stripe": "^14.0.0",
    "@stripe/stripe-js": "^2.0.0",
    "@stripe/react-stripe-js": "^2.0.0"
  }
}
\`\`\`

### Stripe Setup
1. Create Stripe account
2. Get API keys from dashboard
3. Create products and prices
4. Set up webhook endpoint
5. Configure webhook secret`,
    },
  },
  
  {
    id: 'rest-api',
    name: 'REST API',
    category: 'api',
    description: 'RESTful API with proper routing, middleware, error handling, and documentation',
    icon: '🔄',
    complexity: 'intermediate',
    estimatedHours: 12,
    tags: ['api', 'rest', 'endpoints', 'http'],
    dependencies: [],
    recommendedWith: ['basic-auth', 'crud-operations'],
    conflicts: [],
    documentation: {
      overview: `# REST API Component

## Overview
Production-ready RESTful API with best practices, proper error handling, and comprehensive documentation.

## Features
- **Resource-based URLs**: Clean, predictable endpoint structure
- **HTTP Methods**: Proper use of GET, POST, PUT, DELETE
- **Status Codes**: Appropriate HTTP status codes
- **Error Handling**: Consistent error responses
- **Validation**: Request validation middleware
- **Rate Limiting**: API rate limiting
- **Versioning**: API version management
- **Documentation**: OpenAPI/Swagger documentation`,
      
      technicalImplementation: {
        'nodejs-express': `## Node.js + Express

### API Server Setup
\`\`\`typescript
// src/server.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import itemRoutes from './routes/items';

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/items', itemRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(\`API server running on port \${PORT}\`);
});
\`\`\`

### Resource Controller
\`\`\`typescript
// src/controllers/items.controller.ts
import { Request, Response, NextFunction } from 'express';
import { ItemService } from '../services/item.service';
import { validate } from '../middleware/validation';
import { itemSchema } from '../schemas/item.schema';

export class ItemController {
  private itemService: ItemService;
  
  constructor() {
    this.itemService = new ItemService();
  }
  
  // GET /api/v1/items
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10, sort = '-createdAt' } = req.query;
      
      const items = await this.itemService.findAll({
        userId: req.userId!,
        page: Number(page),
        limit: Number(limit),
        sort: sort as string,
      });
      
      res.json({
        data: items.data,
        pagination: {
          page: items.page,
          limit: items.limit,
          total: items.total,
          pages: Math.ceil(items.total / items.limit),
        },
      });
    } catch (error) {
      next(error);
    }
  };
  
  // GET /api/v1/items/:id
  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await this.itemService.findById(req.params.id, req.userId!);
      
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      
      res.json({ data: item });
    } catch (error) {
      next(error);
    }
  };
  
  // POST /api/v1/items
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await validate(itemSchema, req.body);
      const item = await this.itemService.create({
        ...validated,
        userId: req.userId!,
      });
      
      res.status(201).json({ data: item });
    } catch (error) {
      next(error);
    }
  };
  
  // PUT /api/v1/items/:id
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await validate(itemSchema, req.body);
      const item = await this.itemService.update(
        req.params.id,
        req.userId!,
        validated
      );
      
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      
      res.json({ data: item });
    } catch (error) {
      next(error);
    }
  };
  
  // DELETE /api/v1/items/:id
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleted = await this.itemService.delete(req.params.id, req.userId!);
      
      if (!deleted) {
        return res.status(404).json({ error: 'Item not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
\`\`\``,
      },
      
      architecture: `## Architecture

### API Structure
\`\`\`
/api/v1
├── /auth
│   ├── POST /register
│   ├── POST /login
│   └── POST /logout
├── /users
│   ├── GET /:id
│   └── PUT /:id
├── /items
│   ├── GET /
│   ├── GET /:id
│   ├── POST /
│   ├── PUT /:id
│   └── DELETE /:id
\`\`\`

### Layered Architecture
\`\`\`
Routes → Controllers → Services → Data Access → Database
\`\`\`

### Middleware Pipeline
\`\`\`
Request → CORS → Auth → Validation → Rate Limit → Controller → Response
\`\`\``,
      
      apiEndpoints: [
        {
          method: 'GET',
          endpoint: '/api/v1/items',
          description: 'Get all items',
          request: 'Query: page, limit, sort',
          response: '{ data: Item[], pagination: {...} }',
        },
        {
          method: 'GET',
          endpoint: '/api/v1/items/:id',
          description: 'Get single item',
          response: '{ data: Item }',
        },
        {
          method: 'POST',
          endpoint: '/api/v1/items',
          description: 'Create item',
          request: '{ name: string, description: string }',
          response: '{ data: Item }',
        },
        {
          method: 'PUT',
          endpoint: '/api/v1/items/:id',
          description: 'Update item',
          request: '{ name: string, description: string }',
          response: '{ data: Item }',
        },
        {
          method: 'DELETE',
          endpoint: '/api/v1/items/:id',
          description: 'Delete item',
          response: '204 No Content',
        },
      ],
      
      security: `## Security

### Authentication
- JWT-based authentication
- Token in Authorization header
- Token expiration and refresh

### Authorization
- Role-based access control (RBAC)
- Resource ownership validation
- Permission checking middleware

### Input Validation
- Schema validation (Zod, Joi)
- Sanitize user input
- Type checking

### Rate Limiting
- Per-IP rate limits
- Per-user rate limits
- Different limits for different endpoints

### CORS
- Whitelist allowed origins
- Credentials handling
- Preflight requests

### Security Headers
- Helmet.js for security headers
- Content Security Policy
- XSS Protection`,
      
      testing: `## Testing

### Unit Tests
\`\`\`typescript
describe('ItemController', () => {
  it('should return all items', async () => {
    const req = mockRequest();
    const res = mockResponse();
    
    await controller.getAll(req, res, next);
    
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.any(Array) })
    );
  });
});
\`\`\`

### Integration Tests
\`\`\`typescript
describe('Items API', () => {
  it('POST /api/v1/items should create item', async () => {
    const response = await request(app)
      .post('/api/v1/items')
      .set('Authorization', \`Bearer \${token}\`)
      .send({ name: 'Test', description: 'Test item' });
    
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('id');
  });
});
\`\`\`

### API Testing
- Postman collections
- Automated API tests
- Load testing
- Security testing`,
      
      configuration: `## Configuration

### Environment Variables
\`\`\`bash
# Server
PORT=5000
NODE_ENV=production

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# API
API_VERSION=v1
\`\`\`

### Dependencies
\`\`\`json
{
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "morgan": "^1.10.0",
    "express-rate-limit": "^7.0.0",
    "zod": "^3.22.0"
  }
}
\`\`\``,
    },
  },
];

/**
 * Get component by ID
 */
export function getComponentById(id: string): BoilerplateComponent | undefined {
  return boilerplateComponents.find(c => c.id === id);
}

/**
 * Get components by category
 */
export function getComponentsByCategory(category: string): BoilerplateComponent[] {
  return boilerplateComponents.filter(c => c.category === category);
}

/**
 * Get all categories
 */
export function getAllCategories(): string[] {
  const categories = new Set(boilerplateComponents.map(c => c.category));
  return Array.from(categories).sort();
}
