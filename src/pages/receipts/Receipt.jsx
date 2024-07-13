import React from 'react'
import { useSelector } from 'react-redux'
import MeoMeoJs from '@mieuteacher/meomeojs'
import { useDispatch } from 'react-redux'
import { userAction } from '../../store/slices/user.slice'
import { Button, Modal } from 'antd';



import './receipt.scss'

export default function Receipt() {
    const userStore = useSelector(store => store.userStore)
    console.log("userStore ở receipt", userStore);

    //============
    const dispatch = useDispatch(); // dùng useDispatch để gửi action
    const handleDeleteReceipt = (index) => {
        // dùng action "deleteReceipt" để xóa đơn hàng tại index
    }

    return (
        <div className='receipt_page'>
            <h2>Trang Receipt</h2>

            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Order ID</th>
                        <th scope="col">Purchased Products</th>
                        <th scope="col">Total Cost</th>

                        <th scope="col">Tools</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        userStore.receipts.map((item, index) => (
                            <tr key={item.id}>
                                <th scope="row">{index+1}</th>
                                <td>{item.id}</td>
                                <td>
                                {item.products.reduce((value, cur) => {
                                return value + cur.quantity
                            }, 0)}
                                </td>

                             


                                <td>{MeoMeoJs.convertToVND(item.total)}</td>

                                <td>
                                    <button 
                                        type="button" 
                                        className="btn btn-danger"
                                        onClick={() => 
                                            Modal.confirm({
                                                content: "Bạn muốn xóa sản phẩm khỏi Receipt?",
                                                onOk: () => {
                                                    // dispatch(userAction.deleteFromCart(item.id));
                                                    dispatch(userAction.deleteReceipt(item.id));


                                                }
                                            })
                                            // handleDeleteReceipt(index)
                                        }

                                    >Delete</button>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>


        </div>
    )
}