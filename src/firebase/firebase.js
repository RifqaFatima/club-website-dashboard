import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEUy7d9OcPTyhRWHeu3HirjyJ-JRprPeE",
  authDomain: "ieee-cs-p4-phase1.firebaseapp.com",
  projectId: "ieee-cs-p4-phase1",
  storageBucket: "ieee-cs-p4-phase1.firebasestorage.app",
  messagingSenderId: "815356482844",
  appId: "1:815356482844:web:01431b4fe879f324e056d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Placeholder functions for Phase 1
export const signup = () => {};
export const login = () => {};
export const fetchProfile = () => {};

export { auth, db };