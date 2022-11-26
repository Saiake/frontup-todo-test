import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getDocs, addDoc, doc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

export const addTodoDB = async (todo) => 
  await addDoc(collection(db, "Todo"), todo);

export const fileL = (path, files) => {
  console.log(files)
  Array.from(files).forEach(file => {
    const storageRef = ref(storage, path + "/" + file.name);
    uploadBytes(storageRef, file)
  });
}

export const getTodosDB = async () => {
  const querySnapshot = await getDocs(collection(db, "Todo"));
  let todos = []
  querySnapshot.forEach((doc) => {
    todos.push({
      id: doc.id,
      title: doc.data().title,
      description: doc.data().description,
      date: doc.data().date,
      completed: doc.data().completed,
    })
  })
  return todos
}
