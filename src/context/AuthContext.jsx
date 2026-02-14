// import { createContext, useContext, useState, useEffect } from 'react';
// import { auth } from '../firebase/firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import { loginMember, logoutMember } from '../firebase/auth';

// const AuthContext = createContext();

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// }

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userProfile, setUserProfile] = useState(null); // Stores { id (profileId), authUid, name, role, ... }
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         // User is logged in - store auth user and fetch profile
//         setCurrentUser(user);
//         try {
//           const { getMemberProfile } = await import('../firebase/firestore');
//           const profile = await getMemberProfile(user.uid);
//           setUserProfile(profile);
//         } catch (error) {
//           console.error('Error fetching user profile:', error);
//           setUserProfile(null);
//         }
//       } else {
//         // User is logged out
//         setCurrentUser(null);
//         setUserProfile(null);
//       }
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   async function login(email, password) {
//     return await loginMember(email, password);
//   }

//   async function logout() {
//     return await logoutMember();
//   }

//   const value = {
//     currentUser,          // Firebase auth user with uid
//     userProfile,          // Member profile with { id (profileId), authUid, name, role, ... }
//     loading,
//     login,
//     logout
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }


import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { loginMember, logoutMember } from '../firebase/auth';
import { getMemberProfile } from '../firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          const profile = await getMemberProfile(user.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });
    
    return unsubscribe;
  }, []);

  async function login(email, password) {
    const result = await loginMember(email, password);
    return result;
  }

  async function logout() {
    return await logoutMember();
  }

  const value = {
    currentUser,
    userProfile,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}