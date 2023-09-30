import "../css/navbar-style.css";
import prandLogo from "../../../media/images/prand_logo.png"
import {Link} from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState , useEffect } from "react";
import LogOutPopub from "../../log-out-popub/js/LogOutPopub";

function Nav() {
    let [user , setUser] = useState();
    let cartProducts = useSelector((state) => state.selectedProducts);
    let wishListProducts = useSelector((state) => state.WishList);
    let userAccount = useSelector((state) => state.UserAccount);
    let [cartCount , setCartCount] = useState(0);
    let [wishListCount , setWishListCount] = useState(0);
    let list = document.querySelector(".navbar .container > ul");
    let allnavBarRouting = document.querySelectorAll(".navbar .container ul li > a");
    
    useEffect(()=>{
        setCartCount(cartProducts.length);
        setWishListCount(wishListProducts.length);
    },[cartProducts , wishListProducts ,]);

    useEffect(() => {
        Object.keys(userAccount).length === 0
        ?
        setUser(false)
        :
        setUser(true);
    }, [userAccount]);
    allnavBarRouting.forEach(route => {
        route.onclick = ()=>{
            list.classList.remove("active")
        }
    })
    return (
        <>
            <div className="navbar">
                <div className="container">
                    <Link to="/" className="prand-logo">
                        <img  src={prandLogo} alt="prand logo"/>
                        <h2>GloboMart</h2>
                    </Link>
                    <ul>
                        <li>
                            <Link to="/"> HOME </Link>
                        </li>
                        <li>
                            <span>
                                SHOP 
                                <i className="fa-solid fa-angle-down"></i>
                            </span>
                            <div className="electronics-div list-of-link shop-list">
                                <ul className="smart-phone-list">
                                    <li className="list-title">ELECTRONICS</li>
                                    <li><Link to="acsesories">Phones Acsesories</Link></li>
                                    <li><Link to="lcd-screen-page">LCD Screen</Link></li>
                                    <li><Link to="apple-phone">Apple phone</Link></li>
                                    <li><Link to="smart-watch">Smart watch</Link></li>
                                    <li><Link to="airpods">Headest & Airpods</Link></li>
                                    <li><Link to="laptops-page">Laptop</Link></li>
                                </ul>
                                <ul className="headphones-list">
                                    <li className="list-title">FURNITURE</li>
                                    <li><Link to="sofa-page">Sofas</Link></li>
                                    <li><Link to="chair-page">Chairs</Link></li>
                                    <li><Link to="table-page">Tables</Link></li>
                                    <li><Link to="decor-page">Decor</Link></li>
                                </ul>
                                <ul className="headphones-list">
                                    <li className="list-title">FASHION</li>
                                    <li><Link to="mens-page">Men</Link></li>
                                    <li><Link to="womens-page">Womens</Link></li>
                                    <li><Link to="kids-page">Kids and Baby</Link></li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <span>
                                PAGES
                                <i className="fa-solid fa-angle-down"></i>
                            </span>
                            <div className="electronics-div list-of-link">
                                <ul className="smart-phone-list">
                                    <li><Link to="about">About Us</Link></li>
                                    <li><Link to="blog">Blog</Link></li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link to="contact">CONTACT</Link>
                        </li>
                    </ul>
                    <div className="search-and-wishlist-and-cart">
                        <i className="fa-solid fa-magnifying-glass" onClick={()=>{
                            let searchDiv = document.querySelector(".search-div");
                            searchDiv.classList.add("active")
                        }}></i>
                        <Link to="wishlist">
                            <span className="wishlist-count count-span">{wishListCount}</span>
                            <i className="fa-regular fa-heart"></i>
                        </Link>
                        <Link to="cart">
                            <span className="cart-count count-span">{cartCount}</span>
                            <i className="fa-solid fa-cart-shopping"></i>
                        </Link>
                        <i className="fa-solid fa-user user-icon">
                            <ul>
                                {user ?
                                    <li className="log-out" onClick={()=>{
                                        let logOutPopub = document.querySelector(".log-out-parent");
                                        logOutPopub.classList.add("active")
                                    }}>
                                        <i className="fa-solid fa-right-from-bracket"></i>
                                        <p>Log Out</p>
                                    </li> :
                                    <>
                                        <li>
                                            <i className="fa-solid fa-user"></i>
                                            <Link to="log-in">Log in</Link>
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-user-plus"></i>
                                            <Link to="register">Register</Link>
                                        </li>
                                    </>
                                }
                            </ul>
                        </i>
                    </div>
                    <i className="fa-solid fa-bars-staggered dropping-list" onClick={()=>{
                        list.classList.toggle("active")
                    }}></i>
                </div>
                <div className="search-div">
                    <i className="fa-solid fa-xmark" onClick={()=>{
                        let searchDiv = document.querySelector(".search-div");
                        searchDiv.classList.remove("active")
                    }}></i>
                    <div className="input-div">
                        <input type="search" />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
                <LogOutPopub/>
            </div>
        </>
    )
}
export default Nav;