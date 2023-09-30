import "../../../glopaly-styles/global-styles.css";
import "../css/blog-page-style.css";
import { Link } from "react-router-dom";
import BlogCard from "../../../components/blog-page-components/blog-card/js/BlogCard";
import { useEffect } from "react";
function BlogPage(){
    useEffect(()=>{
        let allTypes = document.querySelectorAll(".cetogaries-box ul li");
        let allCetogries = document.querySelectorAll(".content-card");

        allTypes.forEach(type => {
            type.onclick = ()=>{
                let activeCetogries = document.querySelectorAll(`.${type.id}`);
                allCetogries.forEach(cetogry => {
                    cetogry.classList.remove("active");
                })
                activeCetogries.forEach(cetogry => {
                    cetogry.classList.add("active");
                })
            }
        })

        console.log(allCetogries)
        console.log(allTypes)
    },[])
    return (
        <>
            <div className="blog-page">
                <div className="blog-head">
                    <div className="links">
                        <Link to="/">Home</Link>
                        /
                        <p>Blog</p>
                    </div>
                    <i className="fa-solid fa-list" onClick={()=>{
                        let aside = document.querySelector(".blog-page-content .aside");
                        aside.classList.toggle("active")
                    }}></i>
                </div>
                <div className="blog-page-content">
                    <div className="aside">
                        <div className="search-input">
                            <input type="search" placeholder="search"/>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <div className="aside-box cetogaries-box">
                            <h2 className="aside-box-title">Cetogaries</h2>
                            <ul>
                                <li id="all">All</li>
                                <li id="product-reviews">Product Reviews</li>
                                <li id="how-to-guides">How-To Guides</li>
                                <li id="gift-ideas">Gift Ideas</li>
                                <li id="trend-spotting">Trend Spotting</li>
                                <li id="buying-guides">Buying Guides</li>
                            </ul>
                        </div>
                        <div className="aside-box top-posts-box">
                            <h2 className="aside-box-title">Top Posts</h2>
                            <div className="posts-boxes">
                                <div className="post-box">
                                    <i className="fa-solid fa-1"></i>
                                    <div className="post-content">
                                        <h2 className="post-stitle">Trending Now</h2>
                                        <p className="post-text">Discover the Hottest Styles and Fashion Statements</p>
                                    </div>
                                </div>
                                <div className="post-box">
                                    <i className="fa-solid fa-2"></i>
                                    <div className="post-content">
                                        <h2 className="post-stitle">Customer Stories</h2>
                                        <p className="post-text">Heartwarming or inspiring stories from satisfied customers,</p>
                                    </div>
                                </div>
                                <div className="post-box">
                                    <i className="fa-solid fa-3"></i>
                                    <div className="post-content">
                                        <h2 className="post-stitle">Inside Scoop</h2>
                                        <p className="post-text">ndustry Insights and Trends You Need to Know</p>
                                    </div>
                                </div>
                                <div className="post-box">
                                    <i className="fa-solid fa-4"></i>
                                    <div className="post-content">
                                        <h2 className="post-stitle">Customer Spotlight</h2>
                                        <p className="post-text"> Inspiring Stories from Our Satisfied Customers</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="aside-box instagram-box">
                            <h2 className="aside-box-title">Instagram</h2>
                            <div className="insta-boxes">
                                <Link to="https://www.instagram.com">
                                    <img src="https://images.pexels.com/photos/5077067/pexels-photo-5077067.jpeg?auto=compress&cs=tinysrgb&w=600" alt="insta img" />
                                </Link>
                                <Link to="https://www.instagram.com">
                                    <img src="https://images.pexels.com/photos/6612276/pexels-photo-6612276.jpeg?auto=compress&cs=tinysrgb&w=600" alt="insta img" />
                                </Link>
                                <Link to="https://www.instagram.com">
                                    <img src="https://images.pexels.com/photos/6238307/pexels-photo-6238307.jpeg?auto=compress&cs=tinysrgb&w=600" alt="insta img" />
                                </Link>
                                <Link to="https://www.instagram.com">
                                    <img src="https://images.pexels.com/photos/7054753/pexels-photo-7054753.jpeg?auto=compress&cs=tinysrgb&w=600" alt="insta img" />
                                </Link>
                            </div>
                        </div>

                    </div>
                    <div className="content">
                        <BlogCard firstImg="https://images.pexels.com/photos/4458/cup-mug-desk-office.jpg?auto=compress&cs=tinysrgb&w=600" cardTitle="Retail Revelations" cardText=" Insights and Inspirations for the Modern Shopper" anotherClass="product-reviews all"/>
                        <BlogCard firstImg="https://images.pexels.com/photos/6469/red-hands-woman-creative.jpg?auto=compress&cs=tinysrgb&w=600" cardTitle="Style Secrets" cardText="Unleashing Your Fashion Potential with [Your Brand]" anotherClass="how-to-guides all"/>
                        <BlogCard firstImg="https://images.pexels.com/photos/4793154/pexels-photo-4793154.jpeg?auto=compress&cs=tinysrgb&w=600" cardTitle="Tech Talk" cardText="Unlocking the Latest Gadgets and Innovations" anotherClass="gift-ideas all"/>
                        <BlogCard firstImg="https://images.pexels.com/photos/38519/macbook-laptop-ipad-apple-38519.jpeg?auto=compress&cs=tinysrgb&w=600" cardTitle="Foodie Finds" cardText="Culinary Delights and Recipes for Every Palate" anotherClass="trend-spotting all"/>
                        <BlogCard firstImg="https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=600" cardTitle="Gifted Gurus" cardText="Unwrapping the Art of Gifting with [Your Brand]" anotherClass="trend-spotting all"/>
                        <BlogCard firstImg="https://images.pexels.com/photos/7621142/pexels-photo-7621142.jpeg?auto=compress&cs=tinysrgb&w=600" cardTitle="Beauty Buzz" cardText="Discovering the Secrets of Radiant Skincare and Makeup" anotherClass="buying-guides all"/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default BlogPage;