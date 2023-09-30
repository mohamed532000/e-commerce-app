import "../css/about-page-style.css";
import "../../../glopaly-styles/global-styles.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from "react-router-dom";
import {Swiper , SwiperSlide} from "swiper/react";
import { A11y , Navigation , Pagination } from "swiper";
import { useEffect } from "react";
import TeamCart from "../../../components/about-page-components/team-card/js/TeamCard";

function AboutPage() {
    let params = {
        breakpoints: {
            200 : {
                slidesPerView : 1,
            },
            840: {
                slidesPerView: 2,
            },
            1030: {
                slidesPerView: 3,
            },
        },
    }
    return (
        <>
        
            <div className="section about-section-head">
                <img src="https://images.pexels.com/photos/4064840/pexels-photo-4064840.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="about img"/>
                <div className="container">
                    <div className="head-text">
                        <h1>ABOUT US</h1>
                        <p></p>
                        <div className="links">
                            <Link to="/">
                                <i className="fa-solid fa-house"></i>
                                Home
                            </Link>
                            /
                            <p>About Us</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section info-about-us">
                <div className="container">
                    <div className="text">
                        <h1 className="text-head">WE ARE UMBRA</h1>
                        <div className="info-box">
                            <p>We are delighted to introduce you to our state-of-the-art e-commerce website, designed with your shopping convenience and satisfaction in mind. Our platform provides a seamless online shopping experience, offering an extensive selection of products tailored to your needs and desires.</p>
                        </div>
                        <div className="info-box">
                            <p>We take great pride in partnering with reputable brands and sellers who share our commitment to excellence. Each product featured on our website undergoes meticulous quality checks, ensuring that you receive nothing but the best. Our goal is to provide you with a secure and enjoyable shopping experience from the moment you enter our website.</p>
                            <p>With our secure payment options and reliable shipping services, you can shop confidently, knowing that your transactions and deliveries are handled with the utmost care. We value your trust in our e-commerce website and are devoted to delivering products to your doorstep promptly.</p>
                        </div>
                    </div>
                    <div className="img">
                        <img src="https://images.pexels.com/photos/13801592/pexels-photo-13801592.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="img"/>
                    </div>
                </div>
            </div>

            <div className="section choose-us-reasons">
                <div className="container">
                    <div className="images">
                        <img className="first-img" src="https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=600" alt="img"/>
                        <img className="second-img" src="https://images.pexels.com/photos/9301314/pexels-photo-9301314.jpeg?auto=compress&cs=tinysrgb&w=600" alt="img"/>
                    </div>
                    <div className="services">
                        <div className="title">
                            <h2>WHY CHOOSE US</h2>
                            <p>Choose Our Online Shop Market: Quality, Convenience, Satisfaction.</p>
                        </div>
                        <div className="services-boxes">

                            <div className="parent">
                                <div className="serv-box">
                                    <i className="fa-solid fa-laptop"></i>
                                    <div className="serv-info">
                                        <h3 className="serv-name">Marketing and Promotions</h3>
                                        <p>Offers services for online shop marketing and promotions</p>
                                    </div>
                                </div>
                                <div className="serv-box">
                                    <i className="fa-solid fa-credit-card"></i>
                                    <div className="serv-info">
                                        <h3 className="serv-name">Payment Gateway Integration</h3>
                                        <p>enabling online shoppers to make payments using various methods (credit cards, PayPal, etc.)</p>
                                    </div>
                                </div>
                                <div className="serv-box">
                                    <i className="fa-solid fa-gift"></i>
                                    <div className="serv-info">
                                        <h3 className="serv-name">Shipping and Logistics</h3>
                                        <p>Offers shipping and logistics services</p>
                                    </div>
                                </div>
                            </div>
                            <div className="parent">
                                <div className="serv-box">
                                    <i className="fa-solid fa-bars-progress"></i>
                                    <div className="serv-info">
                                        <h3 className="serv-name">Inventory Management</h3>
                                        <p>Tracks and manages the online shop's inventory.</p>
                                    </div>
                                </div>
                                <div className="serv-box">
                                    <i className="fa-solid fa-headset"></i>
                                    <div className="serv-info">
                                        <h3 className="serv-name">Customer Support and Live Chat</h3>
                                        <p>Provides customer support services, including live chat features</p>
                                    </div>
                                </div>
                                <div className="serv-box">
                                <i className="fa-solid fa-triangle-exclamation"></i>
                                    <div className="serv-info">
                                        <h3 className="serv-name">Product Reviews and Ratings</h3>
                                        <p>Enables customers to leave reviews and ratings for products  </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="section team-section">
                <div className="section-head">
                    <h2>MEET OUR TEAM</h2>
                    <p>Engage with our team to explore the possibilities and achieve your goals.</p>
                </div>
                <div className="container">
                    <Swiper 
                        className="parent-of-slides"
                        {...params}
                        speed={1000}
                        spaceBetween={50}
                    >
                    
                        <SwiperSlide className="person-card">
                                <TeamCart img="https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg?auto=compress&cs=tinysrgb&w=600" personName="MR.LEONARD CHALVET" personInfo="Our graphic designer is a creative visionary, transforming ideas into captivating visuals that leave a lasting impact. Their talent and passion elevate our projects to new heights." />
                        </SwiperSlide>
                        <SwiperSlide className="person-card">
                                <TeamCart img="https://images.pexels.com/photos/5439427/pexels-photo-5439427.jpeg?auto=compress&cs=tinysrgb&w=600" personName="MR.JOHN DOE" personInfo="Our content creator is a master storyteller, weaving words and visuals into captivating narratives that engage and resonate with our audience" />
                        </SwiperSlide>
                        <SwiperSlide className="person-card">
                                <TeamCart img="https://images.pexels.com/photos/17281212/pexels-photo-17281212/free-photo-of-young-man-posing-outdoors.jpeg?auto=compress&cs=tinysrgb&w=600" personName="MR.BARTHELEMY CHALVET" personInfo="Our salesperson is a dynamic and persuasive communicator, building strong relationships and closing deals with their exceptional negotiation skills" />
                        </SwiperSlide>
                        <SwiperSlide className="person-card">
                                <TeamCart img="https://images.pexels.com/photos/5439472/pexels-photo-5439472.jpeg?auto=compress&cs=tinysrgb&w=600" personName="MR.TAKEN MARIO" personInfo="Our sales manager is a strategic leader, guiding and motivating the team to achieve exceptional results" />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        
        </>
    )
}


export default AboutPage;