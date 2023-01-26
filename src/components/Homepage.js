import "../styles/Homepage.css";
import Story from "./Story";
import Post from "./Home-Post";
import MiniProfile from "./MiniProfile";
import uniqid from "uniqid";
import { ReactComponent as LogoSvg } from "../images/icons/Logo.svg";
import { Link } from "react-router-dom";

export default function Homepage(props) {
  const profileFinder = (username) => {
    const profile = props.profiles.filter((item) => {
      return item.username.stringValue === username;
    });
    return profile[0].profilePicture.stringValue;
  };

  const posts = [...props.posts];
  posts.sort(
    (b, a) =>
      new Date(a.timestamp.timestampValue).getTime() -
      new Date(b.timestamp.timestampValue).getTime()
  );

  return (
    <div className="Homepage">
      <div className="homepage-left-section">
        <div className="homepage-left-section-header">
          <h1 className="homepage-header-cont"><LogoSvg /></h1>
        </div>
        <div className="homepage-stories-section">
          {props.profiles
            .slice(Math.max(props.profiles.length - 7, 0))
            .map((item) => {
              if (
                item.username.stringValue.toString() ===
                props.userData.username.toString()
              ) {
                return null;
              } else {
                return (
                  <Story
                    key={uniqid()}
                    username={item.username.stringValue}
                    ppic={item.profilePicture.stringValue}
                  />
                );
              }
            })}
        </div>
        <div className="homepage-posts-section">
          {posts.map((item) => {
            // the active user's profile isn't included
            if (
              item.username.stringValue.toString() ===
              props.userData.username.toString()
            ) {
              return null;
            } else {
              return (
                <Post
                  key={item.id.stringValue}
                  username={item.username.stringValue}
                  caption={item.caption.stringValue}
                  url={item.url.stringValue}
                  ppic={profileFinder(item.username.stringValue)}
                  comment={props.comment}
                  handleCommentChange={props.handleCommentChange}
                  id={item.id.stringValue}
                  createComment={props.createComment}
                  likePost={props.likePost}
                  userData={props.userData}
                  likes={item.likes}
                  profiles={props.profiles}
                  timestamp={item.timestamp.timestampValue}
                  displayPost={props.displayPost}
                />
              );
            }
          })}
        </div>
      </div>
      <aside>
        <div className="homepage-aside-header">
          <img
            src={props.userData.profilePicture}
            alt="homepage aside header"
            className="homepage-aside-img"
          />
          <div className="homepage-aside-header-main">
            <Link to="/profile/user">
              <div className="homepage-aside-header-username">
                {props.userData.username}
              </div>
            </Link>
            <div className="homepage-aside-header-name">
              {props.userData.name}
            </div>
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
          {/*Only the bottom five profiles are to be displayed on the aside */}
          {props.profiles
            .slice(Math.max(props.profiles.length - 6, 0))
            .map((item) => {
              // the active user's profile isn't included
              if (
                item.username.stringValue.toString() ===
                props.userData.username.toString()
              ) {
                return null;
              } else {
                return (
                  <MiniProfile
                    key={uniqid()}
                    username={item.username.stringValue}
                    ppic={item.profilePicture.stringValue}
                    followers={item.followers}
                    userData={props.userData}
                    follow={props.follow}
                  />
                );
              }
            })}
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
            &copy; 2023 INSTAGRAM FROM META
          </div>
        </div>
      </aside>
    </div>
  );
}
