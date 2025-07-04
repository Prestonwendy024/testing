import { useState } from 'react'
import { useBank } from '../../context/BankContext'
import { Plus, CreditCard, User, DollarSign, Shield, X, Calendar, Edit, Trash2 } from 'lucide-react'

const AdminAccounts = () => {
  const { clients, accounts, addAccount, addTransaction, updateClient, deleteAccount, transactions } = useBank()
  const [showAddForm, setShowAddForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    client_id: '',
    account_type: 'savings' as 'savings' | 'checking' | 'credit' | 'investment',
    balance: '',
    interest_rate: '',
    currency: 'USD',
    status: 'active' as 'active' | 'inactive' | 'frozen' | 'closed',
    overdraft_limit: '',
    monthly_fee: '',
    account_number: '',
    password: '',
    pin: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const generateAccountNumber = () => {
    const accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000
    setFormData(prev => ({
      ...prev,
      account_number: accountNumber.toString()
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const initialBalance = parseFloat(formData.balance)
    const accountNumber = formData.account_number || Math.floor(Math.random() * 9000000000) + 1000000000
    
    // Check if client already has password or pin
    const client = clients.find(c => c.id === formData.client_id)
    console.log('Selected client:', client)
    if (client) {
      const updates: any = {}
      if (!client.password && formData.password) updates.password = formData.password
      if (!client.pin && formData.pin) updates.pin = formData.pin
      console.log('Updates to apply:', updates)
      if (Object.keys(updates).length > 0) {
        try {
          await updateClient(client.id, updates)
          console.log('Client updated successfully')
        } catch (err) {
          console.error('Error updating client:', err)
        }
      }
    }

    // Create the account and get the new account object
    const newAccount = await addAccount({
      account_number: accountNumber.toString(),
      client_id: formData.client_id,
      account_type: formData.account_type,
      balance: initialBalance,
      interest_rate: formData.account_type === 'savings' || formData.account_type === 'credit' ? parseFloat(formData.interest_rate) : null,
      status: formData.status,
      currency: formData.currency,
      overdraft_limit: formData.overdraft_limit ? parseFloat(formData.overdraft_limit) : null,
      monthly_fee: formData.monthly_fee ? parseFloat(formData.monthly_fee) : null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })

    // If initial balance > 0, create an initial deposit transaction
    if (initialBalance > 0 && newAccount?.id) {
      await addTransaction({
        account_id: newAccount.id,
        transaction_type: 'deposit',
        amount: initialBalance,
        currency: formData.currency,
        description: 'Initial deposit',
        reference_number: `DEP${Date.now()}`,
        status: 'completed',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    }

    // After account creation, update the client's account_number
    if (client && !client.account_number) {
      await updateClient(formData.client_id, { account_number: accountNumber.toString() })
    }

    // Reset form
    setFormData({
      client_id: '',
      account_type: 'savings',
      balance: '',
      interest_rate: '',
      currency: 'USD',
      status: 'active',
      overdraft_limit: '',
      monthly_fee: '',
      account_number: '',
      password: '',
      pin: ''
    })
    
    setIsLoading(false)
    setShowAddForm(false)
  }

  const resetForm = () => {
    setFormData({
      client_id: '',
      account_type: 'savings',
      balance: '',
      interest_rate: '',
      currency: 'USD',
      status: 'active',
      overdraft_limit: '',
      monthly_fee: '',
      account_number: '',
      password: '',
      pin: ''
    })
    setShowAddForm(false)
  }

  // Add a helper to calculate balance from transactions
  const getAccountBalance = (accountId: string) => {
    return transactions
      .filter(t => t.account_id === accountId)
      .reduce((sum, t) => sum + t.amount, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Account Management</h1>
            <p className="text-gray-600">Create and manage client accounts</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Account</span>
          </button>
        </div>

        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-white">Create New Account</h2>
                  <p className="text-gray-300 text-sm">Complete account setup form</p>
                </div>
                <button
                  onClick={resetForm}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Account Information */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Account Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Client *
                        </label>
                        <select
                          name="client_id"
                          value={formData.client_id}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        >
                          <option value="">Select a client</option>
                          {clients.map((client) => (
                            <option key={client.id} value={client.id}>
                              {client.first_name} {client.last_name} ({client.email})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Account Type *
                        </label>
                        <select
                          name="account_type"
                          value={formData.account_type}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        >
                          <option value="savings">Savings Account</option>
                          <option value="checking">Checking Account</option>
                          <option value="credit">Credit Account</option>
                          <option value="investment">Investment Account</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Account Number
                        </label>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            name="account_number"
                            value={formData.account_number}
                            onChange={handleInputChange}
                            placeholder="Auto-generated"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          />
                          <button
                            type="button"
                            onClick={generateAccountNumber}
                            className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                          >
                            Generate
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Currency *
                        </label>
                        <select
                          name="currency"
                          value={formData.currency}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        >
                          <option value="USD">USD - US Dollar</option>
                          <option value="EUR">EUR - Euro</option>
                          <option value="GBP">GBP - British Pound</option>
                          <option value="CAD">CAD - Canadian Dollar</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Set password for client"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">PIN</label>
                        <input
                          type="password"
                          name="pin"
                          value={formData.pin}
                          onChange={handleInputChange}
                          maxLength={4}
                          pattern="[0-9]{4}"
                          placeholder="4-digit PIN"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Financial Details */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Financial Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Initial Balance *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-gray-500">$</span>
                          <input
                            type="number"
                            name="balance"
                            value={formData.balance}
                            onChange={handleInputChange}
                            required
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      {(formData.account_type === 'savings' || formData.account_type === 'credit') && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Interest Rate (%)
                          </label>
                          <input
                            type="number"
                            name="interest_rate"
                            value={formData.interest_rate}
                            onChange={handleInputChange}
                            step="0.01"
                            min="0"
                            max="20"
                            placeholder="0.00"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          />
                        </div>
                      )}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Overdraft Limit
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-gray-500">$</span>
                          <input
                            type="number"
                            name="overdraft_limit"
                            value={formData.overdraft_limit}
                            onChange={handleInputChange}
                            min="0"
                            step="100"
                            placeholder="0.00"
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Monthly Fee
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-gray-500">$</span>
                          <input
                            type="number"
                            name="monthly_fee"
                            value={formData.monthly_fee}
                            onChange={handleInputChange}
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Account Status */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Account Status
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Account Status
                        </label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="frozen">Frozen</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Account Summary */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-blue-800 mb-2">Account Summary</h3>
                    <div className="space-y-1 text-sm text-blue-700">
                      <div className="flex justify-between">
                        <span>Account Type:</span>
                        <span className="capitalize">{formData.account_type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Currency:</span>
                        <span>{formData.currency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Initial Balance:</span>
                        <span>${formData.balance || '0.00'}</span>
                      </div>
                      {formData.interest_rate && (
                        <div className="flex justify-between">
                          <span>Interest Rate:</span>
                          <span>{formData.interest_rate}%</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="capitalize">{formData.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex space-x-4 pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Creating Account...
                        </div>
                      ) : (
                        'Create Account'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Accounts Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <h3 className="text-lg font-semibold text-white">All Accounts</h3>
            <p className="text-gray-300 text-sm">Manage and view account information</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Account</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Client</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Type</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Balance</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Created</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {accounts.map((account) => {
                  const client = clients.find(c => c.id === account.client_id)
                  return (
                    <tr key={account.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-gray-500" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 font-mono">{account.account_number}</div>
                            <div className="text-sm text-gray-500">{account.currency}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{client ? `${client.first_name} ${client.last_name}` : 'Unknown'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          account.account_type === 'savings' ? 'bg-green-100 text-green-800' :
                          account.account_type === 'checking' ? 'bg-blue-100 text-blue-800' :
                          account.account_type === 'credit' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {account.account_type.charAt(0).toUpperCase() + account.account_type.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">${getAccountBalance(account.id).toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          account.status === 'active' ? 'bg-green-100 text-green-800' :
                          account.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                          account.status === 'frozen' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{new Date(account.created_at).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 flex space-x-2">
                        <button
                          className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Account"
                          onClick={() => {
                            setFormData({
                              client_id: account.client_id,
                              account_type: account.account_type,
                              balance: account.balance.toString(),
                              interest_rate: account.interest_rate?.toString() || '',
                              currency: account.currency,
                              status: account.status,
                              overdraft_limit: account.overdraft_limit?.toString() || '',
                              monthly_fee: account.monthly_fee?.toString() || '',
                              account_number: account.account_number,
                              password: '',
                              pin: ''
                            })
                            setShowAddForm(true)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Account"
                          onClick={async () => {
                            if (window.confirm('Are you sure you want to delete this account?')) {
                              await deleteAccount(account.id)
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminAccounts 