import "../../../../glopaly-styles/global-styles.css";
import "../css/blog-card-style.css";
function BlogCard(props) {
    return (
        <>
        <div className={`content-card active ${props.anotherClass}`}>
            <div className="card-image">
                <img src={props.firstImg} alt="img"/>
            </div>
            <div className="card-info">
                <h2 className="card-title" style={{"--i" : ".3s"}}>{props.cardTitle}</h2>
                <p style={{"--i" : ".6s"}}>{props.cardText}</p>
            </div>
        </div>
        
        </>
    )
}
export default BlogCard;