/**
 * Documentation Validation Utility
 * Ensures generated documentation meets quality standards and passes the "10-year-old test"
 */

export interface ValidationResult {
  isValid: boolean;
  score: number; // 0-100
  errors: ValidationError[];
  warnings: ValidationWarning[];
  metrics: ValidationMetrics;
}

export interface ValidationError {
  file: string;
  type: 'missing_file' | 'empty_content' | 'broken_link' | 'missing_explanation' | 'no_success_indicator';
  message: string;
  severity: 'critical' | 'high' | 'medium';
}

export interface ValidationWarning {
  file: string;
  type: 'jargon' | 'long_paragraph' | 'missing_example' | 'passive_voice';
  message: string;
  suggestion: string;
}

export interface ValidationMetrics {
  clarity: number; // 0-25
  completeness: number; // 0-25
  verifiability: number; // 0-20
  examples: number; // 0-15
  organization: number; // 0-15
}

/**
 * Required core documentation files
 */
const REQUIRED_FILES = [
  '/README.md',
  '/SETUP.md',
  '/TROUBLESHOOTING.md',
  '/ARCHITECTURE.md',
  '/FAQ.md',
  '/.env.example'
];

/**
 * Technical terms that should be explained (add more as needed)
 */
const TECHNICAL_TERMS = [
  'API', 'endpoint', 'authentication', 'authorization', 'JWT', 'token',
  'database', 'migration', 'schema', 'query', 'ORM', 'REST', 'GraphQL',
  'frontend', 'backend', 'server', 'client', 'HTTP', 'HTTPS', 'SSL',
  'CORS', 'CSRF', 'XSS', 'SQL injection', 'hashing', 'encryption',
  'middleware', 'webhook', 'CDN', 'DNS', 'deployment', 'production',
  'staging', 'environment variable', 'session', 'cookie', 'cache'
];

/**
 * Patterns that indicate success indicators are present
 */
const SUCCESS_INDICATOR_PATTERNS = [
  /✅\s*(?:Success|You should see)/i,
  /✅\s*\*\*Success\*\*/i,
  /should see\s+["']?[^"'\n]+["']?/i,
  /you should now have/i,
];

/**
 * Patterns that indicate troubleshooting information
 */
const TROUBLESHOOTING_PATTERNS = [
  /❌.*(?:Error|Problem|Issue)/i,
  /\*\*(?:If|When)\s+you\s+see.*error\*\*/i,
  /Common\s+(?:issues|errors|problems)/i,
  /Troubleshooting/i,
];

/**
 * Validate generated documentation
 */
export const validateDocumentation = (docs: { [path: string]: string }): ValidationResult => {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  
  // Check for required files
  REQUIRED_FILES.forEach(file => {
    if (!docs[file]) {
      errors.push({
        file,
        type: 'missing_file',
        message: `Required file ${file} is missing`,
        severity: 'critical'
      });
    } else if (docs[file].trim().length === 0) {
      errors.push({
        file,
        type: 'empty_content',
        message: `Required file ${file} is empty`,
        severity: 'critical'
      });
    }
  });

  // Calculate metrics for each file
  const metrics: ValidationMetrics = {
    clarity: 0,
    completeness: 0,
    verifiability: 0,
    examples: 0,
    organization: 0
  };

  let totalFiles = 0;
  
  Object.entries(docs).forEach(([path, content]) => {
    if (content.trim().length === 0) return;
    totalFiles++;
    
    // Clarity checks
    const clarityScore = checkClarity(path, content, warnings);
    metrics.clarity += clarityScore;
    
    // Completeness checks
    const completenessScore = checkCompleteness(path, content, errors);
    metrics.completeness += completenessScore;
    
    // Verifiability checks (success indicators)
    const verifiabilityScore = checkVerifiability(path, content, warnings);
    metrics.verifiability += verifiabilityScore;
    
    // Examples checks
    const examplesScore = checkExamples(path, content, warnings);
    metrics.examples += examplesScore;
    
    // Organization checks
    const organizationScore = checkOrganization(path, content, warnings);
    metrics.organization += organizationScore;
  });

  // Average scores
  if (totalFiles > 0) {
    metrics.clarity = Math.round(metrics.clarity / totalFiles);
    metrics.completeness = Math.round(metrics.completeness / totalFiles);
    metrics.verifiability = Math.round(metrics.verifiability / totalFiles);
    metrics.examples = Math.round(metrics.examples / totalFiles);
    metrics.organization = Math.round(metrics.organization / totalFiles);
  }

  // Calculate overall score
  const score = 
    metrics.clarity + 
    metrics.completeness + 
    metrics.verifiability + 
    metrics.examples + 
    metrics.organization;

  // Determine if valid (at least 80/100)
  const isValid = errors.filter(e => e.severity === 'critical').length === 0 && score >= 80;

  return {
    isValid,
    score,
    errors,
    warnings,
    metrics
  };
};

