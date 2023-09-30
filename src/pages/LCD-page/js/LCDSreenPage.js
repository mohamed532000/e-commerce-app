import "../../../glopaly-styles/global-styles.css";
import "../css/lcd-screen-page-style.css";
import { database } from "../../../project-api/firebase";
import { onValue , ref } from "firebase/database";
import {useEffect , useState} from "react";
import ProductCard from "../../../components/product-card/js/ProductCard";
import ShoppingTitle from "../../../components/shopping-title/js/ShoppingTitle";
import VideoElement from "../../../components/video-section/js/VideoElement";
import FilterSideBar from "../../../components/fashion-components/fashion-filter-side/js/FilterSideBar";
import NoProducts from "../../../components/no-products/js/NoProducts";
import FilterIcon from "../../../components/filter-icon/js/FilterIcon";

function LCDScreenPage() {
    let [lcdProducts , setProducts] = useState([]);
    let [filtredProducts , setFiltredProducts] = useState([]);
    let [productsTypes , setProductsTypes] = useState([]);
    let [minPrice , setMinPrice] = useState();
    let [maxPrice , setMaxPrice] = useState();

    useEffect(()=>{
        fetchingData();
    },[]);
    let categoryPage = "LCD-screen-products";
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
        setFiltredProducts(filtredProduc)
    }
    return (
        <>
            <VideoElement videoLink="https://player.vimeo.com/external/495671348.sd.mp4?s=ca9e3b2ce7e89aba289e29945be3e3af80cce3c8&profile_id=164&oauth2_token_id=57447761" videoInfo="Crystal Clear Deals: Unveiling a Vibrant Shopping Experience for LCD Screens!" explorBtn={true}/>
            <div className="info-about-page">
                <div className="container">
                    <div className="info-img">
                        <img src="https://pluspng.com/img-png/lcd-png-monitor-apple-lcd-png-image-1024.png" alt="img" />
                    </div>
                    <div className="info-text">
                        <div className="text-box">
                            <h3>The Canvas of Brilliance: Explore and Shop LCD Screens for Unmatched Visual Excellence!</h3>
                            <p>Step into a realm of unparalleled convenience and technological marvels with our voice-activated LCD screens. Prepare to embark on a journey where your world seamlessly integrates with the power of voice control, transforming your digital experiences into awe-inspiring symphonies of efficiency and enjoyment.</p>
                        </div>
                        <hr/>
                        <div className="text-box">
                            <h3>The Visionary's Choice: Find Your Perfect LCD Screen to Ignite Creativity!</h3>
                            <p>ndulge in the ultimate fusion of elegance and intelligence as our LCD screens effortlessly respond to your every command. With a simple voice prompt, you can effortlessly navigate through applications, adjust settings, and explore a world of possibilities, all while basking in the stunning visuals our screens provide.</p>
                        </div>
                        <hr/>
                        <div className="text-box">
                            <h3>Unveil a Symphony of Colors: Shop LCD Screens for Vibrant Visual Harmonies!</h3>
                            <p>Imagine a world where you can effortlessly summon information, control your smart devices, and orchestrate your digital domain with the power of your voice. Our LCD screens, in perfect harmony with advanced voice recognition technology, open the gateway to this future.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shop-content">
                <ShoppingTitle
                titleText="Pods of Sonic Delight: Welcome to AirPods Haven!" 
                titleInfo = "Style Haven: Elevate Your Wardrobe, Elevate Your Style" 
                pageName="Airpods Page"/>
                <div className="container">
                    <FilterSideBar
                        filterList = {productsTypes}
                        colorsFilter = {false}
                        products = {lcdProducts}
                        passFiltredProducts = {filterDone}
                        minPrice = {minPrice}
                        maxPrice = {maxPrice}
                        addImg="https://images.unsplash.com/photo-1577979749830-f1d742b96791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
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
            <VideoElement videoLink="https://player.vimeo.com/external/502922705.sd.mp4?s=af71740dcf46109ca8c8f1f8b44f443d37994ada&profile_id=164&oauth2_token_id=57447761" explorBtn={false} />
        </>
    )
}
export default LCDScreenPage;