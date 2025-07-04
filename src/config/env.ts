import dotenv from 'dotenv';
dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || '5001',

  DATABASE_URL: requireEnv('DATABASE_URL'),

  ACCESS_KEY: requireEnv('ACCESS_KEY'),
  REFRESH_KEY: requireEnv('REFRESH_KEY'),

  SENDGRID_API_KEY: requireEnv('SENDGRID_API_KEY'),
  EMAIL_USERNAME: requireEnv('EMAIL_USERNAME'),
  WELCOME_EMAIL_TEMPLATE_ID: requireEnv('WELCOME_EMAIL_TEMPLATE_ID'),
  PASSWORD_RESET_EMAIL_TEMPLATE_ID: requireEnv('PASSWORD_RESET_EMAIL_TEMPLATE_ID'),

  CLOUDMERSIVE_API_KEY: requireEnv('CLOUDMERSIVE_API_KEY'),
  AZURE_STORAGE_CONNECTION_STRING: requireEnv('AZURE_STORAGE_CONNECTION_STRING'),
  AZURE_STORAGE_CONTAINER_NAME: requireEnv('AZURE_STORAGE_CONTAINER_NAME'),

  ALLOWED_ORIGINS: requireEnv('ALLOWED_ORIGINS').split(','),

  // Optional
  SUPPORT_EMAIL_TEMPLATE_IDS: process.env.SUPPORT_EMAIL_TEMPLATE_IDS?.split(',') || [],
};
