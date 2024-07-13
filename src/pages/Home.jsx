import React, { useEffect } from 'react'
import Header from '../components/home/Header'
import Footer from '../components/home/Footer'
import { Outlet } from 'react-router-dom'
import jwt from '../services/jwt';
import { useDispatch } from 'react-redux';
import { userAction } from '../store/slices/user.slice';
import { api } from '../services/apis'
import { productAction } from '../store/slices/product.slice';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { useLocation } from 'react-router-dom';
import Render from './render/Render';
import ScrollToTop from './scrolltotop/ScrollToTop';
import Hero from './disc/hero/Hero';
import Disc from './disc/Disc';



export default function Home() {
  const userStore = useSelector(store => store.userStore)

  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem("token")) {

      let user = jwt.verifyToken(localStorage.getItem("token"), import.meta.env.VITE_PRIVATE_KEY);
      if (!user) {
        localStorage.removeItem("token")
        return
      }
      axios.get(`http://localhost:3000/users/${user.id}`)
        .then(res => {
          dispatch(userAction.setData(res.data))
          dispatch(userAction.setCart(res.data.carts ?? []))
          dispatch(userAction.setReceipts(res.data.receipts ?? []))
        })
    }
  }, [])


  useEffect(() => {
    if (userStore.cart && userStore.data) {
      axios.patch(`http://localhost:3000/users/${userStore.data?.id}`, {
        carts: [...userStore.cart]
      })
    }
  }, [userStore.cart])


  useEffect(() => {
    if (userStore.receipts && userStore.data) {
      axios.patch(`http://localhost:3000/users/${userStore.data?.id}`, {
        receipts: [...userStore.receipts]
      })
    }
  }, [userStore.receipts])

  
  useEffect(() => {
    api.productApi.findAll()
      .then(res => {
        dispatch(productAction.setProduct(res.data))
      })
  }, [])










  const location = useLocation();

  const shouldRender = location.pathname === '/';
  const isOnHome = location.pathname === '/';

  


  return (
    <div className='home_page'>
          
      <Header></Header>

      <div className='home_container'>
        {/* Nội dung của các route mà bao gồm nav + footer */}

       
        {/* {isOnHome && (
          // Phần Render sẽ chỉ hiển thị khi ở trang chủ và sẽ bị ẩn đi khi chuyển sang trang Admin
          // Nếu đang ở trang Home thì hiển thị phần Render

          <div>
            <Hero></Hero>
            
            <Disc></Disc>

            <Render></Render>

          </div>

        )} */}

        {shouldRender && (
          <div>

            <Render></Render>
          </div>
        )}

        <Outlet />
      </div>

      <Footer></Footer>

      <ScrollToTop></ScrollToTop>



    </div>
  )
}
