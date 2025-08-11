import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { auth, provider, signInWithPopup, signOut } from './firebase';

import Home from './createApp/Home';
import Gallery from './createApp/Gallery';
import Upload from './createApp/Upload';
import Profile from './createApp/Profile';
import Artists from './createApp/Artists';
import MyProfile from './createApp/MyProfile';
import Following from './createApp/Following';
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery user={user} />} />
        <Route path="/upload" element={<Upload user={user} />} />
        <Route path="/profile" element={<MyProfile user={user} />} />
        <Route path="/profile/:uid" element={<Profile user={user} />} /> {/* ✅ pass user */}
        <Route path="/artists" element={<Artists />} />
        <Route path="/following-feed" element={<Following user={user} />} />
      </Routes>
    </Router>
  );
}

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      setUser(firebaseUser);
      localStorage.setItem('user', JSON.stringify(firebaseUser));

      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          photo: firebaseUser.photoURL,
        }),
      });

      navigate('/profile');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav style={{ padding: '20px', fontSize: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Link to="/">🏠 Home</Link> |{' '}
        <Link to="/gallery">🖼️ Gallery</Link> |{' '}
        <Link to="/upload">📤 Upload</Link> |{' '}
        <Link to="/profile">👤 Profile</Link> |{' '}
        <Link to="/artists">🎨 Artists</Link>|{' '}
        <Link to="/following-feed">👀 Following Feed</Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {user ? (
          <>
            <img
              src={user.photoURL}
              alt="profile"
              style={{ width: '32px', height: '32px', borderRadius: '50%' }}
            />
            <button onClick={handleLogout} style={{ fontSize: '14px' }}>Logout</button>
          </>
        ) : (
          <button onClick={handleLogin} style={{ fontSize: '14px' }}>Login with Google</button>
        )}
      </div>
    </nav>
  );
}

export default App;