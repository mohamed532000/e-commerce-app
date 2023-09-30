import { useSelector } from "react-redux";
import NormalPopub from "../../data-sent-popub/js/NormalPopub";
import "../css/login-popub-style.css"
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserAccount } from "../../../project-state-and-actions/UserAccount";

function LoginPopub(props) {
    let dispatch = useDispatch();
    let usersAccounts = useSelector(state => state.accounts);
    let [email , setEmail] = useState("");
    let [password , setPassword] = useState("");
    return (
        <>
            <div className="login-popub-parent">
                <div className="popub-child">
                    <div className="close-icon" onClick={()=>{
                        let popubParent = document.querySelector(".login-popub-parent");
                        popubParent.classList.remove("active");
                    }}>
                        <span className="first"></span>
                        <span className="second"></span>
                    </div>
                    <div className="login-popub-form">
                        <h2>Log In!</h2>
                        <Link to="https://www.google.com" className="google-btn" >
                            <p>Login With Google</p>
                            <img src="https://cdn-icons-png.flaticon.com/128/2504/2504739.png" alt="logo-img"/>
                            </Link>
                        <div className="choosing-div">
                            <span className="first"></span>
                            <p>OR LOGIN WITH EMAIL </p>
                            <span className="second"></span>
                        </div>
                        <form className="login-form" onSubmit={(e)=>{
                            e.preventDefault();
                            let user = usersAccounts.find(user => email === user.email && password === user.pass);
                            if(user){
                                window.localStorage.setItem("user" , JSON.stringify(user));
                                dispatch(addUserAccount(
                                    {
                                        email,
                                        pass : password
                                    }
                                ))
                                document.querySelector(".normal-popub-parent").classList.add("active")
                            }else {
                                document.querySelector(".login-popub-parent .wrong-message").classList.add("active");
                                setTimeout(()=>{
                                    document.querySelector(".login-popub-parent .wrong-message").classList.remove("active");
                                },4000)
                            }
                        }}>
                            <p className="wrong-message">something wrong try again!</p>
                            <input
                            onChange={(e)=>{
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
                            <div className="keep-me">   
                                <div>
                                    <input type="checkbox" id="keep-me"/>
                                    <label htmlFor="keep-me">keep-me</label>
                                </div>
                                <Link to="">Forgot Password</Link>
                            </div>
                            <button type="submit" className="login-btn">
                                <p>Log in</p>
                                <i className="fa-solid fa-right-to-bracket"></i>
                            </button>
                            <p>Don't have an account yet? <Link to="register" onClick={()=>{
                                document.querySelector(".login-popub-parent").classList.remove("active")
                            }}>Sign Up</Link></p>
                        </form>
                    </div>
                    <div className="popub-img">
                        <img src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?w=740&t=st=1691725241~exp=1691725841~hmac=1bac628a741b18b9147164801e887ab892c6be7acf34e8681cf941b80161e39b" alt="img"/>
                    </div>
                </div>
            </div>
            <NormalPopub
                popubImg = {"https://i.pinimg.com/474x/49/f1/cc/49f1ccd6d6c1b4eb4b7d9bcabd42bd7b.jpg"}
                senderName = {false}
                title="Welcome Back!"
                info="thank you for your time ."
                button = {true}
                buttonText = {"Shop"}
                pathName={"/airpods"}/>
        </>
    )
}
export default LoginPopub;