// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "home-965cd.firebaseapp.com",
  projectId: "home-965cd",
  storageBucket: "home-965cd.firebasestorage.app",
  messagingSenderId: "1042397914061",
  appId: "1:1042397914061:web:8f4d338a916455c4dd1a84"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);