const Dashboard = () => {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Welcome back, John!</h2>
        <p className="text-gray-600">Here's a summary of your accounts and recent activity.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-1">Total Balance</h3>
          <p className="text-2xl font-bold text-primary-600">$12,500.00</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-1">Savings Account</h3>
          <p className="text-xl font-bold text-green-600">$8,200.00</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-1">Checking Account</h3>
          <p className="text-xl font-bold text-blue-600">$4,300.00</p>
        </div>
      </div>
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <ul className="divide-y divide-gray-100">
          <li className="py-2 flex justify-between">
            <span>Starbucks</span>
            <span className="text-red-500">- $5.50</span>
          </li>
          <li className="py-2 flex justify-between">
            <span>Salary</span>
            <span className="text-green-500">+ $2,000.00</span>
          </li>
          <li className="py-2 flex justify-between">
            <span>Amazon</span>
            <span className="text-red-500">- $120.00</span>
          </li>
        </ul>
      </div>
      <div className="flex space-x-4">
        <button className="btn-primary">Transfer Money</button>
        <button className="btn-secondary">Pay Bills</button>
      </div>
    </div>
  )
}

export default Dashboard 