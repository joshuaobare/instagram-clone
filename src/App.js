import Navbar from "./components/Navbar";
import Login from "./components/Login"
import { getFirestore , collection, addDoc, getDocs } from "firebase/firestore"
import { app } from "./firebase-config"
import Post from "./components/Home-Post";
import Profile from "./components/Profile";
import Story from "./components/Story";
import FullPost from "./components/FullPost";
import Homepage from "./components/Homepage";
import MiniProfile from "./components/MiniProfile";



function App() {

  async function fetcher(){
    const ref = await getDocs(collection(getFirestore(app), "profiles"))
    ref.forEach((doc) => console.log(doc))
  }

  fetcher()




  return (
    <div className="App">
      <Navbar />
      <Homepage />

    </div>
  );
}

export default App;
