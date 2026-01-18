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

  //TEMPORARY COMMENT OUT!!!
  const uid = userCredential.user.uid;
 
  // const profile = await getMemberProfile(uid);

 
  //RETURN TEMPORARILY!

  console.log('✅ Login successful! UID:', uid);
    return { uid, email: userCredential.user.email };

} catch (error) {
    console.error('❌ Login failed:', error.code, error.message); // This will show the real error
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
