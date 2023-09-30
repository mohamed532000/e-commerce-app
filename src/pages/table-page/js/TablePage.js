import "../../../glopaly-styles/global-styles.css";
import "../css/table-page-style.css";
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

function TablePage() {
    let [products , setProducts] = useState([]);
    let [productsColor , setColors] = useState([]);
    let [filtredProducts , setFiltredProducts] = useState([]);
    let [productsTypes , setProductsTypes] = useState([]);
    let [minPrice , setMinPrice] = useState();
    let [maxPrice , setMaxPrice] = useState();

    useEffect(()=>{
        fetchingData();
    },[]);
    let categoryPage = "table-products";
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

    return (
        <>
            <HeadOfPage
                lastSwiper = {false}
                backgroundImg = "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80"
                sectionTitle = "Sit in Style: Explore Our Stunning Tables Collection"
                secondTitle = "Explore the World of Tables."
                sectionInfo = "Tabletop Treasures: Discover Your Perfect Table"
                secondSectionBackgroundImg = "https://images.unsplash.com/photo-1531452096022-642f4375ceb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1120&q=80"
                secondSectionTitle = "Find Your Centerpiece: Explore Our Stunning Tables."
                secondSectionSecondTitle = "Tables for Every Occasion: Shop in Style"
                secondSectionInfo = "Table Enchantment: Discover Designs that Delight"
            />
            <div className="shop-content table-content">
                <ShoppingTitle titleText="Tabletop Marvels: Where Functional Design Meets Timeless Beauty!" titleInfo = "Tablescapes Unveiled: Your Home's Statement Pieces!" pageName="Table Page"/>
                <div className="container">
                    <FilterSideBar
                        filterList = {productsTypes}
                        colorsFilter = {true}
                        colors = {productsColor}
                        minPrice = {minPrice}
                        maxPrice = {maxPrice}
                        products = {products}
                        passFiltredProducts = {filterDone}
                        addImg="https://plus.unsplash.com/premium_photo-1676999260189-5412ac9aeb04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=422&q=80"
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
            <VideoElement videoLink="https://player.vimeo.com/external/463385937.sd.mp4?s=23c2c20293dd31a9020a1aa2619c301ab527d57a&profile_id=164&oauth2_token_id=57447761"
            videoInfo="Find Your Centerpiece: Explore Our Stunning Tables" explorBtn={true} sectionId=""/>
        </>
    )
}
export default TablePage;