import "../../../glopaly-styles/global-styles.css";
import "../css/log-in-page-style.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import NormalPopub from "../../../components/data-sent-popub/js/NormalPopub";
import { addUserAccount } from "../../../project-state-and-actions/UserAccount";

function LogInPage() {
    let usersAccounts = useSelector(state => state.accounts);
    let dispatch = useDispatch()
    let [passwordVisible , setPassVisible] = useState(false);
    let [email , setEmail] = useState("");
    let [password , setPassword] = useState("");
    let successPopub = document.querySelector(".normal-popub-parent");

    return (
        <>
            <div className="login-page">
                <div className="pubbl first">
                    <span></span>
                </div>
                <div className="pubbl second">
                    <span></span>
                </div>
                <div className="container">
                    <Link to='/' className="to-home-icon">
                        <i className="fa-solid fa-left-long"></i>
                    </Link>
                    <div className="login-text">
                        <div className="text-div">
                            <h2>Welcome to your digital sanctuary</h2>
                            <p>Step into a world of possibilities.</p>
                        </div>
                        <span></span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgb(8, 94, 128)" fillOpacity="1" d="M0,160L34.3,154.7C68.6,149,137,139,206,154.7C274.3,171,343,213,411,234.7C480,256,549,256,617,224C685.7,192,754,128,823,101.3C891.4,75,960,85,1029,112C1097.1,139,1166,181,1234,202.7C1302.9,224,1371,224,1406,224L1440,224L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
                    </div>
                    <form className="login-form" onSubmit={(e)=>{
                        e.preventDefault();
                        let user = usersAccounts.find((user) => email === user.email && password === user.pass);

                        if(user) {
                            window.localStorage.setItem("user" , JSON.stringify(user));
                            dispatch(addUserAccount(
                                {
                                    email,
                                    pass : password
                                }
                            ))
                            successPopub.classList.add("active")
                        }else {
                            document.querySelector(".login-page .wrong-message").classList.add("active");
                            setTimeout(()=>{
                                document.querySelector(".login-page .wrong-message").classList.remove("active");
                            },3000)
                        }
                        
                    }}>
                        <p className="wrong-message">something wrong try again!</p>
                        <div className="input-div email-div">
                            <label htmlFor="email-input" className="mail-label">E-mail</label>
                            <input type="email" id="email-input" onChange={(e)=>{
                                setEmail(e.target.value)
                                email && email.length > 0
                                ?
                                document.querySelector(".mail-label").classList.add("active")
                                :
                                document.querySelector(".mail-label").classList.remove("active")
                            }} required/>
                        </div>
                        <div className="input-div password-div">
                            <label htmlFor="password-input" className="pass-label">Password</label>
                            <input type={passwordVisible ? "text" : "password"} id="password-input" 
                            onChange={(e)=>{
                                setPassword(e.target.value)
                                password && password.length > 0
                                ?
                                document.querySelector(".pass-label").classList.add("active")
                                :
                                document.querySelector(".pass-label").classList.remove("active")
                            }} required/>
                            <i className="fa-solid fa-eye show-pass-icon"
                                onClick={()=>{
                                    setPassVisible(!passwordVisible);
                                }}
                            ></i>
                        </div>
                        <button type="submit" className="submit-btn">Log In</button>
                        <p>Fast log in with your favorite sochial profile</p>
                        <div className="sochial-accounts">
                            <Link to="https://www.facebook.come">
                                <img src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png" alt="facebook img" />
                            </Link>
                            <Link to="https://www.twitter.come">
                                <img src="https://cdn-icons-png.flaticon.com/128/3256/3256013.png" alt="twitter img" />
                            </Link>
                            <Link to="https://www.google.come">
                            <img src="https://cdn-icons-png.flaticon.com/128/281/281764.png" alt="google img" />
                            </Link>
                        </div>
                        <p>I don't have account i want to <Link to="register">create account</Link></p>
                    </form>
                </div>
                <div className="pubbl last">
                    <span></span>
                </div>
                <NormalPopub
                popubImg = {"https://cdn-icons-png.flaticon.com/128/3032/3032885.png"}
                senderName = {`Login successfully !`}
                title="Welcome to the Future: Your Journey Starts Here!"
                info="Back to Where Dreams Flourish!"
                button={true}
                buttonText={"Shop Now"}
                pathName={"/airpods"}/>
            </div>
        </>
    )
}
export default LogInPage;