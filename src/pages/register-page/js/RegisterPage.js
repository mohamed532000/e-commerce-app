import { Link } from "react-router-dom";
import "../../../glopaly-styles/global-styles.css";
import "../css/register-page-style.css";
import { useState,useEffect } from "react";
import { add } from "../../../project-state-and-actions/Accounts";
import { useDispatch , useSelector } from "react-redux";
import NormalPopub from "../../../components/data-sent-popub/js/NormalPopub";
import { addUserAccount } from "../../../project-state-and-actions/UserAccount";
import emailjs from "emailjs-com";
import freepikImg from "../../../media/images/wepik-export-20230904000856R5GV.png";

function RegisterPage() {
    let usersAccounts = useSelector(state => state.accounts);
    let dispatch = useDispatch();
    let [name , setName] = useState("");
    let [email , setEmail] = useState("");
    let [pass , setPass] = useState("");
    let [firstNum , setFirstNum] = useState(0);
    let [secondNum , setSecondNum] = useState(0);
    let [thirdNum , setThirdNum] = useState(0);
    let [forthNum , setForthNum] = useState(0);
    let [fifthNum , setFifthNum] = useState(0);
    let [count, setCount] = useState(0);
    let [canResend, setCanResend] = useState(true);
    let [firstSend , setFirstSend] = useState(true);
    let validName = /[a-zA-Z]{3,}/
    let hasNumber = /\d/;
    let hasLetter = /[a-zA-Z]/;
    let validEmail = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$/;
    let [passwordVisible , setPassVisible] = useState(false);
    let welcomePopub = document.querySelector(".normal-popub-parent");
    let verifyinput = document.querySelector(".verify-code-div");
    let emptyInputsMessage = document.querySelector(".empty-inputs-message");
    let [verifyCodeSent , setVerifyCodeSent] = useState(false);
    let [submit , setSubmit] = useState(false);
    let [verifyCodeFromClient , setVerifyCodeFromClient] = useState();
    useEffect(()=>{
        setFirstNum(Math.floor(Math.random() * 5));
        setSecondNum(Math.floor(Math.random() * 6));
        setThirdNum(Math.floor(Math.random() * 7));
        setForthNum(Math.floor(Math.random() * 8));
        setFifthNum(Math.floor(Math.random() * 9));
    },[])
    let template = {
        client_Name : name,
        client_email : email,
        v : parseInt(`${firstNum}${secondNum}${thirdNum}${forthNum}${fifthNum}`)
    }
    let sendVerifyCode = () => {
        emailjs.send('service_tav7v3s', 'template_y4phq1e', template , 'k4JSsUw3pWeXhbr6g');
    };

    let startCountdown = () => {
        setCount(10);
        setCanResend(false);
    };

    useEffect(() => {
        if (count > 0) {
            let intervalId = setInterval(() => {
                setCount(count - 1);
            }, 1000);
            return () => {
                clearInterval(intervalId);
                setFirstSend(false)
            };
        } else {
            setCanResend(true);
        }
    }, [count]);

    return (
        <>
            <div className="register-page">
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
                    <div className="register-img">
                        <img src={freepikImg} alt="img"/>
                    </div>
                    <form className="register-form" onSubmit={(e)=>{
                        e.preventDefault();
                        let logedInUser = usersAccounts.find((user) => 
                            email === user.email &&
                            pass === user.pass);
                        if( name.match(validName) &&
                            email.match(validEmail) &&
                            (pass.match(hasNumber) || pass.match(hasLetter)) &&
                            pass.length >= 8 ) {
                                if(logedInUser){
                                    document.querySelector(".register-page .wrong-message").classList.add("active");
                                    setTimeout(()=>{
                                        document.querySelector(".register-page .wrong-message").classList.remove("active");
                                    },3000)
                                }else {
                                    if(parseInt(verifyCodeFromClient) === template.v) {
                                            welcomePopub.classList.add("active");
                                            window.localStorage.setItem("user" , JSON.stringify(
                                                {
                                                    name,
                                                    email,
                                                    pass
                                                }
                                            ));
                                            dispatch(add(
                                                {
                                                    name,
                                                    email,
                                                    pass
                                                }
                                            ));
                                            dispatch(addUserAccount(
                                                {
                                                    name,
                                                    email,
                                                    pass
                                                }
                                            ));
                                    }else{
                                        verifyinput.classList.add("invalid")
                                    }
                                }
                            }
                    }}>
                        <p className="wrong-message">this account alraedy Existing do you want <Link to={'log-in'}>Log in</Link></p>
                        <div className="input-div name-div">
                            <label htmlFor="name-input" className="name-label">Name</label>
                            <input 
                            type="text"
                            id="name-input" 
                            onChange={(e)=>{
                                setName(e.target.value)
                                let validName = /[a-zA-Z]{3,}/;
                                let invalidNameMessage = document.querySelector(".name-div > p.invalid-message")
                                document.querySelector("#name-input").value.length > 0
                                ?
                                document.querySelector(".name-label").classList.add("active")
                                :
                                document.querySelector(".name-label").classList.remove("active")

                                if(!e.target.value.match(validName)){
                                    invalidNameMessage.classList.add("active")
                                }else {
                                    invalidNameMessage.classList.remove("active")
                                }
                            }} onBlur={()=>{
                                let invalidNameMessage = document.querySelector(".name-div > p.invalid-message")
                                invalidNameMessage.classList.remove("active");
                            }} required/>
                            <p className="invalid-message">your name shold be more than 3 letters !</p>
                        </div>
                        <div className="input-div email-div">
                            <label htmlFor="email-input" className="mail-label">E-mail</label>
                            <input type="email" id="email-input" onChange={(e)=>{
                                setEmail(e.target.value)
                                let validEmail = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$/;
                                let invalidEmailMessage = document.querySelector(".email-div > p.invalid-message")
                                document.querySelector("#email-input").value.length > 0
                                ?
                                document.querySelector(".mail-label").classList.add("active")
                                :
                                document.querySelector(".mail-label").classList.remove("active");

                                if(!e.target.value.match(validEmail)){
                                    invalidEmailMessage.classList.add("active")
                                }else {
                                    invalidEmailMessage.classList.remove("active")
                                }
                            }} onBlur={()=>{
                                let invalidEmailMessage = document.querySelector(".email-div > p.invalid-message")
                                invalidEmailMessage.classList.remove("active");
                            }} required/>
                            <p className="invalid-message">invalid email !</p>
                        </div>
                        <div className="input-div password-div">
                            <label htmlFor="password-input" className="pass-label">Password</label>
                            <input type={passwordVisible ? "text" : "password"} id="password-input" 
                            onChange={(e)=>{
                                setPass(e.target.value)
                                let hasNumber = /\d/;
                                let hasLetter = /[a-zA-Z]/;
                                let invalidPassMessage = document.querySelector(".password-div > p.invalid-message")
                                document.querySelector("#password-input").value.length > 0
                                ?
                                document.querySelector(".pass-label").classList.add("active")
                                :
                                document.querySelector(".pass-label").classList.remove("active");
                                if(
                                    !e.target.value.match(hasNumber) || 
                                    !e.target.value.match(hasLetter) ||
                                    e.target.value.length < 8 ) {
                                    invalidPassMessage.classList.add("active");
                                }else {
                                    invalidPassMessage.classList.remove("active");
                                }
                            }} onBlur={()=>{
                                let invalidPassMessage = document.querySelector(".password-div > p.invalid-message")
                                invalidPassMessage.classList.remove("active");
                            }} required/>
                            <p className="invalid-message">Password should be more than 8 and contain numbers and letters !</p>
                            <i className="fa-solid fa-eye show-pass-icon"
                                onClick={()=>{
                                    setPassVisible(!passwordVisible);
                                }}
                            ></i>
                        </div>
                        <p className="empty-inputs-message">Complete Required Fields</p>
                        {canResend ? (
                            <button 
                            type="button" 
                            className="send-verify-code-btn"
                            onClick={()=>{
                                if(name.match(validName) &&
                                email.match(validEmail) &&
                                (pass.match(hasNumber) || pass.match(hasLetter)) &&
                                pass.length >= 8 ) {
                                    startCountdown();
                                    startCountdown();
                                    sendVerifyCode();
                                    setVerifyCodeSent(true);
                                    setSubmit(true);                    
                                }else {
                                    emptyInputsMessage.classList.add("active");
                                    setTimeout(()=>{
                                        emptyInputsMessage.classList.remove("active")
                                    },2000)
                                }
                            }}>{
                                firstSend
                                ?
                                <>
                                    <p>Send Code</p>
                                    <i className="fa-regular fa-envelope"></i>
                                </>
                                :
                                <>
                                    <p>Resend Code</p>
                                    <i className="fa-solid fa-reply"></i>
                                </>
                            }</button>
                        ) : (
                            <p>Resend code in {count} seconds</p>
                        )}
                        {verifyCodeSent && 
                        <div className="input-div verify-code-div">
                            <input 
                            onChange={(e)=>{
                                setVerifyCodeFromClient(e.target.value)
                            }}
                            type="text" 
                            placeholder="Verify Code" 
                            className="verify-code-div"/>
                        </div>
                        }
                        {submit &&
                            <button type="submit" className="submit-btn">
                                <p>Sign Up</p>
                            </button>
                        }
                        <p>Fast sign up with your favorite sochial profile</p>
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
                        <p>If you are already a member please <Link to="log-in">Log In</Link></p>
                    </form>
                    <NormalPopub
                        popubImg = {"https://i.pinimg.com/474x/49/f1/cc/49f1ccd6d6c1b4eb4b7d9bcabd42bd7b.jpg"}
                        senderName = {`welcome ${name}`}
                        title="Account created successfully !"
                        info="Thank you for trust."
                        button={true}
                        pathName = "/"
                        buttonText = "Shop Now"/>
                </div>
                <div className="pubbl last">
                    <span></span>
                </div>
            </div>
        </>
    )
}
export default RegisterPage;