import React from 'react'
import UserProfile from '../features/user/component/UserProfile'
import Navbar from '../features/navbar/Navbar'

function UserProfilePage() {
  return (
    <Navbar>
        <h1 className='text-3xl text-gray-900 font-bold text-center mb-6'>My Profile</h1>
        <UserProfile />
    </Navbar>
  )
}

export default UserProfilePage