// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEOEB-8tqhkW4E9RAaNrshTUlGq4JlXHM",
  authDomain: "prashanth-reddy-projects.firebaseapp.com",
  projectId: "prashanth-reddy-projects",
  storageBucket: "prashanth-reddy-projects.firebasestorage.app",
  messagingSenderId: "583569069724",
  appId: "1:583569069724:web:5a85a91588925007bb3f59",
  measurementId: "G-T9XE6796CD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);