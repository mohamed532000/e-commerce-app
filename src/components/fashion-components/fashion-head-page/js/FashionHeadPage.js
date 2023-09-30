import "../../../../glopaly-styles/global-styles.css";
import GoDownBtn from "../../../go-down-btn/js/GoDownBtn";
import "../css/fashion-head-page-style.css";

function FashionHeadPage(props) {
    return (
        <>
            <div className="head-page">
                <img src={props.headPageImg} alt="head page img" />
                <div className="container">
                    <div className="head-text">
                        <h2 className="head-page-title">{props.headPageTitle}</h2>
                        <h3 className="head-page-title2">{props.headPageTitle2}</h3>
                        <p className="head-page-info">{props.headPageInfo}</p>
                    </div>
                </div>
                <GoDownBtn/>
            </div>
        </>
    )
}
export default FashionHeadPage;