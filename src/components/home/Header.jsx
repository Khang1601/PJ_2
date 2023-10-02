import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './header.scss'


export default function Header() {
    const userStore = useSelector(store => store.userStore)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // useEffect(() => {
    //     console.log("userStore", userStore.data)

    // }, [userStore.data])

    useEffect(() => {
        console.log("userStore", userStore.data)

    })

    return (
        <div className='home_navbar'>
            <div className='home_navbar_content'>


                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">


                        <img src="https://firebasestorage.googleapis.com/v0/b/testfirebase-d283a.appspot.com/o/products%2Fimg-logo.PNG?alt=media&token=b69b19f4-c318-4557-9238-aea81dd0ae1b&_gl=1*hxx55d*_ga*MTExNDg3OTg4OC4xNjg5Nzg4MTUx*_ga_CW55HF8NVT*MTY5NjE0MjA5MC4xMS4xLjE2OTYxNDI0NDQuMzEuMC4w"
                            className='img_logo' width='200px' height='46px' alt="" onClick={() => navigate('/')} />




                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>


                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="fa-solid fa-bars"></i>
                                        &nbsp;
                                        Danh mục
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                Action
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                Another action
                                            </a>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                Something else here
                                            </a>
                                        </li>
                                    </ul>
                                </li>


                                <li>
                                    <form className="form-inline my-2 my-lg-0 btn_nav_find" onSubmit={async (e) => {
                                        e.preventDefault();
                                    }}>
                                        <input
                                            className="form-control mr-sm-2 "
                                            type="search"
                                            placeholder="Search"
                                            aria-label="Search"
                                        />
                                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                                            Search
                                        </button>
                                        {/* <button></button> */}

                                    </form>
                                </li>

                            </ul>

                            <div className='icon_nav'>


                                {
                                    userStore.data == null ? (
                                        <div className='login_user'>

                                            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" style={{ width: "30px", height: "30px" }} alt="" />
                                            <span>Hãy đăng nhập</span>
                                            <Link to="/login" className='btn btn-success'>
                                                Login
                                            </Link>
                                        </div>
                                    ) : (

                                        <div className='logout_user'>
                                            {userStore.data.role == "admin" ? (

                                                // <button className='btn btn-primary'>Trang Admin</button>
                                                <Link to="/admin" className='btn btn-primary'>Trang Admin</Link>
                                            ) : null}
                                            <span className='span_logout'>
                                                <img src="https://www.pngmart.com/files/21/Admin-Profile-Vector-PNG-Clipart.png" style={{ width: "30px", height: "30px" }} alt="" />
                                                {userStore.data?.userName}
                                            </span>
                                            <button onClick={() => {
                                                localStorage.removeItem("token");
                                                window.location.reload()
                                            }} className='btn btn-danger'>Logout</button>


                                        </div>
                                    )
                                }

                                <ion-icon name="notifications-outline"></ion-icon>

                                
                                    <Link to="/carts">
                                        <ion-icon name="cart-outline"></ion-icon>
                                                
                                    </Link>
                                
                            </div>

                        </div>
                    </div>
                </nav>
            </div>

        </div>
    )
}
