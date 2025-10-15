import { TechStack, BoilerplateComponent } from '../types/components';

/**
 * Generates user-friendly, foolproof documentation following the "10-year-old test"
 * All documentation is clear, step-by-step, and includes success indicators
 */

interface DocGenerationOptions {
  projectName: string;
  techStack: TechStack;
  selectedComponents: BoilerplateComponent[];
}

/**
 * Generate README.md - First impression and quick start
 */
export const generateReadme = ({ projectName, techStack, selectedComponents }: DocGenerationOptions): string => {
  const componentsList = selectedComponents.map(c => `- ✅ ${c.name} - ${c.description}`).join('\n');
  
  const hasAuth = selectedComponents.some(c => c.category === 'authentication');
  const hasDashboard = selectedComponents.some(c => c.category === 'dashboard');
  const hasPayments = selectedComponents.some(c => c.category === 'payments');
  const hasApi = selectedComponents.some(c => c.category === 'api');
  
  return `# ${projectName}

> A modern ${techStack.frontend.charAt(0).toUpperCase() + techStack.frontend.slice(1)} application with ${selectedComponents.length} production-ready components

## What Does This Do?

${projectName} is a ready-to-use application built with carefully selected components. Think of it as a starter kit that includes everything you need to launch your project quickly.

**Built with**: ${techStack.frontend} (frontend), ${techStack.backend} (backend), ${techStack.database} (database)

## Quick Start (5 Minutes)

Get up and running in just a few steps:

### 1. Install What You Need

Make sure you have these installed on your computer:
- **Node.js 18 or newer** - Check with: \`node --version\`
  - Don't have it? [Download here](https://nodejs.org)
- **${techStack.database === 'postgresql' ? 'PostgreSQL 14+' : techStack.database === 'mongodb' ? 'MongoDB 5+' : techStack.database === 'mysql' ? 'MySQL 8+' : 'Database'}** - Check with: \`${techStack.database === 'postgresql' ? 'psql --version' : techStack.database === 'mongodb' ? 'mongod --version' : techStack.database === 'mysql' ? 'mysql --version' : 'database --version'}\`
  - Don't have it? [Installation guide](./docs/SETUP.md#installing-${techStack.database})

### 2. Get the Code and Install Dependencies

\`\`\`bash
# Download the project
git clone <your-repo-url>
cd ${projectName.toLowerCase().replace(/\s+/g, '-')}

# Install all the packages the project needs
npm install
\`\`\`

**✅ Success Check**: You should see "added XXX packages" with no red error messages.

### 3. Set Up Your Environment

\`\`\`bash
# Copy the example configuration file
cp .env.example .env

# Open .env in your text editor and fill in the values
# See the file for detailed explanations of each setting
\`\`\`

**✅ Success Check**: Your \`.env\` file should have real values, not placeholders like "your-key-here".

💡 **Tip**: Check [SETUP.md](./docs/SETUP.md#environment-variables) for help finding these values.

### 4. Set Up the Database

\`\`\`bash
# Create the database and tables
npm run db:setup
\`\`\`

**✅ Success Check**: You should see "Database ready!" with no errors.

❌ **Got errors?** Check the [Troubleshooting Guide](./docs/TROUBLESHOOTING.md#database-setup-errors)

### 5. Start the Application

\`\`\`bash
# Start the development server
npm run dev
\`\`\`

**✅ Success Check**: 
- You should see "Server running on http://localhost:3000"
- Open http://localhost:3000 in your browser
- You should see the home page load

🎉 **Congratulations!** Your app is running. Now you can start building!

## What's Included?

This project comes with these components ready to use:

${componentsList}

**Total estimated build time**: ${selectedComponents.reduce((sum, c) => sum + c.estimatedHours, 0)} hours (already done for you!)

## Project Structure

\`\`\`
${projectName.toLowerCase().replace(/\s+/g, '-')}/
├── src/              # Your application code
│   ├── frontend/     # ${techStack.frontend} application
│   ├── backend/      # ${techStack.backend} server
│   └── shared/       # Code used by both
├── docs/             # Complete documentation
├── tests/            # Automated tests
├── .env.example      # Environment configuration template
└── README.md         # You are here!
\`\`\`

## Learn More

- 📖 [Complete Setup Guide](./docs/SETUP.md) - Detailed installation instructions
- 🏗️ [Architecture Overview](./docs/ARCHITECTURE.md) - How everything works together
- 🐛 [Troubleshooting](./docs/TROUBLESHOOTING.md) - Fix common problems
- ❓ [FAQ](./docs/FAQ.md) - Frequently asked questions
- 🔧 [Component Guides](./docs/components/) - Learn about each component

## Common Next Steps

After getting the app running, most people want to:

${hasAuth ? '1. **Test the authentication** - Try creating an account and logging in\n   → [Authentication Guide](./docs/components/authentication/basic-auth.md)' : ''}
${hasDashboard ? '2. **Explore the dashboard** - See what data and features are available\n   → [Dashboard Guide](./docs/components/dashboard/user-dashboard.md)' : ''}
${hasPayments ? '3. **Test payments** - Use test credit cards to try payment flows\n   → [Payment Testing Guide](./docs/components/payments/stripe-integration.md#testing)' : ''}
${hasApi ? '4. **Try the API** - Make API requests and see responses\n   → [API Documentation](./docs/api/)' : ''}
5. **Customize for your needs** - Modify components and add features
   → [Development Guide](./docs/DEVELOPMENT.md)

## Need Help?

We're here to help you succeed:

- 📚 **Documentation**: Check the [docs folder](./docs/) for guides
- 💬 **Community**: [Join our Discord](https://discord.gg/yourproject) (example)
- 🐛 **Bug Reports**: [Open an issue](https://github.com/yourname/yourproject/issues)
- 💡 **Feature Requests**: We'd love to hear your ideas!

## License

[Your License Here] - See [LICENSE](./LICENSE) for details

---

**Made with ❤️ using [Docsbuilder](https://github.com/SlySlayer32/Docsbuilder)**
`;
};

/**
 * Generate SETUP.md - Detailed installation and configuration guide
 */
