import { useState , useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login"
import { getFirestore , collection, addDoc, getDocs } from "firebase/firestore"
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { app } from "./firebase-config"
import { HashRouter , Routes , Route } from "react-router-dom";
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
  const [loggedIn , setLoggedIn] = useState(false)
  const [authData , setAuthData] = useState("")
  const [userData , setUserData] = useState({
    username: "" , ppic: "" , name: ""
  })

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

  async function signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    const provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
    setAuthData(getAuth())
  }

  function signOutUser() {
    // Sign out of Firebase.
    signOut(getAuth());
    setLoggedIn(false)
  }

  async function googleLogin(event){
    await signIn()
    const data = await getAuth()
    const names = data.currentUser.displayName.split(" ")
    const username = names[0][0].toLowerCase() + names[1].toLowerCase()

    setUserData(
      {
        name:  data.currentUser.displayName,
        username: username,
        ppic: `${addSizeToGoogleProfilePic(data.currentUser.photoURL).toString()}` || `${addSizeToGoogleProfilePic('/images/profile_placeholder.png').toString()}`
      })
    console.log(data)
    setLoggedIn(true)

  }

  console.log(userData.ppic)
 
    // Returns the signed-in user's profile Pic URL.
  function getProfilePicUrl() {
    return getAuth().currentUser.photoURL || '/images/profile_placeholder.png';
  }


  // Returns the signed-in user's display name.
  function getUserName() {
    return getAuth().currentUser.displayName;
  }

  function addSizeToGoogleProfilePic(url) {
    if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
      return url + '?sz=150';
    }
    return url;
  }
  

  console.log(profiles)


  return (
    <div className="App">
      <HashRouter>
        {loggedIn ? <Navbar /> : ""}
        <Routes>
          <Route 
            path="/" 
            element = {        
              <Homepage posts = {posts} profiles= {profiles} userData = {userData} signOut ={signOutUser} /> } 
          />
          <Route 
            path = "/profile/:username"
            element = {
              <Profile
                profiles = {profiles}
                userData = {userData}
              />
            }
          /> 
        </Routes>
        
      </HashRouter>
      
      

    </div>
  );
}

export default App;
