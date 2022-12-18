import LoginImg from "../images/Login.png"
import FBicon from "../images/icons/FBicon.png"
import Playstore from "../images/icons/Playstore.png"
import Appstore from "../images/icons/Appstore.png"
import IGlogo from "../images/icons/IGlogo.png"
import { ReactComponent as LogoSvg } from "../images/icons/Logo.svg"

export default function Login() {
    return (
        <div className="Login">
            <div className="main">
                <img src={LoginImg} alt="Phones on login page" className="login-main-img" />
                <div className="form-section">
                    
                    <form action="">
                        {/*<LogoSvg /> */}
                        <img src={IGlogo} alt="" />                       
                        <div className="form-inputs">
                            <input type="text" placeholder="Phone number, username, or email"/>
                            <input type="password" placeholder="Password"/>                        
                            <button className="form-button">Log in</button>
                        </div>
                        <div className="form-mid">
                            <div className="form-mid-border"><hr /></div>
                            <div className="form-mid-mid">OR</div>
                            <div className="form-mid-border"><hr /></div>
                        </div>
                        <div className="form-bottom">
                            <div className="FB-login">
                                <span><img src={FBicon} alt="Facebook icon" className="FBicon" /></span> 
                                Log in with Facebook
                            </div>
                            <div className="forgot-password">Forgot password?</div>
                        </div>
                                                
                    </form>
                    <div className="signup-prompt">
                        Don't have an account? Sign Up
                    </div>
                    <div className="form-section-bottom">
                        <div>Get the app.</div>
                        <div className="app-stores">
                            <img src={Appstore} alt="App store icon" />
                            <img src={Playstore} alt="Playstore icon" />
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <div className="footer-top">
                    <div>Meta</div>
                    <div>About</div>
                    <div>Blog</div>
                    <div>Jobs</div>
                    <div>Help</div>
                    <div>API</div>
                    <div>Privacy</div>
                    <div>Terms</div>
                    <div>Top Accounts</div>
                    <div>Hashtags</div>
                    <div>Locations</div>
                    <div>Instagram Lite</div>
                    <div>Contact Uploading & Non-Users</div>
                </div>
                <div className="footer-bottom">
                    <div>English</div>
                    <div>&copy; 2022 Instagram from Meta</div>
                </div>
            </footer>
        </div>
    )
}