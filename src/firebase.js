// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZeDDcgVUQFeu74ru7gcgLQvtzKWksJwc",
  authDomain: "viu-tfm-dashboard.firebaseapp.com",
  databaseURL: "https://viu-tfm-dashboard-default-rtdb.firebaseio.com",
  projectId: "viu-tfm-dashboard",
  storageBucket: "viu-tfm-dashboard.appspot.com",
  messagingSenderId: "1010156400360",
  appId: "1:1010156400360:web:cb5189c967e59f05b9635d",
  measurementId: "G-HF8G374VXR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);