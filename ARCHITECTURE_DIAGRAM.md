# Architecture Diagram & Visual Guide

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLUB WEBSITE DASHBOARD                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │   React Components  │
                    │  (useAuth hook)     │
                    └─────────────────────┘
                              │
                    ┌─────────▼──────────┐
                    │  AuthContext       │
                    │  Provides:         │
                    │  • currentUser     │
                    │  • userProfile     │
                    │  • loading         │
                    │  • login()         │
                    │  • logout()        │
                    └─────────▲──────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
    ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐
    │  auth.js     │ │ firestore.js │ │  firebase.js     │
    │              │ │              │ │  (config)        │
    │ loginMember  │ │getMemberProfile│               │
    │ logoutMember │ │getUserData   │ │                │
    │ observeAuth  │ │getAllMembers │ │                │
    └──────────────┘ └──────────────┘ └──────────────────┘
          │                   │                   │
          └───────────────────┼───────────────────┘
                              │
                    ┌─────────▼──────────────────┐
                    │    Firebase Services       │
                    ├─────────────────────────────┤
                    │ • Authentication (Auth)    │
                    │ • Database (Firestore)     │
                    └────────────────────────────┘
```

## 🔄 Login Flow Diagram

```
┌─────────────────┐
│  User logs in   │
│ (email+password)│
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ signInWithEmailAndPassword()         │
│ (Firebase Auth)                     │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ ✅ Auth successful                  │
│ authUid = user.uid                  │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ getMemberProfile(authUid)           │
│ Query: where(authUid == value)      │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ ✅ Profile found                    │
│ {id, authUid, name, role, ...}      │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ AuthContext stores:                 │
│ • currentUser (auth user)           │
│ • userProfile (profile data)        │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ 🎉 Login complete!                  │
│ Navigate to /dashboard              │
└─────────────────────────────────────┘
```

## 📦 Data Model

### Authentication Level
```
Firebase Auth User
├─ uid: "CJQGyqMQ4..." ◄─── Use for permissions!
├─ email: "user@example.com"
├─ displayName: null
└─ ... other Firebase properties
```

### Firestore Level
```
memberProfiles collection
└─ Document ID: "custom-profile-123" (any value)
   ├─ authUid: "CJQGyqMQ4..." ◄─── Links to Firebase Auth
   ├─ name: "John Doe"
   ├─ role: "admin"
   ├─ skills: ["React", "Firebase"]
   ├─ learningGoals: ["ML", "Web3"]
   └─ ... other custom fields

projects collection
└─ Project Document
   ├─ name: "New Website"
   ├─ leaderId: "CJQGyqMQ4..." ◄─── Compare with currentUser.uid!
   ├─ team: ["John Doe", "Jane Smith"]
   └─ tasks: [...]
```

## 🔑 Permission Check Flow

```
Component loads
│
├─ Get { currentUser, userProfile } from useAuth()
│
├─ Extract: authUid = currentUser?.uid
│           profileId = userProfile?.id
│
├─ Need to check if user is project leader?
│  └─ Compare: authUid === project.leaderId ✅
│
├─ Need to fetch related data by profile?
│  └─ Use: profileId for query ✅
│
└─ Need to display user name?
   └─ Use: userProfile?.name ✅
```

## 📊 Data Flow in ProjectCard Component

```
ProjectCard receives project props
│
▼
useAuth() returns:
├─ currentUser {
│   uid: "CJQGyqMQ4..."  ◄─── For permissions
│   email: "..."
│   ...
│ }
└─ userProfile {
    id: "profile-123"    ◄─── For display/navigation
    authUid: "CJQGyqMQ4..."
    name: "John Doe"
    role: "admin"
    ...
  }
│
▼
Extract authUid = currentUser?.uid
│
▼
Check: authUid === project.leaderId ?
│
├─ YES: Show "YOU'RE LEADER" badge
│       Show "Manage Project" button
│
└─ NO: Hide admin controls
```

## 🎯 Key Comparisons

### ✅ DO THIS

```javascript
// Checking permissions
const { currentUser } = useAuth();
if (currentUser?.uid === project.leaderId) {
  // User is leader ✅
}

// Fetching profile-related data
const { userProfile } = useAuth();
if (userProfile?.id) {
  const docs = await fetch(
    `api/profiles/${userProfile.id}/projects`
  );
}

// Displaying user info
<p>{userProfile?.name}</p>
<p>{currentUser?.email}</p>
```

### ❌ DON'T DO THIS

```javascript
// Using profileId for permissions ❌
if (userProfile?.id === project.leaderId) { }

// Using email for permissions ❌
if (currentUser?.email === project.leaderEmail) { }

// Assuming doc ID = authUid ❌
const docRef = doc(db, "memberProfiles", currentUser.uid);

// Comparing authUid to profileId ❌
if (userProfile?.authUid === userProfile?.id) { }
```

## 🚨 Error Scenarios

```
Login Fails
├─ Wrong credentials
│  └─ Show: "Check email and password"
│
├─ Profile not found
│  └─ Show: "Account setup incomplete"
│     Action: Contact admin
│
└─ Firestore read error
   └─ Show: "Server error, try again"
      Action: Check Firestore rules
```

## 🔒 Security Layers

```
┌─────────────────────────────────────┐
│ Layer 1: Frontend Auth Check        │
│ if (currentUser?.uid ===...) { }    │
└─────────────────────────────────────┘
                 │
┌─────────────────▼─────────────────────┐
│ Layer 2: Firestore Security Rules     │
│ allow if (auth.uid == resource.authUid)│
└────────────────────────────────────────┘
                 │
┌─────────────────▼────────────────────────┐
│ Layer 3: Backend API Validation         │
│ server: verify authUid before action    │
└───────────────────────────────────────────┘
```

## 📈 Component Hierarchy

```
App
├─ AuthProvider
│  ├─ Navbar
│  │  └─ Uses: currentUser (for login state)
│  │
│  ├─ Home / About / Events / etc.
│  │  └─ Mostly public pages
│  │
│  ├─ Login
│  │  └─ Uses: login() from useAuth()
│  │
│  ├─ ProtectedRoute
│  │  └─ Checks: currentUser exists
│  │
│  ├─ MemberDashboard
│  │  └─ Displays all members
│  │
│  └─ ProjectTimeline
│     ├─ ProjectCard (x many)
│     │  └─ Uses: currentUser.uid === project.leaderId
│     │
│     └─ TaskItem
│        └─ Displays task details
```

## 🧪 Test Scenarios

```
Scenario: User Logs In
├─ Step 1: Enter valid credentials
├─ Step 2: Firebase auth validates
├─ Step 3: getMemberProfile() called
├─ Step 4: Profile data loaded
├─ Step 5: Redirect to /dashboard ✅

Scenario: User is Project Leader
├─ Step 1: Load project card
├─ Step 2: authUid = currentUser.uid
├─ Step 3: Compare with project.leaderId
├─ Step 4: authUid === leaderId? YES
├─ Step 5: Show leader badge ✅
└─ Step 6: Show manage button ✅

Scenario: User is NOT Project Leader
├─ Step 1: Load project card
├─ Step 2: authUid = currentUser.uid
├─ Step 3: Compare with project.leaderId
├─ Step 4: authUid === leaderId? NO
├─ Step 5: Hide leader badge ✅
└─ Step 6: Hide manage button ✅
```

---

**Visual Guide Complete** ✅  
Reference this when explaining the architecture to team members!
