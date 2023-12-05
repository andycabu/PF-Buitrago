import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2y2eu8rcGp1WA04xacmkzyExOHmmZDuU",
  authDomain: "store-af491.firebaseapp.com",
  projectId: "store-af491",
  storageBucket: "store-af491.appspot.com",
  messagingSenderId: "336840225480",
  appId: "1:336840225480:web:762e4924e8a2d2076c6bfd",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };
