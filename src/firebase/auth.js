import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import { auth } from "./firebase";
import { getMemberProfile } from "./firestore";

// Login member
export const loginMember = async (email, password) => {
  try { 
    const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  const uid = userCredential.user.uid;
 
  const profile = await getMemberProfile(uid);

  return { uid, profile };
} catch (error) {
    throw new Error("Login failed: " + error.message);
  }
};

// Logout member
export const logoutMember = async () => {
  await signOut(auth);
};

// Observe auth state
export const observeAuth = (callback) => {
  return onAuthStateChanged(auth, callback);
};
