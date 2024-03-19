import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductDetails from '../features/product-list/component/ProductDetails'

function ProductDetailPage() {
  return (
      <div className='bg-yellow-100'>
    <Navbar>
        <ProductDetails/>
    </Navbar>
        </div>
  )
}

export default ProductDetailPage