export const generateSetup = ({ projectName, techStack, selectedComponents }: DocGenerationOptions): string => {
  const hasAuth = selectedComponents.some(c => c.category === 'authentication');
  const hasPayments = selectedComponents.some(c => c.category === 'payments');
  const hasStripe = selectedComponents.some(c => c.id === 'stripe-integration');
  
  return `# Complete Setup Guide

**Time Required**: About 15-20 minutes  
**Difficulty**: Beginner-friendly (we'll walk you through everything!)

---

## What You'll Need

Before we start, let's make sure you have everything installed:

### Required Software

#### 1. Node.js (Version 18 or newer)

**What it is**: Node.js lets you run JavaScript on your computer (not just in a browser).

**Check if you have it**:
\`\`\`bash
node --version
\`\`\`

**Should show**: Something like \`v18.0.0\` or higher

**Don't have it?** [Download Node.js](https://nodejs.org) and install the LTS version.

✅ **Success**: Run \`node --version\` again and you should see a version number.

---

#### 2. ${techStack.database === 'postgresql' ? 'PostgreSQL' : techStack.database === 'mongodb' ? 'MongoDB' : techStack.database === 'mysql' ? 'MySQL' : 'Database'} (Database)

**What it is**: This is where your app stores all its data (users, posts, settings, etc.).

**Check if you have it**:
\`\`\`bash
${techStack.database === 'postgresql' ? 'psql --version' : techStack.database === 'mongodb' ? 'mongod --version' : techStack.database === 'mysql' ? 'mysql --version' : 'database --version'}
\`\`\`

**Should show**: A version number

**Don't have it?**
${techStack.database === 'postgresql' ? 
  '- **Mac**: `brew install postgresql` (if you have Homebrew)\n- **Windows**: [Download PostgreSQL](https://www.postgresql.org/download/windows/)\n- **Linux**: `sudo apt-get install postgresql` (Ubuntu/Debian)' :
  techStack.database === 'mongodb' ?
  '- **Mac**: `brew tap mongodb/brew && brew install mongodb-community`\n- **Windows**: [Download MongoDB](https://www.mongodb.com/try/download/community)\n- **Linux**: [Follow MongoDB installation guide](https://docs.mongodb.com/manual/installation/)' :
  techStack.database === 'mysql' ?
  '- **Mac**: `brew install mysql`\n- **Windows**: [Download MySQL](https://dev.mysql.com/downloads/mysql/)\n- **Linux**: `sudo apt-get install mysql-server`' :
  '- Check your database provider\'s installation guide'
}

✅ **Success**: The database should be running. 
${techStack.database === 'postgresql' ? 
  'Test with: `pg_isready` - should say "accepting connections"' :
  techStack.database === 'mongodb' ?
  'Test with: `mongod --version` - should show version' :
  'Test with the appropriate command for your database'
}

---

#### 3. Git (Version Control)

**What it is**: Git helps you download the project and track changes.

**Check if you have it**:
\`\`\`bash
git --version
\`\`\`

**Don't have it?** [Download Git](https://git-scm.com/downloads)

---

### Optional (But Recommended)

- **Code Editor**: We recommend [VS Code](https://code.visualstudio.com/)
- **API Testing Tool**: [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) for testing API endpoints

---

## Step-by-Step Installation

Now let's get your project set up! Follow these steps in order.

### Step 1: Download the Project

\`\`\`bash
# Clone the repository (download the code)
git clone <your-repository-url>

# Go into the project folder
cd ${projectName.toLowerCase().replace(/\s+/g, '-')}
\`\`\`

✅ **Success**: Run \`ls\` and you should see files like \`package.json\`, \`src/\`, and \`docs/\`.

---

### Step 2: Install Dependencies

**What this does**: Downloads all the packages and libraries your project needs.

\`\`\`bash
npm install
\`\`\`

**This might take a few minutes** - it's downloading hundreds of packages!

✅ **Success**: You should see:
- "added XXX packages in XXs"
- No red error messages
- A new \`node_modules/\` folder appears

❌ **Got errors?** 

**"npm: command not found"**
- Node.js isn't installed correctly. Go back to Step 1 of "What You'll Need"

**"EACCES: permission denied"**
- Don't use \`sudo\`. Instead, [fix npm permissions](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)

**Network/timeout errors**
- Try again with: \`npm install --verbose\`
- Or use a different npm registry: \`npm install --registry=https://registry.npmjs.org\`

---

### Step 3: Configure Environment Variables

**What are environment variables?** They're secret settings your app needs (like passwords, API keys, and configuration). They're kept in a file called \`.env\` that never gets shared publicly.

#### 3.1 Create Your .env File

\`\`\`bash
# Copy the example file
cp .env.example .env
\`\`\`

✅ **Success**: Run \`ls -a\` and you should see both \`.env.example\` and \`.env\` in the list.

#### 3.2 Edit Your .env File

Open \`.env\` in your text editor. You'll see something like this:

\`\`\`bash
DATABASE_URL=your-database-url-here
SESSION_SECRET=your-secret-here
${hasStripe ? 'STRIPE_SECRET_KEY=your-stripe-key-here\nSTRIPE_PUBLISHABLE_KEY=your-stripe-public-key-here' : ''}
\`\`\`

Now let's fill in each value:

##### DATABASE_URL (Database Connection)

**What it is**: The address that tells your app how to connect to the database.

**Format**: 
\`\`\`
${techStack.database === 'postgresql' ? 
  'postgresql://username:password@localhost:5432/database_name' :
  techStack.database === 'mongodb' ?
  'mongodb://localhost:27017/database_name' :
  techStack.database === 'mysql' ?
  'mysql://username:password@localhost:3306/database_name' :
  'database://localhost/database_name'
}
\`\`\`

**For local development**, use:
\`\`\`
${techStack.database === 'postgresql' ? 
  'postgresql://postgres:password@localhost:5432/' + projectName.toLowerCase().replace(/\s+/g, '_') :
  techStack.database === 'mongodb' ?
  'mongodb://localhost:27017/' + projectName.toLowerCase().replace(/\s+/g, '_') :
  techStack.database === 'mysql' ?
  'mysql://root:password@localhost:3306/' + projectName.toLowerCase().replace(/\s+/g, '_') :
  'database://localhost/' + projectName.toLowerCase().replace(/\s+/g, '_')
}
\`\`\`

💡 **Replace** \`password\` with your actual database password (the one you set when installing ${techStack.database}).

---

##### SESSION_SECRET (Security Key)

**What it is**: A random string used to encrypt user sessions. Makes your app secure.

**How to create one**:

**Option 1** - Generate online: Visit [randomkeygen.com](https://randomkeygen.com/) and copy a "CodeIgniter Encryption Key"

**Option 2** - Generate in terminal:
\`\`\`bash
openssl rand -base64 32
\`\`\`

**Option 3** - Just make up a long random string (32+ characters)

**Example**:
\`\`\`
SESSION_SECRET=kJ8n2mP9qR4sT7vU0wX3yZ6aC1bD5eF8gH
\`\`\`

⚠️ **Important**: Never share this or commit it to git!

---
${hasStripe ? `
##### STRIPE_SECRET_KEY and STRIPE_PUBLISHABLE_KEY (Payment Processing)

**What they are**: Keys that let your app accept payments through Stripe.

**How to get them**:

1. **Sign up for Stripe**: Go to [stripe.com](https://stripe.com) and create an account (it's free)

2. **Go to the API Keys page**: 
   - Log into Stripe Dashboard
   - Click "Developers" in the menu
   - Click "API keys"

3. **Copy your TEST keys** (for development):
   - **Publishable key**: Starts with \`pk_test_\`
   - **Secret key**: Starts with \`sk_test_\` (click "Reveal test key token")

**Example** (yours will be different):
\`\`\`
STRIPE_SECRET_KEY=sk_test_51Abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
STRIPE_PUBLISHABLE_KEY=pk_test_51Abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
\`\`\`

⚠️ **Important**: 
- Use TEST keys for development (start with \`_test_\`)
- Never commit secret keys to git
- For production, you'll use LIVE keys (start with \`_live_\`)

💡 **Tip**: Stripe test mode uses fake money. You can use test card \`4242 4242 4242 4242\` to test payments without spending real money!

---
` : ''}

✅ **Success**: Your \`.env\` file should now have real values (not "your-key-here" or "replace-me").

---

### Step 4: Create and Set Up the Database

**What this does**: Creates a new database and sets up all the tables your app needs.

\`\`\`bash
# Create the database
npm run db:create

# Set up the tables and structure (called "migrations")
npm run db:migrate

# Add sample data for testing (optional but helpful)
npm run db:seed
\`\`\`

**What each command does**:
- \`db:create\`: Makes a new empty database
- \`db:migrate\`: Creates tables like "users", "posts", etc.
- \`db:seed\`: Adds fake data so you can test the app

✅ **Success**: You should see:
- \`db:create\`: "Database created successfully"
- \`db:migrate\`: "Migrations completed"
- \`db:seed\`: "Seeded X records"

❌ **Got errors?**

**"Database already exists"**
- That's okay! Skip \`db:create\` and just run \`db:migrate\` and \`db:seed\`

**"Connection refused" or "Can't connect to database"**
- Your database isn't running. Start it:
  - **PostgreSQL**: ${techStack.database === 'postgresql' ? '\`brew services start postgresql\` or \`sudo service postgresql start\`' : 'N/A'}
  - **MongoDB**: ${techStack.database === 'mongodb' ? '\`brew services start mongodb-community\` or \`sudo service mongod start\`' : 'N/A'}
  - **MySQL**: ${techStack.database === 'mysql' ? '\`brew services start mysql\` or \`sudo service mysql start\`' : 'N/A'}

**"Access denied" or "Authentication failed"**
- Your DATABASE_URL has the wrong username or password
- Check your \`.env\` file and fix the DATABASE_URL

**Still stuck?** See [Database Troubleshooting](./TROUBLESHOOTING.md#database-issues)

---

### Step 5: Start the Application

**This is it - let's run your app!**

\`\`\`bash
npm run dev
\`\`\`

**What this does**: Starts both the frontend and backend servers in development mode.

✅ **Success**: You should see:
\`\`\`
🚀 Backend server running on http://localhost:${techStack.backend === 'nodejs' ? '5000' : '8000'}
🎨 Frontend server running on http://localhost:3000
✨ Ready! Open http://localhost:3000 in your browser
\`\`\`

**Now open your browser**:
1. Go to http://localhost:3000
2. You should see your app's home page!

🎉 **Congratulations!** Your app is up and running!

---

## What to Do Next

### Test Your Setup

${hasAuth ? '1. **Try creating an account**\n   - Go to http://localhost:3000/signup\n   - Create a test account\n   - Log in with your new account\n   - ✅ Success: You should be redirected to your dashboard' : ''}

${hasPayments ? '2. **Test a payment** (using Stripe test mode)\n   - Go to the checkout/payment page\n   - Use test card: `4242 4242 4242 4242`\n   - Expiry: Any future date\n   - CVC: Any 3 digits\n   - ✅ Success: Payment should be processed (no real money charged!)' : ''}

3. **Explore the database**
   - You can view your data using:
     - ${techStack.database === 'postgresql' ? 'pgAdmin or `psql` command' : ''}
     - ${techStack.database === 'mongodb' ? 'MongoDB Compass or `mongosh` command' : ''}
     - ${techStack.database === 'mysql' ? 'MySQL Workbench or `mysql` command' : ''}

### Learn the Codebase

- [Architecture Overview](./ARCHITECTURE.md) - Understand how everything fits together
- [Development Guide](./DEVELOPMENT.md) - Start making changes
- [Component Guides](./components/) - Learn about each component
- [API Documentation](./api/) - Explore the API endpoints

### Deploy to Production

When you're ready to put your app online:
- [Deployment Guide](./DEPLOYMENT.md) - Step-by-step deployment instructions
- Choose a hosting provider (Vercel, Netlify, Heroku, AWS, etc.)
- Set up your production environment variables
- Deploy!

---

## Troubleshooting

### Common Issues

#### Port Already in Use

**Error**: "Port 3000 is already in use"

**Solution**:
\`\`\`bash
# Find what's using port 3000
lsof -i :3000

# Kill that process (replace PID with the number from above)
kill -9 [PID]

# Or use a different port
PORT=3001 npm run dev
\`\`\`

---

#### Can't Connect to Database

**Symptoms**: Errors about database connection

**Checklist**:
- [ ] Is the database running? (Check with \`${techStack.database === 'postgresql' ? 'pg_isready' : techStack.database === 'mongodb' ? 'mongod --version' : 'database status'}\`)
- [ ] Is your DATABASE_URL in \`.env\` correct?
- [ ] Does the database exist? (Check with \`${techStack.database === 'postgresql' ? 'psql -l' : 'database list command'}\`)
- [ ] Do you have the right permissions?

---

#### npm install Fails

**Try these in order**:

1. **Delete and reinstall**:
   \`\`\`bash
   rm -rf node_modules package-lock.json
   npm install
   \`\`\`

2. **Update npm**:
   \`\`\`bash
   npm install -g npm@latest
   \`\`\`

3. **Clear npm cache**:
   \`\`\`bash
   npm cache clean --force
   npm install
   \`\`\`

4. **Try a different Node version**: Use [nvm](https://github.com/nvm-sh/nvm) to try Node 18

---

### Still Need Help?

- 📚 Check the [full Troubleshooting guide](./TROUBLESHOOTING.md)
- ❓ Read the [FAQ](./FAQ.md)
- 💬 Ask in our [community Discord](#) (example)
- 🐛 [Open an issue](https://github.com/yourname/yourproject/issues) on GitHub

---

**You're all set!** Happy coding! 🚀
`;
};

