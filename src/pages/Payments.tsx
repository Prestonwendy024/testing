import { useState } from 'react'

const Payments = () => {
  const [billType, setBillType] = useState('Electricity')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('Payment successful!')
    setAmount('')
  }

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Pay Bills</h2>
      <form className="card space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-medium">Bill Type</label>
          <select
            className="input-field"
            value={billType}
            onChange={e => setBillType(e.target.value)}
          >
            <option>Electricity</option>
            <option>Water</option>
            <option>Internet</option>
            <option>Phone</option>
          </select>
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
        <button className="btn-primary w-full" type="submit">Pay</button>
        {message && <p className="text-green-600 text-center mt-2">{message}</p>}
      </form>
    </div>
  )
}

export default Payments 