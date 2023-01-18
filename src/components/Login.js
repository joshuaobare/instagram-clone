import Footer from "./Footer";
import LoginImg from "../images/Login.png";
import GoogleIcon from "../images/icons/GoogleIcon.png";
import Playstore from "../images/icons/Playstore.png";
import Appstore from "../images/icons/Appstore.png";
import IGlogo from "../images/icons/IGlogo.png";

export default function Login(props) {
  return (
    <div className="Login">
      <div className="main">
        <img
          src={LoginImg}
          alt="Phones on login page"
          className="login-main-img"
        />
        <div className="form-section">
          <form action="" className="form">
            <div className="login-logo">
              <img src={IGlogo} alt="" />
            </div>

            <div className="form-inputs">
              <input
                type="text"
                placeholder="Phone number, username, or email"
                disabled
              />
              <input type="password" placeholder="Password" disabled />
              <button className="form-button" onClick={props.guestLogin}>
                Log in (Guest)
              </button>
            </div>
            <div className="form-mid">
              <div className="form-mid-border">
                <hr />
              </div>
              <div className="form-mid-mid">OR</div>
              <div className="form-mid-border">
                <hr />
              </div>
            </div>
            <div className="form-bottom">
              <div className="Google-login" onClick={props.googleLogin}>
                <img
                  src={GoogleIcon}
                  alt="Google icon"
                  className="Googleicon"
                />
                <div className="Google-login-text">Log in with Google</div>
              </div>
              <div className="forgot-password">Forgot password?</div>
            </div>
          </form>
          <div className="signup-prompt">
            Don't have an account?{" "}
            <span className="signup-prompt-span">Sign Up</span>
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
      <Footer />
    </div>
  );
}
