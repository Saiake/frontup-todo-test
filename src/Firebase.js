// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2rIC_u2261NN2JHUhET0YYOZW4HTPMhw",
  authDomain: "frontup-e3c9f.firebaseapp.com",
  databaseURL: "https://frontup-e3c9f-default-rtdb.firebaseio.com",
  projectId: "frontup-e3c9f",
  storageBucket: "frontup-e3c9f.appspot.com",
  messagingSenderId: "674919704570",
  appId: "1:674919704570:web:47c0109ecb1f548bbd6643",
  measurementId: "G-LFYG45TGCK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;