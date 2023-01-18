import { ReactComponent as SmallLikeIconSvg } from "../images/icons/SmallLikeIcon.svg";
import "../styles/Comment.css";

export default function Comment(props) {
  return (
    <div className="Comment">
      <img
        src={props.profilePicture}
        alt="commenter icon"
        className="full-post-profile-icon"
      />
      <div className="comment-main">
        <div className="comment-main-username">{props.username}</div>
        <div>{props.comment}</div>
      </div>

      <SmallLikeIconSvg />
    </div>
  );
}
