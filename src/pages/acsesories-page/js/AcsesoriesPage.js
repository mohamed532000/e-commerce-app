import "../../../glopaly-styles/global-styles.css";
import "../css/acsesories-page-style.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { database } from "../../../project-api/firebase";
import { onValue , ref } from "firebase/database";
import {useEffect , useState} from "react";
import { Swiper , SwiperSlide } from "swiper/react";
import { Navigation , Pagination , A11y , Autoplay } from "swiper";
import ProductCard from "../../../components/product-card/js/ProductCard";
import ExploreBtn from "../../../components/explore-btn/js/ExploreBtn";
import ShoppingTitle from "../../../components/shopping-title/js/ShoppingTitle";
import FilterSideBar from "../../../components/fashion-components/fashion-filter-side/js/FilterSideBar";
import NoProducts from "../../../components/no-products/js/NoProducts";
import FilterIcon from "../../../components/filter-icon/js/FilterIcon";

function AcsesoriesPage() {
    let [products , setProducts] = useState([]);
    let [filtredProducts , setFiltredProducts] = useState([]);
    let [productsTypes , setProductsTypes] = useState([]);
    let [minPrice , setMinPrice] = useState();
    let [maxPrice , setMaxPrice] = useState();

    useEffect(()=>{
        fetchingData();
    },[]);

    let categoryPage = "acsesories-products";
    let fetchingData = ()=>{
        onValue(ref(database) , (snapshot)=>{
            let data = snapshot.val();
            if(data !== null) {
                let products = data.products.filter((product)=>{
                    return product.category === categoryPage
                });
                setProducts(products);
                setFiltredProducts(products);
                let allTypes = products.map(product => {
                    return product.type.toUpperCase();
                });
                setProductsTypes(["All Products" , ...new Set(allTypes)]);
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

    let filterDone = (filtredProducts) => {
        setFiltredProducts(filtredProducts)
    }
    return (
        <>
            <div className="head-section">
                <div className="container">
                    <div className="head-text">
                        <h2>Elevate Your Mobile Lifestyle!</h2>
                        <p>Enhance Your Mobile Experience: Explore Our Phone Accessories Collection!</p>
                        <ExploreBtn text="Shop Now"/>
                    </div>
                        <Swiper
                            className="parent-of-slides"
                            modules = {[A11y , Pagination , Navigation , Autoplay]}
                            speed = {1000}
                            autoplay = {{
                                delay: 3000,
                                disableOnInteraction : false
                            }}
                            loop = {true}
                        >
                            <SwiperSlide className="slide">
                                <img src="https://i.pinimg.com/474x/9f/2b/43/9f2b439615ecfb241b9305b5140ef90a.jpg" alt=""/>
                            </SwiperSlide>
                            <SwiperSlide className="slide">
                                <img src="https://i.pinimg.com/474x/48/b0/9f/48b09f6d8699ea6277f533eaec98bc1e.jpg" alt=""/>
                            </SwiperSlide>
                            <SwiperSlide className="slide">
                                <img src="https://i.pinimg.com/474x/da/04/36/da04366a970d258b692639b758d6c1e9.jpg" alt=""/>
                            </SwiperSlide>
                        </Swiper>
                </div>
            </div>
            <div className="shop-content">
                <ShoppingTitle titleText="Accessories Galore: Unlock Your Phone's Potential" titleInfo="Upgrade Your Phone Game: Shop the Latest Accessories" pageName="Accesories Page"/>
                <div className="container">
                <FilterSideBar
                        filterList = {productsTypes}
                        minPrice = {minPrice}
                        maxPrice = {maxPrice}
                        products = {products}
                        passFiltredProducts = {filterDone}
                        addImg="https://images.unsplash.com/photo-1600031830097-10d2791a3b83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                    />
                    <FilterIcon filterSide={document.querySelector(".filter-side")}/>
                    <div className="products-content">
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
        </>
    )
}
export default AcsesoriesPage;