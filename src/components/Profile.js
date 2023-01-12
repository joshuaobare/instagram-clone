import Footer from "./Footer"
import {ReactComponent as PostIconSvg} from "../images/icons/PostIcon.svg"
import {ReactComponent as SaveIconSvg} from "../images/icons/SaveIcon2.svg"
import {ReactComponent as TaggedIconSvg} from "../images/icons/TaggedIcon.svg"
import {ReactComponent as ProfileMenuSvg} from "../images/icons/ProfileMenu.svg"
import {ReactComponent as OptionsSvg } from "../images/icons/Options.svg"
import Waldo from "../images/icons/waldo.png"
import "../Profile.css"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import uniqid from "uniqid"

export default function Profile(props) {

    const [isUser , setIsUser] = useState(false)
    const [data, setData] = useState({
        description: "",
        name: "",
        posts: [],
        profilePicture: "",
        username: ""
    })
    const {username} = useParams()
    
    
    //console.log(props.userData)
    //console.log(props.profiles[0])
    useEffect(() => {
        const finder = async () => {
            
            const profiles = await props.profiles   
            
            if (username === "user"){
                setIsUser(true)
                const profile = props.userData
                setData(prevState => {
                    return {...prevState ,
                    description: profile.description,
                    name: profile.name,
                    posts: profile.posts,
                    profilePicture: profile.profilePicture,
                    username: profile.username}
                })
            } else {
                const profile = await profiles.find(item => item.username.stringValue === username.toString())
                console.log(profile)
                setData(prevState => {
                    return {...prevState ,
                    description: profile.description.stringValue,
                    name: profile.name.stringValue,
                    posts: profile.posts.arrayValue.values,
                    profilePicture: profile.profilePicture.stringValue,
                    username: profile.username.stringValue
                }
                })
            }
            
            
            //console.log(profile)
            
        }
        finder()
    }, [props.profiles , props.userData, username])
    
    //console.log(props.userData)
    //console.log(props.profiles)
    return (
        <div className="Profile">
            <div className="profile-main">
                <img src={data.profilePicture} alt="main profile pic" className="profile-main-img" />
                <div className="profile-details">
                    <div className="profile-details-header">
                        <div className="profile-details-username">{data.username}</div>
                        <button className="profile-details-follow" onClick={isUser? props.toggleEditDialog : () => props.follow(username)}>{isUser ? "Edit Profile" : "Follow"}</button>
                        <OptionsSvg />
                    </div>
                    <div className="profile-details-mid">
                        <div><b>1</b> post</div>
                        <div><b>216</b> followers</div>
                        <div><b>154</b> following</div>
                    </div>
                    <div className="profile-details-bottom">
                        <div><b>{data.name}</b></div>
                        <div>{data.description}</div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="profile-menu">
                <div className="profile-menu-item">
                    <PostIconSvg />
                    POSTS
                </div>
                <div className="profile-menu-item">
                    <SaveIconSvg />
                    SAVED
                </div>
                <div className="profile-menu-item">
                    <TaggedIconSvg />
                    TAGGED
                </div>
            </div>
            <div className="profile-posts-grid">
                {
                    data.posts.map(item => <img 
                        key = {uniqid()}
                        src={item.mapValue.fields.url.stringValue} 
                        alt="posts"
                        className="profile-post" 
                    />)
                }
            </div>
            <Footer />
        </div>
    )
}