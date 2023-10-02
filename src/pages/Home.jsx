import React, {useEffect} from 'react'
import Header from '../components/home/Header'
import Footer from '../components/home/Footer'
import { Outlet } from 'react-router-dom'
import jwt from '../services/jwt';
import { useDispatch } from 'react-redux';
import { userAction } from '../store/slices/user.slice';
import {api} from '../services/apis'
import { productAction } from '../store/slices/product.slice';


export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    if(localStorage.getItem("token")) {
       let user = jwt.verifyToken(localStorage.getItem("token"), import.meta.env.VITE_PRIVATE_KEY);
       dispatch(userAction.setData(user))
    }
}, [])

useEffect(() => {
  api.productApi.findAll()
  .then(res => {
    dispatch(productAction.setProduct(res.data))
  })
}, [])

  return (
    <div className='home_page'>
        
        <Header></Header>
        <div className='home_container'>
           {/* Nội dung của các route mà bao gồm nav + footer */}
           <Outlet/>
           
        </div>
        <Footer></Footer>

   
    </div>
  )
}
