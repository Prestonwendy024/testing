import ClientSidebar from '../components/ClientSidebar'
import { Outlet } from 'react-router-dom'

export default function ClientLayout() {
  return (
    <div className="flex">
      <ClientSidebar />
      <main className="flex-1 p-8 space-y-8 ml-64">
        <Outlet />
      </main>
    </div>
  )
} 