/**
 * Generate TROUBLESHOOTING.md - Comprehensive error resolution guide
 */
export const generateTroubleshooting = ({ projectName, techStack, selectedComponents }: DocGenerationOptions): string => {
  return `# Troubleshooting Guide

This guide helps you fix common problems. Find your error below and follow the solution.

**Can't find your issue?** Jump to:
- [Database Issues](#database-issues)
- [Installation Issues](#installation-issues)
- [Runtime Errors](#runtime-errors)
- [Payment Issues](#payment-issues) ${selectedComponents.some(c => c.category === 'payments') ? '' : '(if applicable)'}
- [Authentication Issues](#authentication-issues) ${selectedComponents.some(c => c.category === 'authentication') ? '' : '(if applicable)'}
- [Getting More Help](#getting-more-help)

---

## Quick Fixes

### "It was working yesterday, now it's broken!"

**Try these quick fixes first** (they solve 80% of issues):

\`\`\`bash
# 1. Restart everything
npm run dev
# Press Ctrl+C to stop, then restart

# 2. Clear and reinstall
rm -rf node_modules package-lock.json
npm install

# 3. Reset database
npm run db:reset
npm run db:migrate
npm run db:seed

# 4. Check environment variables
cat .env
# Make sure all values are filled in
\`\`\`

---

## Database Issues

### "Cannot connect to database" or "Connection refused"

**What this means**: Your app can't talk to the database.

**Root causes**:
1. Database isn't running
2. Wrong connection details
3. Database doesn't exist
4. Permission problems

**Solutions (try in order)**:

#### Solution 1: Check if database is running

${techStack.database === 'postgresql' ? `
\`\`\`bash
# Check if PostgreSQL is running
pg_isready
\`\`\`

**Should say**: "accepting connections"

**If not running, start it**:
\`\`\`bash
# Mac (with Homebrew)
brew services start postgresql

# Linux
sudo service postgresql start

# Check status
brew services list  # Mac
sudo service postgresql status  # Linux
\`\`\`
` : techStack.database === 'mongodb' ? `
\`\`\`bash
# Check if MongoDB is running
mongod --version
\`\`\`

**If not running, start it**:
\`\`\`bash
# Mac (with Homebrew)
brew services start mongodb-community

# Linux
sudo service mongod start

# Check status
brew services list  # Mac
sudo service mongod status  # Linux
\`\`\`
` : `
Check your database documentation for how to start the ${techStack.database} server.
`}

#### Solution 2: Verify your DATABASE_URL

Open your \`.env\` file and check the DATABASE_URL:

**Correct format**:
\`\`\`
${techStack.database === 'postgresql' ? 
  'postgresql://username:password@localhost:5432/database_name' :
  techStack.database === 'mongodb' ?
  'mongodb://localhost:27017/database_name' :
  'Check your database documentation for the correct format'
}
\`\`\`

**Common mistakes**:
- ❌ Wrong password
- ❌ Wrong database name
- ❌ Wrong port number
- ❌ Spaces in the URL (there shouldn't be any)

**How to fix**:
1. Get your database password (if you forgot it, you may need to reset it)
2. Make sure the database name matches what you created
3. Check the port (default: ${techStack.database === 'postgresql' ? '5432' : techStack.database === 'mongodb' ? '27017' : techStack.database === 'mysql' ? '3306' : 'varies'})

#### Solution 3: Create the database if it doesn't exist

${techStack.database === 'postgresql' ? `
\`\`\`bash
# List all databases
psql -l

# If your database isn't in the list, create it
npm run db:create

# Or manually:
psql -c "CREATE DATABASE ${projectName.toLowerCase().replace(/\s+/g, '_')};"
\`\`\`
` : techStack.database === 'mongodb' ? `
\`\`\`bash
# MongoDB creates databases automatically
# Just make sure MongoDB is running and try again
npm run db:create
\`\`\`
` : `
\`\`\`bash
# Create database
npm run db:create
\`\`\`
`}

#### Solution 4: Fix permissions

${techStack.database === 'postgresql' ? `
\`\`\`bash
# Give your user permission
psql -c "GRANT ALL PRIVILEGES ON DATABASE ${projectName.toLowerCase().replace(/\s+/g, '_')} TO your_username;"
\`\`\`
` : 'Check your database documentation for permission management.'}

---

### "Migration failed" or "Cannot run migrations"

**What this means**: The database structure couldn't be created or updated.

**Solutions**:

#### Solution 1: Reset and try again

\`\`\`bash
# Drop the database (deletes everything!)
npm run db:drop

# Create fresh database
npm run db:create

# Run migrations
npm run db:migrate

# Add sample data
npm run db:seed
\`\`\`

⚠️ **Warning**: \`db:drop\` deletes all your data! Only do this in development.

#### Solution 2: Check migration files

\`\`\`bash
# List migration files
ls -la migrations/

# Make sure they exist and are readable
\`\`\`

If migration files are missing or corrupted, you may need to regenerate them.

---

### "Database is locked" (SQLite only)

**What this means**: Another process is using the database.

**Solution**:
\`\`\`bash
# Stop all running instances
pkill -f "node"

# Remove lock file
rm -f database.sqlite.lock

# Start again
npm run dev
\`\`\`

---

## Installation Issues

### "npm install" fails

#### Error: "EACCES: permission denied"

**What this means**: npm doesn't have permission to install packages.

**Solution**: Fix npm permissions (don't use sudo!)

\`\`\`bash
# Fix npm permissions (recommended way)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'

# Add to your PATH (add this line to ~/.bashrc or ~/.zshrc)
export PATH=~/.npm-global/bin:$PATH

# Reload your shell
source ~/.bashrc  # or source ~/.zshrc

# Try again
npm install
\`\`\`

**More info**: [npm permissions guide](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)

---

#### Error: Network timeout or "unable to connect"

**What this means**: npm can't download packages from the internet.

**Solutions**:

1. **Check your internet connection**

2. **Try a different registry**:
   \`\`\`bash
   npm install --registry=https://registry.npmjs.org
   \`\`\`

3. **Use verbose mode to see what's happening**:
   \`\`\`bash
   npm install --verbose
   \`\`\`

4. **Clear npm cache**:
   \`\`\`bash
   npm cache clean --force
   npm install
   \`\`\`

---

#### Error: "Unsupported engine"

**What this means**: Your Node.js version is too old or too new.

**Solution**: Install the correct Node.js version

\`\`\`bash
# Check your current version
node --version

# This project needs Node.js 18+

# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node 18
nvm install 18
nvm use 18

# Verify
node --version  # Should show v18.x.x

# Try installing again
npm install
\`\`\`

---

## Runtime Errors

### "Port 3000 is already in use"

**What this means**: Another app is already using port 3000.

**Solutions**:

#### Option 1: Stop the other app

\`\`\`bash
# Find what's using port 3000
lsof -i :3000

# You'll see something like:
# COMMAND   PID   USER
# node      1234  you

# Kill that process
kill -9 1234

# Start your app
npm run dev
\`\`\`

#### Option 2: Use a different port

\`\`\`bash
PORT=3001 npm run dev
\`\`\`

Then open http://localhost:3001 instead.

---

### "Cannot find module" or "MODULE_NOT_FOUND"

**What this means**: A required file or package is missing.

**Solutions**:

1. **Reinstall dependencies**:
   \`\`\`bash
   rm -rf node_modules package-lock.json
   npm install
   \`\`\`

2. **Check if the file exists**:
   \`\`\`bash
   # If error says "Cannot find module './src/myfile'"
   ls -la src/myfile.js
   \`\`\`

3. **Check for typos** in import statements

---

### "JWT malformed" or "Invalid token"

**What this means**: Authentication tokens are invalid or expired.

**Solutions**:

1. **Log out and log in again** - this creates a fresh token

2. **Clear browser cookies and try again**

3. **Check your SESSION_SECRET** in \`.env\` - if it changed, all existing sessions are invalid

---

## Payment Issues

${selectedComponents.some(c => c.category === 'payments') ? `

