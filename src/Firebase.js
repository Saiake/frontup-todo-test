import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getDocs, addDoc, doc, collection } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  projectId: "frontup-e3c9f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addTodoDB = async (todo) => 
  await addDoc(collection(db, "Todo"), todo);

export const getTodosDB = async () => {
  const querySnapshot = await getDocs(collection(db, "Todo"));
  let todos = []
  querySnapshot.forEach((doc) => {
    todos.push({
      id: doc.id,
      title: doc.data().title,
      description: doc.data().description,
      date: doc.data().date,
      complete: doc.data().complete,
    })
  })
  return todos
}
