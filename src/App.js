import { useState , useEffect } from "react";
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

  const [data, setData] = useState([])
  const [posts , setPosts] = useState([])

  useEffect(() => {
    async function fetcher(){
      const ref = await getDocs(collection(getFirestore(app), "profiles"))
      ref.forEach((doc) => {
        const { fields } = doc._document.data.value.mapValue        
        setData(prevState => [...prevState, fields])
        const fielddata = Object.values(fields)
        //data2.push(fields)
        fielddata.forEach(item => {
          //console.log(item.mapValue.fields.posts.mapValue.fields)
          setPosts(prevState => [...prevState , item.mapValue.fields.posts.mapValue.fields])
        })
      })
    }
  
    fetcher()
  } , [])

  //console.log(data)
  console.log(posts)




  return (
    <div className="App">
      <Navbar />
      <Homepage />

    </div>
  );
}

export default App;
