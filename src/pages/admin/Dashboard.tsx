import { useBank } from '../../context/BankContext'
import { Users, CreditCard, Receipt, DollarSign, TrendingUp, Activity, UserPlus, ArrowUpRight } from 'lucide-react'

const AdminDashboard = () => {
  const { clients, accounts, transactions } = useBank()

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)
  const totalTransactions = transactions.length
  const newClientsThisMonth = clients.filter(client => {
    const clientDate = new Date(client.created_at)
    const now = new Date()
    return clientDate.getMonth() === now.getMonth() && clientDate.getFullYear() === now.getFullYear()
  }).length

  const recentTransactions = transactions.slice(0, 5)
  const recentClients = clients.slice(0, 5)

  return (
    <>
      <div className="slide-in">
        <h2 className="text-3xl font-bold mb-2 gradient-text">Admin Dashboard</h2>
        <p className="text-gray-600 text-lg">Overview of bank operations and client management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card bounce-in" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Clients</p>
              <p className="text-3xl font-bold text-gray-900">{clients.length}</p>
              <p className="text-xs text-green-600 mt-1">+{newClientsThisMonth} this month</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="stat-card bounce-in" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Accounts</p>
              <p className="text-3xl font-bold text-gray-900">{accounts.length}</p>
              <p className="text-xs text-blue-600 mt-1">Active accounts</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="stat-card bounce-in" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Transactions</p>
              <p className="text-3xl font-bold text-gray-900">{totalTransactions}</p>
              <p className="text-xs text-purple-600 mt-1">All time</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Receipt className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="stat-card bounce-in" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Balance</p>
              <p className="text-3xl font-bold text-gray-900">${totalBalance.toLocaleString()}</p>
              <p className="text-xs text-yellow-600 mt-1">Under management</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card-hover slide-in" style={{ animationDelay: '500ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Recent Clients</h3>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
              <UserPlus className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <div className="space-y-4">
            {recentClients.map((client, index) => (
              <div key={client.id} className="transaction-item" style={{ animationDelay: `${600 + index * 100}ms` }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{client.first_name} {client.last_name}</p>
                      <p className="text-sm text-gray-500">{client.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">
                      {new Date(client.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex items-center space-x-1 mt-1">
                      <ArrowUpRight className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600">New</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-hover slide-in" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Recent Transactions</h3>
            <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <div key={transaction.id} className="transaction-item" style={{ animationDelay: `${700 + index * 100}ms` }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.amount > 0 
                        ? 'bg-gradient-to-br from-green-100 to-green-200' 
                        : 'bg-gradient-to-br from-red-100 to-red-200'
                    }`}>
                      <Receipt className={`w-5 h-5 ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-500 capitalize">{transaction.type}</p>
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
        </div>
      </div>

      <div className="card-hover slide-in" style={{ animationDelay: '800ms' }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Quick Actions</h3>
          <TrendingUp className="w-6 h-6 text-primary-600" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 group">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <UserPlus className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Add Client</p>
                <p className="text-sm text-gray-500">Register new client</p>
              </div>
            </div>
          </button>
          
          <button className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 hover:from-green-100 hover:to-green-200 transition-all duration-200 group">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Create Account</p>
                <p className="text-sm text-gray-500">Open new account</p>
              </div>
            </div>
          </button>
          
          <button className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:from-purple-100 hover:to-purple-200 transition-all duration-200 group">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Receipt className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">View Reports</p>
                <p className="text-sm text-gray-500">Analytics & insights</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard 