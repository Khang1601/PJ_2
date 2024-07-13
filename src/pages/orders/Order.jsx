import React from 'react'
import './order.scss'
import OrderList from './components/OrderList'
import { useSelector } from 'react-redux'


export default function Order() {
  return (
    <div className='order_page'>
      <h3>Order Manager</h3>
      <OrderList></OrderList>
    </div>
  )
}
