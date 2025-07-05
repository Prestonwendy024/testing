import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const [accountNumber, setAccountNumber] = useState('')
  const [password, setPassword] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<'credentials' | 'pin' | 'setup'>('credentials')
  const [verifiedUser, setVerifiedUser] = useState<{ accountNumber: string; name: string } | null>(null)
  const [setupData, setSetupData] = useState({
    accountNumber: '',
    password: '',
    confirmPassword: '',
    pin: '',
    confirmPin: ''
  })
  const { login, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/app/admin')
      } else if (user.role === 'client') {
        navigate('/app/client')
      }
    }
  }, [user, navigate])

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Basic validation
    if (!accountNumber || !password) {
      setError('Account number and password are required')
      setIsLoading(false)
      return
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Use context login to check credentials (password step)
    // We will check password and pin together in the pin step, so just move to pin step if account number and password are filled
    setStep('pin')
    setVerifiedUser({ accountNumber, name: '' })
    setError('')
    setIsLoading(false)
  }

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (!pin) {
      setError('PIN is required')
      setIsLoading(false)
      return
    }

    if (pin.length !== 4 || !/^[0-9]{4}$/.test(pin)) {
      setError('PIN must be exactly 4 digits')
      setIsLoading(false)
      return
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Use context login for full authentication
    const success = login(accountNumber, password, pin)
    if (!success) {
      setError('Invalid account number, password, or PIN')
    }
    setIsLoading(false)
  }

  const handleSetupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Validation
    if (setupData.password !== setupData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (setupData.pin !== setupData.confirmPin) {
      setError('PINs do not match')
      setIsLoading(false)
      return
    }

    if (setupData.pin.length !== 4 || !/^\d+$/.test(setupData.pin)) {
      setError('PIN must be exactly 4 digits')
      setIsLoading(false)
      return
    }

    // Simulate API call to update client with password and PIN
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock success - in real app, this would update the client record with password and PIN
    const success = true
    
    if (success) {
      // Redirect to login with new credentials
      setAccountNumber(setupData.accountNumber)
      setPassword(setupData.password)
      setPin(setupData.pin)
      setStep('credentials')
      setError('')
      alert('Password and PIN setup complete! Please log in with your new credentials.')
    } else {
      setError('Setup failed. Please check your account number and try again.')
    }
    
    setIsLoading(false)
  }

  const handleBackToCredentials = () => {
    setStep('credentials')
    setPin('')
    setVerifiedUser(null)
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 lg:space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4 lg:mb-6">
            <img src="/meridian-logo.svg" alt="Meridian Bank" className="w-12 h-12 lg:w-16 lg:h-16" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Welcome to Meridian Bank</h2>
          <p className="text-sm lg:text-base text-blue-200">
            {step === 'credentials' ? 'Sign in to your account' : 
             step === 'pin' ? 'Enter your PIN' : 
             step === 'setup' ? 'Set up your password and PIN' : 'First time setup'}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 lg:p-8 border border-white/20">
          {step === 'credentials' ? (
            <form className="space-y-6" onSubmit={handleCredentialsSubmit}>
              <div>
                <label htmlFor="accountNumber" className="block text-sm font-medium text-white mb-2">
                  Account Number
                </label>
                <input
                  id="accountNumber"
                  name="accountNumber"
                  type="text"
                  required
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your account number"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  'Continue'
                )}
              </button>
            </form>
          ) : step === 'setup' ? (
            <div className="space-y-6">
              <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-blue-200 font-medium">Password & PIN Setup</p>
                    <p className="text-blue-300 text-sm">Enter your account number from email and create your password and PIN</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSetupSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Account Number (from email) *</label>
                    <input
                      type="text"
                      value={setupData.accountNumber}
                      onChange={(e) => setSetupData(prev => ({ ...prev, accountNumber: e.target.value }))}
                      required
                      placeholder="Enter your account number from email"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Password *</label>
                    <input
                      type="password"
                      value={setupData.password}
                      onChange={(e) => setSetupData(prev => ({ ...prev, password: e.target.value }))}
                      required
                      placeholder="Create a password"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Confirm Password *</label>
                    <input
                      type="password"
                      value={setupData.confirmPassword}
                      onChange={(e) => setSetupData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                      placeholder="Confirm your password"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">PIN *</label>
                    <input
                      type="password"
                      maxLength={4}
                      pattern="[0-9]{4}"
                      value={setupData.pin}
                      onChange={(e) => setSetupData(prev => ({ ...prev, pin: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                      required
                      placeholder="••••"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-center text-2xl tracking-widest"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Confirm PIN *</label>
                    <input
                      type="password"
                      maxLength={4}
                      pattern="[0-9]{4}"
                      value={setupData.confirmPin}
                      onChange={(e) => setSetupData(prev => ({ ...prev, confirmPin: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                      required
                      placeholder="••••"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-center text-2xl tracking-widest"
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mt-4">
                    <p className="text-red-200 text-sm">{error}</p>
                  </div>
                )}

                <div className="flex space-x-4 mt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Setting up...
                      </div>
                    ) : (
                      'Set Password & PIN'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleBackToCredentials}
                    className="px-6 py-3 border border-white/20 text-white rounded-lg font-medium hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200"
                  >
                    Back to Login
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              {/* User verification display */}
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-green-200 font-medium">{verifiedUser?.name}</p>
                    <p className="text-green-300 text-sm">Account: {verifiedUser?.accountNumber}</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handlePinSubmit}>
                <div>
                  <label htmlFor="pin" className="block text-sm font-medium text-white mb-2">
                    Enter your 4-digit PIN
                  </label>
                  <input
                    id="pin"
                    name="pin"
                    type="password"
                    required
                    maxLength={4}
                    pattern="[0-9]{4}"
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-center text-2xl tracking-widest"
                    placeholder="••••"
                    autoFocus
                  />
                </div>

                {error && (
                  <div className="mt-4 bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                    <p className="text-red-200 text-sm">{error}</p>
                  </div>
                )}

                <div className="mt-6 space-y-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Signing in...
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleBackToCredentials}
                    className="w-full bg-white/10 text-white py-2 px-4 rounded-lg font-medium hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                  >
                    ← Back to Credentials
                  </button>
                </div>
              </form>
            </div>
          )}

          
        </div>

        <div className="text-center">
          <p className="text-blue-200 text-sm">
            Need help? Contact our support team
          </p>
        </div>

        
      </div>
    </div>
  )
}

export default Login 