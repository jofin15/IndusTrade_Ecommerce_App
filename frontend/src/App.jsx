import './App.css';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import Logout from './features/auth/component/Logout';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/auth/authSlice';
import { useEffect } from 'react';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import CheckoutPage from './pages/CheckoutPage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserProfilePage from './pages/UserProfilePage';
import UserOrderPage from './pages/UserOrderPage';
import AdminHomePage from './pages/AdminHomePage';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminProductForm from './pages/AdminProductForm';
import AdminOrderPage from './pages/AdminOrderPage';

const router=createBrowserRouter([
  {
    path:"/",
    element:<HomePage />
  },

  {
    path:"/signup",
    element:<SignupPage />
  },
  {
    path:"/login",
    element:<LoginPage />
  },
  {
    path:"/product-details/:id",
    element:<ProductDetailPage />
  },
  {
    path:"/cart",
    element:<CartPage />
  },
  {
    path:"/checkout",
    element:<CheckoutPage />
  },
{
  path:"/logout",
  element:<Logout />
},
  {
    path:"/forget-password",
    element:<ForgetPasswordPage />
  },
  {
    path:"/order-success/:id",
    element:<OrderSuccessPage />
  },
  {
    path:"/profile",
    element:<UserProfilePage />
  },
  {
    path:"/orders",
    element:<UserOrderPage />
  },
  {
    path:"/admin",
    element:<AdminHomePage />
  },
  {
    path:"/admin-product-details/:id",
    element:<AdminProductDetailPage />
  },
  {
    path:"/admin/product-form",
    element:<AdminProductForm />
  },
  {
    path:"/admin-product-details/edit/:id",
    element:<AdminProductForm />
  },
  {
    path:"/admin/orders",
    element:<AdminOrderPage /> 
  }
])

function App() {

  const dispatch=useDispatch()
  const user=useSelector(selectUser)
  console.log("my currenct user is :- ",user); 

  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user))
      dispatch(fetchLoggedInUserAsync(user))
    }
  },[user])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
