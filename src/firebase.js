// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAhQRFYTijNKKizRTYbM9_ubqVi4uWQHKI",
    authDomain: "share-arts-5091d.firebaseapp.com",
    projectId: "share-arts-5091d",
    storageBucket: "share-arts-5091d.firebasestorage.app",
    messagingSenderId: "949096036526",
    appId: "1:949096036526:web:d8a5bce917fd319602d53f",
    measurementId: "G-Q0MYQ6ZLYH"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };