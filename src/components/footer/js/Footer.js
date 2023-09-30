import "../../../glopaly-styles/global-styles.css";
import "../css/footer-style.css";
import { Link } from "react-router-dom";
function Footer() {
    return (
        <>
            <div className="footer">
                <div className="head-of-footer container">
                    <div className="head-card">
                        <i className="fa-solid fa-box"></i>
                        <h2>Free delivery</h2>
                        <p>And free returns. See checkout for delivery dates.</p>
                    </div>
                    <div className="head-card">
                        <i className="fa-solid fa-circle-dollar-to-slot"></i>
                        <h2>Pay monthly at 0% APR</h2>
                        <p>Choose to check out with Apple Card Monthly Installments.</p>
                    </div>
                    <div className="head-card">
                        <i className="fa-brands fa-dropbox"></i>
                        <h2>Personalize it</h2>
                        <p>Engrave your device with your name or a personal note.</p>
                    </div>
                </div>
                <div className="footer-content contaienr">
                    <div className="footer-content-card">
                        <h2 className="card-title">Contact Us</h2>
                        <p>Drou Demo Store</p>
                        <p>No. 1259 Freedom, New York</p>
                        <p>United States</p>
                        <p>+91-987654321</p>
                        <p>demo@exampledemo.com</p>
                    </div>
                    <div className="footer-content-card">
                        <h2 className="card-title">Information</h2>
                        <Link to='/'>Product Support</Link>
                        <Link to='/'>Checkout</Link>
                        <Link to='/'>License Policy</Link>
                        <Link to='/'>Affiliate</Link>
                    </div>
                    <div className="footer-content-card">
                        <h2 className="card-title">Customer Service</h2>
                        <Link to="/">Help Center</Link>
                        <Link to="/">Redeem Voucher</Link>
                        <Link to="/">Contact Us</Link>
                        <Link to="/">Pkolicies & Rules</Link>
                    </div>
                    <div className="footer-content-card">
                        <h2 className="card-title">Download Our App</h2>
                        <p>Download our App and get extra 15% Discount on your first Order..!</p>
                        <p>No. 1259 Freedom, New York</p>
                        <div className="download-div">
                            <Link to="">
                                <img src="https://cdn.shopify.com/s/files/1/0495/8021/2387/files/app-store.jpg?v=1603274799" alt="download-img"/>
                            </Link>
                            <Link to="">
                                <img src="https://cdn.shopify.com/s/files/1/0495/8021/2387/files/google-play.jpg?v=1603274809" alt="download-img"/>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="copyright-div">
                    <p>Copyright © Team90Degree | Built with Drou by Team90Degree.</p>
                    <div className="pay-card">
                        <Link to="/">
                            <img src="https://cdn.shopify.com/s/files/1/0495/8021/2387/files/payment-method.png?v=1603274813" alt=""/>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer;