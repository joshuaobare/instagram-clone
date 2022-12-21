import Navbar from "./components/Navbar";
import Login from "./components/Login"
import { getFirestore , collection, addDoc, getDocs } from "firebase/firestore"
import { app } from "./firebase-config"
import Post from "./components/Home-Post";
import Profile from "./components/Profile";
import FullPost from "./components/FullPost";



function App() {

  async function fetcher(){
    const ref = await getDocs(collection(getFirestore(app), "profiles"))
    ref.forEach((doc) => console.log(doc))
  }

  fetcher()




  return (
    <div className="App">
      
      <FullPost />

    </div>
  );
}

export default App;
