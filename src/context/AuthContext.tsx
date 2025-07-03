import React, { createContext, useContext, useState, ReactNode } from 'react'
import { User } from '../types'
import { useBank } from './BankContext'

interface AuthContextType {
  user: User | null
  login: (accountNumber: string, password: string, pin: string) => boolean
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
  uploadProfileImage: (file: File) => Promise<string>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const { clients } = useBank();

  const login = (accountNumber: string, password: string, pin: string): boolean => {
    console.log('Clients in AuthContext:', clients);
    // Admin login logic (unchanged)
    if (accountNumber === 'ADMIN001' && password === 'admin123' && pin === '1234') {
      setUser({
        id: '1',
        username: 'admin',
        name: 'Admin User',
        email: 'admin@meridianbank.com',
        role: 'admin',
        accountNumber: 'ADMIN001',
        pin: '1234',
        createdAt: new Date().toISOString(),
        profileImage: '/admin-avatar.jpg',
        phone: '+1 (555) 123-4567',
        address: '123 Financial District, New York, NY 10001',
        dateOfBirth: '1985-03-15',
        ssn: '***-**-1234',
        nationality: 'US',
        occupation: 'Bank Administrator',
        employer: 'Meridian Bank',
        annualIncome: 85000,
        creditScore: 780,
        kycStatus: 'verified',
        twoFactorEnabled: true,
        lastLogin: new Date().toISOString(),
        preferences: {
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
      })
      return true
    }
    // Client login logic
    console.log('Attempting login with:', { accountNumber, password, pin })
    const client = clients.find(
      c => c.account_number === accountNumber && c.password === password && c.pin === pin
    );
    console.log('Matched client:', client)
    if (client) {
      setUser({
        id: client.id,
        username: client.email,
        name: `${client.first_name} ${client.last_name}`,
        email: client.email,
        role: 'client',
        accountNumber: client.account_number,
        pin: client.pin,
        createdAt: client.created_at,
        profileImage: client.profile_image_url ?? undefined,
        phone: client.phone,
        address: client.address,
        dateOfBirth: client.date_of_birth,
        ssn: client.ssn,
        nationality: '',
        occupation: client.employment_status,
        employer: client.employer_name || '',
        annualIncome: client.annual_income,
        creditScore: undefined,
        kycStatus: client.kyc_status === 'approved' ? 'verified' : client.kyc_status,
        twoFactorEnabled: false,
        lastLogin: undefined,
        preferences: {
          notifications: {
            email: true,
            sms: false,
            push: true
          },
          privacy: {
            shareData: false,
            marketing: false
          },
          language: 'en',
          timezone: 'UTC'
        }
      })
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates })
    }
  }

  const uploadProfileImage = async (file: File): Promise<string> => {
    // Mock file upload - in real app, this would upload to a server
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = () => {
        const imageUrl = reader.result as string
        resolve(imageUrl)
      }
      reader.readAsDataURL(file)
    })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile, uploadProfileImage }}>
      {children}
    </AuthContext.Provider>
  )
} 