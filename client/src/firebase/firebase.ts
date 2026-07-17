import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2OkSKirCzc4_TT0mU18BX4Aab0ckz64s",
  authDomain: "syncspace-186b5.firebaseapp.com",
  projectId: "syncspace-186b5",
  storageBucket: "syncspace-186b5.firebasestorage.app",
  messagingSenderId: "958634062773",
  appId: "1:958634062773:web:a3f33ed6b24bff1cd21ffc",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();