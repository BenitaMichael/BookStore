// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "dark-light-precious.firebaseapp.com",
  projectId: "dark-light-precious",
  storageBucket: "dark-light-precious.appspot.com",
  messagingSenderId: "199356862726",
  appId: "1:199356862726:web:c9a27996f0c136bf36ce87",
  measurementId: "G-85QDSD0ZJ8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);