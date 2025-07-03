import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string
          name: string
          email: string
          role: 'admin' | 'client'
          account_number: string
          pin: string
          created_at: string
          profile_image: string | null
          phone: string | null
          address: string | null
          date_of_birth: string | null
          ssn: string | null
          nationality: string | null
          occupation: string | null
          employer: string | null
          annual_income: number | null
          credit_score: number | null
          kyc_status: 'pending' | 'verified' | 'rejected'
          risk_level: 'low' | 'medium' | 'high'
          two_factor_enabled: boolean
          last_login: string | null
          preferences: any
        }
        Insert: {
          id?: string
          username: string
          name: string
          email: string
          role: 'admin' | 'client'
          account_number: string
          pin: string
          created_at?: string
          profile_image?: string | null
          phone?: string | null
          address?: string | null
          date_of_birth?: string | null
          ssn?: string | null
          nationality?: string | null
          occupation?: string | null
          employer?: string | null
          annual_income?: number | null
          credit_score?: number | null
          kyc_status?: 'pending' | 'verified' | 'rejected'
          risk_level?: 'low' | 'medium' | 'high'
          two_factor_enabled?: boolean
          last_login?: string | null
          preferences?: any
        }
        Update: {
          id?: string
          username?: string
          name?: string
          email?: string
          role?: 'admin' | 'client'
          account_number?: string
          pin?: string
          created_at?: string
          profile_image?: string | null
          phone?: string | null
          address?: string | null
          date_of_birth?: string | null
          ssn?: string | null
          nationality?: string | null
          occupation?: string | null
          employer?: string | null
          annual_income?: number | null
          credit_score?: number | null
          kyc_status?: 'pending' | 'verified' | 'rejected'
          risk_level?: 'low' | 'medium' | 'high'
          two_factor_enabled?: boolean
          last_login?: string | null
          preferences?: any
        }
      }
      accounts: {
        Row: {
          id: string
          client_id: string
          account_number: string
          account_type: 'checking' | 'savings' | 'credit' | 'investment'
          balance: number
          currency: string
          status: 'active' | 'inactive' | 'frozen' | 'closed'
          created_at: string
          updated_at: string
          interest_rate: number | null
          overdraft_limit: number | null
          monthly_fee: number | null
          last_transaction_date: string | null
        }
        Insert: {
          id?: string
          client_id: string
          account_number: string
          account_type: 'checking' | 'savings' | 'credit' | 'investment'
          balance: number
          currency?: string
          status?: 'active' | 'inactive' | 'frozen' | 'closed'
          created_at?: string
          updated_at?: string
          interest_rate?: number | null
          overdraft_limit?: number | null
          monthly_fee?: number | null
          last_transaction_date?: string | null
        }
        Update: {
          id?: string
          client_id?: string
          account_number?: string
          account_type?: 'checking' | 'savings' | 'credit' | 'investment'
          balance?: number
          currency?: string
          status?: 'active' | 'inactive' | 'frozen' | 'closed'
          created_at?: string
          updated_at?: string
          interest_rate?: number | null
          overdraft_limit?: number | null
          monthly_fee?: number | null
          last_transaction_date?: string | null
        }
      }
      transactions: {
        Row: {
          id: string
          account_id: string
          transaction_type: 'deposit' | 'withdrawal' | 'transfer' | 'payment' | 'fee'
          amount: number
          description: string
          status: 'pending' | 'completed' | 'failed' | 'cancelled'
          created_at: string
          updated_at: string
          reference_number: string | null
          recipient_account: string | null
          sender_account: string | null
          fee: number | null
          currency: string
        }
        Insert: {
          id?: string
          account_id: string
          transaction_type: 'deposit' | 'withdrawal' | 'transfer' | 'payment' | 'fee'
          amount: number
          description: string
          status?: 'pending' | 'completed' | 'failed' | 'cancelled'
          created_at?: string
          updated_at?: string
          reference_number?: string | null
          recipient_account?: string | null
          sender_account?: string | null
          fee?: number | null
          currency?: string
        }
        Update: {
          id?: string
          account_id?: string
          type?: 'deposit' | 'withdrawal' | 'transfer' | 'payment' | 'fee'
          amount?: number
          description?: string
          status?: 'pending' | 'completed' | 'failed' | 'cancelled'
          created_at?: string
          updated_at?: string
          reference_number?: string | null
          recipient_account?: string | null
          sender_account?: string | null
          fee?: number | null
          currency?: string
        }
      }
      clients: {
        Row: {
          id: string
          account_number: string
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
          employer_name: string | null
          job_title: string | null
          annual_income: number
          kyc_status: 'pending' | 'approved' | 'rejected'
          risk_level: 'low' | 'medium' | 'high'
          profile_image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          account_number: string
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
          kyc_status?: 'pending' | 'approved' | 'rejected'
          risk_level?: 'low' | 'medium' | 'high'
          profile_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          account_number?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          date_of_birth?: string
          address?: string
          city?: string
          state?: string
          zip_code?: string
          country?: string
          ssn?: string
          employment_status?: string
          employer_name?: string | null
          job_title?: string | null
          annual_income?: number
          kyc_status?: 'pending' | 'approved' | 'rejected'
          risk_level?: 'low' | 'medium' | 'high'
          profile_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      },
      cards: {
        Row: {
          id: string
          client_id: string
          card_number: string
          card_type: 'credit' | 'debit'
          card_network: 'visa' | 'mastercard' | 'amex'
          expiry_date: string
          cvv: string
          status: 'active' | 'suspended' | 'expired'
          credit_limit: number | null
          available_credit: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          card_number: string
          card_type: 'credit' | 'debit'
          card_network: 'visa' | 'mastercard' | 'amex'
          expiry_date: string
          cvv: string
          status?: 'active' | 'suspended' | 'expired'
          credit_limit?: number | null
          available_credit?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          card_number?: string
          card_type?: 'credit' | 'debit'
          card_network?: 'visa' | 'mastercard' | 'amex'
          expiry_date?: string
          cvv?: string
          status?: 'active' | 'suspended' | 'expired'
          credit_limit?: number | null
          available_credit?: number | null
          created_at?: string
          updated_at?: string
        }
      },
      loans: {
        Row: {
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
        Insert: {
          id?: string
          client_id: string
          loan_type: 'personal' | 'mortgage' | 'business' | 'auto'
          amount: number
          interest_rate: number
          term_months: number
          monthly_payment: number
          status?: 'pending' | 'approved' | 'active' | 'paid_off' | 'defaulted'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          loan_type?: 'personal' | 'mortgage' | 'business' | 'auto'
          amount?: number
          interest_rate?: number
          term_months?: number
          monthly_payment?: number
          status?: 'pending' | 'approved' | 'active' | 'paid_off' | 'defaulted'
          created_at?: string
          updated_at?: string
        }
      },
    }
  }
}
