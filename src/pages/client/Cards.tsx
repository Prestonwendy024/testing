import React, { useState } from 'react'
import { Eye, EyeOff, Lock, Unlock, Plus } from 'lucide-react'

const ClientCards: React.FC = () => {
  const [showCardNumbers, setShowCardNumbers] = useState(false)

  const cards = [
    {
      id: 1,
      type: 'Credit',
      name: 'Meridian Platinum',
      number: '4532 **** **** 1234',
      fullNumber: '4532 1234 5678 1234',
      expiry: '12/25',
      cvv: '123',
      balance: 25000,
      limit: 50000,
      status: 'active'
    },
    {
      id: 2,
      type: 'Debit',
      name: 'Meridian Debit',
      number: '5678 **** **** 5678',
      fullNumber: '5678 9012 3456 5678',
      expiry: '08/26',
      cvv: '456',
      balance: 12500,
      limit: 0,
      status: 'active'
    },
    {
      id: 3,
      type: 'Credit',
      name: 'Meridian Rewards',
      number: '7890 **** **** 9012',
      fullNumber: '7890 3456 7890 9012',
      expiry: '03/27',
      cvv: '789',
      balance: 8000,
      limit: 15000,
      status: 'locked'
    }
  ]

  const toggleCardNumbers = () => {
    setShowCardNumbers(!showCardNumbers)
  }

  return (
    <div className="min-h-full bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Your Cards</h1>
              <p className="text-gray-600">Manage your credit and debit cards</p>
            </div>
            <button className="flex items-center space-x-2 btn-primary">
              <Plus className="w-4 h-4" />
              <span>Add Card</span>
            </button>
          </div>
        </div>

        {/* Card Visibility Toggle */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {showCardNumbers ? (
                <EyeOff className="w-5 h-5 text-gray-600" />
              ) : (
                <Eye className="w-5 h-5 text-gray-600" />
              )}
              <span className="text-sm font-medium text-gray-700">Card Numbers</span>
            </div>
            <button
              onClick={toggleCardNumbers}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {showCardNumbers ? 'Hide' : 'Show'} Numbers
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div key={card.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Card Header */}
              <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{card.name}</h3>
                  <div className="flex items-center space-x-2">
                    {card.status === 'locked' ? (
                      <Lock className="w-4 h-4" />
                    ) : (
                      <Unlock className="w-4 h-4" />
                    )}
                    <span className="text-xs uppercase tracking-wide">
                      {card.status}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-300">Card Number</p>
                  <p className="font-mono text-lg">
                    {showCardNumbers ? card.fullNumber : card.number}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <p className="text-xs text-gray-300">Expires</p>
                    <p className="text-sm font-medium">{card.expiry}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">CVV</p>
                    <p className="text-sm font-medium">
                      {showCardNumbers ? card.cvv : '***'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">Type</p>
                    <p className="text-sm font-medium">{card.type}</p>
                  </div>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Current Balance</span>
                  <span className="font-semibold text-gray-900">
                    ${card.balance.toLocaleString()}
                  </span>
                </div>
                
                {card.type === 'Credit' && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Credit Limit</span>
                    <span className="font-semibold text-gray-900">
                      ${card.limit.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Available</span>
                  <span className="font-semibold text-gray-900">
                    ${card.type === 'Credit' ? (card.limit - card.balance) : card.balance}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-4 border-t border-gray-200">
                  <button className="flex-1 btn-primary py-2 px-3 rounded-lg text-sm font-medium">
                    View Details
                  </button>
                  <button className="flex-1 btn-warning py-2 px-3 rounded-lg text-sm font-medium">
                    {card.status === 'locked' ? 'Unlock' : 'Lock'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Card Statistics */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Card Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {cards.filter(c => c.type === 'Credit').length}
              </p>
              <p className="text-sm text-gray-600">Credit Cards</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {cards.filter(c => c.type === 'Debit').length}
              </p>
              <p className="text-sm text-gray-600">Debit Cards</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                ${cards.reduce((sum, card) => sum + card.balance, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Balance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientCards 