import AdminSidebar from '../components/AdminSidebar'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-8 space-y-8 ml-64">
        <Outlet />
      </main>
    </div>
  )
} 