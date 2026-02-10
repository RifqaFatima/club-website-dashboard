import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Fetch member profile for logged-in user by auth UID
 * Returns both the Firestore doc ID (profileId) and all profile data
 * @param {string} authUid - Firebase Auth UID
 * @returns {object} member profile data with { id (profileId), authUid, name, role, ...}
 */
export const getMemberProfile = async (authUid) => {
  if (!authUid) {
    throw new Error("Auth UID is required to fetch member profile");
  }

  try {
    // Query memberProfiles collection where authUid matches
    const profilesCol = collection(db, "memberProfiles");
    const q = query(profilesCol, where("authUid", "==", authUid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Member profile not found for this user");
    }

    // Get the first matching profile
    const profileDoc = querySnapshot.docs[0];
    const profileData = profileDoc.data();

    // Return with both id (Firestore doc ID) and authUid
    return {
      id: profileDoc.id,  // Firestore document ID (profileId)
      authUid: profileData.authUid,
      name: profileData.name,
      role: profileData.role,
      ...profileData
    };
  } catch (error) {
    console.error("Error fetching member profile:", error);
    throw new Error("Failed to fetch member profile: " + error.message);
  }
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

export const getAllMembers = async () => {
  try {
    const membersCol = collection(db, "memberProfiles");
    const snapshot = await getDocs(membersCol);
    
    const membersList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log('✅ Fetched all members:', membersList.length);
    return membersList;
  } catch (error) {
    console.error('❌ Error fetching members:', error);
    throw new Error("Failed to fetch members: " + error.message);
  }
};