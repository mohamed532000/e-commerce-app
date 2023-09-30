import "../../../glopaly-styles/global-styles.css";
import "../css/video-element-style.css";
import ExploreBtn from "../../explore-btn/js/ExploreBtn"
import { useState } from "react";
import Loading from "../../loading/js/Loading";
function VideoElement(props) {
    let {explorBtn} = props;
    let [isLoading , setLoading] = useState(true)
    return (
        <>
        <div className="video">
            <video
                src={props.videoLink}
                autoPlay
                loop
                muted
                onLoadedData={()=>setLoading(false)}
            />
            <div className="text">
                <h2>{props.videoInfo}</h2>
                {explorBtn && <ExploreBtn text="Explore"/>}
            </div>
        </div>
        <Loading isLoading={isLoading}/>
        </>
    )
}
export default VideoElement;