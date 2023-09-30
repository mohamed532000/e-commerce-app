import "../../../glopaly-styles/global-styles.css";
import "../css/deleting-ask-popub.style.css";
function DeletingAskPopub() {
    return (
        <>
            <div className="deleting-ask-popub">
                <div className="ask-content">
                    <img src="https://img.freepik.com/free-icon/package_318-899795.jpg?size=626&ext=jpg&ga=GA1.2.1405010713.1655359107&semt=ais" alt="product img"/>
                    <h2 className="text-ask">are you sure to delete this product ?</h2>
                    <div className="cansel-and-agree-btns">
                        <button className="btn delete">Delete</button>
                        <button className="btn cansel">Cansel</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DeletingAskPopub;