### "No such customer" or "No such payment method" (Stripe)

**What this means**: Stripe can't find the customer or payment method ID.

**Root causes**:
- Using test keys for live data (or vice versa)
- Customer/payment method was deleted
- Wrong Stripe account

**Solutions**:

1. **Check which keys you're using**:
   \`\`\`bash
   cat .env | grep STRIPE
   \`\`\`

2. **For development, use TEST keys** (start with \`sk_test_\` and \`pk_test_\`)

3. **For production, use LIVE keys** (start with \`sk_live_\` and \`pk_live_\`)

4. **Log into Stripe Dashboard** and verify the customer/payment exists

---

### Test payments not working

**Are you using a test card?**

**Valid test cards**:
- Success: \`4242 4242 4242 4242\`
- Declined: \`4000 0000 0000 0002\`
- Requires auth: \`4000 0025 0000 3155\`

**All test cards**:
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

**Check Stripe Dashboard** → "Payments" → "Logs" to see what's happening.

---

### Webhook signature invalid

**What this means**: Stripe webhooks aren't configured correctly.

**Solution**:

1. **Get your webhook signing secret** from Stripe:
   - Go to Stripe Dashboard → Developers → Webhooks
   - Click on your webhook endpoint
   - Copy the "Signing secret"

2. **Add to .env**:
   \`\`\`
   STRIPE_WEBHOOK_SECRET=whsec_...
   \`\`\`

3. **Restart your server**

4. **Test the webhook** from Stripe Dashboard

` : 'See your payment provider documentation for troubleshooting.'}

---

## Authentication Issues

${selectedComponents.some(c => c.category === 'authentication') ? `

### Can't log in (password incorrect)

**Root causes**:
- Wrong password
- Caps Lock is on
- Password was never set properly
- Database issue

**Solutions**:

1. **Try resetting your password** (if you have that feature)

2. **Check if user exists in database**:
   ${techStack.database === 'postgresql' ? `
   \`\`\`bash
   psql ${projectName.toLowerCase().replace(/\s+/g, '_')}
   SELECT email FROM users;
   \`\`\`
   ` : 'Check your database for the user record'}

3. **Create a new test user**:
   \`\`\`bash
   # Many apps have a seed command
   npm run db:seed
   
   # Or use the signup form
   \`\`\`

---

### "Session expired" or "Please log in again"

**What this means**: Your login session has expired or is invalid.

**This is normal** - sessions expire for security.

**Solution**: Just log in again.

**To extend session lifetime** (development only):
\`\`\`javascript
// In your session config
session({
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7  // 7 days instead of default
  }
})
\`\`\`

---

### Email verification not working

**Check these**:

1. **Is email service configured?**
   \`\`\`bash
   cat .env | grep EMAIL
   \`\`\`

2. **Check spam folder** - verification emails often go there

3. **Check application logs** for email sending errors

4. **For development**, you might have a test email catcher running
   - Check http://localhost:1080 (MailHog)
   - Or http://localhost:8025 (MailCatcher)

` : 'See authentication provider documentation for troubleshooting.'}

---

## Getting More Help

### Before asking for help, gather this info:

1. **Error message** (copy the full error, not just "it doesn't work")

2. **What you were trying to do** (step-by-step)

3. **What you expected to happen**

4. **What actually happened**

5. **System info**:
   \`\`\`bash
   # Run these and include output
   node --version
   npm --version
   ${techStack.database === 'postgresql' ? 'psql --version' : techStack.database === 'mongodb' ? 'mongod --version' : 'database --version'}
   \`\`\`

### Where to get help:

- 📚 **Documentation**: Check [docs folder](./docs/)
- ❓ **FAQ**: See [FAQ.md](./FAQ.md)
- 💬 **Community**: [Discord/Forum link](#) (example)
- 🐛 **Bug Report**: [GitHub Issues](https://github.com/yourname/yourproject/issues)
- 📧 **Email**: support@yourproject.com (example)

### How to report a bug:

1. **Check if it's already reported** - search existing issues

2. **Create a new issue** with:
   - Clear title: "Cannot connect to PostgreSQL after fresh install"
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Error messages (in code blocks)
   - System info

3. **Be patient** - maintainers are often volunteers

---

## Logs and Debugging

### View application logs

\`\`\`bash
# Run with verbose logging
DEBUG=* npm run dev

# Or write to file
npm run dev > app.log 2>&1
\`\`\`

### View database logs

${techStack.database === 'postgresql' ? `
\`\`\`bash
# PostgreSQL log location (varies by OS)
# Mac (Homebrew)
tail -f /opt/homebrew/var/log/postgresql@14.log

# Linux
tail -f /var/log/postgresql/postgresql-14-main.log
\`\`\`
` : techStack.database === 'mongodb' ? `
\`\`\`bash
# MongoDB log location (varies by OS)
# Mac (Homebrew)
tail -f /opt/homebrew/var/log/mongodb/mongo.log

# Linux
tail -f /var/log/mongodb/mongod.log
\`\`\`
` : 'Check your database documentation for log locations.'}

### Enable debug mode

Add to \`.env\`:
\`\`\`
DEBUG=true
LOG_LEVEL=debug
\`\`\`

---

**Remember**: Most issues have a simple solution. Work through the checklist, and you'll find it! 💪
`;
};

/**
 * Generate .env.example - Template with detailed explanations
 */
