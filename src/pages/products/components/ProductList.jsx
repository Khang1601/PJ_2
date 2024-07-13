import React, { useEffect, useState } from 'react'
import MeoMeoJs from '@mieuteacher/meomeojs'
import { api } from '../../../services/apis'
import { useDispatch } from 'react-redux'
import { productAction } from '../../../store/slices/product.slice'
import { uploadFileToStorage } from '../../../firebase'
import { useSelector } from 'react-redux'
import '../components/productlist.scss'
import { Button, Modal, message } from 'antd';
import { userAction } from '../../../store/slices/user.slice'
import axios from 'axios'


export default function ProductList({ productStore }) {
    const [open, setOpen] = useState(false);

    const userStore = useSelector(store => store.userStore)
    const dispatch = useDispatch()
    const [file, setFile] = useState(null)
    const [tempImgUrl, setTempImgUrl] = useState(null)

    console.log("productStore ở productlist", productStore);
    // console.log("userStore ở productlist", userStore);


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


        api.productApi.addProduct(newProduct)
            .then(res => {
                console.log("res.data", res.data)
                dispatch(productAction.addProduct(res.data))
            })

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


    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Hàm để mở modal và cập nhật thông tin sản phẩm trước khi mở modal
    function openModal(product) {
        console.log("đã chọn product",product);
        setSelectedProduct(product);
        setIsModalVisible(true);
    };

    // Hàm để đóng modal
    function closeModal() {
        setIsModalVisible(false);
    };


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
                    }} className='btn btn-primary'>Add</button>

                    <table className="table">
                        <thead className="thead-dark">
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
                                                <button className='btn btn-secondary' onClick={() => openModal(product)}>Show</button>
                                            </td>

                                            <td className='btn_tools'>
                                                <button className='btn btn-success' onClick={() => {
                                                    handleUpdateProduct(product)
                                                }}>Update</button>

                                                <button onClick={() => {

                                                    Modal.confirm({
                                                        content: "Bạn muốn xóa sản phẩm này?",
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


                    {/* Modal hiển thị hình ảnh sản phẩm */}
                    <Modal
                        title="Hình ảnh sản phẩm"
                        visible={isModalVisible}
                        onCancel={closeModal}
                        footer={null}
                    >
                        {selectedProduct && (
                            <div>
                                <img
                                    src={selectedProduct.pictures[0]}
                                    style={{ width: "100%" }}
                                    alt={selectedProduct.name}
                                />
                                <img
                                    src={selectedProduct.pictures[1]}
                                    style={{ width: "100%" }}
                                    alt={selectedProduct.name}
                                />

                            </div>

                        )}
                    </Modal>
                </>
            }
        </>
    )
}
