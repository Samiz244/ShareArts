import React, { useState } from 'react';
import { auth, provider, signInWithPopup, signOut } from '../firebase';
import axios from 'axios';

function Login({ onLogin }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      setUser(firebaseUser);
      localStorage.setItem('user', JSON.stringify(firebaseUser)); // ✅ persist user
      onLogin(firebaseUser); // ✅ send to App.js

      // ✅ Save to backend
      await axios.post('http://localhost:5050/api/users', {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        photo: firebaseUser.photoURL
      });

      console.log('✅ Google user saved to MySQL:', firebaseUser.email);
    } catch (err) {
      console.error('❌ Login or save failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem('user'); // ✅ clear saved user
    onLogin(null);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      {!user ? (
        <>
          <h2>🎨 Login to Share Arts</h2>
          <button onClick={handleLogin} disabled={loading}>
            {loading ? 'Logging in...' : 'Login with Google'}
          </button>
        </>
      ) : (
        <>
          <h3>Welcome, {user.displayName}</h3>
          <img src={user.photoURL} alt="profile" style={{ borderRadius: '50%', width: '80px' }} />
          <p>{user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}

export default Login;