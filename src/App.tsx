import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { BankProvider } from './context/BankContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/admin/Dashboard'
import AdminClients from './pages/admin/Clients'
import AdminAccounts from './pages/admin/Accounts'
import AdminTransactions from './pages/admin/Transactions'
import AdminDeposit from './pages/admin/Deposit'
import AdminWithdrawal from './pages/admin/Withdrawal'
import AdminDomesticTransfer from './pages/admin/DomesticTransfer'
import AdminWireTransfer from './pages/admin/WireTransfer'
import AdminLoans from './pages/admin/Loans'
import ClientDashboard from './pages/client/Dashboard'
import ClientAccounts from './pages/client/Accounts'
import ClientTransactions from './pages/client/Transactions'
import ClientProfile from './pages/client/Profile'
import ClientCards from './pages/client/Cards'
import ClientWallet from './pages/client/Wallet'
import ClientDeposit from './pages/client/Deposit'
import ClientWithdrawal from './pages/client/Withdrawal'
import ClientDomesticTransfer from './pages/client/DomesticTransfer'
import ClientWireTransfer from './pages/client/WireTransfer'
import ClientLoans from './pages/client/Loans'
import AdminLayout from './layouts/AdminLayout'
import ClientLayout from './layouts/ClientLayout'
import './index.css'

function App() {
  return (
    <BankProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Root route - redirect to website */}
              <Route path="/" element={
                <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
                  <div className="text-center text-white">
                    <img src="/meridian-logo.svg" alt="Meridian Bank" className="w-16 h-16 mx-auto mb-6" />
                    <h1 className="text-4xl font-bold mb-4">Meridian Bank</h1>
                    <p className="text-xl mb-8">Welcome to our banking platform</p>
                    <div className="space-y-4">
                      <a 
                        href="/website.html" 
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
                      >
                        Visit Our Website
                      </a>
                      <br />
                      <a 
                        href="/app" 
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
                      >
                        Online Banking
                      </a>
                    </div>
                  </div>
                </div>
              } />
              
              {/* App routes - Login */}
              <Route path="/app" element={<Login />} />
              <Route path="/app/login" element={<Login />} />
              
              {/* Admin routes with layout */}
              <Route path="/app/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="clients" element={<AdminClients />} />
                <Route path="accounts" element={<AdminAccounts />} />
                <Route path="transactions" element={<AdminTransactions />} />
                <Route path="deposit" element={<AdminDeposit />} />
                <Route path="withdrawal" element={<AdminWithdrawal />} />
                <Route path="domestic-transfer" element={<AdminDomesticTransfer />} />
                <Route path="wire-transfer" element={<AdminWireTransfer />} />
                <Route path="loans" element={<AdminLoans />} />
              </Route>
              
              {/* Client routes with layout */}
              <Route path="/app/client" element={<ClientLayout />}>
                <Route index element={<ClientDashboard />} />
                <Route path="accounts" element={<ClientAccounts />} />
                <Route path="transactions" element={<ClientTransactions />} />
                <Route path="profile" element={<ClientProfile />} />
                <Route path="cards" element={<ClientCards />} />
                <Route path="wallet" element={<ClientWallet />} />
                <Route path="deposit" element={<ClientDeposit />} />
                <Route path="withdrawal" element={<ClientWithdrawal />} />
                <Route path="domestic-transfer" element={<ClientDomesticTransfer />} />
                <Route path="wire-transfer" element={<ClientWireTransfer />} />
                <Route path="loans" element={<ClientLoans />} />
              </Route>
              
              {/* Legacy routes for backward compatibility */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/accounts" element={<ClientAccounts />} />
              <Route path="/transactions" element={<ClientTransactions />} />
              <Route path="/profile" element={<ClientProfile />} />
              <Route path="/cards" element={<ClientCards />} />
              <Route path="/wallet" element={<ClientWallet />} />
              <Route path="/deposit" element={<ClientDeposit />} />
              <Route path="/withdrawal" element={<ClientWithdrawal />} />
              <Route path="/domestic-transfer" element={<ClientDomesticTransfer />} />
              <Route path="/wire-transfer" element={<ClientWireTransfer />} />
              <Route path="/loans" element={<ClientLoans />} />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/app" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </BankProvider>
  )
}

export default App 