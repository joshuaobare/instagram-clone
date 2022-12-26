import Waldo from "../images/icons/waldo.png"
import "../Story.css"

export default function Story(props) {
   return (
    <div className="Story">
        <img src={props.ppic} alt="" className="story-main-img"/>
        <div className="story-username">{props.username}</div>
    </div>
   ) 
}