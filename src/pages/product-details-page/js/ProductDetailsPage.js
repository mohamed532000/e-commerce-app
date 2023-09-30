import "../../../glopaly-styles/global-styles.css";
import "../css/product-details-page.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { onValue , ref } from "firebase/database";
import { database } from "../../../project-api/firebase";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddToCart } from "../../../project-state-and-actions/CartActions";
import { useDispatch , useSelector} from "react-redux";
import {Swiper , SwiperSlide} from "swiper/react";
import { A11y , Pagination , Navigation , EffectFade , Autoplay } from "swiper";
import ProductCard from "../../../components/product-card/js/ProductCard";
import ShoppingTitle from "../../../components/shopping-title/js/ShoppingTitle";

function ProductDetailsPage() {
    let params = useParams();
    let [product , setProduct] = useState({});
    let [relatedProducts , setRelatedProducts] = useState([]);
    let dispatch = useDispatch();
    let cart = useSelector(state => state.selectedProducts);
    let loginPopub = document.querySelector(".login-popub-parent");
    let swiperParams = {
        breakpoints: {
            200 : {
                slidesPerView : 1,
            },
            640: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            },
        },
    }
    useEffect(()=>{
        fetchingProductDetails()
        let mainImg = document.querySelector(".main-img-div img");
        let allImageSrc = document.querySelectorAll(".images-div img"); 
        allImageSrc.forEach(img => {
            img.onclick = ()=>{
                mainImg.src = img.src;
            }
        });
        mainImg.addEventListener('mousemove', (event) => {
            let boundingRect = mainImg.getBoundingClientRect();
            let offsetX = event.clientX - boundingRect.left;
            let offsetY = event.clientY - boundingRect.top;
            mainImg.style.transformOrigin = `${offsetX}px ${offsetY}px`;
        });
    },[]);

    let fetchingProductDetails = ()=>{
        onValue(ref(database) , (snapshot)=>{
            let data = snapshot.val()
            let product = data.products.filter(p => {
                return p.id === parseInt(params.id) && p.category === params.productCategory;
            })
            let relatedProducts = data.products.filter(p => {
                return p.category === params.productCategory;
            })
            setProduct(...product);
            setRelatedProducts(relatedProducts);
        })
    }
    
    let alreadyAdded = document.querySelector(".already-added-div");
    let alreadyText = document.querySelector(".already-added-div > p");
    function addActiveClass(productId , productName) {
        let find = cart.find(produc => parseInt(produc.id) === productId);
        if(find) {
            alreadyAdded.classList.add("active");
            alreadyText.textContent = `the ${productName} already in cart`;
        }else {
            console.log("not")
        }
        setTimeout(()=>{
            alreadyAdded.classList.remove("active");
        },4000);
    }
    function rate(star , emtyStar , rating) {
        let rateCount = 5-rating;
        let stars = [];
        let emptyStars = []
        for(let i=0; i<rating; i++) {
            stars.push(<div key={`${i}`}>{star}</div>)
        }
        for(let i=0; i<rateCount; i++) {
            emptyStars.push(<div key={`${i}`}>{emtyStar}</div>)
        }
        return(
            <div>
                {stars}{emptyStars}
            </div>
        )
    }
    return (
        <>
            <div className="details-section">
                <ShoppingTitle 
                    titleText = {`Quick View On ${product.title} !`}
                    pageName = "Quick View"
                />
                <div className="container">
                    <div className="product-images">
                        <div className="main-img-div">
                            <img className="main-img" src={product.img4} alt=""/>
                        </div>
                        <div className="images-div">
                            <img src={product.img1} alt=""/>
                            <img src={product.img2} alt=""/>
                            <img src={product.img3} alt=""/>
                            <img src={product.img4} alt=""/>
                        </div>
                    </div>
                    <div className="product-info">
                        <h2 className="product-name">{product.title}</h2>
                        <div className="product-raiting">
                            {rate(<i className="fa-solid fa-star"></i> ,<i className="fa-regular fa-star"></i>, product.rate)}
                        </div>
                        <p className="product-price">Price $<span>{product.price}</span></p>
                        <img src="https://htmldemo.net/bstore/img/arrow.webp" className="arrow-img" alt="arrow-img"/>
                        <div className="addition">
                            <button className="add-to-cart-btn" onClick={()=>{
                                if(window.localStorage.getItem("user")) {
                                    dispatch(AddToCart(product));
                                    addActiveClass(product.id , product.title);
                                }else {
                                    loginPopub.classList.add("active");
                                }
                            }}>
                                <p>Add to Cart</p>
                                <i className="fa-solid fa-cart-shopping"></i>
                            </button>
                        </div>
                        <div className="product-text">
                            <h2 className="text-title">Some information about <span>{product.title}</span>.</h2>
                            <p>Yeah i know its too late. But not
                            Today we will learn how to create a website header using html css step by step
                            This is so simple.</p>
                        </div>
                    </div>
                </div>
                {relatedProducts.length > 0 &&  
                <div className="container related-products">
                    <h2 className="section-title">Related Products</h2>
                    <Swiper
                        className="parent-of-slides"
                        modules={[A11y , Pagination , Navigation , EffectFade , Autoplay]}
                        navigation
                        pagination = {{clickable : true}}
                        slidesPerView={4}
                        spaceBetween={30}
                        {...swiperParams}
                    >
                        
                    {relatedProducts.map(product => {
                        return (
                            <SwiperSlide key={product.id} className="slide">
                                <ProductCard
                                    key={product.id}
                                    rate = {true}
                                    rating = {rate(<i className="fa-solid fa-star"></i> ,<i className="fa-regular fa-star"></i>, product.rate)}
                                    firstImg = {product.img1}
                                    secondImg = {product.img2}
                                    productName = {product.title}
                                    price = {`${product.price}`}
                                    thereareoldPrice = {false}
                                    productId = {product.id}
                                    productCategory = {product.category}
                                    filterClass = {`
                                            ${product.type}
                                        `}
                                    />
                            </SwiperSlide>
                            )
                        })}
                        

                    </Swiper>
                </div>
                }
            </div>
        </>
    )
}
export default ProductDetailsPage;