/**
 * Check clarity: no unexplained jargon, short sentences, active voice
 */
function checkClarity(path: string, content: string, warnings: ValidationWarning[]): number {
  let score = 25; // Start with perfect score
  
  // Check for technical terms
  const lines = content.split('\n');
  const codeBlockPattern = /```[\s\S]*?```/g;
  const contentWithoutCode = content.replace(codeBlockPattern, '');
  
  // Look for unexplained technical terms (very basic check)
  TECHNICAL_TERMS.forEach(term => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    const matches = contentWithoutCode.match(regex);
    
    if (matches && matches.length > 0) {
      // Check if term is explained nearby (within 200 characters)
      const explainPattern = new RegExp(
        `${term}.*?(?:is|means|refers to|\\(.*?\\))`,
        'gi'
      );
      
      if (!explainPattern.test(contentWithoutCode)) {
        warnings.push({
          file: path,
          type: 'jargon',
          message: `Technical term "${term}" may not be explained`,
          suggestion: `Add an explanation like: "${term} (the thing that...)" or create a glossary`
        });
        score -= 1;
      }
    }
  });
  
  // Check for overly long paragraphs (more than 5 sentences without break)
  const paragraphs = contentWithoutCode.split('\n\n');
  paragraphs.forEach(para => {
    const sentences = para.split(/[.!?]+/).filter(s => s.trim().length > 0);
    if (sentences.length > 5) {
      warnings.push({
        file: path,
        type: 'long_paragraph',
        message: 'Found a very long paragraph',
        suggestion: 'Break into smaller paragraphs or use bullet points'
      });
      score -= 1;
    }
  });
  
  return Math.max(0, score);
}

/**
 * Check completeness: all steps, all terms, all configs
 */
function checkCompleteness(path: string, content: string, errors: ValidationError[]): number {
  let score = 25;
  
  // README should have quick start
  if (path === '/README.md') {
    if (!content.includes('Quick Start') && !content.includes('Getting Started')) {
      errors.push({
        file: path,
        type: 'missing_explanation',
        message: 'README missing Quick Start section',
        severity: 'high'
      });
      score -= 5;
    }
  }
  
  // SETUP should have step-by-step instructions
  if (path === '/SETUP.md') {
    if (!content.includes('Step 1') && !content.includes('## 1.')) {
      errors.push({
        file: path,
        type: 'missing_explanation',
        message: 'SETUP missing step-by-step instructions',
        severity: 'high'
      });
      score -= 5;
    }
  }
  
  // TROUBLESHOOTING should have common errors
  if (path === '/TROUBLESHOOTING.md') {
    const hasTroubleshooting = TROUBLESHOOTING_PATTERNS.some(pattern => 
      pattern.test(content)
    );
    
    if (!hasTroubleshooting) {
      errors.push({
        file: path,
        type: 'missing_explanation',
        message: 'TROUBLESHOOTING missing error scenarios',
        severity: 'high'
      });
      score -= 5;
    }
  }
  
  return Math.max(0, score);
}

