import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const Deposit: React.FC = () => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    toAccount: '',
    amount: '',
    depositMethod: '',
    sourceAccount: '',
    description: '',
    scheduledDate: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [onHold, setOnHold] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 4000))
    
    setIsLoading(false)
    setOnHold(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (onHold) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.366-.446.957-.446 1.323 0l6.518 7.95c.329.401.034.951-.462.951H2.621c-.496 0-.791-.55-.462-.95l6.518-7.951zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V9a1 1 0 112 0v1a1 1 0 01-1 1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Account is on hold</h2>
          <p className="text-gray-600 mb-4">This action cannot be completed at this time.</p>
          <p className="text-sm text-gray-500">Please contact customer support for assistance.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <h1 className="text-xl font-semibold text-white">Online Deposit</h1>
            <p className="text-gray-300 text-sm">Deposit funds to your account electronically</p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deposit To Account
                  </label>
                  <select
                    name="toAccount"
                    value={formData.toAccount}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  >
                    <option value="">Select Account</option>
                    <option value="ACC001">Checking Account (****1234)</option>
                    <option value="ACC002">Savings Account (****5678)</option>
                    <option value="ACC003">Business Account (****9012)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deposit Method
                  </label>
                  <select
                    name="depositMethod"
                    value={formData.depositMethod}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  >
                    <option value="">Select Method</option>
                    <option value="ach">ACH Transfer</option>
                    <option value="wire">Wire Transfer</option>
                    <option value="check">Check Deposit</option>
                    <option value="mobile">Mobile Check</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Source Account (Optional)
                  </label>
                  <input
                    type="text"
                    name="sourceAccount"
                    value={formData.sourceAccount}
                    onChange={handleInputChange}
                    placeholder="External account number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Scheduled Date (Optional)
                  </label>
                  <input
                    type="date"
                    name="scheduledDate"
                    value={formData.scheduledDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deposit Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                    min="0.01"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Enter deposit description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Deposit Summary</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Deposit Fee:</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Time:</span>
                    <span>1-2 business days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Method:</span>
                    <span className="capitalize">{formData.depositMethod || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between font-medium text-gray-900">
                    <span>Total Amount:</span>
                    <span>${formData.amount || '0.00'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Important Information</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• ACH transfers typically process in 1-2 business days</li>
                  <li>• Wire transfers process same day if submitted before 3 PM EST</li>
                  <li>• Mobile check deposits are subject to hold periods</li>
                  <li>• Large deposits may require additional verification</li>
                </ul>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    'Process Deposit'
                  )}
                </button>
                <button
                  type="button"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Deposit 