const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables!')
  console.error('Please check your .env.local file contains:')
  console.error('- VITE_SUPABASE_URL')
  console.error('- SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  console.log('🚀 Setting up Meridian Bank database...')
  
  try {
    // Step 1: Create admin_users table
    console.log('📋 Creating admin_users table...')
    const { error: adminTableError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS admin_users (
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
      `
    })
    
    if (adminTableError) {
      console.log('ℹ️  admin_users table might already exist:', adminTableError.message)
    }

    // Step 2: Insert default admin user
    console.log('👤 Creating default admin user...')
    const { error: adminInsertError } = await supabase
      .from('admin_users')
      .upsert({
        username: 'admin',
        email: 'admin@meridianbank.com',
        password_hash: 'admin123', // In production, use proper hashing
        pin_hash: '1234',          // In production, use proper hashing
        first_name: 'Admin',
        last_name: 'User',
        role: 'admin'
      }, { onConflict: 'username' })
    
    if (adminInsertError) {
      console.log('ℹ️  Admin user might already exist:', adminInsertError.message)
    }

    // Step 3: Create sample client
    console.log('👥 Creating sample client...')
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .upsert({
        account_number: 'ACC001',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 987-6543',
        date_of_birth: '1990-07-22',
        address: '456 Oak Street',
        city: 'San Francisco',
        state: 'CA',
        zip_code: '94102',
        country: 'US',
        ssn: '123-45-6789',
        employment_status: 'employed',
        employer_name: 'TechCorp Inc.',
        job_title: 'Software Engineer',
        annual_income: 95000,
        kyc_status: 'approved',
        risk_level: 'low'
      }, { onConflict: 'account_number' })
    
    if (clientError) {
      console.log('ℹ️  Sample client might already exist:', clientError.message)
    }

    // Step 4: Create sample account for the client
    if (client && client.length > 0) {
      console.log('🏦 Creating sample account...')
      const { error: accountError } = await supabase
        .from('accounts')
        .upsert({
          client_id: client[0].id,
          account_number: 'ACC001',
          account_type: 'checking',
          balance: 5000.00,
          currency: 'USD',
          status: 'active',
          interest_rate: 0.01,
          overdraft_limit: 1000.00
        }, { onConflict: 'account_number' })
      
      if (accountError) {
        console.log('ℹ️  Sample account might already exist:', accountError.message)
      }
    }

    console.log('✅ Database setup completed successfully!')
    console.log('')
    console.log('📋 Default credentials:')
    console.log('👤 Admin: Account Number: ADMIN001, Password: admin123, PIN: 1234')
    console.log('👥 Client: Account Number: ACC001, Password: password123, PIN: 5678')
    console.log('')
    console.log('🌐 You can now start the development server with: npm run dev')

  } catch (error) {
    console.error('❌ Database setup failed:', error)
    process.exit(1)
  }
}

setupDatabase()

