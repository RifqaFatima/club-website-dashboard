# Identity & Auth Architecture

## Core Principle
**Always use `auth.currentUser.uid` as the user identity for permissions and task actions.**

## Key Rules

1. ✅ **Use `authUid`** (from `currentUser.uid`) for:
   - Permission checks
   - Task actions
   - Comparing with `project.leaderId`
   - Any security-critical decisions

2. ❌ **Do NOT assume** `memberProfiles` document ID = auth UID
   - Member profile is fetched via query by `authUid` field
   - The actual Firestore doc ID (`profileId`) is separate

3. 📦 **Frontend must store both**:
   - `authUid` → for permissions & task actions (from `currentUser.uid`)
   - `profileId` → only if needed for display/navigation (from `userProfile.id`)

## Data Flow

### Login Process
```
1. User enters email/password
2. Firebase Auth validates → returns auth user with uid
3. getMemberProfile(authUid) queries memberProfiles where authUid matches
4. Returns: { id (profileId), authUid, name, role, ...profileData }
5. AuthContext stores both:
   - currentUser (Firebase auth user with uid)
   - userProfile (member profile with id and authUid)
```

### Usage in Components
```jsx
const { currentUser, userProfile } = useAuth();

// For permissions checks:
const authUid = currentUser?.uid;
if (authUid === project.leaderId) {
  // User is project leader
}

// For display/navigation (if needed):
const profileId = userProfile?.id;
// Only use profileId when fetching related documents
```

## Files Modified

### 1. **firestore.js**
- Updated `getMemberProfile(authUid)` to query by `authUid` field
- Returns `{ id, authUid, name, role, ...rest }`
- Added `query` and `where` imports

### 2. **auth.js**
- `loginMember()` now calls `getMemberProfile()` on login
- Returns `{ authUid, profileId, email, name, role }`

### 3. **AuthContext.jsx**
- New state: `userProfile` for member profile data
- `currentUser` (Firebase user) and `userProfile` both stored
- `onAuthStateChanged` now fetches profile for logged-in users

### 4. **ProjectCard.jsx**
- Uses `authUid` for permission checks: `authUid === project.leaderId`
- Properly accesses both `currentUser` and `userProfile`

## Database Requirements

Your Firestore `memberProfiles` collection **must have**:
```json
{
  "authUid": "firebase-auth-uid-here",  // REQUIRED for lookup
  "name": "John Doe",
  "role": "admin",
  // ... other profile fields
}
```

Each document's ID can be any unique value (often a custom profileId, not the authUid).

## Error Handling

If a profile lookup fails:
- `userProfile` is set to `null`
- `currentUser` remains available
- Component gracefully handles missing profile data
- User is still authenticated but may see limited features

## Security Notes

- Never trust client-side `currentUser.uid` alone for critical operations
- Always validate `authUid` on the backend before executing sensitive tasks
- Backend should re-verify the profile lookup using the auth UID
