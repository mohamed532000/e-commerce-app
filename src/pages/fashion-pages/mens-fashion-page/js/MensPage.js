import "../../../../glopaly-styles/global-styles.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { database } from "../../../../project-api/firebase";
import { onValue , ref } from "firebase/database";
import globalFashionStyles from "../../../../glopaly-styles/globaly-fashion-styles.module.css";
import { useEffect, useState } from "react";
import {Swiper , SwiperSlide} from "swiper/react";
import { A11y , Navigation , Pagination , Autoplay } from "swiper";
import FashionHeadPage from "../../../../components/fashion-components/fashion-head-page/js/FashionHeadPage";
import FilterSideBar from "../../../../components/fashion-components/fashion-filter-side/js/FilterSideBar";
import ProductCard from "../../../../components/product-card/js/ProductCard";
import ShoppingTitle from "../../../../components/shopping-title/js/ShoppingTitle";
import VideoElement from "../../../../components/video-section/js/VideoElement";
import NoProducts from "../../../../components/no-products/js/NoProducts";
import FilterIcon from "../../../../components/filter-icon/js/FilterIcon";
function MensPage() {
    let [products , setProducts] = useState([]);
    let [productsColor , setColors] = useState([]);
    let [filtredProducts , setFiltredProducts] = useState([]);
    let categoryList = ["All Products","T shirts" , "Jackets" , "Glasses" , "Shoes" , "Bags"];
    let [minPrice , setMinPrice] = useState();
    let [maxPrice , setMaxPrice] = useState();
    let sizesList = ["M" , "S" , "X" , "XL" , "XXL"]

    useEffect(()=>{
        fetchingData()
    },[]);
    let categoryPage = "men-products";
    let fetchingData = ()=>{
        onValue(ref(database) , (snapshot)=>{
            let data = snapshot.val();
            if(data !== null) {
                let products = data.products.filter((product)=>{
                    return product.category === categoryPage
                });
                setProducts(products);
                setFiltredProducts(products);
                let colors = products.map(product => {
                    return product.color;
                });
                setColors([...new Set(colors)]);
                let allPrices = products.map(product => {
                    return product.price;
                });
                let minPrice = Math.min(...allPrices);
                setMinPrice(minPrice);
                let maxPrice = Math.max(...allPrices);
                setMaxPrice(maxPrice);
            }
        });
    }
    const filterDone = (filteredProducts) => {
        setFiltredProducts(filteredProducts);
    };
    function scrollWindowBy1500() {
        window.scrollTo(0, 1500);
    };
    return (
        <>
            <FashionHeadPage
                headPageImg = "https://images.unsplash.com/photo-1517090798935-22993dd084b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                headPageTitle = "Timeless Elegance: Unleash Your Sartorial Charm"
                headPageTitle2 = "Tailored to Perfection: Discover the Art of Men's Fashion"
                headPageInfo = "Refined & Resolute: Elevate Your Fashion Game with Men's Style Steals"
            />
            <ShoppingTitle  
                titleText = "Discover Your Perfect Style"
                titleInfo = "Unleash Your Inner Fashion Icon - Men's Shopping Extravaganza!"
                pageName = "Mens"
            />
            <div className={globalFashionStyles.shop_content}>
                <div className={globalFashionStyles.container}>
                    <FilterSideBar
                        filterList = {categoryList}
                        colorsFilter = {true}
                        colors = {productsColor}
                        sizeFilter = {true}
                        sizes = {sizesList}
                        minPrice = {minPrice}
                        maxPrice = {maxPrice}
                        products = {products}
                        passFiltredProducts = {filterDone}
                        addImg="https://images.unsplash.com/photo-1580880783109-6746c2199006?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
                    />
                    <FilterIcon filterSide={document.querySelector(".filter-side")}/>
                    <div className={globalFashionStyles.products_side}>
                        <Swiper
                                className={globalFashionStyles.parent_of_slides}
                                modules = {[A11y , Navigation , Pagination , Autoplay]}
                                loop = {true}
                                autoplay = {{
                                    delay: 3000,
                                    disableOnInteraction : false
                                }}
                                speed = {2000}
                            >
                                <SwiperSlide className={globalFashionStyles.slide}>
                                    <img src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80" alt="Add img" />
                                    <div className={globalFashionStyles.add_info}>
                                        <h2>New Style</h2>
                                        <h3>MEN T-SHIRT</h3>
                                        <button className="shop_btn" onClick={scrollWindowBy1500}>Shop Now</button>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className={globalFashionStyles.slide}>
                                    <img src="https://images.unsplash.com/photo-1501612164070-9919a55f7563?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80" alt="Add img" />
                                    <div className={globalFashionStyles.add_info}>
                                        <h2>Style Hub</h2>
                                        <h3>Unleash Your Masculine Elegance with Men's Fashion Essentials</h3>
                                        <button className="shop_btn" onClick={scrollWindowBy1500}>Shop Now</button>
                                    </div>
                                </SwiperSlide>
                        </Swiper>
                        <div className={globalFashionStyles.products_content}>
                            {filtredProducts && filtredProducts.length > 0 
                            ? 
                            filtredProducts.map(product => {
                                return (
                                    <ProductCard
                                        key={product.id}
                                        showProduct = {true}
                                        firstImg = {product.img1}
                                        secondImg = {product.img2}
                                        productName = {product.title}
                                        price = {`${product.price}`}
                                        thereareoldPrice = {false}
                                        productId = {product.id}
                                        productCategory = {product.category}
                                        filterClass = {`
                                                ${product.type}
                                                ${product.size}
                                                ${product.color}
                                            `}
                                    />
                                    )
                                })
                            : 
                            <NoProducts/>
                                }
                        </div>
                    </div>
                </div>
            </div>
            <VideoElement videoLink = "https://player.vimeo.com/external/372192428.sd.mp4?s=3082abbe74824763f7d79f2a65ac4225f2689828&profile_id=164&oauth2_token_id=57447761" videoInfo = "Where Style Meets Substance - Men's Shopping Wonderland"/>
        </>
    )
}
export default MensPage;