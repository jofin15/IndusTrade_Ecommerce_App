import React from 'react'
import UserOrders from '../features/user/component/UserOrders'
import Navbar from '../features/navbar/Navbar'

function UserOrderPage() {
  return (
    <div>
        <Navbar>
            <div className='text-3xl text-gray-900 font-bold text-center mb-6'>My Orders</div>
            <UserOrders />
        </Navbar>
    </div>
  )
}

export default UserOrderPage