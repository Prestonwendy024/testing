import { useState } from 'react'

const Transfer = () => {
  const [amount, setAmount] = useState('')
  const [toAccount, setToAccount] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('Transfer successful!')
    setAmount('')
    setToAccount('')
  }

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Transfer Money</h2>
      <form className="card space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-medium">To Account</label>
          <input
            className="input-field"
            type="text"
            placeholder="Enter account number"
            value={toAccount}
            onChange={e => setToAccount(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Amount</label>
          <input
            className="input-field"
            type="number"
            placeholder="$0.00"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
            min="1"
          />
        </div>
        <button className="btn-primary w-full" type="submit">Transfer</button>
        {message && <p className="text-green-600 text-center mt-2">{message}</p>}
      </form>
    </div>
  )
}

export default Transfer 