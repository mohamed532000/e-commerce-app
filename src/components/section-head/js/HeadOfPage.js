import "../../../glopaly-styles/global-styles.css";
import "../css/head-of-page.css"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper , SwiperSlide } from "swiper/react";
import { Pagination , Navigation , A11y , EffectFade , Autoplay } from "swiper";
import GoDownBtn from "../../go-down-btn/js/GoDownBtn";
function HeadOfPage(props) {
    let {lastSwiper} = props;
    return (
        <>
            <div className="head-of-page">
                <Swiper 
                    className="parent-of-slides"
                    modules = {[A11y , Pagination , Navigation , EffectFade , Autoplay]}
                    speed = {2000}
                    autoplay = {{
                        delay: 4000,
                        disableOnInteraction : false
                    }}
                    effect = "fade"
                    loop = {true}
                    >
                        <SwiperSlide className="slide">
                            <img src={props.backgroundImg} alt="head img" />
                            <div className="slide-text">
                                <h2 style={{"--i":".5s"}}>{props.sectionTitle}</h2>
                                <h3 style={{"--i":"1s"}}>{props.secondTitle}</h3>
                                <p style={{"--i":"1.5s"}}>{props.sectionInfo}</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="slide">
                            <img src={props.secondSectionBackgroundImg} alt="head img"/>
                            <div className="slide-text">
                                <h2 style={{"--i":".5s"}}>{props.secondSectionTitle}</h2>
                                <h3 style={{"--i":"1s"}}>{props.secondSectionSecondTitle}</h3>
                                <p style={{"--i":"1.5s"}}>{props.secondSectionInfo}</p>
                            </div>
                        </SwiperSlide>
                        {lastSwiper && 
                        <SwiperSlide className="slide">
                            <img src={props.lastSectionBackgroundImg} alt="head img"/>
                            <div className="slide-text">
                                <h2 style={{"--i":".5s"}}>{props.lastSectionTitle}</h2>
                                <h3 style={{"--i":"1s"}}>{props.lastSectionSecondTitle}</h3>
                                <p style={{"--i":"1.5s"}}>{props.lastSectionInfo}</p>
                            </div>
                        </SwiperSlide>}
                </Swiper>
                <GoDownBtn/>
            </div>
        </>
    )
}
export default HeadOfPage;