// app/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyABN0EHbxcSYkv_iXWSxeINla6kam-Z8q0",
  authDomain: "discorddemo-a9eb1.firebaseapp.com",
  projectId: "discorddemo-a9eb1",
  storageBucket: "discorddemo-a9eb1.appspot.com",
  messagingSenderId: "324997346455",
  appId: "1:324997346455:web:45228cb08647ab7cf2a5d2",
  measurementId: "G-1DSXPQ441Z"
};

// Check if the Firebase app is already initialized
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Log Firebase initialization
console.log('Firebase initialized successfully');

// Get the storage instance
export const storage = getStorage(app);

// Log the storage instance
console.log('Firebase Storage instance:', storage);
console.log('Firebase initialized successfully');
