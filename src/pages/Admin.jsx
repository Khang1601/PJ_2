import React from 'react'
import Product from './products/Product'
import { Link, useNavigate } from 'react-router-dom';
import { Routes, Route } from "react-router-dom"
import { Outlet } from 'react-router-dom';
import './admin.scss'




export default function Admin() {
  return (
    <div className='admin_page'>
        <h2>Trang Admin</h2>
        <Link to={'products'}>Products Management</Link>
        <Link to={'users'}>Users Management</Link>

        <Outlet></Outlet>

    </div>
  )
}
