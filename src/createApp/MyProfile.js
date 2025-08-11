import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MyProfile({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    if (user.uid) {
      navigate(`/profile/${user.uid}`);
    }
  }, [user, navigate]);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      {!user ? (
        <h2 style={{ color: 'red' }}>❌ Please log in to view your profile.</h2>
      ) : (
        <h2>🔄 Loading your profile...</h2>
      )}
    </div>
  );
}

export default MyProfile;