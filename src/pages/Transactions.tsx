const Transactions = () => {
  const transactions = [
    { date: '2024-06-01', description: 'Starbucks', amount: -5.5 },
    { date: '2024-05-30', description: 'Salary', amount: 2000 },
    { date: '2024-05-28', description: 'Amazon', amount: -120 },
    { date: '2024-05-25', description: 'Electricity Bill', amount: -60 },
    { date: '2024-05-20', description: 'Transfer from John', amount: 500 },
  ]
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Recent Transactions</h2>
      <div className="card">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2">Date</th>
              <th className="py-2">Description</th>
              <th className="py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, idx) => (
              <tr key={idx} className="border-t">
                <td className="py-2">{tx.date}</td>
                <td className="py-2">{tx.description}</td>
                <td className={`py-2 font-medium ${tx.amount < 0 ? 'text-red-500' : 'text-green-600'}`}>{tx.amount < 0 ? '-' : '+'}${Math.abs(tx.amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Transactions 