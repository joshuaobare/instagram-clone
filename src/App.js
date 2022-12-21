import Navbar from "./components/Navbar";
import Login from "./components/Login"
import { getFirestore , collection, addDoc, getDocs } from "firebase/firestore"
import { app } from "./firebase-config"



function App() {

  async function fetcher(){
    const ref = await getDocs(collection(getFirestore(app), "profiles"))
    ref.forEach((doc) => console.log(doc))
  }

  fetcher()




  return (
    <div className="App">
      <Login />

    </div>
  );
}

export default App;
