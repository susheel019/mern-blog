// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogg-app-776ac.firebaseapp.com",
  projectId: "blogg-app-776ac",
  storageBucket: "blogg-app-776ac.appspot.com",
  messagingSenderId: "1022812551689",
  appId: "1:1022812551689:web:24ddd44c31e2825d3596d8",
  measurementId: "G-JMTN2WQ9RC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);