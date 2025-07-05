import { useState } from 'react'
import { useBank } from '../../context/BankContext'
import { Client } from '../../types'
import { Plus, User, Mail, Phone, MapPin, Calendar, X } from 'lucide-react'

const AdminClients = () => {
  const { clients, addClient, addAccount, updateClient, deleteClient } = useBank()
  const [showAddForm, setShowAddForm] = useState(false)
  const [showAccountForm, setShowAccountForm] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    ssn: '',
    employment_status: '',
    employer_name: '',
    job_title: '',
    annual_income: '',
    kyc_status: 'pending',
    risk_level: 'medium',
    profile_image_url: '',
  })
  const [accountFormData, setAccountFormData] = useState({
    account_type: 'checking' as 'checking' | 'savings' | 'credit' | 'investment',
    balance: '',
    currency: 'USD',
    status: 'active' as 'active' | 'inactive' | 'frozen' | 'closed'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      if (editingClient) {
        await updateClient(editingClient.id, {
          ...formData,
          annual_income: formData.annual_income ? parseFloat(formData.annual_income) : 0,
          updated_at: new Date().toISOString(),
          kyc_status: formData.kyc_status as 'pending' | 'approved' | 'rejected',
          risk_level: formData.risk_level as 'low' | 'medium' | 'high',
        })
      } else {
        const clientData = {
          ...formData,
          annual_income: formData.annual_income ? parseFloat(formData.annual_income) : 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          kyc_status: formData.kyc_status as 'pending' | 'approved' | 'rejected',
          risk_level: formData.risk_level as 'low' | 'medium' | 'high',
        }
        
        await addClient(clientData)
      }
      
      // Reset form only on success
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        date_of_birth: '',
        address: '',
        city: '',
        state: '',
        zip_code: '',
        country: '',
        ssn: '',
        employment_status: '',
        employer_name: '',
        job_title: '',
        annual_income: '',
        kyc_status: 'pending',
        risk_level: 'medium',
        profile_image_url: '',
      })
      setShowAddForm(false)
      setEditingClient(null)
    } catch (error) {
      console.error('Failed to save client:', error)
      alert('Failed to save client. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      date_of_birth: '',
      address: '',
      city: '',
      state: '',
      zip_code: '',
      country: '',
      ssn: '',
      employment_status: '',
      employer_name: '',
      job_title: '',
      annual_income: '',
      kyc_status: 'pending',
      risk_level: 'medium',
      profile_image_url: '',
    })
    setShowAddForm(false)
    setEditingClient(null)
  }

  const generateAccountNumber = () => {
    // Generate a random 8-digit account number
    return 'ACC' + Math.random().toString().slice(2, 10)
  }

  const handleCreateAccount = (client: Client) => {
    setSelectedClient(client)
    setAccountFormData({
      account_type: 'checking',
      balance: '',
      currency: 'USD',
      status: 'active'
    })
    setShowAccountForm(true)
  }

  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedClient) return
    
    setIsLoading(true)
    
    try {
      const accountNumber = generateAccountNumber()
      const accountData = {
        client_id: selectedClient.id,
        account_number: accountNumber,
        account_type: accountFormData.account_type,
        balance: parseFloat(accountFormData.balance) || 0,
        currency: accountFormData.currency,
        status: accountFormData.status,
        interest_rate: null,
        overdraft_limit: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      
      // Create account
      await addAccount(accountData)
      
      // Only set account_number for the client if not already set
      if (!selectedClient.account_number) {
        await updateClient(selectedClient.id, { account_number: accountNumber })
      }
      
      // Send email to client (mock)
      console.log(`Email sent to ${selectedClient.email} with account number: ${accountNumber}`)
      
      setShowAccountForm(false)
      setSelectedClient(null)
      alert(`Account created successfully! Account number: ${accountNumber}\nEmail sent to ${selectedClient.email}`)
    } catch (error) {
      console.error('Failed to create account:', error)
      alert('Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
            <p className="text-gray-600">Manage client accounts and information</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Client</span>
          </button>
        </div>

        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-white">Add New Client</h2>
                  <p className="text-gray-300 text-sm">Complete client onboarding form</p>
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
                  {/* Personal Information */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                        <input
                          type="text"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter first name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                        <input
                          type="text"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter last name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter email address"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter phone number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                        <input
                          type="date"
                          name="date_of_birth"
                          value={formData.date_of_birth}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Enter address"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Enter city"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="Enter state"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                        <input
                          type="text"
                          name="zip_code"
                          value={formData.zip_code}
                          onChange={handleInputChange}
                          placeholder="Enter zip code"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          placeholder="Enter country"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">SSN</label>
                        <input
                          type="text"
                          name="ssn"
                          value={formData.ssn}
                          onChange={handleInputChange}
                          placeholder="Enter SSN"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Employment Status</label>
                        <input
                          type="text"
                          name="employment_status"
                          value={formData.employment_status}
                          onChange={handleInputChange}
                          placeholder="Enter employment status"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Employer Name</label>
                        <input
                          type="text"
                          name="employer_name"
                          value={formData.employer_name}
                          onChange={handleInputChange}
                          placeholder="Enter employer name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                        <input
                          type="text"
                          name="job_title"
                          value={formData.job_title}
                          onChange={handleInputChange}
                          placeholder="Enter job title"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income</label>
                        <input
                          type="number"
                          name="annual_income"
                          value={formData.annual_income}
                          onChange={handleInputChange}
                          placeholder="0"
                          min="0"
                          step="1000"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">KYC Status</label>
                        <select
                          name="kyc_status"
                          value={formData.kyc_status}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Risk Level</label>
                        <select
                          name="risk_level"
                          value={formData.risk_level}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        >
                          <option value="low">Low Risk</option>
                          <option value="medium">Medium Risk</option>
                          <option value="high">High Risk</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
                        {formData.profile_image_url && (
                          <img
                            src={formData.profile_image_url}
                            alt="Profile Preview"
                            className="w-20 h-20 object-cover rounded-full mb-2 border"
                          />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              const reader = new FileReader()
                              reader.onload = (ev) => {
                                setFormData(prev => ({ ...prev, profile_image_url: ev.target?.result as string }))
                              }
                              reader.readAsDataURL(file)
                            }
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
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
                          Saving Client...
                        </div>
                      ) : (
                        'Save Client'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Clients Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <h3 className="text-lg font-semibold text-white">All Clients</h3>
            <p className="text-gray-300 text-sm">Manage and view client information</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Client</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Contact</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Location</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">KYC Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Risk Level</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Joined</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        {client.profile_image_url ? (
                          <img
                            src={client.profile_image_url}
                            alt={client.first_name}
                            className="w-10 h-10 object-cover rounded-full border"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-500" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{client.first_name} {client.last_name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{client.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{client.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm truncate max-w-xs">{client.address}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        client.kyc_status === 'approved' ? 'bg-green-100 text-green-800' :
                        client.kyc_status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {client.kyc_status.charAt(0).toUpperCase() + client.kyc_status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        client.risk_level === 'low' ? 'bg-green-100 text-green-800' :
                        client.risk_level === 'high' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {client.risk_level.charAt(0).toUpperCase() + client.risk_level.slice(1)} Risk
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{new Date(client.created_at).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        {!client.account_number ? (
                          <button
                            onClick={() => handleCreateAccount(client)}
                            className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Create Account
                          </button>
                        ) : (
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-lg">
                            {client.account_number}
                          </span>
                        )}
                        <button
                          className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-lg hover:bg-yellow-200 transition-colors"
                          title="Edit Client"
                          onClick={() => {
                            setEditingClient(client)
                            setFormData({
                              first_name: client.first_name,
                              last_name: client.last_name,
                              email: client.email,
                              phone: client.phone,
                              date_of_birth: client.date_of_birth || '',
                              address: client.address || '',
                              city: client.city || '',
                              state: client.state || '',
                              zip_code: client.zip_code || '',
                              country: client.country || '',
                              ssn: client.ssn || '',
                              employment_status: client.employment_status || '',
                              employer_name: client.employer_name || '',
                              job_title: client.job_title || '',
                              annual_income: client.annual_income?.toString() || '',
                              kyc_status: client.kyc_status || 'pending',
                              risk_level: client.risk_level || 'medium',
                              profile_image_url: client.profile_image_url || '',
                            })
                            setShowAddForm(true)
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-lg hover:bg-red-200 transition-colors"
                          title="Delete Client"
                          onClick={async () => {
                            if (window.confirm('Are you sure you want to delete this client?')) {
                              await deleteClient(client.id)
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Account Creation Modal */}
        {showAccountForm && selectedClient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-white">Create Account</h2>
                  <p className="text-gray-300 text-sm">Create account for {selectedClient.first_name} {selectedClient.last_name}</p>
                </div>
                <button
                  onClick={() => setShowAccountForm(false)}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                <form onSubmit={handleAccountSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                    <select
                      value={accountFormData.account_type}
                      onChange={(e) => setAccountFormData(prev => ({ ...prev, account_type: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    >
                      <option value="checking">Checking</option>
                      <option value="savings">Savings</option>
                      <option value="credit">Credit</option>
                      <option value="investment">Investment</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Initial Balance</label>
                    <input
                      type="number"
                      value={accountFormData.balance}
                      onChange={(e) => setAccountFormData(prev => ({ ...prev, balance: e.target.value }))}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select
                      value={accountFormData.currency}
                      onChange={(e) => setAccountFormData(prev => ({ ...prev, currency: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={accountFormData.status}
                      onChange={(e) => setAccountFormData(prev => ({ ...prev, status: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="frozen">Frozen</option>
                    </select>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Creating...
                        </div>
                      ) : (
                        'Create Account'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAccountForm(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminClients 