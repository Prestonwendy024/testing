# Default Admin Credentials

## Meridian Bank Admin Access

The following credentials are set up for admin access to the Meridian Bank application:

### Login Credentials
- **Account Number**: `ADMIN001`
- **Password**: `admin123`
- **PIN**: `1234`

### Admin User Details
- **Username**: `admin`
- **Email**: `admin@meridianbank.com`
- **Name**: Admin User
- **Role**: admin

## Database Setup

The admin user is automatically created in the database when you run the `database-schema.sql` script. The admin user is stored in the `admin_users` table with the following structure:

```sql
CREATE TABLE admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    pin_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Security Notes

⚠️ **Important**: These are demo credentials for development/testing purposes only.

For production deployment:
1. Change the default password and PIN immediately after first login
2. Use proper password hashing (bcrypt, argon2, etc.)
3. Implement proper authentication with JWT tokens
4. Enable two-factor authentication
5. Use environment variables for sensitive credentials
6. Implement proper session management

## Accessing Admin Dashboard

1. Navigate to the login page
2. Enter the admin credentials above
3. You will be redirected to the admin dashboard
4. From there you can manage clients, accounts, transactions, and other banking operations

## Admin Features

The admin dashboard provides access to:
- Client management (add, edit, view clients)
- Account management (create accounts, view balances)
- Transaction monitoring
- Loan management
- Card management
- System settings and reports 