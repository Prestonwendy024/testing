import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useBank } from '../../context/BankContext'
import { CreditCard, TrendingUp, TrendingDown, Eye, EyeOff, Download, Share2 } from 'lucide-react'

const ClientAccounts: React.FC = () => {
  const { user } = useAuth()
  const { accounts, transactions } = useBank()
  const [showBalances, setShowBalances] = React.useState(true)

  const userAccounts = accounts.filter(account => account.client_id === user?.id)
  const userTransactions = transactions.filter(transaction => 
    userAccounts.some(account => account.id === transaction.account_id)
  )

  // Calculate balance from transactions for each account
  const getAccountBalance = (accountId: string) => {
    return transactions
      .filter(t => t.account_id === accountId)
      .reduce((sum, t) => sum + t.amount, 0)
  }
  const totalBalance = userAccounts.reduce((sum, account) => sum + getAccountBalance(account.id), 0)

  const monthlyChange = userTransactions
    .filter(t => new Date(t.created_at).getMonth() === new Date().getMonth())
    .reduce((sum, t) => sum + t.amount, 0)

  const getAccountTransactions = (accountId: string) => {
    return userTransactions
      .filter(t => t.account_id === accountId)
      .slice(0, 3)
  }

  return (
    <div className="min-h-full bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Accounts</h1>
              <p className="text-gray-600">Manage and monitor your account balances</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowBalances(!showBalances)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                {showBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span className="text-sm">{showBalances ? 'Hide' : 'Show'} Balances</span>
              </button>
            </div>
          </div>
        </div>

        {/* Account Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Balance</h3>
              <CreditCard className="w-5 h-5 text-gray-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {showBalances ? `$${totalBalance.toFixed(2)}` : '****'}
            </p>
            <div className="flex items-center mt-2">
              {monthlyChange >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                monthlyChange >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {monthlyChange >= 0 ? '+' : ''}${Math.abs(monthlyChange).toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 ml-1">this month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Active Accounts</h3>
              <CreditCard className="w-5 h-5 text-gray-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{userAccounts.length}</p>
            <p className="text-sm text-gray-500 mt-2">Total accounts</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <CreditCard className="w-5 h-5 text-gray-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{userTransactions.length}</p>
            <p className="text-sm text-gray-500 mt-2">Total transactions</p>
          </div>
        </div>

        {/* Account Details */}
        <div className="space-y-6">
          {userAccounts.map((account) => {
            const accountTransactions = getAccountTransactions(account.id)
            const accountBalance = getAccountBalance(account.id)
            return (
              <div key={account.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{account.account_type} Account</h3>
                      <p className="text-gray-600">Account #{account.account_number}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        account.status === 'active' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {account.status}
                      </span>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Account Balance */}
                    <div className="lg:col-span-1">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Current Balance</h4>
                        <p className="text-2xl font-bold text-gray-900">
                          {showBalances ? `$${accountBalance.toFixed(2)}` : '****'}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">Available for transactions</p>
                      </div>
                    </div>

                    {/* Account Details */}
                    <div className="lg:col-span-1">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Account Type</span>
                          <span className="text-sm font-medium text-gray-900">{account.account_type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Interest Rate</span>
                          <span className="text-sm font-medium text-gray-900">2.5% APY</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Opened</span>
                          <span className="text-sm font-medium text-gray-900">
                            {new Date(account.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="lg:col-span-1">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Transactions</h4>
                      <div className="space-y-2">
                        {accountTransactions.length > 0 ? (
                          accountTransactions.map((transaction) => (
                            <div key={transaction.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                                <p className="text-xs text-gray-500">
                                  {new Date(transaction.created_at).toLocaleDateString()}
                                </p>
                              </div>
                              <span className={`text-sm font-medium ${
                                transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {transaction.amount > 0 ? '+' : ''}${transaction.amount.toFixed(2)}
                              </span>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">No recent transactions</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ClientAccounts 