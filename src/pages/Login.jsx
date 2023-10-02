import React, { useEffect } from 'react'
import './login.scss'
import { Link } from 'react-router-dom'
import jwt from '../services/jwt'
import { api } from '../services/apis'
export default function Login() {

  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "/"
    }
  }, [])
  


  return (
    <div className='login_page'>
      <form onSubmit={async (e) => {
        e.preventDefault();
        let data = {
          userName: e.target.userName.value,
          password: e.target.password.value
        }
        await api.userApi.findByUserName(data.userName)
          .then(res => {
            if (res.data.length != 0) {
              if (data.password != jwt.verifyToken(res.data[0].password, import.meta.env.VITE_PRIVATE_KEY)) {
                alert("Mật khẩu sai!")
                return
              }
              let token = jwt.createToken(res.data[0])
              localStorage.setItem("token", token)
              window.location.href = "/"
            } else {
              alert("Tài khoản không tồn tai!")
            }
          })





      }} className='form_login form-login'>
        {/* <h2>Login</h2>
        <div>
          <input name='userName' type="text" placeholder='username' />
        </div>
        <div>
          <input name='password' type="text" placeholder='password' />
        </div>
        <div>
          <Link to={"/register"}>chưa có tài khoản ? Register now!</Link>
        </div>
        <div>
          <button type='submit'>Login</button>
        </div> */}



        <h3 className="heading">Đăng nhập</h3>
        <p className="desc">Cùng nhau mua sắm Laptop tại Booken ❤️</p>
        <div className="form-group">
          <label htmlFor="" className="form-label">
            Tên đăng nhập: 
          </label>
          <input
            name="userName"
            type="text"
            className="form-input"
            placeholder="VD: Khang"
          />
          <span className="form-message" />
        </div>
        <div className="form-group">
          <label htmlFor="" className="form-label">
            Mật khẩu:
          </label>
          <input
            name="password"
            type="password"
            className="form-input"
            placeholder="Nhập mật khẩu"
          />
          <span className="form-message" />
        </div>
        <button type="submit" className="form-submit">
          Đăng nhập
        </button>
        <br />
        <span>Bạn chưa có tài khoản?</span>
        <Link to={"/register"}>Register now!</Link>
        <i className="fa-solid fa-user-plus" />


      </form>
    </div>
  )
}
