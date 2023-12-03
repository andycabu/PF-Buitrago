import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2mClbfwSthrwhC1nY8j_GeYh7GKVVQOU",
  authDomain: "store-f6bf5.firebaseapp.com",
  databaseURL:
    "https://store-f6bf5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "store-f6bf5",
  storageBucket: "store-f6bf5.appspot.com",
  messagingSenderId: "643780603087",
  appId: "1:643780603087:web:39b263d9655e80f27ddbba",
  measurementId: "G-ZWGPQE8WEE",
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const storage = getStorage(app);

const auth = getAuth(app);

export { database, storage, auth };
