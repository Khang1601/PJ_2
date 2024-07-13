import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { userAction } from '../../../store/slices/user.slice'
import { Modal } from 'antd'
import axios from 'axios'
import { api } from '../../../services/apis'
import jwt from '../../../services/jwt'

import MeoMeoJs from '@mieuteacher/meomeojs'
// import { api } from '../../../services/apis'
// import { userAction } from '../../../store/slices/user.slice'
// import { uploadFileToStorage } from '../../../firebase'

export default function UserList() {
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

  console.log("usersData ở userlist", usersData);

  //add user
  function handleAddUser() {
    let newUser = {

      // id: Math.random() * Date.now(),
      // name: prompt("Nhập tên sinh viên!"),
      // age: Number(prompt("Nhập tuổi sinh viên!"))

      userName: prompt("Nhập tên user!"),
      email: prompt("Nhập tên email!"),
      password: jwt.createToken(prompt("Nhập tên pass user!")),
      // passwordConfirm: e.target.passwordConfirm.value,
      phoneNumber: prompt("Nhập tên SĐT!"),
      // address: e.target.address.value,
      role: "member",
      status: true,
      carts: [],
      receipts: []
    }
    // dispatch(userAction.addUser(newUser))

    api.userApi.addUser(newUser)
      .then(res => {
        console.log("res.data", res.data)
        dispatch(userAction.addUser(newUser))

      })

  }



  // Function to toggle user's status
  function toggleUserStatus(userId, newStatus) {
    api.userApi
      .updateUser(userId, { status: newStatus })   // only update status
      .then((res) => {
        const updatedUsers = usersData.map((user) => {
          if (user.id == userId) {
            return { ...user, status: newStatus };
          }
          return user;
        });
        setUsersData(updatedUsers);
      });
  }


  return (
    <>

      <button className='btn btn-primary' onClick={() => {
        handleAddUser()
      }}>Add user</button>


      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User Name</th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>
            <th scope="col">Email</th>
            <th scope="col">Cart</th>
            {/* <th scope="col">Receipt</th> */}

            <th scope="col">Tools</th>
          </tr>
        </thead>
        <tbody>

          {
            usersData.map((user, index) => {
              // let cartItems = user.carts.map(cartItem => ` ${cartItem.name} (x${cartItem.quantity}) `).join(", ");
              // let receiptUser = user.receipts.map(receipt => `ID: ${receipt.id}, Total: ${receipt.total}`).join(", ");
              // const totalAmount = user.receipts.reduce((total, receipt) => total + receipt.total, 0)
              //               let totalAmount = user.receipts.reduce((total, receipt) => total + receipt.total, 0)

              // console.log(`Tổng tiền các hóa đơn đã mua: ${totalAmount} đồng`)

              // console.log("user",user);
              return (

                <tr key={Math.random()}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.userName}</td>
                  <td>{user.role}</td>
                  <td>{user.status ? 'true' : 'false'}</td>

                  <td>{user.email}</td>
                  <td>{user.carts.map(cartItem => ` ${cartItem.name} (x${cartItem.quantity}) `).join(", ")}</td>
                  {/* <td>{user.receipts.reduce((total, receipt) => total + receipt.total, 0)}</td> */}



                  <td className='btn_tools'>
                    {/* <button type="button" className="btn btn-success">Update</button> */}




                    {user.role !== 'admin' && ( // Check if the user's role is not 'admin'
                      <>


                        <button
                          type="button"
                          className="btn btn-warning"
                          onClick={() => {
                            // Toggle user's status here
                            toggleUserStatus(user.id, !user.status);
                          }}
                        >
                          {user.status ? 'Ban user' : 'Unban user'}
                        </button>


                        <button type="button" className="btn btn-danger" onClick={() => {

                          Modal.confirm({
                            content: "Bạn muốn xóa user này?",
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
