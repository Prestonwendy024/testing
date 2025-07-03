const Accounts = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Your Accounts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold">Savings Account</h3>
          <p className="text-gray-500 text-sm mb-2">Account No: 1234567890</p>
          <p className="text-2xl font-bold text-green-600 mb-2">$8,200.00</p>
          <p className="text-gray-600">Interest Rate: 2.5% p.a.</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold">Checking Account</h3>
          <p className="text-gray-500 text-sm mb-2">Account No: 9876543210</p>
          <p className="text-2xl font-bold text-blue-600 mb-2">$4,300.00</p>
          <p className="text-gray-600">No interest</p>
        </div>
      </div>
    </div>
  )
}

export default Accounts 