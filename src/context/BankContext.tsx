import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Client, Account, Transaction, Card, Loan } from '../types'
import { 
  clientService, 
  accountService, 
  transactionService, 
  cardService, 
  loanService,
  bankingService 
} from '../services/database'

interface BankContextType {
  // Data
  clients: Client[]
  accounts: Account[]
  transactions: Transaction[]
  cards: Card[]
  loans: Loan[]
  
  // Loading states
  loading: {
    clients: boolean
    accounts: boolean
    transactions: boolean
    cards: boolean
    loans: boolean
  }
  
  // Error states
  errors: {
    clients: string | null
    accounts: string | null
    transactions: string | null
    cards: string | null
    loans: string | null
  }
  
  // Actions
  addClient: (client: Omit<Client, 'id' | 'accounts' | 'createdAt'> & { account_number: string }) => Promise<void>
  addAccount: (account: Omit<Account, 'id' | 'createdAt'>) => Promise<Account>
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => Promise<void>
  addCard: (card: Omit<Card, 'id' | 'createdAt'>) => Promise<void>
  addLoan: (loan: Omit<Loan, 'id' | 'createdAt'>) => Promise<void>
  
  updateAccountBalance: (accountId: string, newBalance: number) => Promise<void>
  updateClient: (id: string, updates: Partial<Client>) => Promise<void>
  updateTransaction: (id: string, updates: Partial<Transaction>) => Promise<void>
  
  deleteClient: (id: string) => Promise<void>
  deleteAccount: (id: string) => Promise<void>
  deleteTransaction: (id: string) => Promise<void>
  deleteCard: (id: string) => Promise<void>
  deleteLoan: (id: string) => Promise<void>
  
  // Banking operations
  transferMoney: (fromAccountId: string, toAccountId: string, amount: number, description: string) => Promise<{ success: boolean; transactionId?: string; error?: string }>
  depositMoney: (accountId: string, amount: number, description: string) => Promise<{ success: boolean; transactionId?: string; error?: string }>
  withdrawMoney: (accountId: string, amount: number, description: string) => Promise<{ success: boolean; transactionId?: string; error?: string }>
  
  // Queries
  getClientAccounts: (clientId: string) => Account[]
  getAccountTransactions: (accountId: string) => Transaction[]
  getClientCards: (clientId: string) => Card[]
  getClientLoans: (clientId: string) => Loan[]
  getClientById: (clientId: string) => Client | undefined
  getAccountById: (accountId: string) => Account | undefined
  getClientTransactions: (clientId: string) => Transaction[]
  
  // Refresh data
  refreshData: () => Promise<void>
  
  // New functions
  recalculateAccountBalance: (accountId: string) => Promise<void>
  recalculateAllAccountBalances: () => Promise<void>
}

const BankContext = createContext<BankContextType | undefined>(undefined)

export const useBank = () => {
  const context = useContext(BankContext)
  if (context === undefined) {
    throw new Error('useBank must be used within a BankProvider')
  }
  return context
}

interface BankProviderProps {
  children: ReactNode
}

