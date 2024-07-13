import React from 'react'
import './product.scss'
import ProductList from './components/ProductList'
import { useSelector } from 'react-redux'

export default function Product() {
    const productStore = useSelector(store => store.productStore)
    console.log("productStore ở product",productStore);

  return (
    <div className='product_page'>
        <h3>Product Manager</h3>
        <ProductList productStore={productStore}></ProductList>
        
    </div>
  )
}
