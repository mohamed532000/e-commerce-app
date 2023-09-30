import { Link } from "react-router-dom";
import "../../../glopaly-styles/global-styles.css";
import "../css/shopping-title-style.css";

function ShoppingTitle(props) {
    return (
        <>
            <div className="shopping-title">
                <h2 className="titleText">{props.titleText}</h2>
                <p>
                    {props.titleInfo}
                </p>
                <div className="routes-div">
                    <Link to="/">Home</Link>
                    /
                    <p>{props.pageName}</p>
                </div>
            </div>
        </>
    )
}

export default ShoppingTitle;