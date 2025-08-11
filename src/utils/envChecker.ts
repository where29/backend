import dotenv from 'dotenv';
import { exit } from 'process';

// Load environment variables
dotenv.config();

interface EnvConfig {
  name: string;
  required: boolean;
  description: string;
  defaultValue?: string;
}

const envVariables: EnvConfig[] = [
  // Database
  {
    name: 'DATABASE_URL',
    required: true,
    description: 'MySQL database connection string'
  },
  
  // JWT Keys
  {
    name: 'ACCESS_KEY',
    required: true,
    description: 'JWT access token secret key'
  },
  {
    name: 'REFRESH_KEY',
    required: true,
    description: 'JWT refresh token secret key'
  },
  
  // SendGrid Email
  {
    name: 'SENDGRID_API_KEY',
    required: true,
    description: 'SendGrid API key for sending emails'
  },
  {
    name: 'EMAIL_USERNAME',
    required: true,
    description: 'Email address for sending emails'
  },
  {
    name: 'WELCOME_EMAIL_TEMPLATE_ID',
    required: true,
    description: 'SendGrid template ID for welcome emails'
  },
  {
    name: 'PASSWORD_RESET_EMAIL_TEMPLATE_ID',
    required: true,
    description: 'SendGrid template ID for password reset emails'
  },
  
  // External APIs
  {
    name: 'CLOUDMERSIVE_API_KEY',
    required: true,
    description: 'Cloudmersive API key for content validation'
  },
  
  // Azure Storage
  {
    name: 'AZURE_STORAGE_CONNECTION_STRING',
    required: true,
    description: 'Azure Storage connection string'
  },
  {
    name: 'AZURE_STORAGE_CONTAINER_NAME',
    required: true,
    description: 'Azure Storage container name'
  },
  
  // CORS
  {
    name: 'ALLOWED_ORIGINS',
    required: true,
    description: 'Comma-separated list of allowed CORS origins'
  },
  
  // Optional Server Config
  {
    name: 'NODE_ENV',
    required: false,
    description: 'Node.js environment (development, production)',
    defaultValue: 'development'
  },
  {
    name: 'PORT',
    required: false,
    description: 'Server port number',
    defaultValue: '5001'
  },
  
  // Optional Email Templates
  {
    name: 'SUPPORT_EMAIL_TEMPLATE_IDS',
    required: false,
    description: 'Comma-separated list of support email template IDs'
  }
];

function validateEnvironmentVariables(): boolean {
  console.log('🔍 Validating environment variables...\n');
  
  let hasErrors = false;
  const missingRequired: string[] = [];
  const usingDefaults: string[] = [];
  const placeholderValues: string[] = [];
  
  // Common placeholder patterns
  const placeholderPatterns = [
    /^your-.*-here$/i,
    /^your-.*-key$/i,
    /^your-.*-id$/i,
    /^your-.*-string$/i,
    /^template-id-\d+$/i,
    /^dev-.*-\d+$/i
  ];
  
  for (const envVar of envVariables) {
    const value = process.env[envVar.name];
    
    if (!value || value.trim() === '') {
      if (envVar.required) {
        missingRequired.push(envVar.name);
        console.log(`❌ ${envVar.name} - MISSING (Required)`);
        console.log(`   Description: ${envVar.description}\n`);
        hasErrors = true;
      } else if (envVar.defaultValue) {
        usingDefaults.push(`${envVar.name}=${envVar.defaultValue}`);
        console.log(`⚠️  ${envVar.name} - Using default: "${envVar.defaultValue}"`);
        console.log(`   Description: ${envVar.description}\n`);
      } else {
        console.log(`ℹ️  ${envVar.name} - Not set (Optional)`);
        console.log(`   Description: ${envVar.description}\n`);
      }
    } else {
      // Check if the value looks like a placeholder
      const isPlaceholder = placeholderPatterns.some(pattern => pattern.test(value));
      
      if (isPlaceholder && envVar.required) {
        placeholderValues.push(envVar.name);
        console.log(`⚠️  ${envVar.name} - PLACEHOLDER VALUE DETECTED`);
        console.log(`   Current value: "${value}"`);
        console.log(`   Description: ${envVar.description}`);
        console.log(`   ⚠️  This looks like a placeholder - please update with real values!\n`);
      } else {
        console.log(`✅ ${envVar.name} - Set`);
        console.log(`   Description: ${envVar.description}\n`);
      }
    }
  }
  
  if (hasErrors) {
    console.log('❌ Environment validation failed!\n');
    console.log('Missing required variables:');
    missingRequired.forEach(name => console.log(`  - ${name}`));
    console.log('\nPlease check your .env file and ensure all required variables are set.');
    console.log('You can use .env.example as a template.\n');
    return false;
  }
  
  if (placeholderValues.length > 0) {
    console.log('⚠️  PLACEHOLDER VALUES DETECTED!\n');
    console.log('The following variables appear to have placeholder values:');
    placeholderValues.forEach(name => console.log(`  - ${name}`));
    console.log('\n🔧 These need to be updated with real values for production use!');
    console.log('📝 For development, the server will start but some features may not work.\n');
  }
  
  if (usingDefaults.length > 0) {
    console.log('⚠️  Using default values for:');
    usingDefaults.forEach(defaultVar => console.log(`  - ${defaultVar}`));
    console.log('');
  }
  
  console.log('✅ Environment variables validation completed!\n');
  return true;
}

function checkDatabaseConnection(): boolean {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    return false;
  }
  
  try {
    // Basic URL validation
    const url = new URL(databaseUrl);
    
    if (url.protocol !== 'mysql:') {
      console.log('❌ DATABASE_URL must use mysql:// protocol');
      return false;
    }
    
    if (!url.hostname) {
      console.log('❌ DATABASE_URL missing hostname');
      return false;
    }
    
    if (!url.pathname || url.pathname === '/') {
      console.log('❌ DATABASE_URL missing database name');
      return false;
    }
    
    console.log(`✅ Database URL format is valid (${url.hostname}:${url.port || 3306}${url.pathname})`);
    return true;
  } catch (error) {
    console.log(`❌ Invalid DATABASE_URL format: ${error}`);
    return false;
  }
}

// Main validation function
export function runEnvironmentCheck(exitOnFailure: boolean = false): boolean {
  console.log('='.repeat(60));
  console.log('🔧 ENVIRONMENT CONFIGURATION CHECK');
  console.log('='.repeat(60));
  console.log('');
  
  const envValid = validateEnvironmentVariables();
  const dbValid = checkDatabaseConnection();
  
  const allValid = envValid && dbValid;
  
  if (allValid) {
    console.log('🎉 Environment configuration check completed!');
    console.log('✅ Server can start - continuing...\n');
  } else {
    console.log('❌ Environment configuration has critical issues.');
    console.log('🔧 Please fix the above issues before starting the server.\n');
    
    if (exitOnFailure) {
      console.log('Exiting due to configuration errors...');
      exit(1);
    }
  }
  
  return allValid;
}

// Development-specific check with warnings but no exit
export function runDevEnvironmentCheck(): boolean {
  console.log('🚀 Starting development server...\n');
  
  const result = runEnvironmentCheck(false);
  
  if (result) {
    console.log('💡 Development tips:');
    console.log('   - Check placeholder values above if any features aren\'t working');
    console.log('   - Run "npm run env-check" anytime to validate your configuration');
    console.log('   - Update .env file with real API keys for full functionality\n');
  }
  
  return result;
}

// Allow running this file directly
if (require.main === module) {
  runEnvironmentCheck(true);
}
