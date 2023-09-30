import "../../../glopaly-styles/global-styles.css";
import "../css/cart-page-style.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector , } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { increment , decrement , deleteProduct , clearCart} from "../../../project-state-and-actions/CartActions";
import NormalPopub from "../../../components/data-sent-popub/js/NormalPopub";
import emailJs from "emailjs-com";

function CartPage() {
    let notfication = document.querySelector(".notfication");
    let notficationText = document.querySelector(".notfication > p");
    let cart = useSelector((state) => state.selectedProducts);
    let dispatch = useDispatch();
    let data = [];
    let date = new Date();
    let year = date.getFullYear();
    let mounth = date.getMonth()+1;
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let m = minutes >= 9 ? minutes : `0${minutes}`;
    let s = seconds >= 9 ? seconds : `0${seconds}`;
    let period = hour >= 12 ? 'PM' : 'AM';
    let [countries , setCountries] = useState([]);
    let [shippingPrice , setShippingPrice] = useState(14)
    let checkoutPopub = document.querySelector(".checkout-popub");
    let completedPopub = document.querySelector(".normal-popub-parent");
    let [userFirtsName , setUserFirstName] = useState("");
    let [userLastName , setUserLastName] = useState("");
    let [userPhone , setUserPhone] = useState("");
    let [userAdress , setUserAdress] = useState("");
    let [userEmail , setUserEmail] = useState("");
    let [userPass , setUserPass] = useState("");
    let [clientOrder , setOrder] = useState()
    let userAccount = window.localStorage.getItem("user") && JSON.parse(window.localStorage.getItem("user"));
    let emailFromAccount = userAccount && userAccount.email;
    let passFromAccount = userAccount && userAccount.pass;
    let validPhoneNumber = /^01\d{9}\d$/

    useEffect(()=>{
        fetch("https://restcountries.com/v3.1/all").then(data=> data.json()).then(finalData => setCountries(finalData));
    },[]);
    let totalPrice = cart.reduce((acc , produc)=>{
        produc.price ? acc += produc.price * produc.quantity : acc += produc.id + 200 * produc.quantity ;
        return acc;
    },0);

    let orderContent = {
        to_name : "mohamed ezat",
        client_first_name : userFirtsName,
        client_last_name : userLastName,
        client_order : clientOrder,
        order_date : `${day} / ${mounth} / ${year} ${hour}:${m}:${s}${period}`,
        client_adress : userAdress,
        client_phone : userPhone,
        client_email : userEmail,
        price : `$${totalPrice}`,
        shipping : `$${shippingPrice}`,
        total : `$${totalPrice + shippingPrice}`
    }
    let sendData = (e)=>{
        emailJs.send("service_tav7v3s" , "template_jzrog3z" , orderContent, "k4JSsUw3pWeXhbr6g")
    }
    return (
        <>
            <div className="cart-section">
                <div className="page-routes">
                    <Link to="/">Home</Link>
                    /
                    <p>Your Shopping Cart</p>
                </div>
                <div className="cart-content">
                    {
                    cart.length !== 0 ?
                    <>
                        <table className="cart-table">
                            <thead>
                                <tr>
                                    <th>PRODUCT</th>
                                    <th>PRICE</th>
                                    <th>QUANTITY</th>
                                    <th>TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart.map(product => {
                                        return (
                                            <tr key={product.id}>
                                                <td>
                                                    <div className="img-and-name">
                                                        <img src={product.productImg || product.img1} alt="" />
                                                        <h3>{product.title}</h3>
                                                    </div>
                                                </td>
                                                <td>$ {product.price}</td>
                                                <td>
                                                    <div className="quantity-div">
                                                        <i className="fa-solid fa-minus" onClick={()=>{
                                                            let quantity = product.quantity - 1;
                                                            let deleteingAsk = document.querySelector(".deleting-ask-popub");
                                                            let deletingBtn = document.querySelector(".deleting-ask-popub .ask-content .btn.delete");
                                                            let canselBtn = document.querySelector(".deleting-ask-popub .ask-content .btn.cansel");
                                                            if(quantity < 1) {
                                                                deletingBtn.onclick = ()=>{
                                                                    dispatch(deleteProduct(product));
                                                                    deleteingAsk.classList.remove("active");
                                                                    notfication.classList.add("active");
                                                                    notficationText.innerHTML = `Deleting ${product.title}`;
                                                                }
                                                                canselBtn.onclick = ()=>{
                                                                    deleteingAsk.classList.remove("active");
                                                                    dispatch(increment(product));
                                                                }
                                                                deleteingAsk.classList.add("active");
                                                                setTimeout(()=>{
                                                                    notfication.classList.remove("active")
                                                                },6000)
                                                            };
                                                            dispatch(decrement(product));
                                                        }}></i>
                                                        <p>{product.quantity}</p>
                                                        <i className="fa-solid fa-plus" onClick={()=>{
                                                            if(product.quantity < 10) {
                                                                dispatch(increment(product));
                                                            }else {
                                                                notfication.classList.add("active");
                                                                notficationText.innerHTML = `can't add more than 10 products of one item!`;
                                                                setTimeout(()=>{
                                                                    notfication.classList.remove("active")
                                                                },6000)
                                                            }
                                                            
                                                        }}></i>
                                                    </div>
                                                </td>
                                                <td>$ {(product.price * product.quantity).toFixed(2)}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <div className="complete-steps">
                            <Link to='/'>Continue Shopping</Link>
                            <button onClick={()=>{
                                dispatch(clearCart())
                            }}>Clear Cart</button>
                        </div>
                        <div className="container complete-order">
                            <div className="delivary-div child">
                                <h2>Pick a delivery date and Time</h2>
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                }}>
                                    <div className="input-div date-div">
                                        <input type="date"/>
                                    </div>
                                    <div className="input-div time-div">
                                        <input type="time" placeholder="write delivery time"/>
                                    </div>
                                    <p>Pick delivery date and time as you choose. Delivery Time takes place between 12PM - 4PM MON-FRI AND 8AM-11AM SAT.</p>
                                    <div className="shipping-div">
                                        <h2>Get shipping estimates</h2>
                                        <select onChange={(e)=>{
                                                    setShippingPrice(e.target.value.length + 10);
                                                }}>
                                            {countries.map(country => {
                                                return <option key={country.name.common}>{country.name.common}</option>
                                            })}
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="cart-totals child">
                                <h2>Cart Totals</h2>
                                <div className="cart-info">
                                    <p>SUBTOTAL</p>
                                    <p>${totalPrice.toFixed(2)}</p>
                                </div>
                                <div className="cart-info">
                                    <p>Shipping</p>
                                    <p>${shippingPrice.toFixed(2)}</p>
                                </div>
                                <div className="cart-info">
                                    <p>TOTAL</p>
                                    <p>${(totalPrice + shippingPrice).toFixed(2)}</p>
                                </div>
                                <div className="agree-terms">
                                    <input type="checkbox" id="agree-terms" onChange={()=>{
                                        let checkoutBtn = document.querySelector(".checkout-btn");
                                        checkoutBtn.classList.toggle("active")
                                    }}/>
                                    <label htmlFor="agree-terms">I agree with the terms and conditions</label>
                                </div>
                                <button className="checkout-btn" onClick={()=>{
                                    checkoutPopub.classList.add("active");
                                }}>Proceed to Checkout</button>
                            </div>
                        </div>
                        <div className="checkout-popub">
                            <div className="close-checkout-popup" onClick={()=>{
                                checkoutPopub.classList.remove("active")
                            }}>
                                <span style={{"--i" : "45deg"}}></span>
                                <span style={{"--i" : "-45deg"}}></span>
                            </div>
                            <div className="container">
                                <div className="billing-div">
                                    <h3 className="title">Billing Details</h3>
                                    <form id="data-form" className="billng-form" onSubmit={(e)=>{
                                        e.preventDefault();
                                        if(
                                            userPhone.match(validPhoneNumber) &&
                                            userEmail === emailFromAccount &&
                                            userPass === passFromAccount )  {
                                                sendData()
                                                completedPopub.classList.add("active");
                                            }else {
                                                document.querySelector(".billing-div .email-div .wrong-message").classList.add("active");
                                                setTimeout(()=>{
                                                    document.querySelector(".billing-div .email-div .wrong-message").classList.remove("active");
                                                },3000)
                                            }
                                        
                                    }}>
                                        <div className="names-div">
                                            <div className="input-div first-name-div">
                                                <label htmlFor="input-div first-name">
                                                    First Name
                                                </label>
                                                <input
                                                type="text"
                                                autoFocus
                                                className="input-first-name" 
                                                id="first-name" 
                                                required
                                                value={userFirtsName}
                                                onChange={(e)=>{
                                                    setUserFirstName(e.target.value)
                                                }}/>
                                            </div>
                                            <div className="input-div second-name-div">
                                                <label htmlFor="Last-name">
                                                    Last Name
                                                </label>
                                                <input 
                                                type="text"
                                                className="input-last-name" 
                                                id="last-name" 
                                                required
                                                onChange={(e)=>{
                                                    setUserLastName(e.target.value)
                                                }}/>
                                            </div>
                                        </div>
                                        <div className="input-div company-div">
                                                <label htmlFor="company-name">
                                                    Adress
                                                </label>
                                                <input 
                                                type="text" 
                                                id="company-name"
                                                required
                                                onChange={(e)=>{
                                                    setUserAdress(e.target.value)
                                                }}/>
                                            </div>
                                            <div className="input-div phone-div">
                                                <label htmlFor="first-phone">
                                                    Phone Number
                                                </label>
                                                <input 
                                                type="text" 
                                                id="first-phone"
                                                required 
                                                value={userPhone}
                                                onChange={(e)=>{
                                                    if(!e.target.value.match(validPhoneNumber)){
                                                        e.target.classList.add("invalid")
                                                        e.target.classList.remove("valid");
                                                    }else {
                                                        e.target.classList.remove("invalid");
                                                        e.target.classList.add("valid")
                                                    }
                                                    setUserPhone(e.target.value)
                                                }}/>
                                            </div>
                                            <div className="input-div second-phone-div">
                                                <label htmlFor="second-phone">
                                                    Other Phone Number (optional)
                                                </label>
                                                <input 
                                                type="text" 
                                                id="second-phone"/>
                                            </div>
                                            <div className="input-div email-div">
                                                
                                                <label htmlFor="email">
                                                    E-mail
                                                </label>
                                                <p className="wrong-message">wrong e-mail or password please try again!</p>
                                                <input 
                                                type="email" 
                                                id="email" 
                                                required 
                                                value={userEmail}
                                                onChange={(e)=>{
                                                    setUserEmail(e.target.value)
                                                }}/>
                                            </div>
                                            <div className="input-div pass-div">
                                                <label htmlFor="password">
                                                    Account Password
                                                </label>
                                                <input 
                                                type="password" 
                                                id="password" 
                                                required
                                                onChange={(e)=>{
                                                    setUserPass(e.target.value)
                                                    let orderData = cart.map(produc=>{
                                                        return `product name => ${produc.title} quantity=> ${produc.quantity}`
                                                    }).join("\n")
                                                    setOrder(orderData)
                                                }}/>
                                            </div>
                                    </form>
                                </div>
                                <div className="order-div">
                                    <h3 className="title">Your Order</h3>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Products</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map(product=>{
                                                data.push(product.title);
                                                return (
                                                    <tr key={product.id} className="products-row">
                                                        <td>{product.title} * {product.quantity}</td>
                                                        <td>${(product.price * product.quantity).toFixed(2)}</td>
                                                    </tr>
                                                )
                                            })}
                                            <tr>
                                                <td>Subtotal</td>
                                                <td>${totalPrice.toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td>Shipping</td>
                                                <td>${shippingPrice.toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td>Total</td>
                                                <td>${(totalPrice + shippingPrice).toFixed(2)}</td>
                                            </tr>
                                        </tbody>
                                        <div className="payments-div">
                                            <div className="payment-type">
                                                <input type="radio" name="payment" id="online-pay"/>
                                                <label htmlFor="online-pay">ONLINE PAYMENT</label>
                                            </div>
                                            <div className="payment-type">
                                                <input type="radio" name="payment" id="cash-on-delivry"/>
                                                <label htmlFor="cash-on-delivry">CASH ON DELIVERY</label>
                                            </div>
                                        </div>
                                    </table>
                                    <button className="confirm-order" form="data-form">
                                        <p>Confirm Order</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <NormalPopub
                        popubImg = {"https://i.pinimg.com/474x/49/f1/cc/49f1ccd6d6c1b4eb4b7d9bcabd42bd7b.jpg"}
                        senderName = {`Good Job, ${userFirtsName} ${userLastName}`}
                        title="your Order Is Completed !"
                        info="thank you for your time ."
                        button={true}
                        buttonText = "Home"
                        pathName = "/"
                        cart={true}/>
                    </>
                    : 
                    <div className="container empty-cart-container">
                        <h2>Shopping Cart is Empty.</h2>
                        <img src="https://cdn.shopify.com/s/files/1/0132/3116/1408/files/cart.png?13612" alt="cart-img" />
                        <p>You Have No Items In Your Shopping Cart.</p>
                        <Link to="airpods">
                            <i className="fa-solid fa-caret-left"></i>
                            <p>Continue Shopping</p>
                        </Link>
                    </div>
                    }
                </div>
            </div>
        </>
    )
}
export default CartPage;