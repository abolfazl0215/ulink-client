// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfBfS05cW2zwhawjDQKtpDmXXgk5NjYSU",
  authDomain: "pounes-global-dater-205bd.firebaseapp.com",
  projectId: "pounes-global-dater-205bd",
  storageBucket: "pounes-global-dater-205bd.firebasestorage.app",
  messagingSenderId: "503340338653",
  appId: "1:503340338653:web:7a7a71bf90ec971d7ffa34",
  measurementId: "G-EYFJ948KQ9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