/**
 * Check verifiability: success indicators, error handling
 */
function checkVerifiability(path: string, content: string, warnings: ValidationWarning[]): number {
  let score = 20;
  
  // Check for setup/instruction files
  if (path.includes('SETUP') || path.includes('README')) {
    // Count success indicators
    let successIndicatorCount = 0;
    SUCCESS_INDICATOR_PATTERNS.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        successIndicatorCount += matches.length;
      }
    });
    
    // Count steps (Step 1, Step 2, etc.)
    const stepMatches = content.match(/(?:Step|##)\s+\d+/g);
    const stepCount = stepMatches ? stepMatches.length : 0;
    
    // Should have success indicators for most steps
    if (stepCount > 0 && successIndicatorCount < stepCount * 0.5) {
      warnings.push({
        file: path,
        type: 'no_success_indicator',
        message: `Only ${successIndicatorCount} success indicators for ${stepCount} steps`,
        suggestion: 'Add ✅ Success Check for each step'
      });
      score -= 5;
    }
  }
  
  return Math.max(0, score);
}

/**
 * Check examples: code blocks, realistic data
 */
function checkExamples(path: string, content: string, warnings: ValidationWarning[]): number {
  let score = 15;
  
  // Count code blocks
  const codeBlockMatches = content.match(/```[\s\S]*?```/g);
  const codeBlockCount = codeBlockMatches ? codeBlockMatches.length : 0;
  
  // Technical docs should have code examples
  if (path.includes('SETUP') || path.includes('ARCHITECTURE') || path.includes('README')) {
    if (codeBlockCount === 0) {
      warnings.push({
        file: path,
        type: 'missing_example',
        message: 'No code examples found',
        suggestion: 'Add code examples to illustrate concepts'
      });
      score -= 5;
    }
    
    // Check for placeholder examples (foo, bar, example, etc.)
    if (codeBlockMatches) {
      const hasPlaceholders = codeBlockMatches.some(block => 
        /\b(foo|bar|baz|example|test123|placeholder)\b/i.test(block)
      );
      
      if (hasPlaceholders) {
        warnings.push({
          file: path,
          type: 'missing_example',
          message: 'Code examples use placeholder values (foo, bar, etc.)',
          suggestion: 'Use realistic example values'
        });
        score -= 2;
      }
    }
  }
  
  return Math.max(0, score);
}

/**
 * Check organization: headers, structure, navigation
 */