export const generateEnvExample = ({ projectName, techStack, selectedComponents }: DocGenerationOptions): string => {
  const hasAuth = selectedComponents.some(c => c.category === 'authentication');
  const hasStripe = selectedComponents.some(c => c.id === 'stripe-integration');
  const hasPayments = selectedComponents.some(c => c.category === 'payments');
  const hasEmail = selectedComponents.some(c => c.tags?.includes('email') || c.category === 'communication');
  
  return `# Environment Variables Configuration
# This file shows all the configuration options your app needs.
# Copy this file to .env and fill in your actual values.

# ============================================
# DATABASE
# ============================================
# This is how your app connects to the database.
# Format: ${techStack.database === 'postgresql' ? 'postgresql://username:password@host:port/database_name' : techStack.database === 'mongodb' ? 'mongodb://host:port/database_name' : techStack.database === 'mysql' ? 'mysql://username:password@host:port/database_name' : 'database://host:port/database_name'}
#
# For local development:
DATABASE_URL=${techStack.database === 'postgresql' ? 'postgresql://postgres:password@localhost:5432/' + projectName.toLowerCase().replace(/\s+/g, '_') : techStack.database === 'mongodb' ? 'mongodb://localhost:27017/' + projectName.toLowerCase().replace(/\s+/g, '_') : techStack.database === 'mysql' ? 'mysql://root:password@localhost:3306/' + projectName.toLowerCase().replace(/\s+/g, '_') : 'database://localhost/' + projectName.toLowerCase().replace(/\s+/g, '_')}
#
# For production (example):
# DATABASE_URL=postgresql://user:pass@db.example.com:5432/production_db

# ============================================
# APPLICATION
# ============================================
# Port number where the server runs (usually 3000 or 5000)
PORT=3000

# Environment: development, staging, or production
# This changes how errors are displayed and some security settings
NODE_ENV=development

# URL where your frontend is running (used for CORS and redirects)
FRONTEND_URL=http://localhost:3000

# Backend API URL (if separate from frontend)
BACKEND_URL=http://localhost:5000

# ============================================
# SECURITY
# ============================================
${hasAuth ? `# Session secret for encrypting user sessions
# IMPORTANT: Make this a long, random string (32+ characters)
# Generate one at: https://randomkeygen.com/ 
# Or run: openssl rand -base64 32
# NEVER share this or commit it to version control!
SESSION_SECRET=your-super-secret-session-key-change-this-in-production

# JWT secret for token authentication (if using JWT)
# Generate the same way as SESSION_SECRET
JWT_SECRET=your-jwt-secret-change-this-in-production

# How long sessions last (in milliseconds)
# Default: 7 days = 1000 * 60 * 60 * 24 * 7
SESSION_MAX_AGE=604800000
` : ''}
${hasStripe ? `
# ============================================
# STRIPE PAYMENT PROCESSING
# ============================================
# Get these from: https://dashboard.stripe.com/apikeys
#
# For DEVELOPMENT, use TEST keys (they start with sk_test_ and pk_test_)
# These let you test payments without spending real money!
# Test card: 4242 4242 4242 4242 (any expiry, any CVC)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# For PRODUCTION, use LIVE keys (they start with sk_live_ and pk_live_)
# ONLY use these when you're ready to accept real payments!
# STRIPE_SECRET_KEY=sk_live_your_live_key_here
# STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key_here

# Webhook secret for verifying Stripe webhooks
# Get this from: Dashboard → Developers → Webhooks → [Your endpoint] → Signing secret
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Stripe pricing/product IDs (from Stripe Dashboard → Products)
STRIPE_PRICE_ID_BASIC=price_xxxxx
STRIPE_PRICE_ID_PRO=price_xxxxx
STRIPE_PRICE_ID_PREMIUM=price_xxxxx
` : hasPayments ? `
# ============================================
# PAYMENT PROCESSING
# ============================================
# Add your payment provider credentials here
# Check your payment provider's documentation for what values you need
PAYMENT_API_KEY=your_payment_api_key_here
PAYMENT_SECRET=your_payment_secret_here
` : ''}
${hasEmail ? `
# ============================================
# EMAIL SERVICE
# ============================================
# Email service for sending transactional emails (signup, password reset, etc.)
#
# Using SendGrid? Get API key from: https://app.sendgrid.com/settings/api_keys
# Using Mailgun? Get API key from: https://app.mailgun.com/app/account/security/api_keys
# Using AWS SES? Get credentials from AWS Console
#
EMAIL_SERVICE=sendgrid
EMAIL_API_KEY=your_email_api_key_here
EMAIL_FROM=noreply@${projectName.toLowerCase().replace(/\s+/g, '-')}.com
EMAIL_FROM_NAME=${projectName}

# For development, you can use a test email service like Mailtrap:
# EMAIL_SERVICE=mailtrap
# MAILTRAP_USER=your_mailtrap_user
# MAILTRAP_PASS=your_mailtrap_pass
` : ''}
# ============================================
# REDIS (Optional - for caching and sessions)
# ============================================
# If you're using Redis for caching or session storage
# Format: redis://username:password@host:port
# For local development:
# REDIS_URL=redis://localhost:6379
#
# For production (example):
# REDIS_URL=redis://:password@redis.example.com:6379

# ============================================
# FILE STORAGE (Optional)
# ============================================
# If you need to store user-uploaded files
#
# Using AWS S3:
# AWS_ACCESS_KEY_ID=your_aws_access_key
# AWS_SECRET_ACCESS_KEY=your_aws_secret_key
# AWS_S3_BUCKET=your-bucket-name
# AWS_REGION=us-east-1
#
# Using Cloudinary:
# CLOUDINARY_CLOUD_NAME=your_cloud_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret

# ============================================
# ANALYTICS (Optional)
# ============================================
# Google Analytics tracking ID
# GA_TRACKING_ID=G-XXXXXXXXXX
#
# Mixpanel project token
# MIXPANEL_TOKEN=your_token_here

# ============================================
# THIRD-PARTY INTEGRATIONS (Optional)
# ============================================
# Add API keys for any third-party services you use
# Examples:
# GOOGLE_MAPS_API_KEY=your_key_here
# TWILIO_ACCOUNT_SID=your_sid_here
# TWILIO_AUTH_TOKEN=your_token_here
# SENDGRID_API_KEY=your_key_here

# ============================================
# LOGGING & MONITORING (Optional)
# ============================================
# Log level: error, warn, info, debug
LOG_LEVEL=info

# Sentry for error tracking (get DSN from: https://sentry.io)
# SENTRY_DSN=https://xxxxx@sentry.io/xxxxx

# ============================================
# FEATURE FLAGS (Optional)
# ============================================
# Toggle features on/off without code changes
FEATURE_SOCIAL_LOGIN=true
FEATURE_DARK_MODE=true
FEATURE_ANALYTICS=true

# ============================================
# DEVELOPMENT TOOLS (Development only)
# ============================================
# Enable debug mode (more verbose logging)
DEBUG=false

# Auto-reload on file changes (usually handled by dev server)
WATCH_MODE=true

# Show detailed error pages (disable in production!)
SHOW_ERROR_DETAILS=true

# ============================================
# PRODUCTION SETTINGS
# ============================================
# When deploying to production, make sure to:
# 1. Change all secrets (SESSION_SECRET, JWT_SECRET, etc.)
# 2. Use production database URL
# 3. Use live API keys (Stripe, email service, etc.)
# 4. Set NODE_ENV=production
# 5. Disable DEBUG mode
# 6. Enable SSL/HTTPS
# 7. Set up monitoring (Sentry, LogRocket, etc.)

# SSL/TLS settings (production)
# FORCE_HTTPS=true
# SSL_CERT_PATH=/path/to/cert.pem
# SSL_KEY_PATH=/path/to/key.pem

# CORS settings (adjust for your frontend domain)
# CORS_ORIGIN=https://yourapp.com

# Rate limiting (protect against abuse)
# RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
# RATE_LIMIT_MAX_REQUESTS=100  # 100 requests per window
`;
};

/**
 * Generate FAQ.md - Frequently asked questions
 */
