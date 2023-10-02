import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import './main.scss'
import Register from "./pages/Register"
import Login from "./pages/Login"
import Admin from "./pages/Admin"
import Product from "./pages/products/Product"
import User from "./pages/users/User"
import Cart from "./pages/carts/Cart"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        {/* Khu Vực Này sẽ có nav + foot */}
        
        <Route path="/admin" element={<Admin/>}>
          <Route  path="products" element={<Product/>}></Route>
          <Route  path="users" element={<User/>}></Route>
          
        </Route>

        <Route  path="/carts" element={<Cart/>}></Route>

      </Route>
      {/* Khu vực này không bao gồm nav + foot */}
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
    </Routes>
  )
}

export default App
