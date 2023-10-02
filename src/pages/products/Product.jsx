import React from 'react'
import './product.scss'
import ProductList from './components/ProductList'
import { useSelector } from 'react-redux'

export default function Product() {
    const productStore = useSelector(store => store.productStore)
    console.log("productStore1111",productStore);

  return (
    <div className='product_page'>
        <h2>Product Manager</h2>
        <ProductList productStore={productStore}></ProductList>
        
    </div>
  )
}
