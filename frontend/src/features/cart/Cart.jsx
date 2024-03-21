import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { selectedProductById } from '../product-list/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItemFromCartAsync, selectCart, updateItemAsync } from './cartSlice';



export default function Cart() {
  const dispatch=useDispatch()
  const [open, setOpen] = useState(true);
  const cart=useSelector(selectCart)
const totalAmount=cart.reduce((amount,item)=>item.price*item.quantity+amount,0)
const totalItems=cart.reduce((total,item)=>item.quantity+total,0)

const handleQuantity=(e,product)=>{
  dispatch(updateItemAsync({...product,quantity:+e.target.value}))
}
const handleRemove=(e,id)=>{
  dispatch(deleteItemFromCartAsync(id))
}
  return (
    <>
    {/* {cart.length===0 && <Navigate to="/" replace={true}></Navigate>} */}
    <div className="mx-auto pt-6  max-w-7xl bg-white px-4 py-6 sm:px-6 lg:px-8"> 
    <h1 className='text-3xl text-gray-900 font-bold text-center mb-6'>Checkout Page</h1> 
      <div  className="border-t border-gray-200 px-4 py-6 sm:px-6">
        {/* <h1 className="text-3xl font-medium my-5 tracking-tight text-gray-900">cart</h1> */}
        {cart.length===0 && <h2>Your Cart is empty</h2>}
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cart.map((product) => (
              <li key={product.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href={product.href}>{product.title}</a>
                      </h3>
                      <p className="ml-4"> ₹ {product.price*product.quantity}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="text-gray-500">
                      <label htmlFor="quantity" className='inline text-sm font-medium leading-6 text-gray-900 mr-5'>
                        Qty 
                      </label>
                    <select onChange={(e)=>handleQuantity(e,product)} value={product.quantity}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>

                    </select>
                    </div>
                    <div className="flex">
                      <button 
                      type="button" 
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={(e)=>handleRemove(e,product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between my-2 text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>₹ {totalAmount}</p>
        </div>

        <div className="flex justify-between my-2 text-base font-medium text-gray-900">
          <p>Total Items in Cart</p>
          <p>{totalItems} items</p>
        </div>

      
        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
        <div className="mt-6">
          <Link
           to="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-yellow-600"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{' '}
          <Link to="/">
            <button type="button" className="font-medium text-orange-600 hover:text-yellow-600" onClick={() => setOpen(false)}>
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
