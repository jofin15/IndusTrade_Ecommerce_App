import React from 'react'
import AdminProductDetail from '../features/admin/components/AdminProductDetail'
import Navbar from '../features/navbar/Navbar'

function AdminProductDetailPage() {
  return (
    <div>
      <Navbar>
        <AdminProductDetail />
      </Navbar>
    </div>
  )
}

export default AdminProductDetailPage