import React, { useEffect, useState } from 'react'
import MeoMeoJs from '@mieuteacher/meomeojs'
import { api } from '../../../services/apis'
import { Modal } from 'antd'
import { useDispatch } from 'react-redux'
import { productAction } from '../../../store/slices/product.slice'
import { uploadFileToStorage } from '../../../firebase'
import { useSelector } from 'react-redux'
import '../components/productlist.scss'

export default function ProductList({ productStore }) {

    const userStore = useSelector(store => store.userStore)
    const dispatch = useDispatch()
    const [file, setFile] = useState(null)
    const [tempImgUrl, setTempImgUrl] = useState(null)

    console.log("productStore", productStore);
    console.log("userStore", userStore);


    //add product
    async function handleAddProduct() {
        if (file == null) return alert("Chưa chọn ảnh")

        let url = await uploadFileToStorage(file, "products")

        let newProduct = {
            pictures: [url ? url : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"],

            brand: prompt("Nhập brand"),
            name: prompt("Nhập name"),
            category: prompt("Nhập category"),
            color: prompt("Nhập color"),
            price: Number(prompt("Nhập price")),

        }

        // api.productApi.addProduct(newProduct)
        //     .then(res => {
        //         console.log("res.data", res.data)
                // dispatch(productAction.addProduct(res.data))
            // })

        dispatch(productAction.addProduct(newProduct))

    }

    //update product
    function handleUpdateProduct(product) {
        console.log("product",product);
        let updateProduct = {
            // id: product.id,
            brand: prompt("Cập nhật brand", product.brand),
            name: prompt("Cập nhật name", product.name),
            category: prompt("Cập nhật category", product.category),
            color: prompt("Cập nhật color", product.color),
            price: Number(prompt("Cập nhật price", product.price)),

        }
        // if (window.confirm("Xác nhận update?")) {
            dispatch(productAction.updateProduct( updateProduct ))
        // }
    }


    useEffect(() => {
        if (localStorage.getItem("token")) {
            if (userStore.data) {
                if (userStore.data?.role != "admin") {
                    if (window.confirm("Bạn không có quyền truy cập trang này, vui lòng đăng nhập với tài khoản admin!")) {
                        window.location.href = "/"
                    } else {
                        window.location.href = "/"
                    }
                }
            }
        } else {
            window.location.href = "/login"
        }
    }, [userStore.data])


    return (
        <>
            {
                userStore.data?.role == "admin" &&
                <>
                    Avatar <input onChange={e => {
                        if (e.target.files == 0) return
                        setFile(e.target.files[0])
                        setTempImgUrl(URL.createObjectURL(e.target.files[0]))
                        console.log("e.target.files[0]", e.target.files[0]);
                    }} type="file" />

                    <img src={tempImgUrl ? tempImgUrl : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"} style={{ width: "100px", height: "100px", borderRadius: "50%" }} />

                    <button onClick={() => {
                        handleAddProduct()
                    }} className='btn btn-primary'>Thêm</button>

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Brand</th>
                                <th scope="col">Name</th>
                                <th scope="col">Category</th>
                                <th scope="col">Avatar</th>
                                <th scope="col">Color</th>
                                <th scope="col">Price</th>

                                <th scope="col">Pictures</th>

                                <th scope="col">Tools</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productStore.data?.map((product, index) => {
                                    return (
                                        <tr key={MeoMeoJs.randomId()}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{product.brand}</td>

                                            <td>{product.name}</td>
                                            <td>{product.category}</td>
                                            <td>
                                                <img src={product.pictures[0]} style={{ width: "35px", height: "35px", borderRadius: "50%" }} />
                                            </td>
                                            <td>{product.color}</td>
                                            <td>{MeoMeoJs.convertToVND(product.price)}</td>

                                            <td>
                                                <button className='btn btn-success'>Show</button>
                                            </td>
                                            <td className='btn_tools'>
                                                <button className='btn btn-primary' onClick={() => {
                                                    handleUpdateProduct(product)
                                                }}>Update</button>

                                                <button onClick={() => {
                                                    Modal.confirm({
                                                        content: "Bạn muốn xóa?",
                                                        onOk: () => {
                                                            api.productApi.deleteById(product.id)
                                                                .then(res => {
                                                                    dispatch(productAction.deleteProduct(product.id))
                                                                })
                                                        }
                                                    })
                                                }} className='btn btn-danger'>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </>
            }
        </>
    )
}
