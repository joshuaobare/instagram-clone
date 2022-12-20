// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE-nD9q5Rp29ip73n1hpwddZI-JigRBnw",
  authDomain: "instagram-clone-d033f.firebaseapp.com",
  projectId: "instagram-clone-d033f",
  storageBucket: "instagram-clone-d033f.appspot.com",
  messagingSenderId: "143840470845",
  appId: "1:143840470845:web:e1016ef020f30c1a880754"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app }