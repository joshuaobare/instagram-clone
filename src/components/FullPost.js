import {ReactComponent as OptionsSvg } from "../images/icons/Options.svg"
import {ReactComponent as LikeIconSvg} from "../images/icons/LikeIcon.svg"
import {ReactComponent as AddEmojiSvg} from "../images/icons/AddEmoji.svg"
import {ReactComponent as CommentIconSvg} from "../images/icons/CommentIcon.svg"
import {ReactComponent as ShareIconSvg} from "../images/icons/ShareIcon.svg"
import {ReactComponent as SaveIconSvg} from "../images/icons/SaveIcon.svg"
import Waldo from "../images/icons/waldo.png"
import "../FullPost.css"

export default function FullPost() {
return (
    <div className="Full-Post">
        <img src={Waldo} alt="main post" className="full-post-main-img" />
        <div className="full-post-right-section">
            <div className="full-post-header">
                <div className="full-post-header-main">
                    <img src={Waldo} alt="random-icon" className="full-post-profile-icon"/>
                    <div>username</div>
                </div>                
                <OptionsSvg />
            </div>
            <div className="full-post-comment-section">
                <div className="full-post-caption-section">
                    <div className="full-post-caption-username">username</div>
                    <div className="full-post-caption">You love to see it</div>
                </div>
                <div className="full-post-comments">

                </div>
            </div>
            <hr />
            <div>
                <div className="full-post-icons">
                    <div className="full-post-icons-main">
                        <LikeIconSvg />
                        <CommentIconSvg />
                        <ShareIconSvg />
                    </div>
                    <div>
                        <SaveIconSvg />
                    </div>                   
                    
                </div>
                <div className="full-post-likes">570 likes</div>
                <div className="full-post-time">21 June 2024</div>
            </div>
            <div className="full-post-addcomment">
                    <AddEmojiSvg />
                    <input type="text" placeholder="Add a comment..." className="add-comment"/>
                    <div className="full-post-comment-post">Post</div>
                </div>
        </div>
    </div>
)
}