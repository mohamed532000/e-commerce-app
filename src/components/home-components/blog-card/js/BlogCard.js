import { Link } from "react-router-dom";
import "../css/blog-card-style.css"
function BlogCard(props) {
    return (
        <>

            <div className="blog-card">
                <div className="card-img">
                    <Link to="/">
                        <img src={props.cardImg} alt="card img"/>
                    </Link>
                </div>
                <div className="card-info">
                    <div className="card-date">
                        {props.cardDateIcon}
                        <p>{props.date}</p>
                    </div>
                    <h3>{props.cardTitle}</h3>
                </div>
            </div>
        
        </>
    )
}

export default BlogCard;