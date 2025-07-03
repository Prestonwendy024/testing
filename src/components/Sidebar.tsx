import { NavLink } from 'react-router-dom'
import { 
  Home, 
  CreditCard, 
  Receipt, 
  Send, 
  CreditCard as PaymentsIcon, 
  Settings,
  LogOut,
  User
} from 'lucide-react'

const Sidebar = () => {
  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/accounts', icon: CreditCard, label: 'Accounts' },
    { path: '/transactions', icon: Receipt, label: 'Transactions' },
    { path: '/transfer', icon: Send, label: 'Transfer' },
    { path: '/payments', icon: PaymentsIcon, label: 'Payments' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <img src="/meridian-logo.svg" alt="Meridian Bank" className="w-8 h-8" />
          <h1 className="text-xl font-bold text-gray-900">Meridian Bank</h1>
        </div>
      </div>

      <nav className="mt-6">
        <div className="px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 rounded-lg mb-1 transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">Premium Customer</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 text-sm">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar 