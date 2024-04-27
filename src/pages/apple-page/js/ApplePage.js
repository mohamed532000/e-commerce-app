import "../../../glopaly-styles/global-styles.css";
import "../css/apple-page-style.css";
import { database } from "../../../project-api/firebase";
import { onValue , ref } from "firebase/database";
import {useEffect , useState} from "react";
import HeadOfPage from "../../../components/section-head/js/HeadOfPage";
import FilterSideBar from "../../../components/fashion-components/fashion-filter-side/js/FilterSideBar";
import ProductCard from "../../../components/product-card/js/ProductCard";
import ShoppingTitle from "../../../components/shopping-title/js/ShoppingTitle";
import NoProducts from "../../../components/no-products/js/NoProducts";
import SaleSection from "../../../components/sale-section/js/SaleSection";
import FilterIcon from "../../../components/filter-icon/js/FilterIcon";

function ApplePage() {
    let [products , setProducts] = useState([]);
    let [productsColor , setColors] = useState([]);
    let [filtredProducts , setFiltredProducts] = useState([]);
    let [productsStorages , setproductsStorages] = useState([]);
    let [minPrice , setMinPrice] = useState();
    let [maxPrice , setMaxPrice] = useState();
    let lastDate = new Date("12 7 2024 23:59:59").getTime();
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
    },1000);
    useEffect(()=>{
        fetchingData()
    },[]);
    let categoryPage = "apple-products";
    let fetchingData = ()=>{
        onValue(ref(database) , (snapshot)=>{
            let data = snapshot.val();
            if(data !== null) {
                let products = data.products.filter((product)=>{
                    return product.category === categoryPage
                });
                setProducts(products);
                setFiltredProducts(products);
                let allStorages = products.map(product => {
                    return product.storage;
                });
                setproductsStorages(["All Products" , ...new Set(allStorages)]);
                let colors = products.map(product => {
                    return product.color
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

    let filterDone = (filtredProduc) => {
        setFiltredProducts(filtredProduc)
    }

    return (
        <>
            <HeadOfPage
                lastSwiper = {false}
                backgroundImg = "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                sectionTitle = "Unleash the Power of iPhone"
                secondTitle = "Explore the World of iPhone."
                sectionInfo = "Experience Seamless Performance with iPhone!"
                secondSectionBackgroundImg = "https://images.unsplash.com/photo-1641454226957-3fa45cf3b089?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                secondSectionTitle = "Explore the World of iPhone."
                secondSectionSecondTitle = "Elevate Your Mobile Experience with iPhone"
                secondSectionInfo = "Unlock Limitless Possibilities with iPhone"
            />
            <div className="shop-content apple-content">
                <ShoppingTitle titleText="Welcome to the Future: Your Gateway to Exquisite iPhones!!" titleInfo = "iRevolution: Explore the Cutting-Edge World of iPhones!" pageName="Apple Page"/>
                <div className="container">
                <FilterSideBar
                        filterList = {productsStorages}
                        colorsFilter = {true}
                        colors = {productsColor}
                        products = {products}
                        passFiltredProducts = {filterDone}
                        minPrice = {minPrice}
                        maxPrice = {maxPrice}
                        addImg="https://images.unsplash.com/photo-1601972599720-36938d4ecd31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
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
            <SaleSection 
                days = {days}
                hours = {hours}
                minutes = {minutes}
                seconds = {seconds}
            />
        </>
    )
}
export default ApplePage;