function checkOrganization(path: string, content: string, warnings: ValidationWarning[]): number {
  let score = 15;
  
  // Check for headers
  const headerMatches = content.match(/^#{1,6}\s+.+$/gm);
  const headerCount = headerMatches ? headerMatches.length : 0;
  
  if (content.length > 1000 && headerCount < 3) {
    warnings.push({
      file: path,
      type: 'missing_example',
      message: 'Long document with few headers',
      suggestion: 'Add more section headers to improve scannability'
    });
    score -= 3;
  }
  
  // Check for table of contents in long docs
  if (content.length > 3000 && !content.includes('Table of Contents') && !content.includes('## ')) {
    warnings.push({
      file: path,
      type: 'missing_example',
      message: 'Long document without table of contents',
      suggestion: 'Add a table of contents at the beginning'
    });
    score -= 2;
  }
  
  return Math.max(0, score);
}

/**
 * Generate a human-readable validation report
 */
export const generateValidationReport = (result: ValidationResult): string => {
  const { isValid, score, errors, warnings, metrics } = result;
  
  let report = `# Documentation Quality Report\n\n`;
  report += `**Overall Score**: ${score}/100 ${isValid ? '✅ PASS' : '❌ FAIL'}\n\n`;
  
  // Score breakdown
  report += `## Score Breakdown\n\n`;
  report += `- **Clarity** (${metrics.clarity}/25): `;
  report += metrics.clarity >= 20 ? '✅ Excellent' : metrics.clarity >= 15 ? '⚠️ Good' : '❌ Needs Improvement';
  report += '\n';
  
  report += `- **Completeness** (${metrics.completeness}/25): `;
  report += metrics.completeness >= 20 ? '✅ Excellent' : metrics.completeness >= 15 ? '⚠️ Good' : '❌ Needs Improvement';
  report += '\n';
  
  report += `- **Verifiability** (${metrics.verifiability}/20): `;
  report += metrics.verifiability >= 16 ? '✅ Excellent' : metrics.verifiability >= 12 ? '⚠️ Good' : '❌ Needs Improvement';
  report += '\n';
  
  report += `- **Examples** (${metrics.examples}/15): `;
  report += metrics.examples >= 12 ? '✅ Excellent' : metrics.examples >= 9 ? '⚠️ Good' : '❌ Needs Improvement';
  report += '\n';
  
  report += `- **Organization** (${metrics.organization}/15): `;
  report += metrics.organization >= 12 ? '✅ Excellent' : metrics.organization >= 9 ? '⚠️ Good' : '❌ Needs Improvement';
  report += '\n\n';
  
  // Errors
  if (errors.length > 0) {
    report += `## ❌ Errors (${errors.length})\n\n`;
    errors.forEach(error => {
      report += `### ${error.severity.toUpperCase()}: ${error.file}\n`;
      report += `- **Type**: ${error.type}\n`;
      report += `- **Message**: ${error.message}\n\n`;
    });
  } else {
    report += `## ✅ No Errors Found\n\n`;
  }
  
  // Warnings
  if (warnings.length > 0) {
    report += `## ⚠️ Warnings (${warnings.length})\n\n`;
    warnings.slice(0, 10).forEach(warning => { // Show first 10
      report += `### ${warning.file}\n`;
      report += `- **Issue**: ${warning.message}\n`;
      report += `- **Suggestion**: ${warning.suggestion}\n\n`;
    });
    
    if (warnings.length > 10) {
      report += `_... and ${warnings.length - 10} more warnings_\n\n`;
    }
  } else {
    report += `## ✅ No Warnings\n\n`;
  }
  
  // Recommendations
  report += `## 📋 Recommendations\n\n`;
  if (score >= 90) {
    report += `🎉 **Excellent!** Your documentation is clear, complete, and user-friendly.\n\n`;
  } else if (score >= 80) {
    report += `👍 **Good!** Your documentation meets quality standards. Consider addressing the warnings above.\n\n`;
  } else if (score >= 70) {
    report += `⚠️ **Acceptable**: Your documentation is usable but could be improved. Focus on:\n`;
    if (metrics.clarity < 20) report += `- Explaining technical terms more clearly\n`;
    if (metrics.completeness < 20) report += `- Adding missing sections and details\n`;
    if (metrics.verifiability < 16) report += `- Adding success indicators for each step\n`;
    if (metrics.examples < 12) report += `- Including more code examples\n`;
    if (metrics.organization < 12) report += `- Improving structure and navigation\n`;
    report += '\n';
  } else {
    report += `❌ **Needs Improvement**: Your documentation needs significant work. Priority issues:\n`;
    errors.slice(0, 5).forEach(error => {
      report += `- ${error.message}\n`;
    });
    report += '\n';
  }
  
  return report;
};

/**
 * Check if documentation passes the "10-year-old test"
 * Can a bright 10-year-old follow these instructions?
 */
export const passes10YearOldTest = (result: ValidationResult): boolean => {
  // Must have high clarity and verifiability
  return result.metrics.clarity >= 20 && 
         result.metrics.verifiability >= 16 &&
         result.errors.filter(e => e.severity === 'critical').length === 0;
};
