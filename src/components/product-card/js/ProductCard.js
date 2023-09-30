import { Link } from "react-router-dom";
import "../css/product-card-style.css";
import { useDispatch } from "react-redux";
import { AddToWishList } from "../../../project-state-and-actions/AddToWishList";
import {AddToCart } from "../../../project-state-and-actions/CartActions";
import { useSelector } from "react-redux";

import { set , ref , push , remove, update } from "firebase/database";
import { database } from "../../../project-api/firebase";

function ProductCard(props) {
    let notfication = document.querySelector(".notfication");
    let notficationText = document.querySelector(".notfication > p");
    let cart = useSelector(state => state.selectedProducts);
    let {thereareoldPrice , showProduct , rate} = props;
    let dispatch = useDispatch();
    let alreadyAdded = document.querySelector(".already-added-div");
    let alreadyText = document.querySelector(".already-added-div > p");

    function addActiveClass(productId , productName) {
        let find = cart.find(produc => parseInt(produc.id) === productId);
        if(find) {
            alreadyAdded.classList.add("active");
            alreadyText.textContent = `the ${productName} already in cart`;
        }
        setTimeout(()=>{
            alreadyAdded.classList.remove("active");
        },4000);
    }
    return (
        <>
            <div className={`slide-card active all ${props.filterClass}`}>
                <div className="card-images">
                    <img src={props.firstImg} alt="" className="first-img"/>
                    <img src={props.secondImg} alt="" className="second-img"/>
                    <div className="add-to-cart-or-wishlist">
                        {showProduct && 
                            <Link to={`${props.productCategory}/productdetails/${props.productId}`} className="view-link">
                                <i className="fa-regular fa-eye" style={{"--i": ".4s"}}>
                                    <span>Quick View</span>
                                </i>
                            </Link>
                        }
                        <i className="fa-solid fa-cart-plus" style={{"--i": ".2s"}} onClick={()=>{
                            if(window.localStorage.getItem("user")) {
                                if(cart.length < 20){
                                    dispatch(AddToCart(
                                        {
                                            id : `${props.productId}`,
                                            productImg : `${props.firstImg}`,
                                            title : `${props.productName}`,
                                            price : `${props.price}`,
                                        }
                                    ));
                                }else {
                                    notfication.classList.add("active");
                                    notficationText.innerHTML = `can't add more than 20 items in cart!`;
                                    setTimeout(()=>{
                                        notfication.classList.remove("active")
                                    },6000)
                                }
                                addActiveClass(props.productId , props.productName);
                            }else {
                                let loginPopub = document.querySelector(".login-popub-parent");
                                loginPopub.classList.add("active");
                            }
                        }
                        }>
                            <span>Add to Cart</span>
                        </i>
                        <i className="fa-regular fa-heart" style={{"--i": "0s"}} onClick={()=>{
                            dispatch(AddToWishList(
                                {
                                    id : `${props.productId}`,
                                    productImg : `${props.firstImg}`,
                                    title : `${props.productName}`,
                                    price : `${props.price}`,
                                }
                            ));
                        }}>
                            <span>Add to Wishlist</span>
                        </i>
                    </div>
                </div>
                <div className="product-info">
                    <h2 className="product-name">{props.productName}</h2>
                    {rate && props.rating}
                    <div className="product-price">
                        <h2 className="new-price">${props.price}</h2>
                        {thereareoldPrice && <h2 className="old-price">${props.oldPrice}</h2>}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductCard;