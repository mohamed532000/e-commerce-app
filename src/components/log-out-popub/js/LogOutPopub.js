import "../css/log-out-popub.style.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { deletUserAccount } from "../../../project-state-and-actions/UserAccount";
import { clearCart } from "../../../project-state-and-actions/CartActions";

function LogOutPopub(props) {
    let popubParent = document.querySelector(".log-out-parent");
    let usersAccounts = useSelector(state => state.accounts);
    let dispatch = useDispatch()
    let [email , setEmail] = useState("")
    let [password , setPassword] = useState("");
    let user = usersAccounts.find((user)=> email === user.email && password === user.pass);
    return (
        <>
            <div className="log-out-parent">
                <div className="popub-form">
                    <div className="close-icon" onClick={()=>{
                        popubParent.classList.remove("active");
                    }}>
                        <span className="first"></span>
                        <span className="second"></span>
                    </div>
                    <img src="https://cdn-icons-png.flaticon.com/128/7243/7243882.png" alt="img"/>
                    <h2>Are you shure to log out ?</h2>
                    <form className="login-form" onSubmit={(e)=>{
                        e.preventDefault();
                        if(user) {
                            dispatch(deletUserAccount());
                            window.localStorage.removeItem("user");
                            popubParent.classList.remove("active");
                            dispatch(clearCart())
                        }else {
                            document.querySelector(".log-out-parent .wrong-message").classList.add("active");
                            setTimeout(()=>{
                                document.querySelector(".log-out-parent .wrong-message").classList.remove("active");
                            },3000)
                        }
                    }}>
                        <p className="wrong-message">something wrong try again!</p>
                        <input onChange={(e)=>{
                            setEmail(e.target.value)
                        }}
                        type="email" 
                        className="email-input" 
                        placeholder="E-mail" 
                        required/>
                        <input 
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                        type="password" 
                        className="pass-input" 
                        placeholder="Password" 
                        required/>
                        <button type="submit" className="login-btn">
                            <p>Log Out</p>
                            <i className="fa-solid fa-right-to-bracket"></i>
                        </button>
                        <Link to="/">Forgot Password</Link>
                    </form>
                </div>
            </div>
        </>
    )
}
export default LogOutPopub;