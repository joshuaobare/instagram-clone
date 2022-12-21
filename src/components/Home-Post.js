import {ReactComponent as OptionsSvg } from "../images/icons/Options.svg"
import {ReactComponent as LikeIconSvg} from "../images/icons/LikeIcon.svg"
import {ReactComponent as AddEmojiSvg} from "../images/icons/AddEmoji.svg"
import {ReactComponent as CommentIconSvg} from "../images/icons/CommentIcon.svg"
import {ReactComponent as ShareIconSvg} from "../images/icons/ShareIcon.svg"
import {ReactComponent as SaveIconSvg} from "../images/icons/SaveIcon.svg"
import Waldo from "../images/icons/waldo.png"
import Wrap from "../images/wrap.jpg"
import "../Home-Post.css"

export default function Post(){
    return (
        <div className="post">
            <div className="home-post-header">
                <div className="home-post-header-main">
                    <img src={Waldo} alt="random-icon" className="home-post-profile-icon"/>
                    <div>username</div>
                </div>                
                <OptionsSvg />
            </div>
            <img src={Wrap} alt="" className="home-post-img" />
            <div className="home-post-main">
                <div className="home-post-icons">
                    <div className="home-post-icons-main">
                        <LikeIconSvg />
                        <CommentIconSvg />
                        <ShareIconSvg />
                    </div>
                    <div>
                        <SaveIconSvg />
                    </div>                   
                    
                </div>
                <div className="home-post-likes">28311 likes</div>
                <div className="home-post-mid-section">
                    <div className="home-post-caption-section">
                        <div className="home-post-caption-username">username</div>
                        <div className="home-post-caption">You love to see it</div>
                    </div>                    
                    <div className="home-post-comments-section">View all comments</div>                   
                    
                </div>
                <div className="home-post-time">14 HOURS AGO</div>
                <div className="home-post-comment">
                    <AddEmojiSvg />
                    <input type="text" placeholder="Add a comment..." className="add-comment"/>
                    <div className="home-post-comment-post">Post</div>
                </div>
            </div>
        </div>
    )
}