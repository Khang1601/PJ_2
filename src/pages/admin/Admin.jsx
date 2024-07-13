import React from 'react'
import Product from '../products/Product'
import { Link, useNavigate } from 'react-router-dom';
import { Routes, Route } from "react-router-dom"
import { Outlet } from 'react-router-dom';
import './admin.scss'


export default function Admin() {
  return (
    <div className='admin_page'>
        <h2>Trang Admin</h2>

        <div className='admin_page-link'>
          <Link to={'products'} className="custom_link">Products Management</Link>

          <Link to={'users'} className="custom_link">Users Management</Link>

          <Link to={'orders'} className="custom_link">Orders Management</Link>

        </div>

      

        <Outlet></Outlet>

    </div>
  )
}
