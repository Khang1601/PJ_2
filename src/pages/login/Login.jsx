import React, { useEffect, createContext } from 'react'
import './login.scss'
import { Link } from 'react-router-dom'
import jwt from '../../services/jwt'
import { api } from '../../services/apis'


import { Button, Modal, Space } from 'antd';


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
                // alert("Mật khẩu sai!")

                Modal.error({
                  title: 'Error',
                  content: 'Mật khẩu sai!',
                });

                return
              }
              
              console.log("res.data[0].status",res.data[0].status);
              if(res.data[0].status == false){
                Modal.error({
                  title: 'Error',
                  content: 'Tài khoản của bạn đã bị ban, liên hệ admin để unban!',
                });

                return
              }

              let token = jwt.createToken(res.data[0])
              localStorage.setItem("token", token)
              window.location.href = "/"
            } else {
              // alert("Tài khoản không tồn tai!")
              Modal.error({
                title: 'Error',
                content: 'Tài khoản không tồn tại!',
              });
            }

            // Modal.success({
            //   content: 'Đăng nhập thành công!',
            // });
       
          })

      }} className='form_login form-login'>

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
