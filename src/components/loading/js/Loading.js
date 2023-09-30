import "../css/loading-style.css";
function Loading({isLoading}) {
    return (
        <>
            <div className={`loading-div ${isLoading ? 'visible' : ''}`}>
                <h2>
                    L
                    <span className="spinner"></span>
                    ading..!
                </h2>
            </div>
        </>
    )
}
export default Loading;