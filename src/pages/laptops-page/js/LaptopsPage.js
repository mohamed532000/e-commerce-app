import "../../../glopaly-styles/global-styles.css";
import "../css/laptops-page-style.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { database } from "../../../project-api/firebase";
import { onValue , ref } from "firebase/database";
import {useEffect , useState} from "react";
import HeadOfPage from "../../../components/section-head/js/HeadOfPage";
import ProductCard from "../../../components/product-card/js/ProductCard";
import ShoppingTitle from "../../../components/shopping-title/js/ShoppingTitle";
import VideoElement from "../../../components/video-section/js/VideoElement";
import { Swiper , SwiperSlide } from "swiper/react";
import { Pagination , Navigation , A11y , EffectFade , Autoplay } from "swiper";
import FilterSideBar from "../../../components/fashion-components/fashion-filter-side/js/FilterSideBar";
import NoProducts from "../../../components/no-products/js/NoProducts";
import FilterIcon from "../../../components/filter-icon/js/FilterIcon";

function LaptopsPage() {
    let [products , setProducts] = useState([]);
    let [productsColor , setColors] = useState([]);
    let [dealProducts , setDealProducts] = useState([]);
    let [filtredProducts , setFiltredProducts] = useState([]);
    let [productsTypes , setProductsTypes] = useState([]);
    let [minPrice , setMinPrice] = useState();
    let [maxPrice , setMaxPrice] = useState();
    let [hours , setHours] = useState();
    let [minutes , setMinutes] = useState();
    let [seconds , setSeconds] = useState();

    useEffect(()=>{
        fetchingData();
    },[]);
    let categoryPage = "laptops-products";
    let fetchingData = ()=>{
        onValue(ref(database) , (snapshot)=>{
            let data = snapshot.val();
            if(data !== null) {
                let products = data.products.filter((product)=>{
                    return product.category === categoryPage
                });
                setProducts(products);
                setFiltredProducts(products);
                setDealProducts(products.slice(0 , 7))
                let allTypes = products.map(product => {
                    return product.type.toUpperCase();
                });
                setProductsTypes(["All Products" , ...new Set(allTypes)]);
                let allPrices = products.map(product => {
                    return product.price;
                });
                let colors = products.map(product => {
                    return product.color
                });
                setColors([...new Set(colors)]);
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
    let params = {
        breakpoints: {
            200 : {
                slidesPerView : 1,
            },
            768: {
                slidesPerView: 2,
            },
            1035: {
                slidesPerView: 3,
            },
        },
    }
    setInterval(()=>{
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
    },1000);
    minutes = addLeadingZero(minutes);
    seconds = addLeadingZero(seconds);
    function addLeadingZero(value) {
        return value < 10 ? '0' + value : value;
    }

    return (
        <>
            <HeadOfPage
                lastSwiper = {false}
                backgroundImg = "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80"
                sectionTitle = "Laptops: Power in Your Hands"
                secondTitle = "Browse the Latest Laptop Releases: Stay Ahead of the Technology Curve"
                sectionInfo = "Find Your Ideal Laptop: Customizable Options for Personalization!"
                secondSectionBackgroundImg = "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                secondSectionTitle = "Get the Best Laptop Deals."
                secondSectionSecondTitle = "Experience the Future of Computing with Our Innovative Laptops"
                secondSectionInfo = "Discover Cutting-Edge Laptops for Work and Play"
            />
            <div className="shop-content apple-content">
                <ShoppingTitle titleText="Welcome to Laptop Central: Your One-Stop Shop for Cutting-Edge Technology!" titleInfo = "Upgrade to a New Laptop Today!" pageName="Laptops Page"/>
                <div className="container">
                    <FilterSideBar
                        filterList = {productsTypes}
                        colorsFilter = {true}
                        colors = {productsColor}
                        minPrice = {minPrice}
                        maxPrice = {maxPrice}
                        products = {products}
                        passFiltredProducts = {filterDone}
                        addImg="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80"
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
            <VideoElement videoLink="https://player.vimeo.com/external/373958747.sd.mp4?s=b7d5e8ab709f80e895c5c9a151096a963fdbdb0f&profile_id=164&oauth2_token_id=57447761" videoInfo="Unleash Your Potential: Discover the Power of Laptops!" explorBtn={true}/>
            <div className="deals-of-day">
                <img src="https://i.pinimg.com/564x/c7/62/bd/c762bd48d463979d7a09f53cde6e6bb5.jpg" alt="img"/>
                <div className="deal-text">
                    <h2>Deals of the Day</h2>
                    <p>{hours} : {minutes} : {seconds}</p>
                </div>
                <Swiper
                    {...params}
                    className="parent-of-slides"
                    spaceBetween={20}
                    modules={[Pagination , Navigation , A11y , EffectFade , Autoplay]}
                    navigation
                    pagination = {{clickable: true}}
                    speed={1000}
                >
                {dealProducts.map(product => {
                    return (
                        <SwiperSlide className="slide" key={product.id}>
                            <ProductCard
                                key={product.id}
                                firstImg = {product.img1}
                                secondImg = {product.img2}
                                productName = {product.title}
                                price = {`${product.price}`}
                                productId = {product.id}
                                productCategory = {product.category}
                                filterClass = {product.type || product.color}
                            />
                        </SwiperSlide>
                    )
                })}
                </Swiper>
            </div>
        </>
    )
}
export default LaptopsPage;