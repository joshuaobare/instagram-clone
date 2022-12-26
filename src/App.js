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
  const [profiles , setProfiles] = useState([])

  useEffect(() => {
    async function fetcher(){
      const ref = await getDocs(collection(getFirestore(app), "profiles"))
      ref.forEach((doc) => {
        //console.log(doc._document.data.value.mapValue.fields.data.arrayValue)
        const { values } = doc._document.data.value.mapValue.fields.data.arrayValue        
        //console.log(values)
        setData(prevState => [...prevState, values])

        values.forEach(item => {

          const {values} = item.mapValue.fields.posts.arrayValue

          setProfiles(prevState => [...prevState , item.mapValue.fields])
          if (values.length > 1) {
            values.forEach(item => setPosts(prevState => [...prevState , item.mapValue.fields]))
          } else {
            setPosts(prevState => [...prevState , values[0].mapValue.fields])

          }
        })



      })
    }
  
    fetcher()
  } , [])

  //console.log(data)
  console.log(profiles)
  console.log(posts)




  return (
    <div className="App">
      <Navbar />
      <Homepage posts = {posts} profiles= {profiles}/>

    </div>
  );
}

export default App;
