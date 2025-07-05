import { useAuth } from '../../context/AuthContext'
import { useBank } from '../../context/BankContext'
import { 
  TrendingUp, 
  CreditCard, 
  DollarSign, 
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ClientDashboard = () => {
  const { user } = useAuth()
  const { getClientAccounts, getClientTransactions, transactions } = useBank()
  const [showBalance, setShowBalance] = useState(true)
  const navigate = useNavigate()

  const userAccounts = getClientAccounts(user?.id || '')
  const userTransactions = getClientTransactions(user?.id || '')
  const getAccountBalance = (accountId: string) => {
    return transactions
      .filter(t => t.account_id === accountId)
      .reduce((sum, t) => sum + t.amount, 0)
  }
  const totalBalance = userAccounts.reduce((sum, account) => sum + getAccountBalance(account.id), 0)

  const recentTransactions = userTransactions.slice(0, 5)

  const quickActions = [
    {
      icon: ArrowRight,
      label: 'Send Money',
      color: 'from-indigo-500 to-purple-600',
      onClick: () => navigate('/app/client/domestic-transfer')
    },
    {
      icon: ArrowRight,
      label: 'Request Money',
      color: 'from-emerald-500 to-teal-600',
      onClick: () => navigate('/app/client/deposit')
    },
    {
      icon: ArrowRight,
      label: 'Add Account',
      color: 'from-amber-500 to-orange-600',
      onClick: () => navigate('/app/client/accounts')
    },
    {
      icon: CreditCard,
      label: 'Apply for Card',
      color: 'from-pink-500 to-rose-600',
      onClick: () => navigate('/app/client/cards')
    }
  ]

  return (
    <>
      {/* Welcome Header */}
      <div className="slide-in">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-4 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold mb-2 gradient-text">
              Welcome back, {user?.name?.split(' ')[0]}! 
            </h1>
            <p className="text-gray-600 text-base lg:text-lg">Here's what's happening with your accounts today</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="btn-secondary flex items-center space-x-2 text-sm lg:text-base"
            >
              {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showBalance ? 'Hide' : 'Show'} Balance</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Balance Card */}
      <div className="card-gradient-1 rounded-3xl p-6 lg:p-8 text-white shadow-2xl slide-in" style={{ animationDelay: '200ms' }}>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6 space-y-4 lg:space-y-0">
          <div>
            <p className="text-sm opacity-80 mb-2">TOTAL BALANCE</p>
            <h2 className="text-3xl lg:text-5xl font-bold mb-2">
              {showBalance ? `$${totalBalance.toLocaleString()}` : '****'}
            </h2>
            <p className="text-base lg:text-lg opacity-90">Across {userAccounts.length} accounts</p>
          </div>
          <div className="text-center lg:text-right">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-2 mx-auto lg:mx-0">
              <DollarSign className="w-6 h-6 lg:w-8 lg:h-8" />
            </div>
            <p className="text-sm opacity-80">Last updated</p>
            <p className="text-sm opacity-80">{new Date().toLocaleTimeString()}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 lg:gap-6 mb-6">
          <div className="text-center">
            <p className="text-xl lg:text-2xl font-bold">{userAccounts.length}</p>
            <p className="text-xs lg:text-sm opacity-80">Active Accounts</p>
          </div>
          <div className="text-center">
            <p className="text-xl lg:text-2xl font-bold">{userTransactions.length}</p>
            <p className="text-xs lg:text-sm opacity-80">Transactions This Month</p>
          </div>
          <div className="text-center">
            <p className="text-xl lg:text-2xl font-bold">850</p>
            <p className="text-xs lg:text-sm opacity-80">Reward Points</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center justify-center lg:justify-start space-x-2">
            <ArrowRight className="w-5 h-5 opacity-80" />
            <span className="text-sm opacity-80">Secured by BankApp</span>
          </div>
          <div className="flex justify-center lg:justify-end space-x-2">
            <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
              <TrendingUp className="w-4 h-4" />
            </button>
            <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 slide-in" style={{ animationDelay: '400ms' }}>
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">${totalBalance.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">Total Balance</p>
        </div>
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
              </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{userAccounts.length}</h3>
          <p className="text-sm text-gray-600">Accounts</p>
              </div>
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{userTransactions.length}</h3>
          <p className="text-sm text-gray-600">Transactions</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 slide-in" style={{ animationDelay: '800ms' }}>
        {quickActions.map((action, index) => (
          <button
            key={action.label}
            className={`bg-gradient-to-r ${action.color} p-4 lg:p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group`}
            style={{ animationDelay: `${1000 + index * 100}ms` }}
            onClick={action.onClick}
          >
            <div className="flex flex-col items-center space-y-2 lg:space-y-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <action.icon className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <span className="font-semibold text-sm lg:text-base">{action.label}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Recent Transactions */}
        <div className="card-hover slide-in" style={{ animationDelay: '1200ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Recent Transactions</h3>
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-100 to-purple-200 rounded-lg flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-indigo-600" />
            </div>
          </div>
          
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <div key={transaction.id} className="transaction-item" style={{ animationDelay: `${900 + index * 100}ms` }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.amount > 0 
                        ? 'bg-gradient-to-br from-green-100 to-green-200' 
                        : 'bg-gradient-to-br from-red-100 to-red-200'
                    }`}>
                      <ArrowRight className={`w-5 h-5 ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-500 capitalize">{transaction.transaction_type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`font-semibold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}${transaction.amount.toFixed(2)}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="w-full mt-4 py-3 text-indigo-600 font-semibold hover:bg-indigo-50 rounded-xl transition-colors duration-200"
            onClick={() => navigate('/app/client/transactions')}
          >
            View All Transactions
          </button>
        </div>

        {/* Account Overview */}
        <div className="card-hover slide-in" style={{ animationDelay: '1400ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Account Overview</h3>
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-100 to-teal-200 rounded-lg flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          
          <div className="space-y-4">
            {userAccounts.map((account, index) => (
              <div 
                key={account.id}
                className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200 group"
                style={{ animationDelay: `${1600 + index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{account.account_type} Account</p>
                      <p className="text-sm text-gray-500">****{account.account_number.slice(-4)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-indigo-600">${getAccountBalance(account.id).toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Available</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((getAccountBalance(account.id) / 10000) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="w-full mt-4 py-3 text-emerald-600 font-semibold hover:bg-emerald-50 rounded-xl transition-colors duration-200"
            onClick={() => navigate('/app/client/accounts')}
          >
            Manage Accounts
          </button>
        </div>
      </div>

      {/* Financial Insights */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 slide-in" style={{ animationDelay: '1600ms' }}>
        ...
      </div> */}
    </>
  )
}

export default ClientDashboard 