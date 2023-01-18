import "../styles/Story.css";
import { Link } from "react-router-dom";

export default function Story(props) {
  return (
    <div className="Story">
      <div className="story-main-img-cont">
        <img src={props.ppic} alt="" className="story-main-img" />
      </div>

      <Link to={`/profile/${props.username}`}>
        <div className="story-username">{props.username}</div>
      </Link>
    </div>
  );
}
