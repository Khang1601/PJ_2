import React from 'react'
import './headertest.scss'


export default function Headtest() {
    return (
        <div>
            <div>
                <img src="https://shopfront-cdn.tekoapis.com/static/phongvu/logo-full.svg" width='200px' alt="" />
                <input type="text" placeholder='Nhập từ khóa cần tìm' />
                <button className='btn_find'>
                    <ion-icon name="search-outline"></ion-icon>
                    <span>Tìm kiếm</span>
                </button>

            </div>


            <ion-icon name="heart-outline"></ion-icon>

            <ion-icon name="person-outline"></ion-icon>

            <ion-icon name="cart-outline" ></ion-icon>

            
            

            <button>
                Login
            </button>


            <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <i class="fa-solid fa-bars"></i>
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

        </div>
    )
}
