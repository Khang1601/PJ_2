import React from 'react'
import MeoMeoJs from '@mieuteacher/meomeojs'
import { Button, Modal, Space } from 'antd';

import { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
// import { userAction } from '../store/slices/user.slice'
import { userAction } from '../../store/slices/user.slice'
import './cart.scss'





export default function Cart() {
    const dispatch = useDispatch()
    const userStore = useSelector(store => store.userStore)

    // let totalAmount = 0;
    // userStore.cart.map((item, index) => {
    //     const itemPrice = item.price * item.quantity;
    //     totalAmount += itemPrice;
    // })

    const totalAmount = userStore.cart.reduce((accumulator, item) => {
        const itemPrice = item.price * item.quantity;
        return accumulator + itemPrice;
    }, 0);


    
    return (
        <div className='cart_page'>
            <h2>Trang Cart</h2>



            <table className="table">
                <thead className="thead-dark">
                    <tr >
                        <th scope="col">#</th>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Hãng</th>
                        <th scope="col">Đơn giá</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Giá tiền</th>
                        <th scope="col">Xóa sản phẩm</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        userStore.cart.map((item, index) => {
                            return (
                                <tr key={Date.now() * Math.random()}>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        <img src={item.pictures[0]} alt="" width={100} />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.brand}</td>

                                    <td>
                                        {MeoMeoJs.convertToVND(item.price)}
                                    </td>

                                    <td>
                                        <input className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                                            min={1} onChange={(e) => {
                                                dispatch(userAction.changeQuantity({
                                                    id: item.id,
                                                    quantity: Number(e.target.value)
                                                }))
                                            }} type="number" defaultValue={item.quantity} />
                                    </td>


                                    <td>{MeoMeoJs.convertToVND(item.price * item.quantity)}</td>

                                    <td>
                                        <button 
                                            type="button" 
                                            className="btn btn-danger"
                                            onClick={() =>{
                                                Modal.confirm({
                                                    content: "Bạn muốn xóa sản phẩm khỏi Cart?",
                                                    onOk: () => {
                                                        dispatch(userAction.deleteFromCart(item.id));

                                                    }
                                                })
                                            }}
                                        >Delete</button>
                                    </td>

                                </tr>


                            )
                        })
                    }

                    <tr className='cart_total'>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            {/* Tổng tiền */}
                            <p>
                                Tổng cộng:  
                                <br />
                                {MeoMeoJs.convertToVND(totalAmount)}
                            </p>
                        </td>

                        <td>
                            <button onClick={() => {
                                let newReceipts = {
                                    id: Date.now() * Math.random(),
                                    total: userStore.cart.reduce((total, item) => {
                                        return total + (item.price * item.quantity)
                                    }, 0),
                                    products: [...userStore.cart]
                                }
                                // console.log("newReceipts",newReceipts);
                                // if (newReceipts.total == 0) {
                                //     Modal.error({
                                //         title: 'Error',
                                //         content: 'Giỏ hàng chưa có sản phẩm nào!',
                                //       });
                                //       return
                                // }
                                dispatch(userAction.addNewReceipt(newReceipts))
                            }} className='btn btn-success'>Checkout</button>

                        </td>
                    </tr>
                </tbody>


            </table>






        </div>
    )
}