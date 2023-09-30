import "../../../glopaly-styles/global-styles.css";
import "../css/smart-watch-page-style.css"
import { database } from "../../../project-api/firebase";
import { onValue , ref } from "firebase/database";
import {useEffect , useState} from "react";
import HeadOfPage from "../../../components/section-head/js/HeadOfPage";
import ProductCard from "../../../components/product-card/js/ProductCard";
import ShoppingTitle from "../../../components/shopping-title/js/ShoppingTitle";
import VideoElement from "../../../components/video-section/js/VideoElement";
import FilterSideBar from "../../../components/fashion-components/fashion-filter-side/js/FilterSideBar";
import NoProducts from "../../../components/no-products/js/NoProducts";
import FilterIcon from "../../../components/filter-icon/js/FilterIcon";

function SmartWatchPage() {
    let [products , setProducts] = useState([]);
    let [filtredProducts , setFiltredProducts] = useState([]);
    let [productsTypes , setProductsTypes] = useState([]);
    let [minPrice , setMinPrice] = useState();
    let [maxPrice , setMaxPrice] = useState();
    useEffect(()=>{
        fetchingData();
    },[]);
    let categoryPage = "smart-watch-products";
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
    let filterDone = (filtredProduc) => {
        setFiltredProducts(filtredProduc);
    }
    return (
        <>
            <HeadOfPage
                lastSwiper = {false}
                backgroundImg = "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80"
                sectionTitle = "StyleSync Smart Timepieces"
                secondTitle = "Embrace the Future: Explore Our Collection of Smartwatches"
                sectionInfo = "Stay Connected in Style: Discover the Perfect Smartwatch for You!"
                secondSectionBackgroundImg = "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
                secondSectionTitle = "TechTrend Smartwatches."
                secondSectionSecondTitle = "Elevate Your Lifestyle with Cutting-Edge Smartwatches"
                secondSectionInfo = "Unleash Your Potential with Smartwatches Designed for Success"
            />
            <div className="info-about-page">
                <div className="container">
                    <div className="info-img">
                        <img src="https://www.pngmart.com/files/13/Smartwatch-PNG-Transparent-HD-Photo.png" alt="img" />
                    </div>
                    <div className="info-text">
                        <div className="text-box">
                            <h3>Embrace the Future: Smartwatches for the Modern Lifestyle</h3>
                            <p>Discover the perfect blend of style and functionality with our range of smartwatches. Seamlessly connect to your digital world, stay organized, and elevate your everyday life.</p>
                        </div>
                        <hr/>
                        <div className="text-box">
                            <h3>Style Meets Innovation: Fashionable Smartwatches for Every Occasion</h3>
                            <p>Elevate your style game with our collection of fashionable smartwatches. From sleek designs to customizable watch faces, express your personal style while staying connected.</p>
                        </div>
                        <hr/>
                        <div className="text-box">
                            <h3>Smartwatches for the Fashionably Fit: Merge Style and Fitness</h3>
                            <p>Find the perfect balance between fashion and fitness with our stylish smartwatches. These versatile accessories complement your outfit while helping you stay active and motivated.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shop-content smart-watch-content">
                <ShoppingTitle titleText="Smartwatch Haven: Unlock the Power of Your Wrist" titleInfo="Smartwatch Central: Your Destination for Cutting-Edge Wearables" pageName="Watches Page"/>
                <div className="container">
                    <FilterSideBar
                        filterList = {productsTypes}
                        minPrice = {minPrice}
                        maxPrice = {maxPrice}
                        products = {products}
                        passFiltredProducts = {filterDone}
                        addImg="https://images.unsplash.com/photo-1603274737277-f43f54446c7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
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
            <VideoElement videoLink="https://player.vimeo.com/external/446817772.sd.mp4?s=d7e3e8e0b30b92d28e1497b75f0e525829fbdc6e&profile_id=164&oauth2_token_id=57447761" videoInfo = "Smartwatches for Tech Enthusiasts: Stay Ahead of the Curve"/>
        </>
    )
}
export default SmartWatchPage;