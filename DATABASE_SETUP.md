# Database Migration Checklist

## 🔧 Required Database Changes

### Firestore Collection: `memberProfiles`

Every document in this collection **MUST** have:

#### ✅ Required Fields
- `authUid` (string) - Firebase Authentication UID of the user
- `name` (string) - Member's display name
- `role` (string) - User's role (e.g., "admin", "member", "lead")

#### 📋 Optional Fields (Examples)
- `skills` (array) - e.g., ["React", "Firebase", "Node.js"]
- `learningGoals` (array) - e.g., ["Machine Learning", "Web3"]
- `bio` (string) - Short biography
- `profileImage` (string) - URL to profile picture
- `joinDate` (timestamp) - When user joined
- Any other custom fields

### Example Document Structure

```json
{
  "authUid": "CJQGyqMQ4XM5D4xK8nF2gH9J0K1L",
  "name": "John Doe",
  "role": "admin",
  "email": "john@example.com",
  "skills": ["React", "Firebase", "Python"],
  "learningGoals": ["Machine Learning", "Web3"],
  "bio": "Full stack developer passionate about web technologies",
  "joinDate": "2024-01-15T10:30:00Z"
}
```

**Document ID**: Can be any value (e.g., custom UUID, but NOT the authUid)

## 📝 Migration Steps

### Step 1: Add authUid to Existing Documents
If you already have memberProfiles without the `authUid` field:

```javascript
// Firestore Console JavaScript
db.collection("memberProfiles").get().then(snapshot => {
  snapshot.docs.forEach(doc => {
    if (!doc.data().authUid) {
      console.log("Missing authUid in:", doc.id, doc.data());
      // Manually update or get auth UID from related auth records
    }
  });
});
```

### Step 2: Verify Field Types
- `authUid` should be a string (not a reference)
- `role` should be a string
- All other fields match their expected types

### Step 3: Test the Application

```javascript
// In browser console after logging in:
console.log(JSON.stringify({
  currentUser: {
    uid: "user.uid"
  },
  userProfile: {
    id: "doc.id",
    authUid: "doc.data().authUid",
    name: "doc.data().name",
    role: "doc.data().role"
  }
}, null, 2));
```

### Step 4: Verify Permissions Work

```jsx
// Test in a component
const { currentUser, userProfile } = useAuth();
console.log("Match:", currentUser?.uid === userProfile?.authUid);
// Should print: Match: true
```

## 🔍 Troubleshooting

### Issue: "Member profile not found for this user"
**Cause**: The memberProfiles collection doesn't have a document with matching `authUid`

**Solution**:
1. Check if the `authUid` field exists in the document
2. Verify the `authUid` matches the Firebase Auth UID
3. Add the missing document to Firestore

### Issue: `userProfile` is null after login
**Cause**: Profile fetch failed

**Solution**:
1. Check browser console for error messages
2. Verify the `authUid` field exists in Firestore
3. Check Firestore Security Rules allow reading memberProfiles

### Issue: Permission checks always fail
**Cause**: Comparing wrong values

**Solution**:
1. Use `currentUser?.uid` (from Firebase Auth)
2. Not `userProfile?.id` (Firestore doc ID)
3. Not `userProfile?.authUid` (which should match currentUser.uid)

## 📊 Sample Data for Testing

```javascript
// Create test member with matching auth UID
{
  "authUid": "test-user-123",  // Must match Firebase Auth UID
  "name": "Test User",
  "role": "admin",
  "email": "test@example.com",
  "skills": ["React", "Firebase"],
  "learningGoals": ["Testing", "DevOps"]
}
```

## 🚀 Firestore Security Rules

Recommended rules to allow users to read their own profile:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read their own profile
    match /memberProfiles/{profileId} {
      allow read: if request.auth.uid == resource.data.authUid;
      allow write: if request.auth.uid == resource.data.authUid;
    }
  }
}
```

## ✨ Validation Script

Copy and paste into Firestore Console to validate structure:

```javascript
// Check all memberProfiles have required fields
const requiredFields = ['authUid', 'name', 'role'];
let issues = [];

db.collection("memberProfiles").get().then(snapshot => {
  snapshot.docs.forEach(doc => {
    const data = doc.data();
    requiredFields.forEach(field => {
      if (!data[field]) {
        issues.push(`${doc.id}: Missing "${field}"`);
      }
    });
  });
  
  if (issues.length === 0) {
    console.log("✅ All documents are valid!");
  } else {
    console.log("❌ Issues found:");
    issues.forEach(issue => console.log("  -", issue));
  }
});
```

## 📋 Final Checklist

- [ ] All memberProfiles documents have `authUid` field
- [ ] `authUid` matches corresponding Firebase Auth user UID
- [ ] All documents have `name` and `role` fields
- [ ] Firestore Security Rules allow profile access
- [ ] Test login flow works end-to-end
- [ ] Permission checks (leader badge, manage project button) work
- [ ] User profile data displays correctly
- [ ] No "Member profile not found" errors in console
