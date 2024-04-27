import "../../../glopaly-styles/global-styles.css";
import "../css/airpods-page-style.css";
import { database } from "../../../project-api/firebase";
import { onValue , ref } from "firebase/database";
import {useEffect , useState} from "react";
import HeadOfPage from "../../../components/section-head/js/HeadOfPage";
import ProductCard from "../../../components/product-card/js/ProductCard";
import ShoppingTitle from "../../../components/shopping-title/js/ShoppingTitle";
import FilterSideBar from "../../../components/fashion-components/fashion-filter-side/js/FilterSideBar";
import NoProducts from "../../../components/no-products/js/NoProducts";
import SaleSection from "../../../components/sale-section/js/SaleSection";
import FilterIcon from "../../../components/filter-icon/js/FilterIcon";
function AirPodsPage() {
    let [products , setProducts] = useState([]);
    let [filtredProducts , setFiltredProducts] = useState([]);
    let [productsTypes , setProductsTypes] = useState([]);
    let [minPrice , setMinPrice] = useState();
    let [maxPrice , setMaxPrice] = useState();
    let lastDate = new Date("9 7 2024 23:59:59").getTime();
    let [days , setDays] = useState();
    let [hours , setHours] = useState();
    let [minutes , setMinutes] = useState();
    let [seconds , setSeconds] = useState();

    setInterval(()=>{
        let dateNow = new Date().getTime();
        let deffrence = lastDate - dateNow;

        let days = Math.floor(deffrence / (1000 * 60 * 60 * 24));
        let hours = Math.floor(deffrence % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        let minutes = Math.floor(deffrence % (1000 * 60 * 60) / (1000 * 60));
        let seconds = Math.floor(deffrence % (1000 * 60) / (1000));

        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
    },1000)

    useEffect(()=>{
        fetchingData()
    },[]);

    let categoryPage = "airpods-products";
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
            <HeadOfPage
                lastSwiper = {false}
                backgroundImg = "https://images.unsplash.com/photo-1574920162043-b872873f19c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80"
                sectionTitle = "Airpods Pro"
                secondTitle = "Magic like you've never heard."
                sectionInfo = "Ignite Your Senses with AirPods Pro: Where Music Meets Magic!"
                secondSectionBackgroundImg = "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=865&q=80"
                secondSectionTitle = "HeadPhone For You."
                secondSectionSecondTitle = "Unleash the Power of Sound with AirPods Pro"
                secondSectionInfo = "Transport Your Ears to a World of Sonic Bliss with Our Enchanting Headphones!"
                video = {true}
                videoLink="https://player.vimeo.com/external/437107161.sd.mp4?s=6fd717ab31359e8cf0eaa1a9d8ed0582846f0901&profile_id=164&oauth2_token_id=57447761"
                videoTitle = "Wireless Harmony: Dive into the AirPods Experience!"
            />
            <div className="info-about-page">
                <div className="container">
                    <div className="info-img">
                        <img src="https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=600" alt="img" />
                    </div>
                    <div className="info-text">
                        <div className="text-box">
                            <h3>Unleash the Freedom of Wireless Audio</h3>
                            <p>Experience the future of personal audio with Apple AirPods, the revolutionary wireless earbuds that redefine the way you listen to music, make calls, and interact with your devices. Designed with cutting-edge technology and meticulous attention to detail, AirPods deliver an unparalleled level of convenience, comfort, and sound quality.</p>
                        </div>
                        <hr/>
                        <div className="text-box">
                            <h3>Seamless Integration with Siri: Control Your World with Voice</h3>
                            <p> AirPods seamlessly integrate with Siri, making your life easier. From making calls to getting directions, control your world with a simple voice command, all while enjoying wireless audio.</p>
                        </div>
                        <hr/>
                        <div className="text-box">
                            <h3>Stay Focused, Stay in the Zone: Noise-Canceling Headsets</h3>
                            <p>Block out distractions and stay focused with our noise-canceling headsets. Whether you're working, studying, or simply seeking some tranquility, these headsets provide a sanctuary of immersive sound.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shop-content">
                <ShoppingTitle titleText="Pods of Sonic Delight: Welcome to AirPods Haven!" titleInfo = "Style Haven: Elevate Your Wardrobe, Elevate Your Style" pageName="Airpods Page"/>
                <div className="container">
                    <FilterSideBar
                        filterList = {productsTypes}
                        products = {products}
                        passFiltredProducts = {filterDone}
                        minPrice = {minPrice}
                        maxPrice = {maxPrice}
                        addImg="https://images.unsplash.com/photo-1593716686443-b821ac2a45c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                    />
                    <FilterIcon filterSide={document.querySelector(".filter-side")}/>
                    <div className="products-content">
                        {filtredProducts && filtredProducts.length > 0 
                            ? 
                            filtredProducts.map(product => {
                                return (
                                    <ProductCard
                                        showProduct = {true}
                                        key={product.id}
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
            <SaleSection
                days = {days}
                hours = {hours}
                minutes = {minutes}
                seconds = {seconds}
            />
        </>
    )
}
export default AirPodsPage;