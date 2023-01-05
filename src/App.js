import { useState , useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login"
import { getFirestore , collection, addDoc, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

import { getDownloadURL, getStorage, ref , uploadBytesResumable } from "firebase/storage"
import { app } from "./firebase-config"
import { HashRouter , Routes , Route } from "react-router-dom";
import Post from "./components/Home-Post";
import Profile from "./components/Profile";
import Story from "./components/Story";
import FullPost from "./components/FullPost";
import Homepage from "./components/Homepage";
import MiniProfile from "./components/MiniProfile";
import Create from "./components/Create";
import uniqid from "uniqid"



function App() {

  const [data, setData] = useState([])
  const [posts , setPosts] = useState([])
  const [profiles , setProfiles] = useState([])
  const [loggedIn , setLoggedIn] = useState(false)
  const [authData , setAuthData] = useState("")
  const [userData , setUserData] = useState({
    username: "" , profilePicture: "" , name: "" , description: "" , posts: []
  })
  const [dialogOpen , setDialogOpen] = useState(false)
  const [pictureData , setPictureData] = useState({
    pictureFile: "",
    caption: ""
  })
  
  const [comment , setComment] = useState({})

  async function fetcher(){

    setData([])
    setPosts([])
    setProfiles([])
    const ref = await getDocs(collection(getFirestore(app), "profiles"))
    ref.forEach((doc) => {
      //console.log(doc._document.data.value.mapValue.fields.data.arrayValue)
      const { values } = doc._document.data.value.mapValue.fields.data.arrayValue        
      //console.log(values)
      setData(prevState => [...prevState, values])

      values.forEach(item => {

        const {values} = item.mapValue.fields.posts.arrayValue

        setProfiles(prevState => [...prevState , item.mapValue.fields])

        try {
          if (values.length > 1) {
            values.forEach(item => setPosts(prevState => [...prevState , item.mapValue.fields]))
          } else {
            setPosts(prevState => [...prevState , values[0].mapValue.fields])
          }
        } catch {
          console.log("Profile has no posts")
        }
        
      })
    })
  }  
  
  useEffect(() => {    
  
    fetcher()
    
  } , [])

  

  async function signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    const provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
    setAuthData(getAuth())
  }

  async function signOutUser() {
    // Sign out of Firebase.
    await signOut(getAuth()).then(() => {
      console.log("Sign Out successful")
    }).catch((error) => {
      console.error("Unsuccessful Sign Out")
    })
    setLoggedIn(false)
  }
  console.log(profiles)

  async function createProfile(username , ppic , name) {

    const profileData = doc(getFirestore(app), "profiles" , "Profile")
    //console.log(profileData)

    await updateDoc(profileData , {

      data: arrayUnion({
        description: "",
        name: name,
        posts: [],
        profilePicture: ppic,
        username: username
      })
                
    })
  }

  async function googleLogin(event){
    await signIn()
    const data = await getAuth()
    const names = data.currentUser.displayName.split(" ")
    const username = names[0][0].toLowerCase() + names[1].toLowerCase()
    const checker = profiles.find(item => item.username.stringValue.toString() === username.toString())
    const ppic = `${addSizeToGoogleProfilePic(data.currentUser.photoURL).toString()}` || `${addSizeToGoogleProfilePic('/images/profile_placeholder.png').toString()}`
    const name = data.currentUser.displayName
    //console.log(checker)
    
    if (checker) {
      setUserData(
        {
                description: checker.description.stringValue,
                name: checker.name.stringValue,
                posts: checker.posts.arrayValue.values ? checker.posts.arrayValue.values : [],
                profilePicture: checker.profilePicture.stringValue,
                username: checker.username.stringValue
        }
      )
    } else {
        createProfile(username, ppic , name)
        setUserData(
          {
            name:  data.currentUser.displayName,
            username: username,
            profilePicture: `${addSizeToGoogleProfilePic(data.currentUser.photoURL).toString()}` || `${addSizeToGoogleProfilePic('/images/profile_placeholder.png').toString()}`,
            description: "",
            posts: []
          })
    }

    //createProfile() 
   // console.log(data)
    setLoggedIn(true)

  }

  //console.log(userData)
 
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

  function toggleDialog(event) {
    event.preventDefault()
    setDialogOpen(prevState => !prevState)
    
  }

  async function createPost(event) { 
      event.preventDefault()     
      const storageRef = ref(getStorage(app) , `${pictureData.pictureFile.name}`)
      
      await uploadBytesResumable(storageRef , pictureData.pictureFile).then((snapshot) => {
        console.log("Uploaded a file")
      })

      const fileUrl = await getDownloadURL(storageRef)

      alterProfile(pictureData.caption , fileUrl)
      
  }

  function handlePictureChange(event){
    //setPictureFile(event.target.files[0])

    const {name , type , value , files} = event.target


    setPictureData(prevState => {
      return {...prevState, [name] : type === "file" ? files[0] : value}
    })
  }
  

  function handleCommentChange(event , id) {

    setComment(prevState => {
      return {...prevState , [id]: event.target.value}
    })

    
  }

  
  

  async function createComment(event , id, username){
    event.preventDefault()

    // createComment retrieves the profile with a post whose id matches the id of the post commented on. 

    const profile = profiles.find(items => {

      if(items.posts.arrayValue.values) {
        console.log(items.posts)
        return items.posts.arrayValue.values.find(item => item.mapValue.fields.id.stringValue === id)
      } else {
        return null
      }
      
    })

    // The post commented on is also retrieved 

    const post = profile.posts.arrayValue.values.find(item => item.mapValue.fields.id.stringValue === id)

    /* The posts in the retrieved profile are looped through, so the format can be matched to the data on the database, 
     for each, we also loop the comments array and append it to the postsBefore array */


    const postsBefore = []
    profile.posts.arrayValue.values.forEach(item => {

      const comments = []
      let data
      if (item.mapValue.fields.comments.arrayValue.values) {
        item.mapValue.fields.comments.arrayValue.values.forEach(item => {
          comments.push(
            {
              comment: item.mapValue.fields.comment.stringValue , 
              username:item.mapValue.fields.username.stringValue})
        })
        data = comments
      } else {
        data = []
      }
      postsBefore.push({
        caption:item.mapValue.fields.caption.stringValue ,
        id:item.mapValue.fields.id.stringValue, 
        url:item.mapValue.fields.url.stringValue, 
        username:item.mapValue.fields.username.stringValue,
        comments:data
      
      })
    })

    /* postsBefore is used to remove the profile from the array on the DB, so it's exclusive of the changes made to the data by the function.
     postsAfter separates the retrieved post from postsBefore, so that we can alter the post by adding comments , then merge postsAfter 
     and the post before adding it to the DB */

    const postsAfter = []
    profile.posts.arrayValue.values.forEach(item => {
      

      if(item.mapValue.fields.id.stringValue !== id){
        const comments = []
        let data
        if (item.mapValue.fields.comments.arrayValue.values) {
          item.mapValue.fields.comments.arrayValue.values.forEach(item => {
            comments.push(
              {
                comment: item.mapValue.fields.comment.stringValue , 
                username:item.mapValue.fields.username.stringValue})
          })
          data = comments
        } else {
          data = []
        }

        postsAfter.push({
          caption:item.mapValue.fields.caption.stringValue ,
          id:item.mapValue.fields.id.stringValue, 
          url:item.mapValue.fields.url.stringValue, 
          username:item.mapValue.fields.username.stringValue,
          comments : data
        })
      }
      
    })   
   
    
    const profileData = doc(getFirestore(app), "profiles" , "Profile")

    await updateDoc(profileData , {

      data: arrayRemove({
                description: profile.description.stringValue,
                name: profile.name.stringValue,
                posts: postsBefore,
                profilePicture: profile.profilePicture.stringValue,
                username: profile.username.stringValue
      })
                
    })

    // a check for whether there was any comments in the retrieved post

    let postComments = []
    let commentData
    if (post.mapValue.fields.comments.arrayValue.values) {
      post.mapValue.fields.comments.arrayValue.values.forEach(item => {
        postComments.push(
          {
            comment: item.mapValue.fields.comment.stringValue , 
            username:item.mapValue.fields.username.stringValue})
      })
      commentData = postComments
    } else {
      commentData = []
    }

    await updateDoc(profileData , {

      data: arrayUnion({
                description: profile.description.stringValue,
                name: profile.name.stringValue,
                posts: [...postsAfter , {
                  caption:post.mapValue.fields.caption.stringValue,
                  url:post.mapValue.fields.url.stringValue,
                  username:username,
                  id:uniqid(),
                  comments: [...commentData, {username: userData.username , comment: comment[id]}]
                }] ,
                profilePicture: profile.profilePicture.stringValue,
                username: profile.username.stringValue
      })
                
    })
    setComment({})
    fetcher()

  }

  async function alterProfile(caption,url) {

    const profileData = doc(getFirestore(app), "profiles" , "Profile")

    const userPosts = []
    
    userData.posts.forEach(item => {

      const comments = []
      let data
      if (item.mapValue.fields.comments.arrayValue.values) {
        item.mapValue.fields.comments.arrayValue.values.forEach(item => {
          comments.push(
            {
              comment: item.mapValue.fields.comment.stringValue , 
              username:item.mapValue.fields.username.stringValue})
        })
        data = comments
      } else {
        data = []
      }
      

      userPosts.push({
        caption:item.mapValue.fields.caption.stringValue ,
        id:item.mapValue.fields.id.stringValue, 
        url:item.mapValue.fields.url.stringValue, 
        username:item.mapValue.fields.username.stringValue,
        comments: data
      })
    })
    
    await updateDoc(profileData , {

      data: arrayRemove({
                description: userData.description,
                name: userData.name,
                posts: userPosts,
                profilePicture: userData.profilePicture,
                username: userData.username
      })
                
    })     

    await updateDoc(profileData , {

      data: arrayUnion({
        description: userData.description,
        name: userData.name,
        profilePicture: userData.profilePicture,
        username: userData.username , 
        posts: [...userPosts , {caption:caption,comments: [], url:url,username:userData.username,id:uniqid()}] 
      })
                
    })

    await fetcher()
    

  }


  useEffect(() => {

    async function rerender(){
      const checker = await profiles.find(item => item.username.stringValue.toString() === userData.username.toString())
      setUserData(
        {
                description: checker.description.stringValue,
                name: checker.name.stringValue,
                posts: checker.posts.arrayValue.values ? checker.posts.arrayValue.values : [],
                profilePicture: checker.profilePicture.stringValue,
                username: checker.username.stringValue
        }
      )
    }
    rerender()


  } , [profiles])


  return (
    <div className="App">
      <HashRouter>
        {loggedIn ? <Navbar dialogOpen = {dialogOpen} userData={userData} toggleDialog={toggleDialog} /> : ""}
        <Routes>
          <Route 
            path="/" 
            element = {!loggedIn ? 
              <Login googleLogin = {googleLogin}  /> :      
              <Homepage 
                posts = {posts} 
                profiles= {profiles} 
                userData = {userData} 
                signOut ={signOutUser}
                comment = {comment}
                handleCommentChange = {handleCommentChange}
                createComment = {createComment} 
              /> } 
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
        <Create dialogOpen = {dialogOpen} toggleDialog={toggleDialog} createPost = {createPost} handleChange = {handlePictureChange} pictureData={pictureData}/>
      </HashRouter>

           

    </div>
  );
}

export default App;
