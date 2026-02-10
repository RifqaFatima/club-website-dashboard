# Quick Reference: Using Auth in Components

## 🎯 Import & Setup
```jsx
import { useAuth } from '../context/AuthContext';

const MyComponent = () => {
  const { currentUser, userProfile, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!currentUser) return <div>Not logged in</div>;
  
  // Now you can use currentUser and userProfile
};
```

## 📌 What You Get

```javascript
// currentUser (Firebase Auth User)
{
  uid: "CJQGyqMQ4XM5D4xK8nF2gH9J0K1L",  // ← Use this for permissions!
  email: "user@example.com",
  displayName: null,
  // ... other Firebase user properties
}

// userProfile (Member Profile from Firestore)
{
  id: "profile-doc-id-12345",           // Firestore document ID
  authUid: "CJQGyqMQ4XM5D4xK8nF2gH9J0K1L",
  name: "John Doe",
  role: "admin",
  skills: ["React", "Firebase"],
  learningGoals: ["Machine Learning"]
  // ... other profile fields
}
```

## ✅ Permission Checks (Use authUid)

```jsx
// Check if current user is project leader
if (currentUser?.uid === project.leaderId) {
  // Show admin controls
}

// Check if user has specific role
if (userProfile?.role === "admin") {
  // Show admin features
}

// Shorthand for clarity
const authUid = currentUser?.uid;
if (authUid === project.leaderId) {
  // Do something
}
```

## 📱 Display User Info

```jsx
// Show user's name (from profile, not from auth)
<p>{userProfile?.name || "Guest"}</p>

// Show user's role
<p>Role: {userProfile?.role}</p>

// Show user's email (from auth)
<p>Email: {currentUser?.email}</p>
```

## 🔄 Using Profile ID for Queries

```jsx
// Only use profileId if you need to query related documents
// Example: Get projects created by this user
if (userProfile?.id) {
  const projects = await getProjectsByProfileId(userProfile.id);
}

// Don't use profileId for permissions - use authUid instead
// ❌ WRONG: if (profileId === project.leaderId)
// ✅ RIGHT: if (currentUser?.uid === project.leaderId)
```

## 🚪 Login Example

```jsx
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // User is now authenticated and profile is loaded
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
};
```

## 🚪 Logout Example

```jsx
const { logout } = useAuth();

const handleLogout = async () => {
  try {
    await logout();
    navigate('/');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
```

## 🛡️ Protected Routes

```jsx
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Usage
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

## ⚠️ Common Mistakes

### ❌ Wrong
```jsx
// Assuming profileId = authUid
const docRef = doc(db, "memberProfiles", authUid);

// Using profileId for permissions
if (projectLeaderId === userProfile?.id) { ... }

// Comparing wrong values
if (currentUser.email === "admin@example.com") {
  // Use authUid for permissions, not email!
}
```

### ✅ Right
```jsx
// Query by authUid field
const q = query(collection(db, "memberProfiles"), 
                where("authUid", "==", authUid));

// Use authUid for permissions
if (projectLeaderId === currentUser?.uid) { ... }

// Use authUid for comparisons
if (authUid === someOtherAuthUid) { ... }
```

## 📊 Debug Console

```jsx
const { currentUser, userProfile } = useAuth();

console.log("Current User:", currentUser);
console.log("User Profile:", userProfile);
console.log("Auth UID:", currentUser?.uid);
console.log("Profile ID:", userProfile?.id);
```

## 🔗 Related Files
- [AUTH_ARCHITECTURE.md](./src/firebase/AUTH_ARCHITECTURE.md) - Full documentation
- [firestore.js](./src/firebase/firestore.js) - Firestore functions
- [auth.js](./src/firebase/auth.js) - Auth functions
- [AuthContext.jsx](./src/context/AuthContext.jsx) - React context
