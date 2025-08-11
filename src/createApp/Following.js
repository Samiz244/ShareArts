import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Following({ user }) {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;

    const fetch = async () => {
      const res = await axios.get(`/api/follows/${user.uid}`);
      const followedUids = res.data;

      const userRes = await axios.get('/api/users');
      const allUsers = userRes.data;

      const filtered = allUsers.filter((u) => followedUids.includes(u.uid));
      setArtists(filtered);
    };

    fetch();
  }, [user]);

  if (!user) return <p style={{ padding: '40px' }}>Login to view your followed artists.</p>;

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h2>👀 Artists You Follow</h2>
      {artists.length === 0 ? (
        <p>You aren't following anyone yet.</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {artists.map((artist) => (
            <Link
              to={`/profile/${artist.uid}`}
              key={artist.uid}
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '16px',
                textAlign: 'center',
                textDecoration: 'none',
                color: 'black',
                background: '#fff',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
              }}
            >
              <img src={artist.photo} alt={artist.name} style={{ width: '80px', borderRadius: '50%' }} />
              <h4>{artist.name}</h4>
              <p style={{ fontSize: '0.85em' }}>{artist.email}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Following;