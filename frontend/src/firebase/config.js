import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtFIsp4jU6HTB3-NRqJceL12kzlNngS80",
  authDomain: "movie-tracker-b5585.firebaseapp.com",
  projectId: "movie-tracker-b5585",
  storageBucket: "movie-tracker-b5585.firebasestorage.app",
  messagingSenderId: "500528114540",
  appId: "1:500528114540:web:516ca898de83740023a149",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
