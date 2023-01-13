import Waldo from "../images/icons/waldo.png"
import "../MiniProfile.css"
import { Link, useRouteLoaderData } from "react-router-dom"
import { useEffect, useState } from "react"

export default function MiniProfile(props) {
    const [followStatus , setFollowStatus] = useState(false)
    const [followers, setFollowers] = useState(0)
    const [style , setStyle] = useState({})
   // let followers
    
    //const profile = props.profile.find(item => item.username.stringValue === props.username)

    useEffect(() => {
        if(props.followers.arrayValue.values){
            setFollowers(props.followers.arrayValue.values.length)
            const status = props.followers.arrayValue.values.some(item => item.stringValue === props.userData.username)
            
            if(status) {
                setFollowStatus(true)
                setStyle({
                    color:"gray"
                })
            }
            
    
    
        }
    },[props.followers , props.userData])


    return (
        <div className="MiniProfile">
            <img src={props.ppic} alt="mini profile icon" className="miniprofile-icon"/>
            <div className="miniprofile-main">
                <Link to={`/profile/${props.username}`}>
                    <div className="miniprofile-main-username">{props.username}</div>
                </Link>                
                <div className="miniprofile-main-followers">{followers} Followers</div>
            </div>
            <div className="miniprofile-follow" style = {style} onClick={() => props.follow(props.username)}>
                {followStatus ? "Following" : "Follow"}
            </div>
        </div>
    )
}