
import { doc, getDoc, collection, getDocs, query, where, updateDoc, limit } from "firebase/firestore";
import { db } from "./firebase";

export const getMemberProfile = async (uid) => {
  if (!uid) {
    throw new Error("UID is required");
  }

  const q = query(
    collection(db, "memberProfiles"),
    where("authUid", "==", uid),
    limit(1)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    throw new Error("Member profile not found for this UID");
  }

  const docSnap = snapshot.docs[0];

  return {
    id: docSnap.id, // IMPORTANT: profileId
    ...docSnap.data()
  };

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
export const markPasswordChanged = async (authUid) => {
  if (!authUid) throw new Error("UID required");

  const q = query(
    collection(db, "memberProfiles"),
    where("authUid", "==", authUid),
    limit(1)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    throw new Error("Profile not found");
  }

  const profileDoc = snapshot.docs[0];

  await updateDoc(doc(db, "memberProfiles", profileDoc.id), {
    needsPasswordChange: false
  });
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

/**
 * Updates a member's own profile (Skills & Learning Goals only)
 */
// export const updateMemberProfile = async (authUid, newData) => {
//   if (!authUid) throw new Error("Authentication UID is required");

//   try {
//     const q = query(
//       collection(db, "memberProfiles"),
//       where("authUid", "==", authUid),
//       limit(1)
//     );

//     const snapshot = await getDocs(q);
//     if (snapshot.empty) throw new Error("Profile document not found");

//     const profileDoc = snapshot.docs[0];
//     const docRef = doc(db, "memberProfiles", profileDoc.id);
//     const existingData = profileDoc.data();

//     // Merging existing data with new skills/goals to satisfy security rules
//     await updateDoc(docRef, {
//       ...existingData,
//       skills: newData.skills || existingData.skills,
//       wantToLearn: newData.wantToLearn || existingData.wantToLearn
//     });

//     return true;
//   } catch (error) {
//     console.error("❌ Error updating profile:", error);
//     throw error;
//   }
// };

/**
 * Updates a member's own profile (Skills & Learning Goals only)
 */
export const updateMemberProfile = async (authUid, newData) => {
  if (!authUid) throw new Error("Authentication UID is required");

  try {
    // 1. Find the document
    const q = query(
      collection(db, "memberProfiles"),
      where("authUid", "==", authUid),
      limit(1)
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) throw new Error("Profile document not found");

    const profileDoc = snapshot.docs[0];
    const docRef = doc(db, "memberProfiles", profileDoc.id);

    // 2. ONLY update the allowed fields.
    // By NOT sending 'role' or 'warnings', we satisfy security rules 
    // that say "user cannot update role".
    await updateDoc(docRef, {
      skills: newData.skills,
      wantToLearn: newData.wantToLearn
    });

    return true;
  } catch (error) {
    console.error("❌ Error updating profile:", error);
    throw error;
  }
};