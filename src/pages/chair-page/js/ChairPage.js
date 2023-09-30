import "../../../glopaly-styles/global-styles.css";
import "../css/chair-page-style.css";
import { database } from "../../../project-api/firebase";
import { onValue , ref } from "firebase/database";
import {useEffect , useState} from "react";
import HeadOfPage from "../../../components/section-head/js/HeadOfPage";
import ProductCard from "../../../components/product-card/js/ProductCard";
import ShoppingTitle from "../../../components/shopping-title/js/ShoppingTitle";
import FilterSideBar from "../../../components/fashion-components/fashion-filter-side/js/FilterSideBar";
import NoProducts from "../../../components/no-products/js/NoProducts";
import FilterIcon from "../../../components/filter-icon/js/FilterIcon";

function ChairPage() {
    let [products , setProducts] = useState([]);
    let [productsColor , setColors] = useState([]);
    let [filtredProducts , setFiltredProducts] = useState([]);
    let [productsTypes , setProductsTypes] = useState([]);
    let [minPrice , setMinPrice] = useState();
    let [maxPrice , setMaxPrice] = useState();

    useEffect(()=>{
        fetchingData();
    },[]);
    let categoryPage = "chair-products";
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
                backgroundImg = "https://images.unsplash.com/photo-1653242370243-5f7ca54b00db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80"
                sectionTitle = "Sit in Style: Explore Our Stunning Chair Collection"
                secondTitle = "Explore the World of Chairs."
                sectionInfo = "Chairs of Distinction: Unleash Your Unique Style"
                secondSectionBackgroundImg = "https://images.unsplash.com/photo-1611486212355-d276af4581c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                secondSectionTitle = "Sitting in Luxury: Discover Our Premium Chair Range."
                secondSectionSecondTitle = "Chair Chic: Explore Our Fashion-Forward Collection"
                secondSectionInfo = "Sit, Lounge, Relax: Shop Chairs for Every Mood"
            />
            <div className="shop-content chair-content">
                <ShoppingTitle titleText="Take a Seat in Style: Discover Chairs That Redefine Comfort and Elegance!" titleInfo = "Chair Artistry: Discover Handcrafted Masterpieces!" pageName="Chairs Page"/>
                <div className="container">
                    <FilterSideBar
                        filterList = {productsTypes}
                        colorsFilter = {true}
                        colors = {productsColor}
                        minPrice = {minPrice}
                        maxPrice = {maxPrice}
                        products = {products}
                        passFiltredProducts = {filterDone}
                        addImg="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=465&q=80"
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
export default ChairPage;