import React from 'react'
import Navbar from '../features/navbar/Navbar'
import AdminOrders from '../features/admin/components/AdminOrders'

function AdminOrderPage() {
  return (
    <div>
        <Navbar>
            <AdminOrders />
        </Navbar>
    </div>
  )
}

export default AdminOrderPage