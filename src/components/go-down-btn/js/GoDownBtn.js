import "../../../glopaly-styles/global-styles.css";
import "../css/go-down-btn-style.css";

function GoDownBtn(props) {
    function scrollWindowBy50() {
        window.scrollTo(0, 500);
    };
    return (
        <>
            <div className="go-down" onClick={scrollWindowBy50}>
                <i className="fa-solid fa-chevron-down"></i>
            </div>
        </>
    )
}
export default GoDownBtn;