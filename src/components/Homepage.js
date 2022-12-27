import "../Homepage.css"
import Story from "./Story"
import Post from "./Home-Post"
import MiniProfile from "./MiniProfile"
import Waldo from "../images/icons/waldo.png"
import uniqid from 'uniqid';


export default function Homepage(props) {

    const profileFinder = (username) => {
        const profile = props.profiles.filter(item => {
                return item.username.stringValue === username
                })      
        return profile[0].profilePicture.stringValue
    }



    return (
        <div className="Homepage">
            <div className="homepage-left-section">
                <div className="homepage-stories-section">
                    {props.profiles.map(item => {
                        return (
                            <Story 
                                username ={item.username.stringValue}
                                ppic = {item.profilePicture.stringValue}
                            />
                        )
                    })}
                </div>
                <div className="homepage-posts-section">
                    {
                        props.posts.map(item => {
                            return (
                            <Post 
                                key = {uniqid()}
                                username = {item.username.stringValue}
                                caption = {item.caption.stringValue}
                                url = {item.url.stringValue}
                                ppic = {profileFinder(item.username.stringValue)}
                            />)
                        })
                    }
                </div>
            </div>
            <aside>
                <div className="homepage-aside-header">
                    <img src={props.userData.ppic} alt="homepage aside header" className="homepage-aside-img"/>
                    <div className="homepage-aside-header-main">
                        <div className="homepage-aside-header-username">username</div>
                        <div className="homepage-aside-header-name">{props.userData.username}</div>
                    </div>
                    <div className="homepage-aside-header-switch" onClick={props.signOut}>
                        Sign Out
                    </div>
                </div>
                <div className="homepage-aside-mid">
                    <div className="homepage-aside-suggestions">Suggestions For You</div>
                    <div className="homepage-aside-seeall">See All</div>
                </div>
                <div>
                    {
                        props.profiles.map(item => {
                            return (
                                <MiniProfile 
                                    username = {item.username.stringValue}
                                    ppic = {item.profilePicture.stringValue}
                                />
                            )
                        })
                    
                    }
                </div>
                <div className="homepage-aside-footer">
                    <div className="homepage-aside-footer-top">
                        <div>About</div>
                        <div>Help</div>
                        <div>Press</div>
                        <div>API</div>
                        <div>Jobs</div>
                        <div>Privacy</div>
                        <div>Terms</div>
                        <div>Locations</div>
                        <div>Language</div>
                    </div>
                    <div className="homepage-aside-footer-bottom">
                        &copy; 2022 INSTAGRAM FROM META
                    </div>
                </div>
            </aside>
        </div>
    )
}