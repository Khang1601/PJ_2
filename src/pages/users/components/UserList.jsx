import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { userAction } from '../../../store/slices/user.slice'
import { Modal } from 'antd'
import axios from 'axios'

import MeoMeoJs from '@mieuteacher/meomeojs'
// import { api } from '../../../services/apis'
// import { userAction } from '../../../store/slices/user.slice'
// import { uploadFileToStorage } from '../../../firebase'

export default function UserList() {
  const [usersData, setUsersData] = useState([]);
  const dispatch = useDispatch()
  const userStore = useSelector(store => store.userStore)

  console.log("userStore lan1:", userStore);


  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        console.log("Get test thành công");
        console.log("res.data", response.data);

        setUsersData(response.data);

      })
      .catch((error) => {
        console.error('Get test thất bại', error);
      })
  }, [])

  console.log(usersData);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User Name</th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>
            <th scope="col">Email</th>
            <th scope="col">Cart</th>
            <th scope="col">Tools</th>
          </tr>
        </thead>
        <tbody>
          {
            usersData.map((user, index) => {
              return (

                <tr key={Math.random()}>
                  <th scope="row">{index+1}</th>
                  <td>{user.userName}</td>
                  <td>{user.role}</td>
                  <td>{user.status ? 'true' : 'false'}</td>
                  <td>{user.email}</td>
                  <td>{user.cart}</td>
                  <td className='btn_tools'>
                    <button type="button" class="btn btn-primary">Update</button>
                    <button type="button" className="btn btn-danger">Delete</button>
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
