import "../styles/Explore.css";

export default function Explore(props) {
  return (
    <div className="Explore">
      {props.posts.map((item) => (
        <div className="explore-img-cont">
          <img
            src={item.url.stringValue}
            alt="explore pics"
            key={item.id.stringValue}
            onClick={() => props.displayPost(item.id.stringValue)}
            className="explore-img"
          />
        </div>
      ))}
    </div>
  );
}
