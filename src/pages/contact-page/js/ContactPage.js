import "../../../glopaly-styles/global-styles.css";
import "../css/contact-style.css";
import { useState } from "react";
import { Link} from "react-router-dom";
import { useRef } from "react";
import NormalPopub from "../../../components/data-sent-popub/js/NormalPopub";

function ContactPage() {
    const [searchQuery, setSearchQuery] = useState("");
    let [senderName , setSenderName] = useState("");
    let dataWhichSent = [];
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(searchQuery)}&output=embed`;
    const form = useRef();
    return (
        <>
            <div className="contact-section">
                <div className="container"> 
                    <div className="contact-map">
                        <input
                            className="search-input"
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            placeholder="Search for a location"
                        />
                        <iframe className="map" title="Map" src={mapUrl} width="100%" height="400px" ></iframe>
                    </div>
                    <div className="contact-form">
                        <div className="contact-title">
                            <h2>Need Support .?</h2>
                            <p>Trust us to support and guide you throughout.</p>
                        </div>
                        <div className="form-div">
                            <form ref={form} onSubmit={(e)=>{
                                e.preventDefault()
                                let messageContent = document.querySelector(".textarear-div > textarea");
                                if(!dataWhichSent.includes(messageContent.value)) {
                                    dataWhichSent.push(messageContent.value);
                                    let dataSentPopub = document.querySelector(".normal-popub-parent");
                                    if(dataSentPopub.classList.contains("un-active")) {
                                        dataSentPopub.classList.remove("un-active");
                                        dataSentPopub.classList.add("active");
                                    }else {
                                        dataSentPopub.classList.add("active");
                                    }
                                }else {
                                    alert("your message sent if you want send again change your message content")
                                }
                            }}>
                                <div className="input-div">
                                    <input 
                                    type="text" 
                                    name="sender_name" 
                                    placeholder="Name"
                                    required
                                    onChange={(e)=>{
                                        setSenderName(e.target.value)
                                    }}
                                    />
                                </div>
                                <div className="input-div">
                                    <input 
                                    type="email"
                                    name="sender_email"
                                    placeholder="E-mail"
                                    required />
                                </div>
                                <div className="input-div textarear-div">
                                    <textarea 
                                    required
                                    name="message"
                                    placeholder="details of your request.."
                                    ></textarea>
                                </div>
                                <button type="submit" className="send-btn">
                                    <p>Submit</p>
                                    <i className="fa-solid fa-rocket"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="contact-info">
                        <div className="adress-box contact-box">
                            <h2 className="adress-title">Adress</h2>
                            <div className="box">
                                <i className="fa-solid fa-map-location-dot"></i>
                                <p>Las Vegas, United States</p>
                            </div>
                            <div className="box">
                                <i className="fa-solid fa-map-location-dot"></i>
                                <p>Mexico City, Mexico</p>
                            </div>
                            <div className="box">
                                <i className="fa-solid fa-map-location-dot"></i>
                                <p>New York City, United States</p>
                            </div>
                        </div>
                        <div className="call-us contact-box">
                            <h2 className="call-title">Call Us</h2>
                            <div className="call-box">
                                <i className="fa-solid fa-phone-volume"></i>
                                <p>+2 29-221-21-1</p>
                            </div>
                            <div className="call-box">
                                <i className="fa-solid fa-phone-volume"></i>
                                <p>+2 98-333-76-1</p>
                            </div>
                        </div>
                        <div className="contact-sochial contact-box">
                        <Link to="https://www.facebook.com">
                            <i className="fa-brands fa-facebook"></i>
                        </Link>
                        <Link to="https://www.twitter.com">
                            <i className="fa-brands fa-twitter"></i>
                        </Link>
                        <Link to="https://www.instagram.com">
                            <i className="fa-brands fa-instagram"></i>
                        </Link>
                        <Link to="https://www.linkedin.com">
                            <i className="fa-brands fa-linkedin"></i>
                        </Link>
                    </div>
                    </div>
                </div>
            </div>
            <NormalPopub
                popubImg = {"https://i.pinimg.com/474x/49/f1/cc/49f1ccd6d6c1b4eb4b7d9bcabd42bd7b.jpg"}
                senderName = {`Hello, ${senderName}`}
                title="your data sent succesfully !"
                info="thank you for your time ."
                button = {true}
                buttonText={"back to homw"}
                pathName = "/"/>
        </>
    )
}
export default ContactPage;