export const generateFAQ = ({ projectName, techStack, selectedComponents }: DocGenerationOptions): string => {
  const hasAuth = selectedComponents.some(c => c.category === 'authentication');
  const hasPayments = selectedComponents.some(c => c.category === 'payments');
  const hasApi = selectedComponents.some(c => c.category === 'api');
  
  return `# Frequently Asked Questions (FAQ)

Got questions? We've got answers! Here are the most common questions people ask.

**Can't find your question?** Check the [full documentation](./docs/) or [ask us](#where-to-get-help).

---

## General Questions

### What is ${projectName}?

${projectName} is a ${techStack.frontend}-based application with ${selectedComponents.length} pre-built components. It's designed to help you launch your project quickly with production-ready features.

**Think of it as**: A starter kit with all the common features already built, so you can focus on what makes your project unique.

---

### Do I need to know how to code?

**Yes, some coding knowledge is helpful**, but we make it as beginner-friendly as possible.

**What you should know**:
- Basic ${techStack.frontend} (or willingness to learn)
- ${techStack.backend} fundamentals
- How to use a terminal/command line
- Basic Git knowledge

**Don't know these yet?** Check out:
- [${techStack.frontend} Tutorial](https://example.com) (external resource)
- [${techStack.backend} Basics](https://example.com) (external resource)
- [Command Line Basics](https://example.com) (external resource)

---

### Is this free?

**Yes!** This codebase is open source and free to use for your projects.

Some optional services may cost money:
${hasPayments ? '- Stripe charges fees for payment processing (usually 2.9% + $0.30 per transaction)' : ''}
- Hosting providers charge for servers (many have free tiers!)
- Some APIs may have usage costs

But the code itself is 100% free.

---

### Can I use this for commercial projects?

**Yes!** You can use this code to build commercial applications, SaaS products, client projects, etc.

Just check the [LICENSE](../LICENSE) file for the specific terms.

---

## Setup & Installation

### How long does setup take?

**Quick start**: 5 minutes (if everything works perfectly)
**Realistic**: 15-20 minutes (including configuring services)
**First time**: 30-45 minutes (if you're learning as you go)

---

### What do I need installed on my computer?

**Required**:
- Node.js 18 or newer
- ${techStack.database} database
- Git

**Optional but helpful**:
- Code editor (VS Code recommended)
- ${hasApi ? 'API testing tool (Postman or Insomnia)' : ''}

See [SETUP.md](./SETUP.md#what-you-need) for detailed installation instructions.

---

### Can I use a different database?

The project is configured for **${techStack.database}**, but you can switch to another database if you're comfortable with:
1. Updating the database connection code
2. Modifying the schemas for the new database
3. Adjusting queries for database-specific syntax

**Is it worth it?** Usually not - ${techStack.database} is chosen for good reasons. But if you have a strong preference or existing infrastructure, you can make it work.

---

### Do I need to use all the components?

**No!** You can disable or remove components you don't need.

**To disable a component**:
1. Don't configure its environment variables
2. Comment out its routes in your router
3. Remove its pages from the UI

**To completely remove a component**:
1. Delete its files from \`src/components/[component-name]\`
2. Remove related routes
3. Remove from database migrations (if applicable)
4. Update documentation

---

## Development

### How do I add new features?

1. **Read the architecture docs** first: [ARCHITECTURE.md](./ARCHITECTURE.md)
2. **Follow existing patterns** - look at similar components
3. **Test as you build** - don't wait until the end
4. **Update documentation** - future you will thank you!

See [DEVELOPMENT.md](./DEVELOPMENT.md) for detailed guidance.

---

### Can I change the styling?

**Yes!** The project uses ${techStack.frontend === 'react' ? 'CSS/Styled Components/Tailwind' : 'styling framework'}.

**To customize**:
- Edit theme variables in \`src/styles/theme\`
- Modify component styles in their respective files
- Add your own CSS/styling

**Recommended**: Keep a consistent design system for a professional look.

---

### How do I debug errors?

1. **Read the error message** - it usually tells you what's wrong
2. **Check the console** - browser console (F12) or terminal
3. **Use debug mode**: Add \`DEBUG=true\` to \`.env\`
4. **Check logs**: \`npm run dev\` shows real-time logs
5. **Use debugger**: Add \`debugger;\` statements in your code

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common errors and solutions.

---

${hasAuth ? `## Authentication

### How does authentication work?

**In simple terms**:
1. User enters email/password
2. Server checks if they're correct
3. Server creates a "session" (remember who they are)
4. Session is saved in a cookie in the browser
5. Every request includes that cookie
6. Server checks the cookie to know who you are

**Security features**:
- Passwords are hashed (encrypted, not stored as plain text)
- Sessions expire after inactivity
- HTTPS encrypts all data in transit
- CSRF protection prevents attacks

---

### How do I add new user roles?

1. **Add role to database** schema (e.g., add 'admin', 'moderator' to roles table)
2. **Update authentication** to check roles
3. **Add permission checks** to routes/components
4. **Update UI** to show/hide based on role

Example:
\`\`\`javascript
// Check if user is admin
if (req.user.role === 'admin') {
  // Show admin features
}
\`\`\`

---

### Can users reset their password?

${selectedComponents.some(c => c.id === 'basic-auth') ? 'Yes! The password reset flow is already built in.' : 'You\'ll need to add this feature yourself.'}

**How it works**:
1. User clicks "Forgot Password"
2. Enters their email
3. Receives email with reset link
4. Clicks link, sets new password
5. Can log in with new password

---

### How do I add social login (Google, Facebook, etc.)?

Check the [OAuth Integration Guide](./components/authentication/oauth-integration.md) (if available).

**Quick overview**:
1. Create OAuth app with provider (Google, Facebook, etc.)
2. Get Client ID and Client Secret
3. Add to \`.env\`
4. Configure OAuth strategy
5. Add login buttons to UI

---
` : ''}

${hasPayments ? `## Payments

### Are test payments real?

**No!** When using test keys (starting with \`sk_test_\`), no real money changes hands.

**Test cards**:
- **Success**: \`4242 4242 4242 4242\`
- **Declined**: \`4000 0000 0000 0002\`
- Any future expiry, any CVC

**You can test freely** without worrying about charges!

---

### When should I switch to live mode?

**Switch to live mode when**:
- ✅ You've thoroughly tested everything
- ✅ Your app is secure (HTTPS, input validation, etc.)
- ✅ You've set up proper error handling
- ✅ You understand Stripe's terms and your tax obligations
- ✅ You're ready to receive real money

**Don't switch before**:
- ❌ Just to "see if it works"
- ❌ Your app is still in development
- ❌ You haven't tested thoroughly

---

### How do refunds work?

**Stripe handles refunds** - you can issue them from:
1. **Stripe Dashboard** → Payments → [Select payment] → Refund
2. **Your app** (if you built refund functionality)
3. **API** (programmatically)

**Refund timeline**:
- Processed immediately in Stripe
- Takes 5-10 business days to appear in customer's bank

**Fees**: Stripe fees are not refunded.

---

### How do I handle failed payments?

**Failed payments are caught by webhooks**. When a payment fails:
1. Stripe sends a webhook to your server
2. Your server handles it (cancel subscription, notify user, etc.)
3. User is notified via email
4. They can update payment method and retry

See [Stripe Webhook Guide](./components/payments/stripe-webhooks.md) for details.

---
` : ''}

${hasApi ? `## API

### Is there API documentation?

**Yes!** Check [API Documentation](./api/) for:
- All endpoints
- Request/response formats
- Authentication requirements
- Example requests

---

### How do I test API endpoints?

**Option 1: Use Postman or Insomnia**
1. Download [Postman](https://postman.com) or [Insomnia](https://insomnia.rest)
2. Import the API collection (if provided)
3. Set base URL to \`http://localhost:3000\`
4. Send requests!

**Option 2: Use curl**
\`\`\`bash
curl http://localhost:3000/api/endpoint
\`\`\`

**Option 3: Use your browser**
For GET requests, just visit the URL

---

### How do I secure API endpoints?

**Authentication methods included**:
- Session-based (cookies)
- JWT tokens
- API keys

**Best practices**:
- Always validate input
- Use HTTPS in production
- Implement rate limiting
- Check permissions for each endpoint
- Never trust client-side validation alone

---

### Can others use my API?

**If you want them to**, yes!

**To allow external access**:
1. Set up CORS (Cross-Origin Resource Sharing)
2. Provide API keys for authentication
3. Document your API
4. Consider rate limiting
5. Monitor usage

**To restrict access**:
- Only allow your own frontend domain in CORS
- Require authentication for all endpoints
- Don't document the API publicly

---
` : ''}

## Deployment

### How do I deploy this to production?

See the detailed [Deployment Guide](./DEPLOYMENT.md).

**Quick overview**:
1. Choose hosting provider (Vercel, Netlify, Heroku, AWS, etc.)
2. Set up production database
3. Configure environment variables
4. Set up CI/CD (optional but recommended)
5. Deploy!

**Recommended for beginners**:
- **Frontend**: Vercel or Netlify (very easy, free tier)
- **Backend**: Heroku or Railway (simple, free tier)
- **Database**: Supabase or PlanetScale (managed, free tier)

---

### How much does hosting cost?

**Free tier options** (great for starting out):
- **Vercel**: Free for personal projects
- **Netlify**: Free for personal projects  
- **Heroku**: $5-7/month for hobby dynos
- **Railway**: $5/month free credit
- **Supabase**: Free up to 500MB database

**As you scale** (thousands of users):
- $20-100/month for most small-medium apps
- Costs scale with usage

**Check each provider's pricing** for exact details.

---

### Do I need a domain name?

**Not required**, but **highly recommended** for professional projects.

**Without domain**: You'll use a subdomain like \`yourapp.vercel.app\`
**With domain**: You can use \`yourapp.com\`

**Domain costs**: $10-15/year from providers like Namecheap, Google Domains, etc.

---

## Performance & Scaling

### How many users can this handle?

**Depends on**:
- Your hosting plan
- Database capacity
- How optimized your code is
- What users are doing

**Typical capacity**:
- **Basic free tier**: 100-1,000 daily users
- **$20-50/month hosting**: 10,000-50,000 daily users
- **$100-500/month hosting**: 100,000+ daily users

**The app is built to scale** - you can start small and upgrade as you grow.

---

### How do I make it faster?

**Quick wins**:
1. **Enable caching** - Redis for session/data caching
2. **Optimize images** - compress and lazy load
3. **Use a CDN** - serve static files from edge locations
4. **Minimize bundle size** - remove unused code
5. **Database indexes** - speed up queries

See [Performance Guide](./PERFORMANCE.md) (if available) for detailed optimizations.

---

## Security

### Is this secure?

**Yes, if configured correctly!** Security features included:
- Password hashing
- Session encryption
- CSRF protection
- SQL injection prevention
- XSS protection

**Your responsibility**:
- Keep dependencies updated (\`npm audit\`)
- Use HTTPS in production
- Protect environment variables
- Follow security best practices
- Monitor for vulnerabilities

---

### How do I protect against hackers?

**Built-in protections**:
- Input validation and sanitization
- Parameterized database queries
- Rate limiting (prevents brute force)
- Secure headers

**Best practices**:
- Use strong secrets in \`.env\`
- Keep software updated
- Monitor error logs
- Use WAF (Web Application Firewall) in production
- Regular security audits

---

## Where to Get Help

### I'm stuck. Where can I get help?

**Quick fixes first**: Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

**Documentation**: Browse the [docs folder](./docs/)

**Community**:
- [Discord](#) (fastest response) (example link)
- [GitHub Discussions](#) (example link)
- [Stack Overflow](#) (tag: ${projectName.toLowerCase()}) (example link)

**Bug reports**: [GitHub Issues](https://github.com/yourname/yourproject/issues)

---

### How do I report a bug?

1. **Check if it's already reported** - search existing issues
2. **Try to reproduce it** - make sure it's consistent
3. **Gather info**:
   - What you were doing
   - What you expected
   - What actually happened  
   - Error messages
   - Your environment (OS, Node version, etc.)
4. **Create issue** on GitHub with all details
5. **Be patient** - maintainers will respond!

---

### Can I contribute?

**Yes! Contributions welcome!**

**Ways to contribute**:
- Report bugs
- Suggest features
- Improve documentation
- Fix bugs (submit PR)
- Add features (submit PR)

See [CONTRIBUTING.md](../CONTRIBUTING.md) (if available) for guidelines.

---

## License & Legal

### Can I modify the code?

**Yes!** That's the whole point. You can:
- Modify for your needs
- Add new features
- Remove features you don't want
- Rebrand it completely

Just respect the license terms (see [LICENSE](../LICENSE)).

---

### Do I need to give credit?

**Check the LICENSE file** for specific requirements.

Generally:
- **MIT License**: No, but it's nice!
- **GPL License**: Yes, and you must open-source modifications
- **Apache License**: Keep copyright notices

---

**Still have questions?** Don't hesitate to ask! We're here to help you succeed. 🚀
`;
};

/**
 * Generate ARCHITECTURE.md - System design overview
 */
export const generateArchitecture = ({ projectName, techStack, selectedComponents }: DocGenerationOptions): string => {
  const hasAuth = selectedComponents.some(c => c.category === 'authentication');
  const hasPayments = selectedComponents.some(c => c.category === 'payments');
  const hasApi = selectedComponents.some(c => c.category === 'api');
  const hasDashboard = selectedComponents.some(c => c.category === 'dashboard');
  
  return `# Architecture Overview

**For non-technical readers**: This document explains how ${projectName} is built and how all the pieces work together. Think of it as a blueprint for the house before you start building.

**For developers**: System architecture, component relationships, data flow, and technical decisions.

---

## High-Level Overview

### What Does This App Do?

${projectName} is a ${techStack.frontend} application that helps users ${selectedComponents[0]?.description || 'accomplish their goals'}.

**In simple terms**: 
- Users visit a website
- They ${hasAuth ? 'create an account and log in' : 'interact with the app'}
- ${hasDashboard ? 'They see a dashboard with their information' : 'They use the features'}
- ${hasPayments ? 'They can make payments for premium features' : 'They use free features'}
- All their data is saved securely

---

## System Architecture Diagram

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                         Users                                │
│                     (Web Browsers)                           │
└────────────┬────────────────────────────┬───────────────────┘
             │                            │
             │ HTTP/HTTPS                 │ WebSocket (if needed)
             │                            │
┌────────────▼────────────────────────────▼───────────────────┐
│                     ${techStack.frontend} Frontend                          │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐       │
│  │   Pages     │  │  Components  │  │    State    │       │
│  │  (Routes)   │  │     (UI)     │  │ Management  │       │
│  └─────────────┘  └──────────────┘  └─────────────┘       │
└────────────┬────────────────────────────────────────────────┘
             │
             │ REST API / GraphQL
             │
┌────────────▼────────────────────────────────────────────────┐
│                  ${techStack.backend} Backend                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   API    │  │ Business │  │  Auth    │  │ Services │   │
│  │  Routes  │  │  Logic   │  │ Middleware│ │  Layer   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└────────────┬────────────────────────────────────────────────┘
             │
             │ Database Queries
             │
┌────────────▼────────────────────────────────────────────────┐
│                ${techStack.database} Database                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Users   │  │  Posts   │  │ Sessions │  │   ...    │   │
│  │  Table   │  │  Table   │  │  Table   │  │  Tables  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
             │
             │ (External APIs)
             │
┌────────────▼────────────────────────────────────────────────┐
│                  External Services                           │
${hasPayments ? '│  • Stripe (Payments)                                        │' : ''}
│  • Email Service${hasAuth ? ' (Password reset, verification)' : ''}                    │
│  • File Storage (if applicable)                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## Tech Stack Explained

### Frontend: ${techStack.frontend}

**What it is**: The part users see and interact with in their web browser.

**Why ${techStack.frontend}**: 
${techStack.frontend === 'react' ? 
  '- Most popular JavaScript framework\n- Huge ecosystem and community\n- Component-based (reusable pieces)\n- Fast rendering with Virtual DOM' :
  techStack.frontend === 'vue' ?
  '- Beginner-friendly and intuitive\n- Progressive framework (use as much/little as you want)\n- Great documentation\n- Fast and lightweight' :
  techStack.frontend === 'nextjs' ?
  '- Built on React with extra features\n- Server-side rendering (faster initial load)\n- Great for SEO\n- API routes built-in' :
  'A modern, powerful framework for building user interfaces'
}

**Key libraries**:
- Routing: Navigating between pages
- State management: Sharing data between components
- UI components: Pre-built interface elements
- API client: Talking to the backend

---

### Backend: ${techStack.backend}

**What it is**: The server that handles business logic, database access, and API endpoints.

**Why ${techStack.backend}**:
${techStack.backend === 'nodejs' ?
  '- JavaScript everywhere (same language as frontend)\n- Fast and scalable\n- Huge npm ecosystem\n- Great for real-time features' :
  techStack.backend === 'python' ?
  '- Clean, readable code\n- Great for data processing\n- Extensive libraries\n- Popular in industry' :
  techStack.backend === 'go' ?
  '- Extremely fast\n- Built-in concurrency\n- Compiled (no runtime issues)\n- Great for high-performance apps' :
  'A proven, scalable backend technology'
}

**Key features**:
- RESTful API endpoints
- Authentication middleware
- Database connection management
- Business logic processing
- Error handling

---

### Database: ${techStack.database}

**What it is**: Where all your data is permanently stored.

**Why ${techStack.database}**:
${techStack.database === 'postgresql' ?
  '- Most advanced open-source database\n- ACID compliant (reliable transactions)\n- Powerful query features\n- Great for complex data' :
  techStack.database === 'mongodb' ?
  '- Flexible schema (no rigid structure)\n- Great for documents/JSON data\n- Horizontally scalable\n- Fast for reads' :
  techStack.database === 'mysql' ?
  '- Most popular open-source database\n- Battle-tested and reliable\n- Great documentation\n- Wide hosting support' :
  'A reliable, scalable database system'
}

**What's stored**:
${hasAuth ? '- User accounts and profiles' : ''}
${hasDashboard ? '- User data and preferences' : ''}
${hasPayments ? '- Subscription and payment records' : ''}
- Application data
- Session information
- Logs and analytics

---

## Component Architecture

### ${selectedComponents.length} Main Components

${selectedComponents.map((component, index) => `
#### ${index + 1}. ${component.name}
**Purpose**: ${component.description}

**Where it lives**: 
- Frontend: \`src/components/${component.category}/${component.id}\`
- Backend: \`src/api/${component.id}\`
- Database: \`migrations/xxx_create_${component.id}.sql\`

**Dependencies**: ${component.dependencies.length > 0 ? component.dependencies.join(', ') : 'None - standalone component'}

**Related components**: ${component.recommendedWith.length > 0 ? component.recommendedWith.join(', ') : 'Works independently'}
`).join('\n')}

---

## Data Flow

### How Data Moves Through the System

#### Example: ${hasAuth ? 'User Login' : 'Typical Request'}

${hasAuth ? `
**Step-by-step**:

1. **User enters email/password** on login page
   - Frontend: \`LoginForm.${techStack.frontend === 'react' ? 'jsx' : 'vue'}\`

2. **Frontend sends POST request** to \`/api/auth/login\`
   - Includes: email, password
   - Method: POST with JSON body

3. **Backend receives request** at login endpoint
   - File: \`api/auth/login.${techStack.backend === 'nodejs' ? 'js' : techStack.backend === 'python' ? 'py' : 'go'}\`

4. **Backend checks database** for user
   - Query: \`SELECT * FROM users WHERE email = ?\`
   - Database: ${techStack.database}

5. **Backend verifies password** using bcrypt
   - Compares hashed password with stored hash

6. **If correct**: Backend creates session
   - Generates session token
   - Stores in database or Redis
   - Returns token to frontend

7. **Frontend stores token** in cookie/localStorage
   - All future requests include this token

8. **User is redirected** to dashboard
   - Frontend: \`Dashboard.${techStack.frontend === 'react' ? 'jsx' : 'vue'}\`

**Data flow diagram**:
\`\`\`
User Input → Frontend → API Request → Backend → Database
                ↑                                    ↓
                ←─── Response ←─── Process ←────────┘
\`\`\`
` : `
1. User interacts with UI
2. Frontend sends API request
3. Backend processes request
4. Database returns data
5. Backend formats response
6. Frontend updates UI
7. User sees result
`}

