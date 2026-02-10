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

    const authUid = userCredential.user.uid;
    // Try to fetch member profile using auth UID. If not found, do not fail login;
    // Auth state is handled in AuthContext which will attempt to load the profile on change.
    let profile = null;
    try {
      profile = await getMemberProfile(authUid);
    } catch (err) {
      console.warn('Member profile not found during login for authUid:', authUid, err.message);
    }

    console.log('✅ Login successful! Auth UID:', authUid, 'Profile:', profile);

    return {
      authUid,
      profileId: profile ? profile.id : null,
      email: userCredential.user.email,
      name: profile ? profile.name : null,
      role: profile ? profile.role : null,
      profileFound: Boolean(profile)
    };

  } catch (error) {
    console.error('❌ Login failed:', error.code, error.message);
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
