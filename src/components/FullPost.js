import {ReactComponent as LikeIconSvg} from "../images/icons/LikeIcon.svg"
import {ReactComponent as AddEmojiSvg} from "../images/icons/AddEmoji.svg"
import {ReactComponent as CommentIconSvg} from "../images/icons/CommentIcon.svg"
import {ReactComponent as ShareIconSvg} from "../images/icons/ShareIcon.svg"
import {ReactComponent as SaveIconSvg} from "../images/icons/SaveIcon.svg"
import { Dialog } from "@mui/material"
import Comment from "./Comment"
import "../styles/FullPost.css"
import { Close } from "@mui/icons-material"
import { useEffect, useState } from "react"
import uniqid from "uniqid"

export default function FullPost(props) {
    
    const [data, setData] = useState({
        comments: [],
        timestamp: "",
        url: "",
        caption: "",
        username: "",
        likes: [],
        id: ""
    })
    const [profile , setProfile] = useState({
        
        username:"",
        name:"",
        description:"",
        profilePicture:"",
        

    })
    const [likeStatus , setLikeStatus] = useState(false)
    const [likesCount, setLikesCount] = useState(0)
    const [comments , setComments] = useState([])
    const [date, setDate] = useState("")
    

    useEffect(() => {
        const currentProfile = props.profiles.find(items => {

            if(items.posts.arrayValue.values) {
              //console.log(items.posts)
              return items.posts.arrayValue.values.find(item => item.mapValue.fields.id.stringValue === props.currentPost.id.stringValue)
            } else {
              return null
            }
            
        })
        setProfile({
            username:currentProfile.username.stringValue,
            name:currentProfile.name.stringValue,
            description:currentProfile.description.stringValue,
            profilePicture:currentProfile.profilePicture.stringValue,           
    
        })
        if(props.currentPost.likes.arrayValue.values){
            setLikesCount(props.currentPost.likes.arrayValue.values.length)
            const checker = props.currentPost.likes.arrayValue.values.some(item => item.stringValue === props.userData.username)
            
            if(checker){
                setLikeStatus(true)                
            } else {
                setLikeStatus(false)
            }

        }else {
            setLikeStatus(false)
            setLikesCount(0)
        }
        const comms = []
        if(props.currentPost.comments.arrayValue.values){           
            
            props.currentPost.comments.arrayValue.values.forEach(obj => {
                const profile = props.profiles.find(items => {

                    if(items.posts.arrayValue.values) {
                      //console.log(items.posts)
                      return items.posts.arrayValue.values.find(item => item.mapValue.fields.username.stringValue === obj.mapValue.fields.username.stringValue)
                    } else {
                      return null
                    }
                    
                })
                comms.push({
                    comment:obj.mapValue.fields.comment.stringValue,
                    profilePicture: profile.profilePicture.stringValue,
                    username:obj.mapValue.fields.username.stringValue

                })
            })
        }
        
        
        setData(props.currentPost)
        setComments(comms)
        const time = new Date(props.currentPost.timestamp.timestampValue)
        const options = {month: "long"}
        setDate(`${time.getDate()} ${new Intl.DateTimeFormat("en-US",options).format(time)} ${time.getFullYear()}`)


    }, [props.profiles , props.currentPost])

    const style = {
        
        backgroundColor: "rgb(0,0,0.0.3)"
    }

return (
    <Dialog open={props.dialogOpen ? true : false}  maxWidth="1300px" style={style}>        
        
            <div className="Full-Post">
                <div className="full-post-main-img-cont">
                    <img src={data.url.stringValue} alt="main post" className="full-post-main-img" />
                </div>
                
                <div className="full-post-right-section">
                    <div className="full-post-header">
                        <div className="full-post-header-main">
                            <img src={profile.profilePicture} alt="random-icon" className="full-post-profile-icon"/>
                            <div>{data.username.stringValue}</div>
                        </div>                
                        
                        <button onClick={props.togglePostDialog} className="full-post-close-icon">
                            <Close />
                        </button>
                        
                    </div>
                    <hr />
                    <div className="full-post-comment-section">
                        <div className="full-post-caption-section">
                            <div className="full-post-caption-section-main">
                                <img src={profile.profilePicture} alt="" className="full-post-profile-icon" />
                                <div className="full-post-caption-username">{data.username.stringValue}</div>
                            </div>                    
                            <div className="full-post-caption">{data.caption.stringValue}</div>
                        </div>
                        <div className="full-post-comments">
                            {comments.map(item => 
                                <Comment 
                                    profilePicture = {item.profilePicture}
                                    comment = {item.comment}
                                    username = {item.username}
                                    key = {uniqid()}
                                />
                                
                            )}
                        </div>
                    </div>
                    <hr />
                    <div>
                        <div className="full-post-icons">
                            <div className="full-post-icons-main">
                                <div onClick={(e) => props.likePost(e,data.id.stringValue  , data.username.stringValue)}
                                ><LikeIconSvg fill={likeStatus ? "red" : "black"}/></div>
                                <div><CommentIconSvg /></div>
                                <div><ShareIconSvg /></div>
                                
                                
                                
                            </div>
                            <div>
                                <SaveIconSvg />
                            </div>                   
                            
                        </div>
                        <div className="full-post-likes">{likesCount} like{likesCount !== 1 ? "s" : ""}</div>
                        <div className="full-post-time">{date}</div>
                    </div>
                    <div className="full-post-addcomment">
                            <AddEmojiSvg />
                            <form action="" className="full-post-comment-form">
                                <input 
                                    type="text" 
                                    placeholder="Add a comment..." 
                                    className="add-comment"
                                    name = "comment"
                                    id = {data.id.stringValue}
                                    value = {props.comment[data.id.stringValue] || ""}
                                    onChange= {(e) => props.handleCommentChange(e , data.id.stringValue)}
                                    
                                />
                                <button 
                                    className="full-post-comment-post"
                                    onClick={(e) => {
                                        props.createComment(e , data.id.stringValue  , data.username.stringValue)
                                        //props.refreshCurrentPost(e , data.id.stringValue)
                                    }}
                                >Post</button>
                            </form>
                            
                        </div>
                </div>
            </div>
        
        
    </Dialog>


    
)
}