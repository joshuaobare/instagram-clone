import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "./firebase-config";
import { HashRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import FullPost from "./components/FullPost";
import Homepage from "./components/Homepage";
import Create from "./components/Create";
import uniqid from "uniqid";
import EditProfile from "./components/EditProfile";
import Explore from "./components/Explore";

function App() {
  const [data, setData] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [posts, setPosts] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [comment, setComment] = useState({});
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    profilePicture: "",
    name: "",
    description: "",
    posts: [],
    followers: [],
    following: [],
  });
  const [pictureData, setPictureData] = useState({
    pictureFile: "",
    caption: "",
  });
  const [profileEdits, setProfileEdits] = useState({
    name: "",
    description: "",
  });

  async function fetcher() {
    const ref = await getDocs(collection(getFirestore(app), "profiles"));
    ref.forEach((doc) => {
      const { values } =
        doc._document.data.value.mapValue.fields.data.arrayValue;
      setData(values);
      const profs = [];
      const fullposts = [];
      values.forEach((item) => {
        const { values } = item.mapValue.fields.posts.arrayValue;
        profs.push(item.mapValue.fields);

        try {
          if (values.length > 1) {
            values.forEach((item) => fullposts.push(item.mapValue.fields));
          } else {
            fullposts.push(values[0].mapValue.fields);
          }
        } catch {
          console.log("Profile has no posts");
        }
      });

      setProfiles(profs);
      setPosts(fullposts);
    });
  }

  useEffect(() => {
    fetcher();
  }, []);

  useEffect(() => {
    setProfileEdits({
      name: userData.name,
      description: userData.description,
      username: userData.username,
      profilePicture: userData.profilePicture,
    });
  }, [userData]);

  useEffect(() => {
    // rerender will run any time fetcher is ran, thus updating the UI
    async function rerender() {
      const profileData = await profiles;
      const checker = await profileData.find(
        (item) =>
          item.username.stringValue.toString() === userData.username.toString()
      );
      setUserData({
        description: checker.description.stringValue,
        name: checker.name.stringValue,
        posts: checker.posts.arrayValue.values
          ? checker.posts.arrayValue.values
          : [],
        profilePicture: checker.profilePicture.stringValue,
        username: checker.username.stringValue,
        following: checker.following.arrayValue.values
          ? checker.following.arrayValue.values
          : [],
        followers: checker.followers.arrayValue.values
          ? checker.followers.arrayValue.values
          : [],
      });
    }
    rerender();

    if (postDialogOpen) {
      refreshCurrentPost(currentPost.id.stringValue);
    }
  }, [profiles, data]);

  async function signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    const provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
  }

  async function signOutUser() {
    // Sign out of Firebase.
    await signOut(getAuth())
      .then(() => {
        console.log("Sign Out successful");
      })
      .catch((error) => {
        console.error("Unsuccessful Sign Out");
      });
    setLoggedIn(false);
  }

  // googleLogin is the only way new Profiles can be created
  async function createProfile(username, ppic, name) {
    const profileData = doc(getFirestore(app), "profiles", "Profile");

    await updateDoc(profileData, {
      data: arrayUnion({
        description: "",
        name: name,
        posts: [],
        profilePicture: ppic,
        username: username,
        followers: [],
        following: [],
      }),
    });
  }

  async function googleLogin(event) {
    await signIn();
    const data = await getAuth();
    const names = data.currentUser.displayName.split(" ");
    const username = names[0][0].toLowerCase() + names[1].toLowerCase();
    const checker = profiles.find(
      (item) => item.username.stringValue.toString() === username.toString()
    );
    const ppic =
      `${addSizeToGoogleProfilePic(data.currentUser.photoURL).toString()}` ||
      `${addSizeToGoogleProfilePic(
        "/images/profile_placeholder.png"
      ).toString()}`;
    const name = data.currentUser.displayName;

    if (checker) {
      setUserData({
        description: checker.description.stringValue,
        name: checker.name.stringValue,
        posts: checker.posts.arrayValue.values
          ? checker.posts.arrayValue.values
          : [],
        profilePicture: checker.profilePicture.stringValue,
        username: checker.username.stringValue,
        followers: checker.followers.arrayValue.values
          ? checker.followers.arrayValue.values
          : [],
        following: checker.following.arrayValue.values
          ? checker.following.arrayValue.values
          : [],
      });
    } else {
      createProfile(username, ppic, name);
      setUserData({
        name: data.currentUser.displayName,
        username: username,
        profilePicture:
          `${addSizeToGoogleProfilePic(
            data.currentUser.photoURL
          ).toString()}` ||
          `${addSizeToGoogleProfilePic(
            "/images/profile_placeholder.png"
          ).toString()}`,
        description: "",
        posts: [],
        followers: [],
        following: [],
      });
    }

    setLoggedIn(true);
  }

  async function guestLogin() {
    const data = await profiles;
    const profile = data.find((item) => item.username.stringValue === "guest");
    setUserData({
      description: profile.description.stringValue,
      name: profile.name.stringValue,
      posts: profile.posts.arrayValue.values
        ? profile.posts.arrayValue.values
        : [],
      profilePicture: profile.profilePicture.stringValue,
      username: profile.username.stringValue,
      followers: profile.followers.arrayValue.values
        ? profile.followers.arrayValue.values
        : [],
      following: profile.following.arrayValue.values
        ? profile.following.arrayValue.values
        : [],
    });

    setLoggedIn(true);
  }

  function addSizeToGoogleProfilePic(url) {
    if (
      url.indexOf("googleusercontent.com") !== -1 &&
      url.indexOf("?") === -1
    ) {
      return url + "?sz=150";
    }
    return url;
  }

  // toggleDialog toggles the Create component
  function toggleDialog(event) {
    event.preventDefault();
    setDialogOpen((prevState) => !prevState);
  }

  async function likePost(event, id, username) {
    // The profile that owns the liked post is retrieved
    const profile = profiles.find((items) => {
      if (items.posts.arrayValue.values) {
        return items.posts.arrayValue.values.find(
          (item) => item.mapValue.fields.id.stringValue === id
        );
      } else {
        return null;
      }
    });
    // The liked post is also retrieved
    const post = profile.posts.arrayValue.values.find(
      (item) => item.mapValue.fields.id.stringValue === id
    );

    const postsBefore = [];
    profile.posts.arrayValue.values.forEach((item) => {
      const comments = [];
      const likes = [];
      let data;
      if (item.mapValue.fields.comments.arrayValue.values) {
        item.mapValue.fields.comments.arrayValue.values.forEach((item) => {
          comments.push({
            comment: item.mapValue.fields.comment.stringValue,
            username: item.mapValue.fields.username.stringValue,
          });
        });
        data = comments;
      } else {
        data = [];
      }

      if (item.mapValue.fields.likes.arrayValue.values) {
        item.mapValue.fields.likes.arrayValue.values.forEach((item) => {
          likes.push(item.stringValue);
        });
      }

      postsBefore.push({
        caption: item.mapValue.fields.caption.stringValue,
        id: item.mapValue.fields.id.stringValue,
        url: item.mapValue.fields.url.stringValue,
        username: item.mapValue.fields.username.stringValue,
        comments: data,
        likes: likes,
        timestamp: Timestamp.fromMillis(
          Date.parse(item.mapValue.fields.timestamp.timestampValue)
        ),
      });
    });

    const postsAfter = [];
    profile.posts.arrayValue.values.forEach((item) => {
      if (item.mapValue.fields.id.stringValue !== id) {
        const comments = [];
        const likes = [];
        let data;
        if (item.mapValue.fields.comments.arrayValue.values) {
          item.mapValue.fields.comments.arrayValue.values.forEach((item) => {
            comments.push({
              comment: item.mapValue.fields.comment.stringValue,
              username: item.mapValue.fields.username.stringValue,
            });
          });
          data = comments;
        } else {
          data = [];
        }

        if (item.mapValue.fields.likes.arrayValue.values) {
          item.mapValue.fields.likes.arrayValue.values.forEach((item) => {
            likes.push(item.stringValue);
          });
        }

        postsAfter.push({
          caption: item.mapValue.fields.caption.stringValue,
          id: item.mapValue.fields.id.stringValue,
          url: item.mapValue.fields.url.stringValue,
          username: item.mapValue.fields.username.stringValue,
          comments: data,
          likes: likes,
          timestamp: Timestamp.fromMillis(
            Date.parse(item.mapValue.fields.timestamp.timestampValue)
          ),
        });
      }
    });

    const profileData = doc(getFirestore(app), "profiles", "Profile");

    const followers = [];
    const following = [];

    /* if the following and follower arrays are empty, profile.followers.arrayValue.values will be null.
       this unpacking is necessary, otherwise the data won't match what's in Firebase  */

    if (profile.followers.arrayValue.values) {
      profile.followers.arrayValue.values.forEach((item) => {
        followers.push(item.stringValue);
      });
    }

    if (profile.following.arrayValue.values) {
      profile.following.arrayValue.values.forEach((item) => {
        following.push(item.stringValue);
      });
    }

    await updateDoc(profileData, {
      data: arrayRemove({
        description: profile.description.stringValue,
        name: profile.name.stringValue,
        posts: postsBefore,
        profilePicture: profile.profilePicture.stringValue,
        username: profile.username.stringValue,
        following: following,
        followers: followers,
      }),
    });

    const postComments = [];
    const postLikes = [];

    if (post.mapValue.fields.comments.arrayValue.values) {
      post.mapValue.fields.comments.arrayValue.values.forEach((item) => {
        postComments.push({
          comment: item.mapValue.fields.comment.stringValue,
          username: item.mapValue.fields.username.stringValue,
        });
      });
    }

    if (post.mapValue.fields.likes.arrayValue.values) {
      post.mapValue.fields.likes.arrayValue.values.forEach((item) => {
        postLikes.push(item.stringValue);
      });
      const checker = postLikes.some((item) => item === userData.username);
      if (checker) {
        const index = postLikes.indexOf(userData.username);
        postLikes.splice(index, 1);
      } else {
        postLikes.push(userData.username);
      }
    } else {
      postLikes.push(userData.username);
    }

    await updateDoc(profileData, {
      data: arrayUnion({
        description: profile.description.stringValue,
        name: profile.name.stringValue,
        posts: [
          ...postsAfter,
          {
            caption: post.mapValue.fields.caption.stringValue,
            url: post.mapValue.fields.url.stringValue,
            username: username,
            id: post.mapValue.fields.id.stringValue,
            timestamp: Timestamp.fromMillis(
              Date.parse(post.mapValue.fields.timestamp.timestampValue)
            ),
            likes: postLikes,
            comments: postComments,
          },
        ],
        profilePicture: profile.profilePicture.stringValue,
        username: profile.username.stringValue,
        following: following,
        followers: followers,
      }),
    });

    await fetcher();
  }

  async function createComment(event, id, username) {
    event.preventDefault();

    // createComment retrieves the profile with a post whose id matches the id of the post commented on.

    const profile = profiles.find((items) => {
      if (items.posts.arrayValue.values) {
        //console.log(items.posts)
        return items.posts.arrayValue.values.find(
          (item) => item.mapValue.fields.id.stringValue === id
        );
      } else {
        return null;
      }
    });

    // The post commented on is also retrieved

    const post = profile.posts.arrayValue.values.find(
      (item) => item.mapValue.fields.id.stringValue === id
    );

    /* The posts in the retrieved profile are looped through, so the format can be matched to the data on the database, 
     for each, we also loop the comments array and append it to the postsBefore array */

    const postsBefore = [];
    profile.posts.arrayValue.values.forEach((item) => {
      const comments = [];
      const likes = [];
      let data;
      if (item.mapValue.fields.comments.arrayValue.values) {
        item.mapValue.fields.comments.arrayValue.values.forEach((item) => {
          comments.push({
            comment: item.mapValue.fields.comment.stringValue,
            username: item.mapValue.fields.username.stringValue,
          });
        });
        data = comments;
      } else {
        data = [];
      }

      if (item.mapValue.fields.likes.arrayValue.values) {
        item.mapValue.fields.likes.arrayValue.values.forEach((item) => {
          likes.push(item.stringValue);
        });
      }

      postsBefore.push({
        caption: item.mapValue.fields.caption.stringValue,
        id: item.mapValue.fields.id.stringValue,
        url: item.mapValue.fields.url.stringValue,
        username: item.mapValue.fields.username.stringValue,
        comments: data,
        likes: likes,
        timestamp: Timestamp.fromMillis(
          Date.parse(item.mapValue.fields.timestamp.timestampValue)
        ),
      });
    });

    /*  postsBefore is used to remove the profile from the array on the DB, so it's exclusive of the changes made to the data by the function.
        postsAfter separates the retrieved post from postsBefore, so that the post can be altered by adding comments , then merged with postsAfter 
        before adding it to the DB                   */

    const postsAfter = [];
    profile.posts.arrayValue.values.forEach((item) => {
      if (item.mapValue.fields.id.stringValue !== id) {
        const comments = [];
        const likes = [];
        let data;
        if (item.mapValue.fields.comments.arrayValue.values) {
          item.mapValue.fields.comments.arrayValue.values.forEach((item) => {
            comments.push({
              comment: item.mapValue.fields.comment.stringValue,
              username: item.mapValue.fields.username.stringValue,
            });
          });
          data = comments;
        } else {
          data = [];
        }

        if (item.mapValue.fields.likes.arrayValue.values) {
          item.mapValue.fields.likes.arrayValue.values.forEach((item) => {
            likes.push(item.stringValue);
          });
        }

        postsAfter.push({
          caption: item.mapValue.fields.caption.stringValue,
          id: item.mapValue.fields.id.stringValue,
          url: item.mapValue.fields.url.stringValue,
          username: item.mapValue.fields.username.stringValue,
          comments: data,
          likes: likes,
          timestamp: Timestamp.fromMillis(
            Date.parse(item.mapValue.fields.timestamp.timestampValue)
          ),
        });
      }
    });

    const profileData = doc(getFirestore(app), "profiles", "Profile");

    // the followers and following arrays will need to be unpacked to match the data in Firebase

    const followers = [];
    const following = [];

    if (profile.followers.arrayValue.values) {
      profile.followers.arrayValue.values.forEach((item) => {
        followers.push(item.stringValue);
      });
    }

    if (profile.following.arrayValue.values) {
      profile.following.arrayValue.values.forEach((item) => {
        following.push(item.stringValue);
      });
    }

    await updateDoc(profileData, {
      data: arrayRemove({
        description: profile.description.stringValue,
        name: profile.name.stringValue,
        posts: postsBefore,
        profilePicture: profile.profilePicture.stringValue,
        username: profile.username.stringValue,
        following: following,
        followers: followers,
      }),
    });

    // a check for whether there was any comments or likes in the retrieved post

    const postComments = [];
    const postLikes = [];

    if (post.mapValue.fields.comments.arrayValue.values) {
      post.mapValue.fields.comments.arrayValue.values.forEach((item) => {
        postComments.push({
          comment: item.mapValue.fields.comment.stringValue,
          username: item.mapValue.fields.username.stringValue,
        });
      });
    }

    if (post.mapValue.fields.likes.arrayValue.values) {
      post.mapValue.fields.likes.arrayValue.values.forEach((item) => {
        postLikes.push(item.stringValue);
      });
    }

    // postAfter is merged with the post retrieved earlier as well as with the new comments added

    await updateDoc(profileData, {
      data: arrayUnion({
        description: profile.description.stringValue,
        name: profile.name.stringValue,
        posts: [
          ...postsAfter,
          {
            caption: post.mapValue.fields.caption.stringValue,
            url: post.mapValue.fields.url.stringValue,
            username: username,
            id: post.mapValue.fields.id.stringValue,
            timestamp: Timestamp.fromMillis(
              Date.parse(post.mapValue.fields.timestamp.timestampValue)
            ),
            likes: postLikes,
            comments: [
              ...postComments,
              { username: userData.username, comment: comment[id] },
            ],
          },
        ],
        profilePicture: profile.profilePicture.stringValue,
        username: profile.username.stringValue,
        following: following,
        followers: followers,
      }),
    });

    setComment({});
    await fetcher();
  }

  // createPost uploads an image to Storage and uses its link to create a file in Firebase

  async function createPost(event) {
    event.preventDefault();
    const storageRef = ref(getStorage(app), `${pictureData.pictureFile.name}`);

    await uploadBytesResumable(storageRef, pictureData.pictureFile).then(
      (snapshot) => {
        console.log("Uploaded a file");
      }
    );

    const fileUrl = await getDownloadURL(storageRef);

    alterProfile(pictureData.caption, fileUrl);
    setPictureData({
      pictureFile: "",
      caption: "",
    });
  }

  /* alterProfile unpacks the profile to convert it to a format similar to what's on Firebase 
      before it's used in createPost */

  async function alterProfile(caption, url) {
    const profileData = doc(getFirestore(app), "profiles", "Profile");

    const userPosts = [];
    const followers = [];
    const following = [];

    userData.posts.forEach((item) => {
      const comments = [];
      const likes = [];
      let data;
      if (item.mapValue.fields.comments.arrayValue.values) {
        item.mapValue.fields.comments.arrayValue.values.forEach((item) => {
          comments.push({
            comment: item.mapValue.fields.comment.stringValue,
            username: item.mapValue.fields.username.stringValue,
          });
        });
        data = comments;
      } else {
        data = [];
      }

      if (item.mapValue.fields.likes.arrayValue.values) {
        item.mapValue.fields.likes.arrayValue.values.forEach((item) => {
          likes.push(item.stringValue);
        });
      }

      userPosts.push({
        caption: item.mapValue.fields.caption.stringValue,
        id: item.mapValue.fields.id.stringValue,
        url: item.mapValue.fields.url.stringValue,
        username: item.mapValue.fields.username.stringValue,
        comments: data,
        likes: likes,
        timestamp: Timestamp.fromMillis(
          Date.parse(item.mapValue.fields.timestamp.timestampValue)
        ),
      });
    });

    if (userData.followers.length > 0) {
      userData.followers.forEach((item) => {
        followers.push(item.stringValue);
      });
    }

    if (userData.following.length > 0) {
      userData.following.forEach((item) => {
        following.push(item.stringValue);
      });
    }

    await updateDoc(profileData, {
      data: arrayRemove({
        description: userData.description,
        name: userData.name,
        posts: userPosts,
        profilePicture: userData.profilePicture,
        username: userData.username,
        following: following,
        followers: followers,
      }),
    });

    await updateDoc(profileData, {
      data: arrayUnion({
        description: userData.description,
        name: userData.name,
        profilePicture: userData.profilePicture,
        username: userData.username,
        posts: [
          ...userPosts,
          {
            caption: caption,
            comments: [],
            likes: [],
            timestamp: Timestamp.now(),
            url: url,
            username: userData.username,
            id: uniqid(),
          },
        ],
        followers: followers,
        following: following,
      }),
    });

    await fetcher();
  }

  /* editProfile edits the active user's profile, only the user's name and description can 
     be altered via the profileEdits state */

  async function editProfile(event) {
    event.preventDefault();

    const profileData = doc(getFirestore(app), "profiles", "Profile");

    const userPosts = [];
    const followers = [];
    const following = [];

    userData.posts.forEach((item) => {
      const comments = [];
      const likes = [];
      let data;
      if (item.mapValue.fields.comments.arrayValue.values) {
        item.mapValue.fields.comments.arrayValue.values.forEach((item) => {
          comments.push({
            comment: item.mapValue.fields.comment.stringValue,
            username: item.mapValue.fields.username.stringValue,
          });
        });
        data = comments;
      } else {
        data = [];
      }

      if (item.mapValue.fields.likes.arrayValue.values) {
        item.mapValue.fields.likes.arrayValue.values.forEach((item) => {
          likes.push(item.stringValue);
        });
      }

      userPosts.push({
        caption: item.mapValue.fields.caption.stringValue,
        id: item.mapValue.fields.id.stringValue,
        url: item.mapValue.fields.url.stringValue,
        username: item.mapValue.fields.username.stringValue,
        comments: data,
        likes: likes,
        timestamp: Timestamp.fromMillis(
          Date.parse(item.mapValue.fields.timestamp.timestampValue)
        ),
      });
    });

    if (userData.followers.length > 0) {
      userData.followers.forEach((item) => {
        followers.push(item.stringValue);
      });
    }

    if (userData.following.length > 0) {
      userData.following.forEach((item) => {
        following.push(item.stringValue);
      });
    }

    await updateDoc(profileData, {
      data: arrayRemove({
        description: userData.description,
        name: userData.name,
        posts: userPosts,
        profilePicture: userData.profilePicture,
        username: userData.username,
        following: following,
        followers: followers,
      }),
    });

    await updateDoc(profileData, {
      data: arrayUnion({
        description: profileEdits.description,
        name: profileEdits.name,
        profilePicture: userData.profilePicture,
        username: userData.username,
        posts: userPosts,
        following: following,
        followers: followers,
      }),
    });

    await fetcher();
    toggleEditDialog();
  }

  /*  follow function adds the followed account to the active user's following array and adds the user
      to the corresponding user's followers array
      it'll also unfollow a user if the active user is already in their followers array */

  async function follow(user) {
    // a check for whether the active user is already following the profile
    const checker = userData.following.some(
      (item) => item.stringValue === user
    );
    const userPosts = [];
    const followers = [];
    const following = [];
    let followingAfter = [];

    // user's posts are unpacked

    userData.posts.forEach((item) => {
      const comments = [];
      const likes = [];
      let data;
      if (item.mapValue.fields.comments.arrayValue.values) {
        item.mapValue.fields.comments.arrayValue.values.forEach((item) => {
          comments.push({
            comment: item.mapValue.fields.comment.stringValue,
            username: item.mapValue.fields.username.stringValue,
          });
        });
        data = comments;
      } else {
        data = [];
      }

      if (item.mapValue.fields.likes.arrayValue.values) {
        item.mapValue.fields.likes.arrayValue.values.forEach((item) => {
          likes.push(item.stringValue);
        });
      }

      userPosts.push({
        caption: item.mapValue.fields.caption.stringValue,
        id: item.mapValue.fields.id.stringValue,
        url: item.mapValue.fields.url.stringValue,
        username: item.mapValue.fields.username.stringValue,
        comments: data,
        likes: likes,
        timestamp: Timestamp.fromMillis(
          Date.parse(item.mapValue.fields.timestamp.timestampValue)
        ),
      });
    });

    if (userData.followers.length > 0) {
      userData.followers.forEach((item) => {
        followers.push(item.stringValue);
      });
    }

    if (userData.following.length > 0) {
      userData.following.forEach((item) => {
        following.push(item.stringValue);
      });
      followingAfter = [...following];
    }

    // determines whether to follow or unfollow by checking whether the profile is in the user's following array
    if (checker) {
      const index = following.indexOf(user);
      followingAfter.splice(index, 1);
    } else {
      followingAfter.push(user);
    }

    const profileData = doc(getFirestore(app), "profiles", "Profile");

    await updateDoc(profileData, {
      data: arrayRemove({
        description: userData.description,
        name: userData.name,
        posts: userPosts,
        profilePicture: userData.profilePicture,
        username: userData.username,
        following: following,
        followers: followers,
      }),
    });

    await updateDoc(profileData, {
      data: arrayUnion({
        description: userData.description,
        name: userData.name,
        profilePicture: userData.profilePicture,
        username: userData.username,
        posts: userPosts,
        followers: followers,
        following: followingAfter,
      }),
    });

    // the next part either adds or removes the user from the corresponding profile's follower array

    const profile = profiles.find((item) => item.username.stringValue === user);
    const profileFollowers = [];
    const profileFollowing = [];
    const profilePosts = [];
    let profileFollowersAfter = [];

    if (profile.posts.arrayValue.values) {
      profile.posts.arrayValue.values.forEach((item) => {
        const comments = [];
        const likes = [];
        let data;
        if (item.mapValue.fields.comments.arrayValue.values) {
          item.mapValue.fields.comments.arrayValue.values.forEach((item) => {
            comments.push({
              comment: item.mapValue.fields.comment.stringValue,
              username: item.mapValue.fields.username.stringValue,
            });
          });
          data = comments;
        } else {
          data = [];
        }

        if (item.mapValue.fields.likes.arrayValue.values) {
          item.mapValue.fields.likes.arrayValue.values.forEach((item) => {
            likes.push(item.stringValue);
          });
        }

        profilePosts.push({
          caption: item.mapValue.fields.caption.stringValue,
          id: item.mapValue.fields.id.stringValue,
          url: item.mapValue.fields.url.stringValue,
          username: item.mapValue.fields.username.stringValue,
          comments: data,
          likes: likes,
          timestamp: Timestamp.fromMillis(
            Date.parse(item.mapValue.fields.timestamp.timestampValue)
          ),
        });
      });
    }

    if (profile.followers.arrayValue.values) {
      profile.followers.arrayValue.values.forEach((item) => {
        profileFollowers.push(item.stringValue);
      });
      profileFollowersAfter = [...profileFollowers];
    }

    if (profile.following.arrayValue.values) {
      profile.following.arrayValue.values.forEach((item) => {
        profileFollowing.push(item.stringValue);
      });
    }
    const userFollower = profileFollowersAfter.some(
      (item) => item === userData.username
    );
    if (userFollower) {
      const index = profileFollowersAfter.indexOf(userData.username);
      profileFollowersAfter.splice(index, 1);
    } else {
      profileFollowersAfter.push(userData.username);
    }

    await updateDoc(profileData, {
      data: arrayRemove({
        description: profile.description.stringValue,
        name: profile.name.stringValue,
        posts: profilePosts,
        profilePicture: profile.profilePicture.stringValue,
        username: profile.username.stringValue,
        following: profileFollowing,
        followers: profileFollowers,
      }),
    });

    await updateDoc(profileData, {
      data: arrayUnion({
        description: profile.description.stringValue,
        name: profile.name.stringValue,
        posts: profilePosts,
        profilePicture: profile.profilePicture.stringValue,
        username: profile.username.stringValue,
        following: profileFollowing,
        followers: profileFollowersAfter,
      }),
    });

    await fetcher();
  }

  // refreshCurrentPost is used after either commenting or liking a Fullpost
  async function refreshCurrentPost(id) {
    const post = await posts.find((item) => item.id.stringValue === id);
    setCurrentPost(post);
  }

  function toggleEditDialog() {
    setEditDialogOpen((prevState) => !prevState);
  }

  //displayPost is used too display the FullPost component dialog

  function displayPost(id) {
    const post = posts.find((item) => item.id.stringValue === id);
    setCurrentPost(post);
    setPostDialogOpen((prevState) => !prevState);
  }

  function togglePostDialog() {
    setPostDialogOpen((prevState) => !prevState);
  }

  function handlePictureChange(event) {
    const { name, type, value, files } = event.target;

    setPictureData((prevState) => {
      return { ...prevState, [name]: type === "file" ? files[0] : value };
    });
  }

  function handleCommentChange(event, id) {
    setComment((prevState) => {
      return { ...prevState, [id]: event.target.value };
    });
  }

  function handleProfileEdit(event) {
    setProfileEdits((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  return (
    <div className="App">
      <HashRouter>
        {loggedIn ? (
          <Navbar
            dialogOpen={dialogOpen}
            userData={userData}
            toggleDialog={toggleDialog}
          />
        ) : (
          ""
        )}
        <Routes>
          <Route
            path="/"
            element={
              !loggedIn ? (
                <Login googleLogin={googleLogin} guestLogin={guestLogin} />
              ) : (
                <Homepage
                  posts={posts}
                  profiles={profiles}
                  userData={userData}
                  signOut={signOutUser}
                  comment={comment}
                  handleCommentChange={handleCommentChange}
                  createComment={createComment}
                  follow={follow}
                  likePost={likePost}
                  displayPost={displayPost}
                />
              )
            }
          />
          <Route
            path="/profile/:username"
            element={
              <Profile
                profiles={profiles}
                userData={userData}
                toggleEditDialog={toggleEditDialog}
                follow={follow}
                displayPost={displayPost}
              />
            }
          />
          <Route
            path="/explore"
            element={<Explore posts={posts} displayPost={displayPost} />}
          />
        </Routes>
        <Create
          dialogOpen={dialogOpen}
          toggleDialog={toggleDialog}
          createPost={createPost}
          handleChange={handlePictureChange}
          pictureData={pictureData}
        />
        <EditProfile
          dialogOpen={editDialogOpen}
          profileEdits={profileEdits}
          handleProfileEdit={handleProfileEdit}
          editProfile={editProfile}
        />
        {postDialogOpen ? (
          <FullPost
            posts={posts}
            profiles={profiles}
            userData={userData}
            dialogOpen={postDialogOpen}
            currentPost={currentPost}
            togglePostDialog={togglePostDialog}
            comment={comment}
            createComment={createComment}
            likePost={likePost}
            handleCommentChange={handleCommentChange}
          />
        ) : null}
      </HashRouter>
    </div>
  );
}

export default App;
