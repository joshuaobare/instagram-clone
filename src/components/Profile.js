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
        username: "",
        following: 0,
        followers: 0,
        postCount: 0
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
                    username: profile.username,
                    following: profile.following.length,
                    followers: profile.followers.length,
                    postCount:profile.posts.length
                }
                })
            } else {
                const profile = await profiles.find(item => item.username.stringValue === username.toString())
                let followers, following,postCount

                if(profile.following.arrayValue.values) {
                    following = profile.following.arrayValue.values.length
                } else {
                    following = 0
                }

                if(profile.followers.arrayValue.values) {
                    followers = profile.followers.arrayValue.values.length
                } else {
                    followers = 0
                }

                if(profile.posts.arrayValue.values) {
                    postCount = profile.posts.arrayValue.values.length
                } else {
                    postCount = 0
                }


                console.log(profile)
                setData(prevState => {
                    return {...prevState ,
                    description: profile.description.stringValue,
                    name: profile.name.stringValue,
                    posts: profile.posts.arrayValue.values,
                    profilePicture: profile.profilePicture.stringValue,
                    username: profile.username.stringValue,
                    following: following ,
                    followers: followers ,
                    postCount: postCount
                }
                })
            }
            
            
            //console.log(profile)
            
        }
        finder()
    }, [props.profiles , props.userData, username])
    
    console.log(props.userData)
    console.log(props.profiles)
    console.log(data)
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
                        <div><b>{data.postCount}</b> post{data.postCount === 1 ? "" : "s"}</div>
                        <div><b>{data.followers}</b> follower{data.followers === 1 ? "" : "s"}</div>
                        <div><b>{data.following}</b> following</div>
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