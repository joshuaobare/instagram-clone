import Waldo from "../images/icons/waldo.png"
import "../Story.css"
import { Link } from "react-router-dom"

export default function Story(props) {
   return (
    <div className="Story">
        <img src={props.ppic} alt="" className="story-main-img"/>
        <Link to={`/profile/${props.username}`}>
            <div className="story-username">{props.username}</div>
        </Link>        
    </div>
   ) 
}