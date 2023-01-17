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
import { useEffect, useState } from "react"

export default function Post(props){

    const [likeStatus , setLikeStatus] = useState(false)
    const [likesCount, setLikesCount] = useState(0)
    const [time , setTime] = useState("")

    useEffect(()=>{
        if(props.likes.arrayValue.values){
            const checker = props.likes.arrayValue.values.some(item => item.stringValue === props.userData.username)
            setLikesCount(props.likes.arrayValue.values.length)

            if(checker){
                setLikeStatus(true)                
            } else {
                setLikeStatus(false)
            }
        } else {
            setLikeStatus(false)
            setLikesCount(0)
        }

        const timestamp = new Date(props.timestamp)
        const now = Date.now()
        const timeDifference = (now-timestamp)/1000

        if(timeDifference < 86400) {
            const time = Math.floor((timeDifference*24)/86400)
            setTime(`${time} HOUR${time !== 1 ? "S" : ""} AGO`)
        } else if(timeDifference < 604800) {
            const time = Math.floor((timeDifference*7)/604800) 
            setTime(`${time} DAY${time !== 1 ? "S" : ""} AGO`)
        } else if(timeDifference >= 604800){
            const time = Math.floor(timeDifference/604800) 
            setTime(`${time} WEEK${time !== 1 ? "S" : ""} AGO`)
        }
    },[props.likes , props.userData, props.profiles , props.timestamp])

    

    //console.log(timeDifference)

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
            <div className="home-post-img-cont">
                <img src={props.url} alt="" className="home-post-img" />
            </div>
            
            <div className="home-post-main">
                <div className="home-post-icons">
                    <div className="home-post-icons-main">
                        <div onClick={(e) => props.likePost(e,props.id,props.username)}>
                            <LikeIconSvg fill={likeStatus ? "red" : "black"} />
                        </div>
                        <div><CommentIconSvg /></div>
                        <div><ShareIconSvg /></div>                       
                        
                        
                    </div>
                    <div>
                        <SaveIconSvg />
                    </div>                   
                    
                </div>
                <div className="home-post-likes">{likesCount} like{likesCount !== 1 ? "s" : ""}</div>
                <div className="home-post-mid-section">
                    <div className="home-post-caption-section">
                        <Link to={`/profile/${props.username}`}>
                            <div className="home-post-caption-username">{props.username}</div>
                        </Link>
                        
                        <div className="home-post-caption">{props.caption}</div>
                    </div>                    
                    <div 
                        className="home-post-comments-section"
                        onClick={() => props.displayPost(props.id)}
                    >View comments</div>                   
                    
                </div>
                <div className="home-post-time">{time}</div>
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
                            onClick={(e) => props.createComment(e , props.id  , props.username)}
                        
                        >Post</button>
                    </form>
                </div>
            </div>
        </div>
    )
}