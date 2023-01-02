import Waldo from "../images/icons/waldo.png"
import "../MiniProfile.css"
import { Link } from "react-router-dom"

export default function MiniProfile(props) {
    return (
        <div className="MiniProfile">
            <img src={props.ppic} alt="mini profile icon" className="miniprofile-icon"/>
            <div className="miniprofile-main">
                <Link to={`/profile/${props.username}`}>
                    <div className="miniprofile-main-username">{props.username}</div>
                </Link>                
                <div className="miniprofile-main-followers">15 Followers</div>
            </div>
            <div className="miniprofile-follow">
                Follow
            </div>
        </div>
    )
}