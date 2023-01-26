import "../styles/Explore.css";

export default function Explore(props) {
  return (
    <div className="Explore">
      {props.posts.map((item) => (
        <div className="explore-img-cont" key={item.id.stringValue}>
          <img
            src={item.url.stringValue}
            alt="explore pics"
            
            onClick={() => props.displayPost(item.id.stringValue)}
            className="explore-img"
          />
        </div>
      ))}
    </div>
  );
}
