import "../Homepage.css"
import Story from "./Story"
import Post from "./Home-Post"
import MiniProfile from "./MiniProfile"
import Waldo from "../images/icons/waldo.png"

export default function Homepage() {
    return (
        <div className="Homepage">
            <div className="homepage-left-section">
                <div className="homepage-stories-section">
                    <Story />
                    <Story />
                    <Story />
                    <Story />
                    <Story />
                </div>
                <div className="homepage-posts-section">
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>
            </div>
            <aside>
                <div className="homepage-aside-header">
                    <img src={Waldo} alt="homepage aside header" className="homepage-aside-img"/>
                    <div className="homepage-aside-header-main">
                        <div className="homepage-aside-header-username">username</div>
                        <div className="homepage-aside-header-name">Firstname Lastname</div>
                    </div>
                    <div className="homepage-aside-header-switch">
                        Switch
                    </div>
                </div>
                <div className="homepage-aside-mid">
                    <div className="homepage-aside-suggestions">Suggestions For You</div>
                    <div className="homepage-aside-seeall">See All</div>
                </div>
                <div>
                    <MiniProfile />
                    <MiniProfile />
                    <MiniProfile />
                    <MiniProfile />
                    <MiniProfile />
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