import { Link } from "react-router-dom";
import "../css/data-sent-popub-style.css";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../project-state-and-actions/CartActions";

function NormalPopub(props) {
    let dispatch =  useDispatch();
    let {closingIcon , popubImg , senderName , button , cart} = props;
    return (
        <>
            <div className="normal-popub-parent">
                <div className="popub-child">
                    {closingIcon &&
                    <div className="close-popub-icon" onClick={()=>{
                        setTimeout(()=>{
                            document.querySelector(".normal-popub-parent").classList.remove("active")
                            document.querySelector(".normal-popub-parent").classList.remove("un-active")
                        },2000);
                        document.querySelector(".normal-popub-parent").classList.add("un-active")
                        document.querySelector(".normal-popub-parent .popub-child").classList.add("close")
                    }}>
                        <span className="first" style={{"--r" : "45deg"}}></span>
                        <span className="second" style={{"--r" : "-45deg"}}></span>
                    </div>}
                    <div className="popub-content">
                        {popubImg && 
                            <img src={popubImg} alt="img" />
                        }
                        {senderName && 
                            <h2 className="name-text"><span>{senderName}</span></h2>
                        }
                        <h3>{props.title}</h3>
                        <p>{props.info}</p>
                        { button &&
                        <Link to={props.pathName} onClick={()=>{
                            document.querySelector(".normal-popub-parent").classList.remove("active");
                            if(cart){
                                dispatch(clearCart())
                            }
                        }}>{props.buttonText}</Link>}
                    </div>
                </div>
            </div>
        </>
    )
}
export default NormalPopub;