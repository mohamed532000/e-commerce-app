import "../../../glopaly-styles/global-styles.css";
import "../css/sale-section-style.css";
import { Link } from "react-router-dom";

function SaleSection(props) {
    return (
        <>
            <div className="sale-section">
                <div className="container">
                    <img src="https://images.unsplash.com/photo-1603792907191-89e55f70099a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="" />
                    
                    <div className="sale-text">
                        <div className="sale-text-content">
                            <p>DISCOUNT</p>
                            <h3>Summer 2023</h3>
                            <p>SALE <span>50%</span></p>
                        </div>
                        <div className="sale-counter-div">
                            <h3 className="day-count">{props.days} <span>Dey</span></h3>
                            <h3 className="hour-count">{props.hours} <span>Hour</span></h3>
                            <h3 className="minutes-count">{props.minutes} <span>Min</span></h3>
                            <h3 className="seconds-count">{props.seconds} <span>Sec</span></h3>
                        </div>
                        <Link to="Products" className="discount-btn">Shop Now</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SaleSection;