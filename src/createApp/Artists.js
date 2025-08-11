import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Artists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/users');
        setArtists(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch artists:', err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h2>🎨 All Artists</h2>
      <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        {artists.map((artist) => (
          <Link
            key={artist.uid}
            to={`/profile/${artist.uid}`} // ✅ Correct dynamic route
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '20px',
              textAlign: 'center',
              textDecoration: 'none',
              color: 'black',
              transition: '0.2s',
            }}
          >
            <img
              src={artist.photo}
              alt={artist.name}
              style={{ borderRadius: '50%', width: '80px', height: '80px', objectFit: 'cover', marginBottom: '10px' }}
            />
            <h3>{artist.name}</h3>
            <p style={{ fontSize: '0.9em' }}>{artist.email}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Artists;