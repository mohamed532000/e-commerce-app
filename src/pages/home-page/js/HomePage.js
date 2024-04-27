import "../css/home-page-style.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "../../../glopaly-styles/global-styles.css";
import {Swiper , SwiperSlide} from "swiper/react";
import SwiperCore, { A11y , Pagination , Navigation , EffectFade , Autoplay } from "swiper";
import { Link } from "react-router-dom";
import ProductCard from "../../../components/product-card/js/ProductCard";
import { useEffect, useState } from "react";
import BlogCard from "../../../components/home-components/blog-card/js/BlogCard";
import HeadOfPage from "../../../components/section-head/js/HeadOfPage";
import { onValue, ref } from "firebase/database";
import { database } from "../../../project-api/firebase";
function HomePage() {
    let [latestProducts , setLatestProducts] = useState([])
    document.documentElement.style.setProperty('--swiper-navigation-size', '20px');
    document.documentElement.style.setProperty("--swiper-navigation-sides-offset" , "20px");
    SwiperCore.use([EffectFade]);
    let params = {
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
    let blogParamsSwiper =  {
        breakpoints: {
            200 : {
                slidesPerView : 1,
            },
            400: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    }
    let lastDate = new Date('10 1 2024 , 23:59:59').getTime();
    let [days , setDays] = useState();
    let [hours , setHours] = useState();
    let [minutes , setMinutes] = useState();
    let [seconds , setSeconds] = useState();

    setInterval(()=>{
        let now = new Date().getTime();

        let fromNwoToOct = lastDate - now;

        let d = Math.floor((fromNwoToOct / (1000 * 60 * 60 * 24)));
        let h = Math.floor(fromNwoToOct % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        let m = Math.floor(fromNwoToOct % (1000 * 60 * 60) / (1000 * 60));
        let s = Math.floor(fromNwoToOct % (1000 * 60) / (1000));

        setDays(d);
        setHours(h);
        setMinutes(m);
        setSeconds(s);
    },1000)

    useEffect(()=>{
        fetchingData();
        let zoomPhoto = document.querySelector('.zoom-photo');
        zoomPhoto.addEventListener('mousemove', (event) => {
            let boundingRect = zoomPhoto.getBoundingClientRect();
            let offsetX = event.clientX - boundingRect.left;
            let offsetY = event.clientY - boundingRect.top;
        
            zoomPhoto.style.transformOrigin = `${offsetX}px ${offsetY}px`;
        });
    },[]);
    let fetchingData = ()=> {
        onValue(ref(database) , (snapshot)=>{
            let category = "latest-products";
            let data = snapshot.val();
            let latestProducts = data.products.filter(product => {
                return product.category === category;
            });
            setLatestProducts(latestProducts)
        })
    }
    return (
        <>
            <HeadOfPage
                backgroundImg="https://drou-electronics-store.myshopify.com/cdn/shop/files/x1.jpg?v=1674276678"
                sectionTitle="New arrivals collection"
                secondTitle="iPhone Accessories"
                sectionInfo="Explore our website now to discover the latest and most cutting-edge smartphones that redefine technology and style. Upgrade your mobile experience today"

                secondSectionBackgroundImg="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                secondSectionTitle="Fashion Finds to Define Your Unique Self"
                secondSectionSecondTitle="Unlock Your Fashion Journey: Discover Your Signature Style"
                secondSectionInfo="Fashionista's Haven: A Kaleidoscope of Trendsetting Looks"
                lastSwiper = {true}
                lastSectionBackgroundImg="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                lastSectionTitle="SALE UP TO 30% OFF"
                lastSectionSecondTitle="Furnishing Dreams: Unveiling a World of Stylish Comfort"
                lastSectionInfo="Furniture Fantasia: Where Imagination Meets Reality"
            />
            <div className="trending-section">
                <div className="container products-container">
                    <h2 className="section-head">Trending Categories </h2>
                    <Swiper
                        className="parent-of-slides"
                        modules = {[A11y , Pagination , Navigation , EffectFade , Autoplay]}
                        slidesPerView={5}
                        spaceBetween={100}
                        speed={1000}
                        {...params}
                    >
                        <SwiperSlide className="slide">
                            <img src="https://drou-electronics-store.myshopify.com/cdn/shop/files/10_300x300.jpg?v=1674276674" alt="" />
                            <Link to="/" className="product-name">Laptop</Link>
                        </SwiperSlide>
                        <SwiperSlide className="slide">
                            <img src="https://drou-electronics-store.myshopify.com/cdn/shop/files/p7_300x300.jpg?v=1674276678" alt="" />
                            <Link to="/" className="product-name">IPhone</Link>
                        </SwiperSlide>
                        <SwiperSlide className="slide">
                            <img src="https://drou-electronics-store.myshopify.com/cdn/shop/files/11_300x300.jpg?v=1674276680" alt="" />
                            <Link to="/" className="product-name">Mini speaker</Link>
                        </SwiperSlide>
                        <SwiperSlide className="slide">
                            <img src="https://drou-electronics-store.myshopify.com/cdn/shop/files/9_300x300.jpg?v=1674276675" alt="" />
                            <Link to="/" className="product-name">Tablets</Link>
                        </SwiperSlide>
                        <SwiperSlide className="slide">
                            <img src="https://drou-electronics-store.myshopify.com/cdn/shop/files/12_300x300.jpg?v=1674276678" alt="" />
                            <Link to="/" className="product-name">Headphones</Link>
                        </SwiperSlide>
                        <SwiperSlide className="slide">
                            <img src="https://drou-electronics-store.myshopify.com/cdn/shop/files/p4_300x300.jpg?v=1674276678" alt="" />
                            <Link to="/" className="product-name">Accessories</Link>
                        </SwiperSlide>
                        <SwiperSlide className="slide">
                            <img src="https://drou-electronics-store.myshopify.com/cdn/shop/files/13_300x300.jpg?v=1674276679" alt="" />
                            <Link to="/" className="product-name">Watch</Link>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="container other-products">
                    <div className="product">
                        <img src="https://drou-electronics-store.myshopify.com/cdn/shop/files/sub-banner-1.jpg?v=1674276677" alt=""/>
                        <div className="product-info">
                            <h3>SECURITY SMART CAMERA</h3>
                            <h4>Just Starting At $850</h4>
                            <Link to={""} className="shop-btn">Shop Now</Link>
                        </div>
                    </div>
                    <div className="product">
                        <img src="https://drou-electronics-store.myshopify.com/cdn/shop/files/sub-banner-2.jpg?v=1674276677" alt=""/>
                        <div className="product-info">
                            <h3>ENTERTAINMENT & GAMES</h3>
                            <h4>Just Starting at $850 Hurry up!</h4>
                            <Link to={""} className="shop-btn">Shop Now</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="latest-products-section">
                <div className="container latest-products-container">
                    <h2 className="section-head">Latest Products</h2>
                    <Swiper
                        className="parent-of-slides"
                        {...params}
                        speed={1000}
                        spaceBetween={50}
                        
                    >
                        
                            {latestProducts.map(product => {
                                return (
                                    <SwiperSlide key={product.id}>
                                        <ProductCard
                                            productId = {product.id}
                                            showProduct = {true}
                                            firstImg={product.img1} 
                                            secondImg={product.img2}
                                            productName={product.title} 
                                            price={product.price}
                                            thereareoldPrice = {false}
                                            productCategory = {product.category}
                                        />
                                    </SwiperSlide>
                                )
                            })}
                    </Swiper>
                </div>
            </div>
            <div className="hurry-up-section">
                <div className="container hurry-container">
                    <img src="https://drou-electronics-store.myshopify.com/cdn/shop/files/main-banner-01.jpg?v=1674276678" alt="" />
                    <div className="hurry-up-conter">
                        <div className="harry-up-title">
                            Hurry Up !
                        </div>
                        <h2>Up To 25% Discount Check it Out</h2>
                        <div className="conter">
                            <span className="dayes">{days} <p>Deys</p></span>
                            <span className="hours">{hours} <p>Hours</p></span>
                            <span className="minutes">{minutes}<p>Min</p></span>
                            <span className="seconds">{seconds} <p>Sec</p></span>
                        </div>
                        <Link to="/" className="shop-btn">
                            <span></span>
                            <p>Shop Now</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="blog-section">
                <div className="container">
                    <h2 className="section-head">Blog & Events</h2>
                    <Swiper
                        className="parent-of-slides"
                        modules={[A11y , Navigation , Pagination ]}
                        {...blogParamsSwiper}
                        speed={1000}
                        navigation
                        pagination = {{clickable: true}}
                        spaceBetween={70}
                    >
                        <SwiperSlide className="slide">
                            <BlogCard cardImg={"https://drou-electronics-store.myshopify.com/cdn/shop/articles/b1_grande.jpg?v=1674278859"} cardDateIcon={<i className="fa-regular fa-calendar"></i>} date={"Mar 17, 2023"} cardTitle={"MacBook Air  labore et dolore"} />
                        </SwiperSlide>
                        <SwiperSlide className="slide">
                            <BlogCard cardImg={"https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=600"} cardDateIcon={<i className="fa-regular fa-calendar"></i>} date={"Oct 25, 2022"} cardTitle={"Repot events highlight emerging industry trends."} />
                        </SwiperSlide>
                        <SwiperSlide className="slide">
                            <BlogCard cardImg={"https://images.pexels.com/photos/3183135/pexels-photo-3183135.jpeg?auto=compress&cs=tinysrgb&w=600"} cardDateIcon={<i className="fa-regular fa-calendar"></i>} date={"January 21, 2023"} cardTitle={"Headsets help writers to concentrate deeply."} />
                        </SwiperSlide>                    
                        <SwiperSlide className="slide">
                            <BlogCard cardImg={"https://images.pexels.com/photos/706142/pexels-photo-706142.jpeg?auto=compress&cs=tinysrgb&w=600"} cardDateIcon={<i className="fa-regular fa-calendar"></i>} date={"Sept 11, 2020"} cardTitle={"Ipsum available but the majority"} />
                        </SwiperSlide>
                        <SwiperSlide className="slide">
                            <BlogCard cardImg={"https://images.pexels.com/photos/610945/pexels-photo-610945.jpeg?auto=compress&cs=tinysrgb&w=600"} cardDateIcon={<i className="fa-regular fa-calendar"></i>} date={"January 21, 2023"} cardTitle={"Music magnate headphones"} />
                        </SwiperSlide>
                        <SwiperSlide className="slide">
                            <BlogCard cardImg={"https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=600"} cardDateIcon={<i className="fa-regular fa-calendar"></i>} date={"January 21, 2023"} cardTitle={"Laptops offer convenient writing on the go."} />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            <div className="big-discount-section">
                <div className="container big-discount">
                    <img className="zoom-photo" src="https://drou-electronics-store.myshopify.com/cdn/shop/files/slide61.jpg?v=1674276677" alt="big-discount" />
                    <div className="discount-info">
                        <h3>BIG DISCOUNT</h3>
                        <p>Google Pixel Smart Phone</p>
                        <h2 className="phone-price">${320}</h2>
                        <Link to="/"><span></span><p>Shop Now</p></Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default HomePage;