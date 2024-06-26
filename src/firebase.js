import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtl8_e_1ymnZ8eSvpC6_hA8_CihPFuc2s",
  authDomain: "onlinelearningplatform-852bf.firebaseapp.com",
  databaseURL: "https://onlinelearningplatform-852bf-default-rtdb.firebaseio.com/",
  projectId: "onlinelearningplatform-852bf",
  storageBucket: "onlinelearningplatform-852bf.appspot.com",
  messagingSenderId: "678944011168",
  appId: "1:678944011168:web:484142b050165abe69eac5",
  measurementId: "G-PWXL8J79TK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
