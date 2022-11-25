import './normalize.css';
import './style.css';
import render from './functions/render';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnPm0hz8GHvs4EJd19d0FfEOKpasjVv34",
  authDomain: "diddit-ginahenderson.firebaseapp.com",
  projectId: "diddit-ginahenderson",
  storageBucket: "diddit-ginahenderson.appspot.com",
  messagingSenderId: "920037196288",
  appId: "1:920037196288:web:a9c9b3080999034dae0ee5",
  measurementId: "G-SZ2WRR757M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
render();
