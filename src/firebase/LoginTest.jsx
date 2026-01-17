import { useState } from 'react';
import { loginMember, logoutMember } from './auth';

function LoginTest() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    try {
      const result = await loginMember(email, password);
      setUser(result);
      alert('✅ Login successful! Check console for user data');
      console.log('Logged in user:', result);
    } catch (err) {
      setError(err.message);
      alert('❌ Login failed: ' + err.message);
    }
  }

  async function handleLogout() {
    try {
      await logoutMember();
      setUser(null);
      alert('✅ Logged out successfully');
    } catch (err) {
      alert('❌ Logout failed: ' + err.message);
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px', border: '2px solid #007bff', borderRadius: '8px', margin: '20px' }}>
      <h2>🔐 Login/Logout Test</h2>
      
      {user ? (
        <div>
          <p>✅ <strong>Logged in as:</strong> {user.uid}</p>
          <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', fontSize: '14px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', fontSize: '14px' }}
            />
          </div>

          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Login
          </button>

          <p style={{ fontSize: '12px', marginTop: '15px', color: '#666' }}>
            Use the test account Sabiquddin created in Firebase Auth
          </p>
        </form>
      )}
    </div>
  );
}

export default LoginTest;