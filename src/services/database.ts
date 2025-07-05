import { supabase } from '../lib/supabase'
import type { Database } from '../lib/supabase'
import type { Client, Account, Transaction, Card, Loan } from '../types'

// Type conversion functions
const convertDbClientToClient = (dbClient: Database['public']['Tables']['clients']['Row']): Client => ({
  ...dbClient,
  account_number: dbClient.account_number || undefined
})

const convertDbAccountToAccount = (dbAccount: Database['public']['Tables']['accounts']['Row']): Account => ({
  ...dbAccount
})

const convertDbTransactionToTransaction = (dbTransaction: Database['public']['Tables']['transactions']['Row']): Transaction => ({
  ...dbTransaction
})

const convertDbCardToCard = (dbCard: Database['public']['Tables']['cards']['Row']): Card => ({
  ...dbCard
})

const convertDbLoanToLoan = (dbLoan: Database['public']['Tables']['loans']['Row']): Loan => ({
  ...dbLoan
})

// Client operations
export const clientService = {
  async getAll(): Promise<Client[]> {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return (data || []).map(convertDbClientToClient)
  },

  async getById(id: string): Promise<Client | null> {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data ? convertDbClientToClient(data) : null
  },

  async getByAccountNumber(accountNumber: string): Promise<Client | null> {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('account_number', accountNumber)
      .single()
    
    if (error) throw error
    return data ? convertDbClientToClient(data) : null
  },

  async create(client: Omit<Client, 'id' | 'created_at' | 'updated_at'>): Promise<Client> {
    // Convert custom type to database type
    const dbClient: Database['public']['Tables']['clients']['Insert'] = {
      ...client,
      account_number: client.account_number || undefined
    }
    
    const { data, error } = await supabase
      .from('clients')
      .insert(dbClient)
      .select()
      .single()
    
    if (error) throw error
    return convertDbClientToClient(data)
  },

  async update(id: string, updates: Partial<Client>): Promise<Client> {
    // Convert custom type to database type
    const dbUpdates: Database['public']['Tables']['clients']['Update'] = {
      ...updates,
      account_number: updates.account_number || undefined
    }
    
    const { data, error } = await supabase
      .from('clients')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return convertDbClientToClient(data)
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
    return (data || []).map(convertDbAccountToAccount)
  },

  async getByClientId(clientId: string): Promise<Account[]> {
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return (data || []).map(convertDbAccountToAccount)
  },

  async getById(id: string): Promise<Account | null> {
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data ? convertDbAccountToAccount(data) : null
  },

  async create(account: Database['public']['Tables']['accounts']['Insert']): Promise<Account> {
    const { data, error } = await supabase
      .from('accounts')
      .insert(account)
      .select()
      .single()
    
    if (error) throw error
    return convertDbAccountToAccount(data)
  },

  async update(id: string, updates: Database['public']['Tables']['accounts']['Update']): Promise<Account> {
    const { data, error } = await supabase
      .from('accounts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return convertDbAccountToAccount(data)
  },

  async updateBalance(id: string, newBalance: number): Promise<Account> {
    const { data, error } = await supabase
      .from('accounts')
      .update({ balance: newBalance, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return convertDbAccountToAccount(data)
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
    return (data || []).map(convertDbTransactionToTransaction)
  },

  async getByAccountId(accountId: string): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('account_id', accountId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return (data || []).map(convertDbTransactionToTransaction)
  },

  async getById(id: string): Promise<Transaction | null> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data ? convertDbTransactionToTransaction(data) : null
  },

  async create(transaction: Database['public']['Tables']['transactions']['Insert']): Promise<Transaction> {
    const { data, error } = await supabase
      .from('transactions')
      .insert(transaction)
      .select()
      .single()
    
    if (error) throw error
    return convertDbTransactionToTransaction(data)
  },

  async update(id: string, updates: Database['public']['Tables']['transactions']['Update']): Promise<Transaction> {
    const { data, error } = await supabase
      .from('transactions')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return convertDbTransactionToTransaction(data)
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
    return (data || []).map(convertDbCardToCard)
  },

  async getByClientId(clientId: string): Promise<Card[]> {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return (data || []).map(convertDbCardToCard)
  },

  async create(card: Database['public']['Tables']['cards']['Insert']): Promise<Card> {
    const { data, error } = await supabase
      .from('cards')
      .insert(card)
      .select()
      .single()
    
    if (error) throw error
    return convertDbCardToCard(data)
  },

  async update(id: string, updates: Database['public']['Tables']['cards']['Update']): Promise<Card> {
    const { data, error } = await supabase
      .from('cards')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return convertDbCardToCard(data)
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
    return (data || []).map(convertDbLoanToLoan)
  },

  async getByClientId(clientId: string): Promise<Loan[]> {
    const { data, error } = await supabase
      .from('loans')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return (data || []).map(convertDbLoanToLoan)
  },

  async create(loan: Database['public']['Tables']['loans']['Insert']): Promise<Loan> {
    const { data, error } = await supabase
      .from('loans')
      .insert(loan)
      .select()
      .single()
    
    if (error) throw error
    return convertDbLoanToLoan(data)
  },

  async update(id: string, updates: Database['public']['Tables']['loans']['Update']): Promise<Loan> {
    const { data, error } = await supabase
      .from('loans')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return convertDbLoanToLoan(data)
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