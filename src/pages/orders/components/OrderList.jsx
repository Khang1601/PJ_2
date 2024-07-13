import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { userAction } from '../../../store/slices/user.slice'
import { Modal } from 'antd'
import axios from 'axios'
import { api } from '../../../services/apis'
import jwt from '../../../services/jwt'
import MeoMeoJs from '@mieuteacher/meomeojs'


export default function OrderList() {
    const [usersData, setUsersData] = useState([]);
    const dispatch = useDispatch()
    const userStore = useSelector(store => store.userStore)

    console.log("userStore ở userlist", userStore);

    useEffect(() => {
        axios
            .get("http://localhost:3000/users")
            .then((response) => {
                console.log("Get test thành công");
                console.log("res.data", response.data);

                setUsersData(response.data);

                console.log("res.data.status", response.data.status);


            })
            .catch((error) => {
                console.error('Get test thất bại', error);
            })
    }, [])


    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Order ID</th>
                        <th scope="col">Purchased Products</th>
                        <th scope="col">Purchase Time</th>

                        <th scope="col">Total Cost</th>

                        <th scope="col">Tools</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        usersData.map((user, index) => {

                            return (

                                <tr key={Math.random()}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.userName}</td>
                                    {/* <td>{user.receipts.map(receipt => ` ${receipt.id} (${MeoMeoJs.convertToVND(receipt.total)}) `).join("===")}</td> */}
                                    <td>
                                        {user.receipts.map(receipt => (
                                            <div key={receipt.id}>
                                                {`${receipt.id} (${MeoMeoJs.convertToVND(receipt.total)})`}
                                            </div>
                                        ))}
                                    </td>

                                    <td>{user.receipts.map(receipt => `  ${MeoMeoJs.convertToVND(receipt.total)}  `).join(", ")}</td>


                                    <td>{user.carts.map(cartItem => ` ${cartItem.name} (x${cartItem.quantity}) `).join(", ")}</td>



                                    <td className='btn_tools'>

                                        {user.role !== 'admin' && ( // Check if the user's role is not 'admin'
                                            <>


                                                <button type="button" className="btn btn-danger" onClick={() => {

                                                    Modal.confirm({
                                                        content: "Bạn muốn xóa receipt này?",
                                                        onOk: () => {
                                                            api.userApi.deleteUserById(user.id)
                                                                .then(res => {
                                                                    dispatch(userAction.deleteUser(user.id))
                                                                })
                                                        }
                                                    })

                                                }}>Delete</button>

                                            </>
                                        )}


                                    </td>

                                </tr>
                            )
                        }
                        )
                    }

                </tbody>

            </table>
        </>
    )
}
