import React, { useState } from 'react'
import { useBank } from '../../context/BankContext'
import { Receipt, User, CreditCard, Calendar, Edit, X } from 'lucide-react'

type TransactionType = 'deposit' | 'fee' | 'withdrawal' | 'transfer' | 'payment'

const AdminTransactions = () => {
  const { transactions, accounts, clients, addTransaction, updateTransaction, deleteTransaction } = useBank()
  const [editingTransaction, setEditingTransaction] = useState<any>(null)
  const [editForm, setEditForm] = useState<{ description: string; amount: string; transaction_type: TransactionType | '' }>({
    description: '',
    amount: '',
    transaction_type: ''
  })
  const [showAddForm, setShowAddForm] = useState(false)
  const [addForm, setAddForm] = useState<{ account_id: string; transaction_type: TransactionType | ''; description: string; amount: string }>({
    account_id: '',
    transaction_type: '',
    description: '',
    amount: ''
  })
  const [addFormError, setAddFormError] = useState<string | null>(null)

  const getAccountInfo = (accountId: string) => {
    const account = accounts.find(a => a.id === accountId)
    if (!account) return { accountNumber: 'Unknown', clientName: 'Unknown' }
    const client = clients.find(c => c.id === account.client_id)
    return {
      accountNumber: account.account_number,
      clientName: client ? `${client.first_name} ${client.last_name}` : 'Unknown'
    }
  }

  const handleEdit = (transaction: any) => {
    setEditingTransaction(transaction)
    setEditForm({
      description: transaction.description,
      amount: transaction.amount.toString(),
      transaction_type: transaction.transaction_type as TransactionType
    })
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setAddFormError(null)
    if (!addForm.transaction_type) {
      setAddFormError('Please select a transaction type.')
      return
    }
    await addTransaction({
      account_id: addForm.account_id,
      transaction_type: addForm.transaction_type as TransactionType,
      description: addForm.description,
      amount: parseFloat(addForm.amount),
      currency: 'USD',
      status: 'completed',
      reference_number: 'REF' + Date.now() + Math.floor(Math.random() * 1000),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    setShowAddForm(false)
    setAddForm({ account_id: '', transaction_type: '', description: '', amount: '' })
  }

  const handleSave = async () => {
    await updateTransaction(editingTransaction.id, {
      transaction_type: editForm.transaction_type as TransactionType,
      description: editForm.description,
      amount: parseFloat(editForm.amount)
    })
    setEditingTransaction(null)
    setEditForm({ description: '', amount: '', transaction_type: '' })
  }

  const handleCancel = () => {
    setEditingTransaction(null)
    setEditForm({ description: '', amount: '', transaction_type: '' })
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Transaction History</h2>
        <p className="text-gray-600">View and edit all transactions across all accounts.</p>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Account</th>
                <th className="text-left py-2">Client</th>
                <th className="text-left py-2">Type</th>
                <th className="text-left py-2">Description</th>
                <th className="text-left py-2">Amount</th>
                <th className="text-left py-2">Balance</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => {
                const accountInfo = getAccountInfo(transaction.account_id)
                return (
                  <tr key={transaction.id} className="border-b">
                    <td className="py-3">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{new Date(transaction.created_at).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        <span className="font-mono">{accountInfo.accountNumber}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span>{accountInfo.clientName}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.transaction_type === 'deposit' 
                          ? 'bg-green-100 text-green-800'
                          : transaction.transaction_type === 'withdrawal'
                          ? 'bg-red-100 text-red-800'
                          : transaction.transaction_type === 'transfer'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {transaction.transaction_type}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center space-x-2">
                        <Receipt className="w-4 h-4 text-gray-400" />
                        <span>{transaction.description}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`font-medium ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}${transaction.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="font-medium">N/A</span>
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => handleEdit(transaction)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        <span className="text-sm">Edit</span>
                      </button>
                      <button
                        onClick={async () => { if (window.confirm('Delete this transaction?')) await deleteTransaction(transaction.id) }}
                        className="flex items-center space-x-1 text-red-600 hover:text-red-900 transition-colors ml-2"
                      >
                        <X className="w-4 h-4" />
                        <span className="text-sm">Delete</span>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Edit Transaction</h3>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transaction Type
                </label>
                <select
                  value={editForm.transaction_type}
                  onChange={(e) => setEditForm({ ...editForm, transaction_type: e.target.value as TransactionType })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="deposit">Deposit</option>
                  <option value="withdrawal">Withdrawal</option>
                  <option value="transfer">Transfer</option>
                  <option value="payment">Payment</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  value={editForm.amount}
                  onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 btn-primary"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Transaction Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add Transaction</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account</label>
                <select
                  value={addForm.account_id}
                  onChange={e => setAddForm({ ...addForm, account_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                >
                  <option value="">Select account</option>
                  {accounts.map(account => (
                    <option key={account.id} value={account.id}>
                      {account.account_type} - {account.account_number}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
                <select
                  value={addForm.transaction_type}
                  onChange={e => setAddForm({ ...addForm, transaction_type: e.target.value as TransactionType })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                >
                  <option value="" disabled>Select type...</option>
                  <option value="deposit">Deposit</option>
                  <option value="withdrawal">Withdrawal</option>
                  <option value="transfer">Transfer</option>
                  <option value="payment">Payment</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={addForm.description}
                  onChange={e => setAddForm({ ...addForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  value={addForm.amount}
                  onChange={e => setAddForm({ ...addForm, amount: e.target.value })}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
              </div>
              {addFormError && <div className="text-red-600 text-sm">{addFormError}</div>}
              <div className="flex space-x-3 mt-6">
                <button type="submit" className="flex-1 btn-primary">Add Transaction</button>
                <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add a button to open the add transaction modal */}
      <div className="flex justify-end mb-4">
        <button onClick={() => setShowAddForm(true)} className="btn-primary">Add Transaction</button>
      </div>
    </div>
  )
}

export default AdminTransactions 