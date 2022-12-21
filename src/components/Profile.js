import Footer from "./Footer"
import {ReactComponent as PostIconSvg} from "../images/icons/PostIcon.svg"
import {ReactComponent as SaveIconSvg} from "../images/icons/SaveIcon2.svg"
import {ReactComponent as TaggedIconSvg} from "../images/icons/TaggedIcon.svg"
import {ReactComponent as ProfileMenuSvg} from "../images/icons/ProfileMenu.svg"
import {ReactComponent as OptionsSvg } from "../images/icons/Options.svg"
import Waldo from "../images/icons/waldo.png"
import "../Profile.css"

export default function Profile() {
    return (
        <div className="Profile">
            <div className="profile-main">
                <img src={Waldo} alt="main profile pic" className="profile-main-img" />
                <div className="profile-details">
                    <div className="profile-details-header">
                        <div className="profile-details-username">username</div>
                        <button className="profile-details-follow">Follow</button>
                        <OptionsSvg />
                    </div>
                    <div className="profile-details-mid">
                        <div><b>1</b> post</div>
                        <div><b>216</b> followers</div>
                        <div><b>154</b> following</div>
                    </div>
                    <div className="profile-details-bottom">
                        <div>Firstname Lastname</div>
                        <div>Description</div>
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
            <div className="profile-posts-grid"></div>
            <Footer />
        </div>
    )
}