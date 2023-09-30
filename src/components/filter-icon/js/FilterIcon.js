import "../css/filter_icon_style.css"
function FilterIcon(props) {
    return (
        <>
            <div className="filter-icon" onClick={()=>{
                props.filterSide.classList.toggle("active");
                document.querySelector(".filter-icon span.second").classList.toggle("hidden");
                document.querySelectorAll(".filter-icon > span").forEach(span => {
                    span.classList.toggle("active")
                })
            }}>
                <span className="first" style={{"--i" : "45deg" , "--d" : ".2s"}}></span>
                <span className="second" style={{"--i" : "0" , "--d" : "0s"}}></span>
                <span className="last" style={{"--i" : "-45deg" , "--d" : ".2s"}}></span>
            </div>
        </>
    )
}
export default FilterIcon;