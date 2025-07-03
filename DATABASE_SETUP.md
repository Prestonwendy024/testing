# Meridian Bank - Database Setup Guide

## Prerequisites
- Node.js installed
- Supabase account
- Git repository cloned

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `meridian-bank`
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be ready (usually 2-3 minutes)

## Step 2: Get Your Project Credentials

1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy your:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - Keep this secret!

## Step 3: Configure Environment Variables

1. Create a `.env.local` file in your project root
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Important**: Replace the placeholder values with your actual Supabase credentials.

## Step 4: Create Database Schema

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the entire contents of `database-schema.sql`
4. Paste it into the SQL editor
5. Click "Run" to execute the schema

This will create:
- `users` table with all user fields
- `accounts` table for bank accounts
- `transactions` table for all transactions
- Proper indexes for performance
- Row Level Security (RLS) policies

## Step 5: Insert Sample Data

1. Make sure your `.env.local` file has the `SUPABASE_SERVICE_ROLE_KEY`
2. Run the setup script:

```bash
npm run setup
```

This will create:
- Admin user (username: `admin`, pin: `1234`)
- Sample client users
- Sample accounts and transactions

## Step 6: Test the Setup

1. Start the development server:
```bash
npm run dev
```

2. Navigate to `http://localhost:3000/app`
3. Try logging in with:
   - **Admin**: Account Number: `ADMIN001`, PIN: `1234`
   - **Client**: Account Number: `ACC001`, PIN: `1234`

## Step 7: Verify Database Connection

1. Go to your Supabase dashboard
2. Navigate to **Table Editor**
3. You should see:
   - `users` table with sample data
   - `accounts` table with sample accounts
   - `transactions` table with sample transactions

## Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables"**
   - Check that `.env.local` exists and has correct values
   - Restart your development server after adding environment variables

2. **"Error fetching user"**
   - Verify your Supabase URL and keys are correct
   - Check that the database schema was created successfully

3. **"Permission denied"**
   - Ensure RLS policies are properly set up
   - Check that you're using the correct API key

4. **Setup script fails**
   - Make sure `SUPABASE_SERVICE_ROLE_KEY` is in your `.env.local`
   - Check that the database schema exists

### Security Notes:

- Never commit `.env.local` to version control
- Keep your service role key secret
- Use environment variables for all sensitive data
- The anon key is safe to use in client-side code

## Next Steps

After successful setup:

1. **Customize the data**: Modify the setup script to add your own sample data
2. **Add authentication**: Implement proper password hashing
3. **Add real-time features**: Use Supabase's real-time subscriptions
4. **Add file storage**: Use Supabase Storage for profile images
5. **Add email verification**: Use Supabase Auth for user verification

## Production Deployment

For production:

1. Create a production Supabase project
2. Set up proper environment variables
3. Configure custom domains
4. Set up monitoring and backups
5. Implement proper security measures

## Support

If you encounter issues:
1. Check the Supabase documentation
2. Verify your environment variables
3. Check the browser console for errors
4. Review the database logs in Supabase dashboard

## Option 2: Firebase Firestore

### Step 1: Create Firebase Project

1. Go to [firebase.google.com](https://firebase.google.com)
2. Click "Create a project"
3. Enter project name: `meridian-bank`
4. Follow the setup wizard

### Step 2: Enable Firestore

1. In Firebase console, go to Firestore Database
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location

### Step 3: Get Firebase Config

1. Go to Project Settings → General
2. Scroll down to "Your apps"
3. Click the web icon (</>)
4. Register your app and copy the config

### Step 4: Install Firebase

```bash
npm install firebase
```

### Step 5: Create Firebase Config

Create `src/lib/firebase.ts`:
```typescript
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  // Your Firebase config here
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
```

## Option 3: PlanetScale (MySQL)

### Step 1: Create PlanetScale Account

1. Go to [planetscale.com](https://planetscale.com)
2. Sign up and create a new database
3. Choose MySQL as the database type

### Step 2: Get Connection String

1. In your PlanetScale dashboard, go to Connect
2. Copy the connection string

### Step 3: Install MySQL Client

```bash
npm install mysql2
```

### Step 4: Create Database Service

Create a custom database service using the MySQL connection.

## Option 4: MongoDB Atlas

### Step 1: Create MongoDB Atlas Account

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a free cluster
3. Set up database access and network access

### Step 2: Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string

### Step 3: Install MongoDB Driver

```bash
npm install mongodb
```

### Step 4: Create MongoDB Service

Create a custom database service using the MongoDB driver.

## Production Considerations

### Security

1. **Environment Variables**: Never commit `.env` files to version control
2. **Row Level Security**: Enable RLS in Supabase for production
3. **API Keys**: Rotate keys regularly
4. **CORS**: Configure allowed origins

### Performance

1. **Indexing**: Add indexes for frequently queried fields
2. **Caching**: Implement client-side caching
3. **Pagination**: Add pagination for large datasets
4. **Connection Pooling**: Use connection pooling for database connections

### Monitoring

1. **Error Tracking**: Set up error monitoring (Sentry, LogRocket)
2. **Performance Monitoring**: Monitor database query performance
3. **Uptime Monitoring**: Set up uptime monitoring
4. **Logs**: Implement comprehensive logging

### Backup & Recovery

1. **Automated Backups**: Set up automated database backups
2. **Point-in-Time Recovery**: Enable point-in-time recovery
3. **Disaster Recovery**: Plan for disaster recovery scenarios

## Troubleshooting

### Common Issues

1. **CORS Errors**: Check your Supabase CORS settings
2. **Authentication Errors**: Verify your API keys
3. **Connection Timeouts**: Check your network connection
4. **Rate Limiting**: Implement rate limiting for API calls

### Debug Mode

To enable debug mode, add to your `.env`:
```bash
VITE_DEBUG=true
```

This will log all database operations to the console.

## Migration from Mock Data

If you're migrating from the current mock data:

1. Export your mock data to JSON format
2. Use the database service to import the data
3. Update any hardcoded IDs in your components
4. Test all functionality with live data

## Support

For issues with:
- **Supabase**: Check their [documentation](https://supabase.com/docs)
- **Firebase**: Check their [documentation](https://firebase.google.com/docs)
- **PlanetScale**: Check their [documentation](https://planetscale.com/docs)
- **MongoDB**: Check their [documentation](https://docs.mongodb.com)

## Next Steps

After setting up your database:

1. **Authentication**: Implement user authentication
2. **Authorization**: Add role-based access control
3. **Real-time Updates**: Enable real-time subscriptions
4. **File Upload**: Set up file storage for profile images
5. **Email Notifications**: Add email service integration
6. **Payment Processing**: Integrate payment gateways
7. **Compliance**: Implement KYC/AML compliance features 