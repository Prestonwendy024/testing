export interface User {
  id: string
  username: string
  name: string
  email: string
  role: 'admin' | 'client'
  createdAt: string
  accountNumber?: string
  pin?: string
  profileImage?: string
  phone?: string
  address?: string
  dateOfBirth?: string
  ssn?: string
  nationality?: string
  occupation?: string
  employer?: string
  annualIncome?: number
  creditScore?: number
  kycStatus: 'pending' | 'verified' | 'rejected'
  twoFactorEnabled: boolean
  lastLogin?: string
  preferences: {
    notifications: {
      email: boolean
      sms: boolean
      push: boolean
    }
    privacy: {
      shareData: boolean
      marketing: boolean
    }
    language: string
    timezone: string
  }
}

export interface Account {
  id: string
  client_id: string
  account_number: string
  account_type: 'checking' | 'savings' | 'credit' | 'investment'
  balance: number
  currency: string
  status: 'active' | 'inactive' | 'frozen' | 'closed'
  interest_rate: number | null
  overdraft_limit: number | null
  created_at: string
  updated_at: string
  monthly_fee?: number | null
  last_transaction_date?: string | null
}

export interface Transaction {
  id: string
  account_id: string
  transaction_type: 'deposit' | 'withdrawal' | 'transfer' | 'payment' | 'fee'
  amount: number
  currency: string
  description: string
  reference_number: string | null
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  recipient_account?: string | null
  sender_account?: string | null
  created_at: string
  updated_at: string
  fee?: number | null
}

export interface Client {
  id: string
  account_number?: string
  first_name: string
  last_name: string
  email: string
  phone: string
  date_of_birth: string
  address: string
  city: string
  state: string
  zip_code: string
  country: string
  ssn: string
  employment_status: string
  employer_name?: string | null
  job_title?: string | null
  annual_income: number
  kyc_status: 'pending' | 'approved' | 'rejected'
  risk_level: 'low' | 'medium' | 'high'
  profile_image_url?: string | null
  created_at: string
  updated_at: string
  password?: string
  pin?: string
}

export interface Card {
  id: string
  client_id: string
  card_number: string
  card_type: 'credit' | 'debit'
  card_network: 'visa' | 'mastercard' | 'amex'
  expiry_date: string
  cvv: string
  status: 'active' | 'suspended' | 'expired'
  credit_limit?: number | null
  available_credit?: number | null
  created_at: string
  updated_at: string
}

export interface Document {
  id: string
  userId: string
  type: 'id' | 'passport' | 'drivers-license' | 'utility-bill' | 'bank-statement' | 'other'
  name: string
  fileUrl: string
  fileSize: number
  mimeType: string
  uploadedAt: string
  status: 'pending' | 'approved' | 'rejected'
  notes?: string
}

export interface Notification {
  id: string
  userId: string
  type: 'transaction' | 'security' | 'account' | 'marketing' | 'system'
  title: string
  message: string
  read: boolean
  createdAt: string
  actionUrl?: string
  priority: 'low' | 'medium' | 'high'
}

export interface Loan {
  id: string
  client_id: string
  loan_type: 'personal' | 'mortgage' | 'business' | 'auto'
  amount: number
  interest_rate: number
  term_months: number
  monthly_payment: number
  status: 'pending' | 'approved' | 'active' | 'paid_off' | 'defaulted'
  created_at: string
  updated_at: string
} 