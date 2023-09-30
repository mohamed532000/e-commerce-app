import "../../../../pages/about-page/css/about-page-style.css";
import { Link } from "react-router-dom";

function TeamCart(props) {
    return (
        <>
            <div className="card-content">
                <div className="img">
                    <img src={props.img} alt="person img"/>
                </div>
                <div className="person-info">
                    <h2 className="person-name" style={{"--i":"0"}}>{props.personName}</h2>
                    <p style={{"--i":".2s"}}>{props.personInfo}</p>
                    <div className="person-contact">
                        <Link to='/' style={{"--i" : "0"}}>
                            <i className="fa-brands fa-facebook"></i>
                        </Link>
                        <Link to='/' style={{"--i" : ".2s"}}>
                            <i className="fa-brands fa-twitter"></i>
                        </Link>
                        <Link to='/' style={{"--i" : ".4s"}}>
                            <i className="fa-brands fa-instagram"></i>
                        </Link>
                        <Link to='/' style={{"--i" : ".6s"}}>
                            <i className="fa-brands fa-pinterest"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TeamCart;