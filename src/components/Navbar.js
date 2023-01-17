import { ReactComponent as HomeSvg } from "../images/icons/Home.svg"
import { ReactComponent as SearchSvg } from "../images/icons/Search.svg"
import { ReactComponent as ExploreSvg } from "../images/icons/Explore.svg"
import { ReactComponent as ReelsSvg } from "../images/icons/Reels.svg"
import { ReactComponent as MessagesSvg } from "../images/icons/Messages.svg"
import { ReactComponent as NotificationsSvg } from "../images/icons/Notifications.svg"
import { ReactComponent as CreateSvg } from "../images/icons/Create.svg"
import { ReactComponent as MoreSvg } from "../images/icons/More.svg"
import { ReactComponent as LogoSvg } from "../images/icons/Logo.svg"
import Profile from "../images/icons/favicon.ico"
import { Link } from "react-router-dom"

export default function Navbar(props){
    return (
        <nav>
            <div className="navbar-heading">
                <div className="navbar-item">
                    <LogoSvg />
                </div>
                
            </div>
            
            <div className="navbar-mid">
                <div className="navbar-item">
                    <HomeSvg />
                    <Link to = "/" >
                        <div className="nav-title">Home</div>
                    </Link>                    
                    
                </div>
                <div className="navbar-item">
                    <SearchSvg />
                    <div className="nav-title">Search</div>
                </div>
                <div className="navbar-item">
                    
                    <ExploreSvg />
                    <Link to = "/explore">
                        <div className="nav-title">Explore</div>
                    </Link>
                    
                </div>
                <div className="navbar-item">
                    <ReelsSvg />
                    <div className="nav-title">Reels</div>
                </div>
                <div className="navbar-item">
                    <MessagesSvg />
                    <div className="nav-title">Messages</div>
                </div>
                <div className="navbar-item">
                    <NotificationsSvg />
                    <div className="nav-title">Notifications</div>
                </div>
                <div className="navbar-item" onClick={props.toggleDialog}>                    
                    <CreateSvg />
                    <div className="nav-title">Create</div>
                </div>
                <div className="navbar-item">
                    <img src={props.userData.profilePicture} alt="" height="24" width = "24" className="navbar-item-profile-img"/>
                    <Link to ="/profile/user">
                        <div className="nav-title">Profile</div>
                    </Link>                     
                </div>               
                
            </div>
            
            <div className="navbar-bottom">
                <div className="navbar-item">
                    <MoreSvg />
                    <div className="nav-title">More</div>
                </div>
            </div>
        </nav>
    )
}