export const BankProvider: React.FC<BankProviderProps> = ({ children }) => {
  // State
  const [clients, setClients] = useState<Client[]>([])
  const [accounts, setAccounts] = useState<Account[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [cards, setCards] = useState<Card[]>([])
  const [loans, setLoans] = useState<Loan[]>([])
  
  // Loading states
  const [loading, setLoading] = useState({
    clients: false,
    accounts: false,
    transactions: false,
    cards: false,
    loans: false
  })
  
  // Error states
  const [errors, setErrors] = useState({
    clients: null as string | null,
    accounts: null as string | null,
    transactions: null as string | null,
    cards: null as string | null,
    loans: null as string | null
  })

  // Load initial data
  useEffect(() => {
    loadAllData()
  }, [])

  const loadAllData = async () => {
    await Promise.all([
      loadClients(),
      loadAccounts(),
      loadTransactions(),
      loadCards(),
      loadLoans()
    ])
  }

  const loadClients = async () => {
    setLoading(prev => ({ ...prev, clients: true }))
    setErrors(prev => ({ ...prev, clients: null }))
    
    try {
      const data = await clientService.getAll()
      setClients(data)
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        clients: error instanceof Error ? error.message : 'Failed to load clients' 
      }))
    } finally {
      setLoading(prev => ({ ...prev, clients: false }))
    }
  }

  const loadAccounts = async () => {
    setLoading(prev => ({ ...prev, accounts: true }))
    setErrors(prev => ({ ...prev, accounts: null }))
    
    try {
      const data = await accountService.getAll()
      setAccounts(data)
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        accounts: error instanceof Error ? error.message : 'Failed to load accounts' 
      }))
    } finally {
      setLoading(prev => ({ ...prev, accounts: false }))
    }
  }

  const loadTransactions = async () => {
    setLoading(prev => ({ ...prev, transactions: true }))
    setErrors(prev => ({ ...prev, transactions: null }))
    
    try {
      const data = await transactionService.getAll()
      setTransactions(data)
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        transactions: error instanceof Error ? error.message : 'Failed to load transactions' 
      }))
    } finally {
      setLoading(prev => ({ ...prev, transactions: false }))
    }
  }

  const loadCards = async () => {
    setLoading(prev => ({ ...prev, cards: true }))
    setErrors(prev => ({ ...prev, cards: null }))
    
    try {
      const data = await cardService.getAll()
      setCards(data)
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        cards: error instanceof Error ? error.message : 'Failed to load cards' 
      }))
    } finally {
      setLoading(prev => ({ ...prev, cards: false }))
    }
  }

  const loadLoans = async () => {
    setLoading(prev => ({ ...prev, loans: true }))
    setErrors(prev => ({ ...prev, loans: null }))
    
    try {
      const data = await loanService.getAll()
      setLoans(data)
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        loans: error instanceof Error ? error.message : 'Failed to load loans' 
      }))
    } finally {
      setLoading(prev => ({ ...prev, loans: false }))
    }
  }

  // Actions
  const addClient = async (clientData: Omit<Client, 'id' | 'accounts' | 'createdAt'> & { account_number: string }) => {
    try {
      const newClient = await clientService.create(clientData)
      setClients(prev => [newClient, ...prev])
    } catch (error) {
      throw error
    }
  }

  const addAccount = async (accountData: Omit<Account, 'id' | 'createdAt'>) => {
    try {
      const newAccount = await accountService.create(accountData)
      setAccounts(prev => [newAccount, ...prev])
      return newAccount
    } catch (error) {
      throw error
    }
  }

  const allowedTransactionTypes = ['deposit', 'withdrawal', 'transfer', 'payment', 'fee'] as const;

  const addTransaction = async (transactionData: Omit<Transaction, 'id' | 'createdAt'>) => {
    // Runtime validation for transaction_type
    if (!allowedTransactionTypes.includes(transactionData.transaction_type as any)) {
      throw new Error(`Invalid transaction_type: ${transactionData.transaction_type}`)
    }
    try {
      const newTransaction = await transactionService.create(transactionData)
      setTransactions(prev => [newTransaction, ...prev])
      // Automatically recalculate balance for this account
      await recalculateAccountBalance(newTransaction.account_id)
    } catch (error) {
      throw error
    }
  }

  const addCard = async (cardData: Omit<Card, 'id' | 'createdAt'>) => {
    try {
      const newCard = await cardService.create(cardData)
      setCards(prev => [newCard, ...prev])
    } catch (error) {
      throw error
    }
  }

  const addLoan = async (loanData: Omit<Loan, 'id' | 'createdAt'>) => {
    try {
      const newLoan = await loanService.create(loanData)
      setLoans(prev => [newLoan, ...prev])
    } catch (error) {
      throw error
    }
  }

  const updateAccountBalance = async (accountId: string, newBalance: number) => {
    try {
      const updatedAccount = await accountService.updateBalance(accountId, newBalance)
      setAccounts(prev => prev.map(acc => acc.id === accountId ? updatedAccount : acc))
    } catch (error) {
      throw error
    }
  }

  const updateClient = async (id: string, updates: Partial<Client>) => {
    try {
      const updatedClient = await clientService.update(id, updates)
      setClients(prev => prev.map(client => client.id === id ? updatedClient : client))
    } catch (error) {
      throw error
    }
  }

  const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
    try {
      const updatedTransaction = await transactionService.update(id, updates)
      setTransactions(prev => prev.map(txn => txn.id === id ? updatedTransaction : txn))
      // Automatically recalculate balance for this account
      await recalculateAccountBalance(updatedTransaction.account_id)
    } catch (error) {
      throw error
    }
  }

  const deleteClient = async (id: string) => {
    try {
      await clientService.delete(id)
      setClients(prev => prev.filter(client => client.id !== id))
    } catch (error) {
      throw error
    }
  }

  const deleteAccount = async (id: string) => {
    try {
      await accountService.delete(id)
      setAccounts(prev => prev.filter(account => account.id !== id))
    } catch (error) {
      throw error
    }
  }

  const deleteTransaction = async (id: string) => {
    try {
      // Find the transaction to get its account_id before deleting
      const txnToDelete = transactions.find(txn => txn.id === id)
      await transactionService.delete(id)
      setTransactions(prev => prev.filter(txn => txn.id !== id))
      // Automatically recalculate balance for this account
      if (txnToDelete) {
        await recalculateAccountBalance(txnToDelete.account_id)
      }
    } catch (error) {
      throw error
    }
  }

  const deleteCard = async (id: string) => {
    try {
      await cardService.delete(id)
      setCards(prev => prev.filter(card => card.id !== id))
    } catch (error) {
      throw error
    }
  }

  const deleteLoan = async (id: string) => {
    try {
      await loanService.delete(id)
      setLoans(prev => prev.filter(loan => loan.id !== id))
    } catch (error) {
      throw error
    }
  }

  // Banking operations
  const transferMoney = async (fromAccountId: string, toAccountId: string, amount: number, description: string) => {
    const result = await bankingService.transferMoney(fromAccountId, toAccountId, amount, description)
    if (result.success) {
      // Refresh accounts and transactions
      await Promise.all([loadAccounts(), loadTransactions()])
    }
    return result
  }

  const depositMoney = async (accountId: string, amount: number, description: string) => {
    const result = await bankingService.depositMoney(accountId, amount, description)
    if (result.success) {
      // Refresh accounts and transactions
      await Promise.all([loadAccounts(), loadTransactions()])
    }
    return result
  }

  const withdrawMoney = async (accountId: string, amount: number, description: string) => {
    const result = await bankingService.withdrawMoney(accountId, amount, description)
    if (result.success) {
      // Refresh accounts and transactions
      await Promise.all([loadAccounts(), loadTransactions()])
    }
    return result
  }

  // Queries
  const getClientAccounts = (clientId: string) => {
    return accounts.filter(account => account.client_id === clientId)
  }

  const getAccountTransactions = (accountId: string) => {
    return transactions.filter(transaction => transaction.account_id === accountId)
  }

  const getClientCards = (clientId: string) => {
    return cards.filter(card => card.client_id === clientId)
  }

  const getClientLoans = (clientId: string) => {
    return loans.filter(loan => loan.client_id === clientId)
  }

  const getClientById = (clientId: string) => {
    return clients.find(client => client.id === clientId)
  }

  const getAccountById = (accountId: string) => {
    return accounts.find(account => account.id === accountId)
  }

  const getClientTransactions = (clientId: string): Transaction[] => {
    const clientAccounts = getClientAccounts(clientId)
    const accountIds = clientAccounts.map(account => account.id)
    return transactions.filter(transaction => accountIds.includes(transaction.account_id))
  }

  const refreshData = async () => {
    await loadAllData()
  }

  const recalculateAccountBalance = async (accountId: string) => {
    // Get all transactions for this account
    const accountTransactions = transactions.filter(t => t.account_id === accountId)
    const newBalance = accountTransactions.reduce((sum, t) => sum + t.amount, 0)
    await updateAccountBalance(accountId, newBalance)
  }

  const recalculateAllAccountBalances = async () => {
    // For all accounts, recalculate
    await Promise.all(accounts.map(acc => recalculateAccountBalance(acc.id)))
  }

  const value: BankContextType = {
    clients,
    accounts,
    transactions,
    cards,
    loans,
    loading,
    errors,
    addClient,
    addAccount,
    addTransaction,
    addCard,
    addLoan,
    updateAccountBalance,
    updateClient,
    updateTransaction,
    deleteClient,
    deleteAccount,
    deleteTransaction,
    deleteCard,
    deleteLoan,
    transferMoney,
    depositMoney,
    withdrawMoney,
    getClientAccounts,
    getAccountTransactions,
    getClientCards,
    getClientLoans,
    getClientById,
    getAccountById,
    getClientTransactions,
    refreshData,
    recalculateAccountBalance,
    recalculateAllAccountBalances
  }

  return (
    <BankContext.Provider value={value}>
      {children}
    </BankContext.Provider>
  )
} 