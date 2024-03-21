import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom'
import { selectUserInfo } from '../features/user/userSlice';
import { resetCartAsync } from '../features/cart/cartSlice';

function OrderSuccessPage() {
  const params=useParams()
  const user1 = useSelector(selectUserInfo);
const dispatch=useDispatch()

useEffect(()=>{
  console.log("order user1 id:-",user1.id);
dispatch(resetCartAsync(user1.id))
},[])

  return (
    <>
      {!params.id && <Navigate to="/" replace={true}></Navigate>}
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="max-w-lg text-center">
        <img src="https://cdn1.iconfinder.com/data/icons/basic-ui-elements-color-round/3/15-512.png" alt="404 Illustration" className="mt-8  max-w-xs mx-auto h-14 w-14" />
        <h1 className="text-4xl font-bold text-gray-800 mt-4">Order Successfully Placed</h1>
        <p className="text-gray-600 mt-4">Order Number #{params?.id}</p>
        <p className="text-gray-600">.You can check your order in My Account  My Orders</p>
        <Link to="/" className="mt-12 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out">
        Go Home 
        </Link>
      
    </div>
  </div>
    </>
  )
}

export default OrderSuccessPage