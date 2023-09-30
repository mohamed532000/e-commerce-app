import "../../../glopaly-styles/global-styles.css";
import "../css/sofa-page-style.css";
import { database } from "../../../project-api/firebase";
import { onValue , ref } from "firebase/database";
import {useEffect , useState} from "react";
import HeadOfPage from "../../../components/section-head/js/HeadOfPage";
import ProductCard from "../../../components/product-card/js/ProductCard";
import ShoppingTitle from "../../../components/shopping-title/js/ShoppingTitle";
import FilterSideBar from "../../../components/fashion-components/fashion-filter-side/js/FilterSideBar";
import NoProducts from "../../../components/no-products/js/NoProducts";
import FilterIcon from "../../../components/filter-icon/js/FilterIcon";

function SofaPage() {
    let [products , setProducts] = useState([]);
    let [filtredProducts , setFiltredProducts] = useState([]);
    let [productsTypes , setProductsTypes] = useState([]);
    let [minPrice , setMinPrice] = useState();
    let [maxPrice , setMaxPrice] = useState();

    useEffect(()=>{
        fetchingData();
    },[]);

    let categoryPage = "sofa-products";
    let fetchingData = ()=>{
        onValue(ref(database) , (snapshot)=>{
            let data = snapshot.val();
            if(data !== null) {
                let products = data.products.filter((product)=>{
                    return product.category === categoryPage;
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
                backgroundImg = "https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=874&q=80"
                sectionTitle = "Sofa Spectacular: Explore Our Stunning Designs"
                secondTitle = "Explore the World of sofas."
                sectionInfo = "Sofa Chic: Explore Our Fashion-Forward Collection"
                secondSectionBackgroundImg = "https://images.unsplash.com/photo-1632295151535-0393793fdf69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80"
                secondSectionTitle = "Sofa Magic: Transform Your Space with Our Sofas."
                secondSectionSecondTitle = "Sofa Wonderland: Explore a World of Possibilities"
                secondSectionInfo = "Your Sofa Story Starts Here: Explore Our Collection"
            />
            <div className="shop-content sofa-content">
                <ShoppingTitle titleText="Welcome to Sofa Bliss: Your Perfect Retreat Awaits!" titleInfo = "indulge in Luxury and Comfort: Discover Our Exquisite Sofa Collection!" pageName="Sofa Page"/>
                <div className="container">
                    <FilterSideBar
                        filterList = {productsTypes}
                        products = {products}
                        passFiltredProducts = {filterDone}
                        minPrice = {minPrice}
                        maxPrice = {maxPrice}
                        addImg="https://images.unsplash.com/photo-1550254478-ead40cc54513?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=361&q=80"
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
export default SofaPage;