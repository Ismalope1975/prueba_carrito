// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, collection, getDoc, updateDoc, addDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCe7IBwbL8k_DMPfS6fGRWU3NZNbZHE8_E",
  authDomain: "audiomaster-f1512.firebaseapp.com",
  projectId: "audiomaster-f1512",
  storageBucket: "audiomaster-f1512.firebasestorage.app",
  messagingSenderId: "716088682819",
  appId: "1:716088682819:web:6b8e323b6124cc785867f6",
  measurementId: "G-XSW4KYJ6R7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);




const db = getFirestore(app);

export { db, addDoc, collection, doc, getDoc, updateDoc };