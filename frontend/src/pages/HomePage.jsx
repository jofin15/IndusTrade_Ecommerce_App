import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductList from '../features/product-list/component/ProductList'

function HomePage() {
  return (
    <div className='bg-yellow-100'>
      <Navbar>
        <ProductList />
      </Navbar>
    </div>
  )
}

export default HomePage