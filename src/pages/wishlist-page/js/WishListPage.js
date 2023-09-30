import "../../../glopaly-styles/global-styles.css";
import "../css/wishlist-page-style.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "../../../project-state-and-actions/AddToWishList";
import { AddToCart } from "../../../project-state-and-actions/CartActions";
function WishListPage() {
    let wishlist = useSelector(state => state.WishList);
    let dispatch = useDispatch();
    return (
        <>
            <div className="wishlist-section">
                <div className="page-routes">
                    <Link to="/">Home</Link>
                    /
                    <p>Wishlist</p>
                </div>
                {
                    wishlist.length !== 0 ?
                    <>
                    <div className="container wishlist">
                        <table className="not-empty-table">
                            <thead>
                                <tr>
                                    <th>PRODUCT</th>
                                    <th>PRICE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishlist.map(product => {
                                    return (
                                        <tr key={product.id}>
                                            <td>
                                                <div className="img-and-name">
                                                    <img src={product.productImg} alt="" />
                                                    <h3>{product.productName}</h3>
                                                </div>
                                            </td>
                                            <td>${product.price}</td>
                                            <td>
                                                <button className="delete-btn" onClick={()=>{
                                                    dispatch(removeFromWishlist(product))
                                                }}>DELETE</button>
                                            </td>
                                            <td>
                                                <button className="add-to-cart" onClick={()=>{
                                                    dispatch(AddToCart(product))
                                                }}>Add To Cart</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    </>
                    :
                    <div className="container empty-wishlist">
                        <div className="empty-text">
                            <p>Your wishlist is currently empty!</p>
                            <p>
                                Continue browsing
                                <Link to="/">here</Link>.
                            </p>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}
export default WishListPage;