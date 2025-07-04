import { supabase } from '../lib/supabase'
import type { Database } from '../lib/supabase'

type Client = Database['public']['Tables']['clients']['Row']
type Account = Database['public']['Tables']['accounts']['Row']
type Transaction = Database['public']['Tables']['transactions']['Row']
type Card = Database['public']['Tables']['cards']['Row']
type Loan = Database['public']['Tables']['loans']['Row']

// Client operations
export const clientService = {
  async getAll(): Promise<Client[]> {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async getById(id: string): Promise<Client | null> {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async getByAccountNumber(accountNumber: string): Promise<Client | null> {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('account_number', accountNumber)
      .single()
    
    if (error) throw error
    return data
  },

  async create(client: Database['public']['Tables']['clients']['Insert']): Promise<Client> {
    const { data, error } = await supabase
      .from('clients')
      .insert(client)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: Database['public']['Tables']['clients']['Update']): Promise<Client> {
    const { data, error } = await supabase
      .from('clients')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Account operations
export const accountService = {
  async getAll(): Promise<Account[]> {
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async getByClientId(clientId: string): Promise<Account[]> {
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async getById(id: string): Promise<Account | null> {
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async create(account: Database['public']['Tables']['accounts']['Insert']): Promise<Account> {
    const { data, error } = await supabase
      .from('accounts')
      .insert(account)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: Database['public']['Tables']['accounts']['Update']): Promise<Account> {
    const { data, error } = await supabase
      .from('accounts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateBalance(id: string, newBalance: number): Promise<Account> {
    const { data, error } = await supabase
      .from('accounts')
      .update({ balance: newBalance, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('accounts')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Transaction operations
export const transactionService = {
  async getAll(): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async getByAccountId(accountId: string): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('account_id', accountId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async getById(id: string): Promise<Transaction | null> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async create(transaction: Database['public']['Tables']['transactions']['Insert']): Promise<Transaction> {
    const { data, error } = await supabase
      .from('transactions')
      .insert(transaction)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: Database['public']['Tables']['transactions']['Update']): Promise<Transaction> {
    const { data, error } = await supabase
      .from('transactions')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Card operations
export const cardService = {
  async getAll(): Promise<Card[]> {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async getByClientId(clientId: string): Promise<Card[]> {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async create(card: Database['public']['Tables']['cards']['Insert']): Promise<Card> {
    const { data, error } = await supabase
      .from('cards')
      .insert(card)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: Database['public']['Tables']['cards']['Update']): Promise<Card> {
    const { data, error } = await supabase
      .from('cards')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('cards')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Loan operations
export const loanService = {
  async getAll(): Promise<Loan[]> {
    const { data, error } = await supabase
      .from('loans')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async getByClientId(clientId: string): Promise<Loan[]> {
    const { data, error } = await supabase
      .from('loans')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async create(loan: Database['public']['Tables']['loans']['Insert']): Promise<Loan> {
    const { data, error } = await supabase
      .from('loans')
      .insert(loan)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: Database['public']['Tables']['loans']['Update']): Promise<Loan> {
    const { data, error } = await supabase
      .from('loans')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('loans')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Banking operations
export const bankingService = {
  async transferMoney(
    fromAccountId: string,
    toAccountId: string,
    amount: number,
    description: string
  ): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    try {
      // Get both accounts
      const fromAccount = await accountService.getById(fromAccountId)
      const toAccount = await accountService.getById(toAccountId)

      if (!fromAccount || !toAccount) {
        return { success: false, error: 'Account not found' }
      }

      if (fromAccount.balance < amount) {
        return { success: false, error: 'Insufficient funds' }
      }

      // Create withdrawal transaction
      const withdrawalTransaction = await transactionService.create({
        account_id: fromAccountId,
        transaction_type: 'transfer',
        amount: -amount,
        currency: 'USD',
        description: `Transfer to ${toAccount.account_number}: ${description}`,
        reference_number: `TXN${Date.now()}`,
        status: 'completed',
        recipient_account: toAccount.account_number,
        sender_account: fromAccount.account_number
      })

      // Create deposit transaction
      await transactionService.create({
        account_id: toAccountId,
        transaction_type: 'transfer',
        amount: amount,
        currency: 'USD',
        description: `Transfer from ${fromAccount.account_number}: ${description}`,
        reference_number: `TXN${Date.now()}`,
        status: 'completed',
        recipient_account: toAccount.account_number,
        sender_account: fromAccount.account_number
      })

      // Update account balances
      await accountService.updateBalance(fromAccountId, fromAccount.balance - amount)
      await accountService.updateBalance(toAccountId, toAccount.balance + amount)

      return { success: true, transactionId: withdrawalTransaction.id }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Transfer failed' }
    }
  },

  async depositMoney(
    accountId: string,
    amount: number,
    description: string
  ): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    try {
      const account = await accountService.getById(accountId)
      if (!account) {
        return { success: false, error: 'Account not found' }
      }

      const transaction = await transactionService.create({
        account_id: accountId,
        transaction_type: 'deposit',
        amount: amount,
        currency: 'USD',
        description,
        reference_number: `DEP${Date.now()}`,
        status: 'completed'
      })

      await accountService.updateBalance(accountId, account.balance + amount)

      return { success: true, transactionId: transaction.id }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Deposit failed' }
    }
  },

  async withdrawMoney(
    accountId: string,
    amount: number,
    description: string
  ): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    try {
      const account = await accountService.getById(accountId)
      if (!account) {
        return { success: false, error: 'Account not found' }
      }

      if (account.balance < amount) {
        return { success: false, error: 'Insufficient funds' }
      }

      const transaction = await transactionService.create({
        account_id: accountId,
        transaction_type: 'withdrawal',
        amount: -amount,
        currency: 'USD',
        description,
        reference_number: `WTH${Date.now()}`,
        status: 'completed'
      })

      await accountService.updateBalance(accountId, account.balance - amount)

      return { success: true, transactionId: transaction.id }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Withdrawal failed' }
    }
  }
} 