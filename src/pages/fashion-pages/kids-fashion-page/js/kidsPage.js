import "../../../../glopaly-styles/global-styles.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import globalFashionStyles from "../../../../glopaly-styles/globaly-fashion-styles.module.css";
import { database } from "../../../../project-api/firebase";
import { onValue , ref } from "firebase/database";
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

function KidsPage() {
    let [products , setProducts] = useState([]);
    let [productsColor , setColors] = useState([]);
    let [filtredProducts , setFiltredProducts] = useState([]);
    let categoryList = ["All Products","T shirts" , "Jackets" , "Glasses" , "Shoes" , "Bags"];
    let [minPrice , setMinPrice] = useState();
    let [maxPrice , setMaxPrice] = useState();
    let sizesList = ["M" , "S" , "X" , "XL" , "XXL"]

    useEffect(()=>{
        fetchingData();
    },[]);
    let categoryPage = "kids-products";
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
    let filterDone = (filtredProducts)=>{
        setFiltredProducts(filtredProducts)
    }

    function scrollWindowBy1500() {
        window.scrollTo(0, 1500);
    };
    
    return (
        <>
            <FashionHeadPage
                headPageImg = "https://images.unsplash.com/photo-1632337950445-ba446cb0e26f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                headPageTitle = "Little Fashion Icons: Shop Kids & Baby Delights"
                headPageTitle2 = "Explore Kid and Baby Fashion Fantasies"
                headPageInfo = "Cutest Collections: Kids & Baby Fashion Galore"
            />
            <ShoppingTitle  
                titleText = "Cutest Collections: Kids & Baby Fashion Galore"
                titleInfo = "Kids & Baby Fashion Journey"
                pageName = "Kids & Baby"
            />
            <div className={globalFashionStyles.shop_content}>
                <div className={globalFashionStyles.container}>
                    <FilterSideBar
                        filterList = {categoryList}
                        colorsFilter = {true}
                        colors = {productsColor}
                        sizeFilter = {true}
                        sizes = {sizesList}
                        products = {products}
                        minPrice = {minPrice}
                        maxPrice = {maxPrice}
                        passFiltredProducts = {filterDone}
                        addImg="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=489&q=80"
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
                                <img src="https://images.unsplash.com/photo-1622290291165-d341f1938b8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80" alt="Add img" />
                                <div className={globalFashionStyles.add_info}>
                                    <h2>New Style</h2>
                                    <h3>Kids Clothes</h3>
                                    <button className="shop-btn" onClick={scrollWindowBy1500}>Shop Now</button>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className={globalFashionStyles.slide}>
                                <img src="https://images.unsplash.com/photo-1489009711676-2c89cb3c0a12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80" alt="Add img" />
                                <div className={globalFashionStyles.add_info}>
                                    <h2>Style Hub</h2>
                                    <h3> Unleash Kids & Baby Fashion Magic</h3>
                                    <button className="shop-btn" onClick={scrollWindowBy1500}>Shop Now</button>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                        <div className={globalFashionStyles.products_content}>
                        {filtredProducts.length > 0 ? filtredProducts.map(product => {
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
            <VideoElement videoLink = "https://player.vimeo.com/external/660919395.sd.mp4?s=4b0e96931d52014b047515cd47ee961afdf05f24&profile_id=164&oauth_token_id=57447761" videoInfo = "Unleash Your Style with Women's Fashion Delights!"/>
        </>
    )
}
export default KidsPage;