---

## Security Architecture

### How We Keep Data Safe

#### 1. Authentication
${hasAuth ? `
- **Passwords**: Hashed with bcrypt (never stored as plain text)
- **Sessions**: Encrypted and stored securely
- **Tokens**: JWT with expiration (if using token auth)
- **Multi-factor**: Optional 2FA support
` : 'Authentication system ready to be implemented'}

#### 2. Authorization
- **Role-based access**: Users have different permission levels
- **Route protection**: Middleware checks permissions before allowing access
- **API security**: Every endpoint validates user permissions

#### 3. Data Protection
- **HTTPS**: All data encrypted in transit (production)
- **SQL Injection**: Parameterized queries prevent attacks
- **XSS Protection**: Input sanitization and Content Security Policy
- **CSRF Protection**: Tokens verify request authenticity

#### 4. Input Validation
- **Frontend validation**: Immediate feedback to users
- **Backend validation**: Never trust client-side validation
- **Type checking**: ${techStack.backend === 'nodejs' ? 'TypeScript' : 'Type validation'} ensures data integrity
- **Sanitization**: Strip dangerous characters from input

---

## Scalability

### How the App Grows With You

#### Current Capacity (Default Setup)
- **Users**: 100-1,000 concurrent users
- **Requests**: 10-100 requests/second
- **Data**: Several GB of data
- **Storage**: Depends on hosting plan

#### Scaling Strategies

**Vertical Scaling** (easier, costs more):
- Upgrade to bigger server
- More CPU, RAM, storage
- Works up to a point

**Horizontal Scaling** (harder, more efficient):
- Add more servers
- Load balancer distributes traffic
- Database read replicas
- CDN for static files

**Optimization**:
- Caching with Redis
- Database indexing
- Code optimization
- Asset minification

---

## Development Workflow

### How Code Gets from Your Computer to Production

\`\`\`
1. Developer writes code
   ↓
2. Commit to Git
   ↓
3. Push to GitHub
   ↓
4. CI/CD pipeline runs (optional)
   - Runs tests
   - Checks code quality
   - Builds app
   ↓
5. If tests pass: Deploy to staging
   ↓
6. Manual testing on staging
   ↓
7. Approve and deploy to production
   ↓
8. Users see new features!
\`\`\`

---

## File Structure

\`\`\`
${projectName.toLowerCase().replace(/\s+/g, '-')}/
├── src/
│   ├── frontend/                  # ${techStack.frontend} application
│   │   ├── components/            # Reusable UI components
│   │   │   ${selectedComponents.map(c => `├── ${c.category}/         # ${c.name}`).join('\n│   │   │   ')}
│   │   ├── pages/                 # Page-level components
│   │   ├── hooks/                 # Custom hooks (React)
│   │   ├── utils/                 # Helper functions
│   │   ├── styles/                # CSS/styling
│   │   └── App.${techStack.frontend === 'react' ? 'jsx' : 'vue'}                # Main app component
│   │
│   ├── backend/                   # ${techStack.backend} server
│   │   ├── api/                   # API endpoints
│   │   │   ${selectedComponents.map(c => `├── ${c.id}.${techStack.backend === 'nodejs' ? 'js' : techStack.backend === 'python' ? 'py' : 'go'}      # ${c.name} API`).join('\n│   │   │   ')}
│   │   ├── middleware/            # Express middleware
│   │   ├── models/                # Database models
│   │   ├── services/              # Business logic
│   │   ├── utils/                 # Helper functions
│   │   └── server.${techStack.backend === 'nodejs' ? 'js' : techStack.backend === 'python' ? 'py' : 'go'}              # Server entry point
│   │
│   └── shared/                    # Code used by both frontend and backend
│       ├── types/                 # TypeScript types
│       └── constants/             # Shared constants
│
├── database/
│   ├── migrations/                # Database schema changes
│   ├── seeds/                     # Sample data
│   └── schema.sql                 # Database schema
│
├── tests/
│   ├── unit/                      # Unit tests
│   ├── integration/               # Integration tests
│   └── e2e/                       # End-to-end tests
│
├── docs/                          # Documentation (you are here!)
├── .env.example                   # Environment variable template
├── .gitignore                     # Files to ignore in git
├── package.json                   # Dependencies and scripts
└── README.md                      # Getting started guide
\`\`\`

---

## API Design

${hasApi ? `
### RESTful API Principles

**Base URL**: \`http://localhost:3000/api\`

**Endpoint structure**:
\`\`\`
GET    /api/resource        # Get all items
GET    /api/resource/:id    # Get specific item
POST   /api/resource        # Create new item
PUT    /api/resource/:id    # Update item
PATCH  /api/resource/:id    # Partial update
DELETE /api/resource/:id    # Delete item
\`\`\`

**Response format**:
\`\`\`json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "timestamp": "2024-10-15T12:00:00Z"
}
\`\`\`

**Error format**:
\`\`\`json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "field": "email"
  },
  "timestamp": "2024-10-15T12:00:00Z"
}
\`\`\`
` : 'API design guidelines to be added when API component is included'}

---

## Database Schema

### Main Tables

${hasAuth ? `
**users**
\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`
` : ''}

${hasDashboard ? `
**user_profiles**
\`\`\`sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  bio TEXT,
  avatar_url VARCHAR(500),
  preferences JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`
` : ''}

${hasPayments ? `
**subscriptions**
\`\`\`sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  plan VARCHAR(50),
  status VARCHAR(50),
  stripe_subscription_id VARCHAR(255),
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`
` : ''}

**See individual component documentation** for complete schema details.

---

## Testing Strategy

### Test Pyramid

\`\`\`
          /\\
         /  \\  E2E Tests (few)
        /────\\
       /      \\  Integration Tests (some)
      /────────\\
     /          \\  Unit Tests (many)
    /____________\\
\`\`\`

**Unit Tests**: Test individual functions
- Fast to run
- Easy to write
- Catch logic errors

**Integration Tests**: Test components working together
- Test API endpoints
- Test database operations
- Catch integration issues

**E2E Tests**: Test entire user flows
- Simulate real user behavior
- Test complete features
- Catch UI/UX issues

---

## Performance Considerations

### Optimization Strategies

1. **Database**
   - Proper indexing on frequently queried columns
   - Connection pooling
   - Query optimization
   - Regular VACUUM (PostgreSQL)

2. **Backend**
   - Caching with Redis
   - Rate limiting to prevent abuse
   - Async operations where possible
   - Efficient algorithms

3. **Frontend**
   - Code splitting (lazy loading)
   - Image optimization
   - Minimize bundle size
   - Use CDN for static assets

4. **Network**
   - Compression (gzip/brotli)
   - HTTP/2
   - Fewer API calls (batch when possible)
   - Pagination for large lists

---

## Deployment Architecture

### Production Setup

\`\`\`
┌─────────────────┐
│   Cloudflare    │  CDN + DDoS Protection
│   (or similar)  │
└────────┬────────┘
         │
┌────────▼────────┐
│  Load Balancer  │  Distribute traffic
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼──┐  ┌──▼───┐
│ App  │  │ App  │  Multiple instances
│Server│  │Server│  for redundancy
└───┬──┘  └──┬───┘
    │        │
    └───┬────┘
        │
┌───────▼───────┐
│   Database    │  Primary + Read replicas
│   (Managed)   │
└───────────────┘
\`\`\`

---

## Monitoring & Observability

### What We Track

- **Application Metrics**: Response times, error rates, throughput
- **Server Metrics**: CPU, memory, disk usage
- **Database Metrics**: Query performance, connection pool
- **Business Metrics**: User signups, conversions, revenue

### Tools (examples)
- Error tracking: Sentry
- APM: New Relic or DataDog
- Logs: LogRocket or CloudWatch
- Uptime monitoring: UptimeRobot

---

## Future Considerations

### Potential Improvements

- **Microservices**: Split into smaller services as app grows
- **Message Queue**: Add RabbitMQ or Kafka for async processing
- **GraphQL**: Consider GraphQL for flexible data fetching
- **WebSockets**: Add real-time features
- **Mobile App**: Native mobile apps with shared backend
- **Internationalization**: Support multiple languages
- **Advanced Analytics**: Add analytics dashboard

---

## Learn More

- **Component Guides**: [docs/components/](./components/) - Deep dive into each component
- **API Documentation**: [docs/api/](./api/) - Complete API reference
- **Development Guide**: [DEVELOPMENT.md](./DEVELOPMENT.md) - How to build features
- **Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md) - How to deploy

---

**Questions about architecture?** Open an issue or ask in our community! We're happy to explain in more detail.
`;
};

// Export all generators
export {
  DocGenerationOptions
};
