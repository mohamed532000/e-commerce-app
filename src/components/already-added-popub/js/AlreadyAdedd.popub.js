import { Link } from "react-router-dom";
import "../../../glopaly-styles/global-styles.css";
import "../css/already-added-popup-style.css";

function AlreadyAddedPopub() {
    return (
        <>
        
        <div className="already-added-div">
            <p></p>
            <Link to='cart' className="show-cart" onClick={()=>{
                document.querySelector(".already-added-div").classList.remove("active")
            }}>
                <p>Show Cart</p>
                <i className="fa-solid fa-cart-shopping"></i>
            </Link>
        </div>
        </>
    )
}
export default AlreadyAddedPopub;