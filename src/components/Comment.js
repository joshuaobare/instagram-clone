import {ReactComponent as SmallLikeIconSvg} from "../images/icons/SmallLikeIcon.svg"
import Waldo from "../images/icons/waldo.png"
import "../Comment.css"

export default function Comment() {
    return (
        <div className="Comment">
            <img src={Waldo} alt="commenter icon" className="full-post-profile-icon"/>
            <div className="comment-main">
                <div>username</div>
                <div>Real good picture</div>
            </div>
            
            <SmallLikeIconSvg />
        </div>
    )
}