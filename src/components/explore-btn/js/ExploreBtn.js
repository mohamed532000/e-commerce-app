import "../../../glopaly-styles/global-styles.css";
import "../css/explore-btn-style.css";
import { Link } from "react-router-dom"
function ExploreBtn(props) {
    return(
        <>
            <Link to="/" className="explore-btn" style={{"--i":"10s"}}>
                <p>{props.text}</p>
                <i className="fa-solid fa-arrow-right-long"></i>
            </Link>
        </>
    )
}

export default ExploreBtn;