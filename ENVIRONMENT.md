# Environment Configuration Guide

This project includes an automatic environment variable checker that runs every time you start the development server. Here's what you need to know:

## 🚀 Quick Start

The server will automatically check your environment configuration when you run:
```bash
npm run dev
```

## 🔧 Manual Environment Check

You can manually validate your environment anytime:
```bash
npm run env-check
```

## 📋 Required Environment Variables

### Database
- `DATABASE_URL` - MySQL connection string (e.g., `mysql://user:password@localhost:3306/database`)

### JWT Authentication
- `ACCESS_KEY` - Secret key for JWT access tokens
- `REFRESH_KEY` - Secret key for JWT refresh tokens

### Email Service (SendGrid)
- `SENDGRID_API_KEY` - Your SendGrid API key
- `EMAIL_USERNAME` - Email address for sending emails
- `WELCOME_EMAIL_TEMPLATE_ID` - SendGrid template ID for welcome emails
- `PASSWORD_RESET_EMAIL_TEMPLATE_ID` - SendGrid template ID for password reset emails

### External APIs
- `CLOUDMERSIVE_API_KEY` - Cloudmersive API key for content validation

### File Storage (Azure)
- `AZURE_STORAGE_CONNECTION_STRING` - Azure Storage connection string
- `AZURE_STORAGE_CONTAINER_NAME` - Azure Storage container name

### Security & CORS
- `ALLOWED_ORIGINS` - Comma-separated list of allowed CORS origins

## ⚠️ Optional Variables

- `NODE_ENV` - Environment (development/production) - defaults to "development"
- `PORT` - Server port - defaults to "5001"
- `SUPPORT_EMAIL_TEMPLATE_IDS` - Comma-separated support email template IDs

## 🔍 Environment Check Status Icons

- ✅ **Set** - Variable is properly configured
- ⚠️ **Placeholder** - Variable has a placeholder value that needs updating
- ❌ **Missing** - Required variable is not set
- ℹ️ **Optional** - Variable is optional and not set

## 📝 Setting Up Your Environment

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your real values:
   ```bash
   # Replace placeholder values with real ones
   SENDGRID_API_KEY=your_actual_sendgrid_key
   CLOUDMERSIVE_API_KEY=your_actual_cloudmersive_key
   # etc.
   ```

3. Run the environment check:
   ```bash
   npm run env-check
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🚨 Placeholder Value Detection

The environment checker automatically detects common placeholder patterns:
- `your-*-here`
- `your-*-key`
- `your-*-id`
- `your-*-string`
- `template-id-*`
- `dev-*-12345`

When placeholder values are detected, you'll see warnings but the server will still start in development mode.

## 🔒 Security Notes

- Never commit your `.env` file to version control
- Use strong, unique secrets for JWT keys in production
- Rotate API keys regularly
- Use environment-specific values for different deployments

## 🛠️ Troubleshooting

### Server won't start
- Check for missing required environment variables
- Verify database connection string format
- Ensure MySQL is running and accessible

### Features not working
- Check for placeholder values in relevant API keys
- Verify external service configurations
- Run `npm run env-check` to see current status

### Need help?
- Run `npm run env-check` for detailed validation
- Check the console output for specific error messages
- Refer to the service documentation for API key setup
