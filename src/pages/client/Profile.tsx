import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useBank } from '../../context/BankContext'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  CreditCard, 
  Settings, 
  Edit, 
  Camera,
  CheckCircle,
  AlertCircle,
  Star,
  Award,
  TrendingUp,
  Lock,
  Eye,
  EyeOff,
  Save,
  X,
  Upload,
  Building2,
  Globe,
  Briefcase,
  DollarSign,
  FileText
} from 'lucide-react'

const Profile: React.FC = () => {
  const { user, updateProfile, uploadProfileImage } = useAuth()
  const { getClientAccounts } = useBank()
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState('personal')
  const [uploadingImage, setUploadingImage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const userAccounts = getClientAccounts(user?.id || '')

  // Enhanced profile data
  const profileData = {
    personal: {
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ').slice(1).join(' ') || '',
      email: user?.email || '',
      phone: user?.phone || '',
      dateOfBirth: user?.dateOfBirth || '',
      address: user?.address || '',
      ssn: user?.ssn || '',
      nationality: user?.nationality || '',
      occupation: user?.occupation || '',
      employer: user?.employer || '',
      annualIncome: user?.annualIncome || 0
    },
    security: {
      twoFactorEnabled: user?.twoFactorEnabled || false,
      lastPasswordChange: '2024-01-15',
      loginHistory: [
        { date: '2024-01-20', location: 'New York, NY', device: 'iPhone 15' },
        { date: '2024-01-19', location: 'New York, NY', device: 'MacBook Pro' },
        { date: '2024-01-18', location: 'San Francisco, CA', device: 'iPhone 15' }
      ]
    },
    preferences: user?.preferences || {
      notifications: {
        email: true,
        sms: false,
        push: true
      },
      privacy: {
        shareData: false,
        marketing: true
      },
      language: 'en',
      timezone: 'America/New_York'
    }
  }

  const [formData, setFormData] = useState(profileData.personal)

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    const fullName = `${formData.firstName} ${formData.lastName}`.trim()
    updateProfile({
      name: fullName,
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      address: formData.address,
      ssn: formData.ssn,
      nationality: formData.nationality,
      occupation: formData.occupation,
      employer: formData.employer,
      annualIncome: formData.annualIncome
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData(profileData.personal)
    setIsEditing(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && user) {
      setIsLoading(true)
      try {
        const imageUrl = await uploadProfileImage(file)
        updateProfile({ profileImage: imageUrl })
      } catch (error) {
        console.error('Error uploading image:', error)
      }
      setIsLoading(false)
    }
  }

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User, color: 'from-indigo-500 to-purple-600' },
    { id: 'security', label: 'Security', icon: Shield, color: 'from-emerald-500 to-teal-600' },
    { id: 'preferences', label: 'Preferences', icon: Settings, color: 'from-amber-500 to-orange-600' },
    { id: 'accounts', label: 'Accounts', icon: CreditCard, color: 'from-pink-500 to-rose-600' },
    { id: 'documents', label: 'Documents', icon: FileText, color: 'from-violet-500 to-purple-600' }
  ]

  const profileSections = [
    {
      title: 'Personal Information',
      icon: User,
      fields: [
        { label: 'Full Name', key: 'name', icon: User },
        { label: 'Email Address', key: 'email', icon: Mail },
        { label: 'Phone Number', key: 'phone', icon: Phone },
        { label: 'Date of Birth', key: 'dateOfBirth', icon: Calendar }
      ]
    },
    {
      title: 'Address Information',
      icon: MapPin,
      fields: [
        { label: 'Address', key: 'address', icon: MapPin }
      ]
    },
    {
      title: 'Employment Information',
      icon: Settings,
      fields: [
        { label: 'Occupation', key: 'occupation', icon: Settings },
        { label: 'Employer', key: 'employer', icon: Settings }
      ]
    }
  ]

  return (
    <div className="min-h-full bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
              <p className="text-gray-600">Manage your personal information and preferences</p>
            </div>
            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 btn-primary"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 btn-primary"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Picture */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mx-auto mb-4">
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 btn-primary p-2 rounded-full cursor-pointer hover:bg-gray-700 transition-colors">
                      <Camera className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-sm text-gray-500 mt-2">Account: {user?.accountNumber}</p>
              </div>

              {/* Account Status */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">KYC Status</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user?.kycStatus === 'verified' ? 'bg-green-100 text-green-800' :
                    user?.kycStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {user?.kycStatus?.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {profileSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <section.icon className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.fields.map((field, fieldIndex) => (
                      <div key={fieldIndex}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {field.label}
                        </label>
                        {isEditing ? (
                          <input
                            type={field.key === 'dateOfBirth' ? 'date' : 'text'}
                            value={formData[field.key as keyof typeof formData]}
                            onChange={(e) => setFormData({
                              ...formData,
                              [field.key]: e.target.value
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <field.icon className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-900">
                              {formData[field.key as keyof typeof formData] || 'Not provided'}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile 