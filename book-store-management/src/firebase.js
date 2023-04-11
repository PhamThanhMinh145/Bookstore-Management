// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwB1GD5SLBrIMuOjp6DrOUhNGjkUKPUz0",
  authDomain: "book-store-management-abf1d.firebaseapp.com",
  projectId: "book-store-management-abf1d",
  storageBucket: "book-store-management-abf1d.appspot.com",
  messagingSenderId: "941074301033",
  appId: "1:941074301033:web:848ea711c6e6407e2ca2f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);