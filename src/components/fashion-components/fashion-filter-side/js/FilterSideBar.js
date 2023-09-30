import "../../../../glopaly-styles/global-styles.css";
import "../css/fashion-filter-side-style.css";
import { Link } from "react-router-dom";
import { useState } from "react";
function FilterSideBar(props) {
    let [priceRange , setPriceRange] = useState(20)
    let {
        colorsFilter,
        colors,
        sizeFilter,
        sizes,
        filterList,
        clothesList,
        meakupList,
        passFiltredProducts,
        maxPrice
    } = props;
    let priceSlider = document.getElementById("priceSlider");

    // filter with category or storage
    let filterProductsWithCategory = (products , filterText)=>{
        if(filterText === "All Products") {
            passFiltredProducts(products)
            // console.log(products)
        }else {
            let filtredProducts = products.filter(product => {
                return product.type === filterText.replace(" ", "").toLowerCase() || product.storage === filterText.replace(" ", "").toLowerCase();
            });
            passFiltredProducts(filtredProducts)
            // console.log(filtredProducts)
        }
    }
    // filter with color
    function filterProductsWithColor(products , filterText) {
        let filterdProducts = products.filter(product=> {
            return product.color === filterText;
        });
        // pass filtred products to parent component
        passFiltredProducts(filterdProducts);
    }
    // filter with size
    function filterProductsWithSize(products , filterText) {
        let filterdProducts = products.filter(product=> {
            return product.size === filterText;
        });
        // pass filtred products to parent component
        passFiltredProducts(filterdProducts);
    }
    // filter with price
    function filterProductsWithPrice(products) {
        let filterdProducts = products.filter(product=> {
            return parseInt(product.price) < parseInt(priceSlider.value);
        });
        // pass filtred products to parent component
        passFiltredProducts(filterdProducts);
    }

    return (
        <>
            <div className="filter-side">
                <div className="filter-box category">
                    <h2>FILTER WITH Category</h2>
                    <ul>
                        {filterList.map((filterText , index)=>{
                            if(filterText === "Clothes") {
                                return <li key={index}>
                                    <p>{filterText}</p>
                                    <i className="fa-solid fa-caret-down"></i>
                                    <ul className="other-minue">
                                        {clothesList.map((clotheName , index)=>{
                                            return <li key={index} onClick={(e)=>{
                                                let word = e.target.textContent;
                                                filterProductsWithCategory(props.products , word);
                                            }}>{clotheName}</li>
                                        })}
                                    </ul>
                                </li>
                            }else if (filterText === "Beauty") {
                                return <li key={index}>
                                    <p>{filterText}</p>
                                    <i className="fa-solid fa-caret-down"></i>
                                    <ul className="other-minue">
                                        {meakupList.map((clotheName , index)=>{
                                            return <li key={index} onClick={(e)=>{
                                                let word = e.target.textContent;
                                                filterProductsWithCategory(props.products , word);
                                            }}>{clotheName}</li>
                                        })}
                                    </ul>
                                </li>
                            }else {
                                return <li key={index} onClick={(e)=>{
                                    let word = e.target.textContent;
                                    filterProductsWithCategory(props.products , word);
                                }}>{filterText}</li>
                            }
                        })}
                    </ul>
                </div>
                <div className="filter-box catalog">
                    <div className="prices-filter catalog-box">
                        <h2>FILTER WITH PRICE</h2>
                        <div className="price-range-div">
                            <input type="range" id="priceSlider" min="0" max={maxPrice} step="10" value={priceRange} className="range-input" onChange={()=>{
                                setPriceRange(parseInt(priceSlider.value))
                                filterProductsWithPrice(props.products);
                            }}/>
                            <output id="priceOutput" htmlFor="priceSlider">
                                ${priceRange}
                            </output>
                        </div>
                    </div>
                    {colorsFilter &&
                        <div className="colors-filter catalog-box">
                            <h2>FILTER WITH COLORS</h2>
                            <div className="colors-divs">
                                {colors.map((color , index) => {
                                    return (
                                        <div key={index} className="color-div">
                                            <span className="background-color" style={{"--i" :`${color}`}}></span>
                                            <span className="color-cycle" style={{"--i" : `${color}`}}></span>
                                            <p onClick={(e)=>{
                                                let word = e.target.textContent;
                                                filterProductsWithColor(props.products , word)
                                            }}>{color}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    }
                    {sizeFilter &&
                        <div className="sizes-filter catalog-box">
                            <h2>FILTER WITH SIZE</h2>
                            <div className="sizes">
                                {sizes.map((size,index)=>{
                                    return <span key={index} onClick={(e)=>{
                                        let word = e.target.textContent.replace(" ", "").toLowerCase()
                                        filterProductsWithSize(props.products , word)
                                    }}>{size}</span>
                                })}
                            </div>
                        </div>
                    }
                </div>
                <div className="add-div">
                    <img src={props.addImg} alt="Add"/>
                    <Link to="https://www.instagram.com" className="to-insta-link">
                        <img src="https://cdn-icons-png.flaticon.com/128/174/174855.png" alt="insta img" loading="lazy"/>
                        <p>GloboMart</p>
                    </Link>
                </div>
            </div>
        </>
    )
}
export default FilterSideBar;