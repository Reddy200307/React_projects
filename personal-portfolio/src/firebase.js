// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGwZgCvelwGqqW3e-YB8DVmR-mIzxHNyY",
  authDomain: "prashanth-reddy-2003.firebaseapp.com",
  projectId: "prashanth-reddy-2003",
  storageBucket: "prashanth-reddy-2003.firebasestorage.app",
  messagingSenderId: "565876388768",
  appId: "1:565876388768:web:515b3368f0556a9650eac5",
  measurementId: "G-FQPQL021DV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);