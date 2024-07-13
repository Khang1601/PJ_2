import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import './main.scss'
import Register from "./pages/register/Register"
import Login from "./pages/login/Login"
import Admin from "./pages/admin/Admin"
//manager
import Product from "./pages/products/Product"
import User from "./pages/users/User"
import Order from "./pages/orders/Order"

import Cart from "./pages/carts/Cart"
import Render from "./pages/render/Render"
import Receipt from "./pages/receipts/Receipt"
import Suggest from "./pages/suggests/Suggest"
import Feature from "./pages/features/Feature"
import Blog from "./pages/blogs/Blog"
import Offer from "./pages/offer/Offer"


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        {/* <Render></Render>
        <Outlet /> */}


        {/* Khu Vực Này sẽ có nav + foot */}
        
        <Route path="/admin" element={<Admin/>}>
          <Route  path="products" element={<Product/>}></Route>
          <Route  path="users" element={<User/>}></Route>
          <Route  path="orders" element={<Order/>}></Route>

          
        </Route>

        <Route  path="/register" element={<Register/>}></Route>
        <Route  path="/login" element={<Login/>}></Route>
        <Route  path="/render" element={<Render/>}></Route>
        <Route  path="/receipts" element={<Receipt/>}></Route>
        <Route  path="/carts" element={<Cart/>}></Route>
        <Route  path="/suggests" element={<Suggest/>}></Route>
        <Route  path="/features" element={<Feature/>}></Route>
        <Route  path="/blogs" element={<Blog/>}></Route>
        <Route  path="/offers" element={<Offer/>}></Route>


      </Route>
      {/* Khu vực này không bao gồm nav + foot */}


      {/* <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route> */}
    </Routes>
  )
}

export default App
