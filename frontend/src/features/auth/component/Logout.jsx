import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, signOutAsync } from '../authSlice'
import { Navigate } from 'react-router-dom'

function Logout() {
const user=useSelector(selectUser)
const dispatch=useDispatch()

useEffect(()=>{
    dispatch(signOutAsync())    
},[])
    return (
    <>
        {!user && (
            <Navigate to="/login" replace={true}></Navigate>
            ) }
       
    </>
  )
}

export default Logout