import "../Homepage.css"
import Story from "./Story"
import Post from "./Home-Post"

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

            </aside>
        </div>
    )
}