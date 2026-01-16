import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Fetch member profile for logged-in user
 * @param {string} uid - Firebase Auth UID
 * @returns {object} member profile data
 */
export const getMemberProfile = async (uid) => {
  if (!uid) {
    throw new Error("UID is required to fetch member profile");
  }

  const profileRef = doc(db, "memberProfiles", uid);
  const profileSnap = await getDoc(profileRef);

  if (!profileSnap.exists()) {
    throw new Error("Member profile not found");
  }

  return profileSnap.data();
};

/**
 * Fetch basic user info (optional but useful)
 * @param {string} uid - Firebase Auth UID
 * @returns {object} user data
 */
export const getUserData = async (uid) => {
  if (!uid) {
    throw new Error("UID is required to fetch user data");
  }

  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error("User document not found");
  }

  return userSnap.data();
};
