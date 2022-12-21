import Waldo from "../images/icons/waldo.png"
import "../MiniProfile.css"

export default function MiniProfile() {
    return (
        <div className="MiniProfile">
            <img src={Waldo} alt="mini profile icon" className="miniprofile-icon"/>
            <div className="miniprofile-main">
                <div className="miniprofile-main-username">username</div>
                <div className="miniprofile-main-followers">15 Followers</div>
            </div>
            <div className="miniprofile-follow">
                Follow
            </div>
        </div>
    )
}