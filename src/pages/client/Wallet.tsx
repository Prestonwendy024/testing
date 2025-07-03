import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useBank } from '../../context/BankContext'
import { Wallet, CreditCard, TrendingUp, Send, ArrowDownLeft, Plus, QrCode, History } from 'lucide-react'

const DigitalWallet: React.FC = () => {
  const { user } = useAuth()
  const { accounts, transactions } = useBank()
  const [activeTab, setActiveTab] = useState('overview')

  const userAccounts = accounts.filter(account => account.client_id === user?.id)
  const totalBalance = userAccounts.reduce((sum, account) => sum + account.balance, 0)
  const userTransactions = transactions.filter(transaction => userAccounts.some(account => account.id === transaction.account_id))
  const recentActivity = userTransactions.slice(0, 5)

  const walletFeatures = [
    {
      title: 'Send Money',
      description: 'Transfer funds instantly',
      icon: Send,
      color: 'bg-blue-100 text-blue-600',
      action: () => console.log('Send money')
    },
    {
      title: 'Request Money',
      description: 'Ask for payments',
      icon: ArrowDownLeft,
      color: 'bg-green-100 text-green-600',
      action: () => console.log('Request money')
    },
    {
      title: 'QR Code',
      description: 'Generate payment QR',
      icon: QrCode,
      color: 'bg-purple-100 text-purple-600',
      action: () => console.log('QR Code')
    },
    {
      title: 'Add Money',
      description: 'Load your wallet',
      icon: Plus,
      color: 'bg-orange-100 text-orange-600',
      action: () => console.log('Add money')
    }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Wallet },
    { id: 'activity', label: 'Activity', icon: History },
    { id: 'cards', label: 'Cards', icon: CreditCard }
  ]

  return (
    <div className="min-h-full bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Digital Wallet</h1>
              <p className="text-gray-600">Manage your digital payments and transfers</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">Last updated</span>
              <span className="text-sm font-medium text-gray-900">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Wallet Balance */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-sm p-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Wallet className="w-8 h-8" />
              <h2 className="text-xl font-semibold">Wallet Balance</h2>
            </div>
            <TrendingUp className="w-6 h-6 text-green-400" />
          </div>
          <div className="mb-6">
            <p className="text-3xl font-bold">${totalBalance.toFixed(2)}</p>
            <p className="text-gray-300 mt-1">Available for transactions</p>
          </div>
          <div className="flex items-center space-x-6">
            <div>
              <p className="text-sm text-gray-300">Linked Accounts</p>
              <p className="text-lg font-semibold">{userAccounts.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-300">This Month</p>
              <p className="text-lg font-semibold text-green-400">+$1,250.00</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {walletFeatures.map((feature, index) => (
            <button
              key={index}
              onClick={feature.action}
              className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-gray-800 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Account Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {userAccounts.map((account) => (
                    <div key={account.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">{account.account_type}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          account.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {account.status}
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">${account.balance.toFixed(2)}</p>
                      <p className="text-sm text-gray-500 mt-1">Account #{account.account_number}</p>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {recentActivity.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${transaction.amount < 0 ? 'bg-red-100' : 'bg-green-100'}`}>
                            {transaction.amount < 0 ? (
                              <Send className="w-5 h-5 text-red-600" />
                            ) : (
                              <ArrowDownLeft className="w-5 h-5 text-green-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{transaction.description}</p>
                            <p className="text-sm text-gray-500">{new Date(transaction.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>{transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}</p>
                          <p className="text-xs text-gray-400">{transaction.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="text-center py-12">
                <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Transaction History</h3>
                <p className="text-gray-600">View detailed transaction history and analytics</p>
              </div>
            )}

            {activeTab === 'cards' && (
              <div className="text-center py-12">
                <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Linked Cards</h3>
                <p className="text-gray-600">Manage your linked credit and debit cards</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DigitalWallet 