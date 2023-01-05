import {ReactComponent as OptionsSvg } from "../images/icons/Options.svg"
import {ReactComponent as LikeIconSvg} from "../images/icons/LikeIcon.svg"
import {ReactComponent as AddEmojiSvg} from "../images/icons/AddEmoji.svg"
import {ReactComponent as CommentIconSvg} from "../images/icons/CommentIcon.svg"
import {ReactComponent as ShareIconSvg} from "../images/icons/ShareIcon.svg"
import {ReactComponent as SaveIconSvg} from "../images/icons/SaveIcon.svg"
import { Link } from "react-router-dom"
import Waldo from "../images/icons/waldo.png"
import Wrap from "../images/wrap.jpg"
import "../Home-Post.css"

export default function Post(props){
    return (
        <div className="post">
            <div className="home-post-header">
                <div className="home-post-header-main">
                    <img src={props.ppic} alt="random-icon" className="home-post-profile-icon"/>
                    <Link to={`/profile/${props.username}`}>
                        <div>{props.username}</div>
                    </Link>                    
                </div>                
                <OptionsSvg />
            </div>
            <img src={props.url} alt="" className="home-post-img" />
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
                        <Link to={`/profile/${props.username}`}>
                            <div className="home-post-caption-username">{props.username}</div>
                        </Link>
                        
                        <div className="home-post-caption">{props.caption}</div>
                    </div>                    
                    <div className="home-post-comments-section">View all comments</div>                   
                    
                </div>
                <div className="home-post-time">14 HOURS AGO</div>
                <div className="home-post-comment">
                    <AddEmojiSvg />
                    <form action="" className="home-post-comment-form">
                        <input 
                            type="text" 
                            placeholder="Add a comment..." 
                            className="add-comment"
                            name = "comment"
                            id = {props.id}
                            value = {props.comment[props.id] || ""}
                            onChange= {(e) => props.handleCommentChange(e , props.id)}
                        />
                        <button 
                            className="home-post-comment-post"
                            onClick={(e) => props.createComment(e , props.id)}
                        
                        >Post</button>
                    </form>
                </div>
            </div>
        </div>
    )
}