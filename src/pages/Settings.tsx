const Settings = () => {
  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <div className="card space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input className="input-field" type="text" value="John Doe" readOnly />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input className="input-field" type="email" value="john.doe@email.com" readOnly />
        </div>
        <div>
          <label className="block mb-1 font-medium">Account Type</label>
          <input className="input-field" type="text" value="Premium" readOnly />
        </div>
        <button className="btn-secondary w-full" disabled>Update Profile (Coming Soon)</button>
      </div>
    </div>
  )
}

export default Settings 