import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./register.scss"
import { api } from '../../services/apis'
import jwt from '../../services/jwt'

import { Button, Modal, Space } from 'antd';

export default function Register() {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("token")) {
            window.location.href = "/"
        }
    }, [])

    //=======================================================
    const validateUserName = {
        isUserName: function (userNameString) {
            //regex userName có nhiều hơn 3 ký tự
            return /^.{3,}$/.test(userNameString)
        }
    }
    const validateEmail = {
        isEmail: function (emailString) {
            // regex email
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailString)
        }
    }

    const validatePassword = {
        isPassword: function (passwordString) {
            //regex password có nhiều hơn 3 ký tự
            return /^.{3,}$/.test(passwordString)
        }
    }

    const validatePhoneNumber = {
        isPhoneNumber: function (phoneNumberString) {
            //regex phonenumber có 10 ký tự
            return /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(phoneNumberString)
        }
    }

    return (
        <div className='register_page'>
            <div id="toast"></div>

            <form onSubmit={async (e) => {
                e.preventDefault()


                if (!(validateUserName.isUserName(e.target.userName.value))) {
                    // alert("UserName không đúng định dạng!")
                    // showErrorToast_userName()

                    Modal.error({
                        title: 'Error',
                        content: 'UserName phải từ 3 kí tự trở lên!',
                      });
                    return
                }
                if(e.target.userName.value.includes("admin")){
                    // alert("UserName ko đc chứa admin!")
                    // showErrorToast_email_noticlude_admin();
                    Modal.error({
                        title: 'Error',
                        content: 'UserName ko đc chứa admin!',
                      });
                    return
                }
                if (!(validateEmail.isEmail(e.target.email.value))) {
                    // showErrorToast_email()
                    // alert("Email không đúng định dạng!")
                    Modal.error({
                        title: 'Error',
                        content: 'Email không đúng định dạng!',
                      });
                    return
                }
                if (!(validatePassword.isPassword(e.target.password.value))) {
                    // alert("Password không đúng định dạng!")
                    // showErrorToast_password()
                    Modal.error({
                        title: 'Error',
                        content: 'Password phải từ 3 kí tự trở lên!',
                      });
                    return
                }
                
                if (e.target.password.value != e.target.passwordConfirm.value) {
                    // alert("Mật khẩu và mật khẩu nhập lại phải giống nhau!")
                    // showErrorToast_passwordwrong()
                    Modal.error({
                        title: 'Error',
                        content: 'Mật khẩu và mật khẩu nhập lại phải giống nhau!',
                      });
                    return
                }

                if (!(validatePhoneNumber.isPhoneNumber(e.target.phoneNumber.value))) {
                    // alert("SĐT không đúng định dạng!")
                    // showErrorToast_phonenumber()
                    Modal.error({
                        title: 'Error',
                        content: 'SĐT không đúng định dạng!',
                      });
                    return
                }



                let data = {
                    userName: e.target.userName.value,
                    email: e.target.email.value,
                    password: jwt.createToken(e.target.password.value),
                    passwordConfirm: e.target.passwordConfirm.value,
                    phoneNumber: e.target.phoneNumber.value,
                    // address: e.target.address.value,
                    role: "member",
                    status: true,
                    carts: [],
                    receipts: []
                }
                console.log("data", data);

                let res = await api.userApi.findByUserName(data.userName);
                if (res.data.length > 0) {
                    // alert("tài khoản đã tồn tại")
                    Modal.error({
                        title: 'Error',
                        content: 'Tài khoản đã tồn tại!',
                      });
                } else {
                    api.userApi.register(data)
                        .then(res => {
                            // alert("Đăng ký thành công!")
                            Modal.success({
                                content: 'Đăng ký thành công!',
                              });
                            navigate("/login")
                        }).catch(err => {
                            // alert("sập!")
                            Modal.error({
                                title: 'Error',
                                content: 'Server sập!',
                            });
                        })
                }


            }} className='register_form form form-register'>

                <h3 className="heading">Đăng ký thành viên</h3>
                <p className="desc">Cùng nhau mua sắm Laptop tại Lapshop ❤️</p>

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
                        Email:
                    </label>
                    <input
                        name="email"
                        type="text"
                        className="form-input"
                        placeholder="VD: email@domain.com"
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
                <div className="form-group">
                    <label htmlFor="" className="form-label">
                        Nhập lại mật khẩu:
                    </label>
                    <input
                        name="passwordConfirm"
                        type="password"
                        className="form-input"
                        placeholder="Nhập lại mật khẩu"
                    />
                    <span className="form-message" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="form-label">
                        Số điện thoại:
                    </label>
                    <input
                        name="phoneNumber"
                        type="text"
                        className="form-input"
                        placeholder="VD: 01234567890"
                    />
                    <span className="form-message" />
                </div>

                <button type="submit" className="form-submit">
                    Đăng ký
                </button>
                <br />
                <span>Bạn đã có tài khoản?</span>
                <Link to={"/login"}>Login now!</Link>
                <i className="fa-solid fa-user-check" />




            </form>


        </div>
    )
}
