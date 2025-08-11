import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProfilePage() {
  const { uid } = useParams();
  const [user, setUser] = useState(null);
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/api/users/${uid}`);
        setUser(res.data);
      } catch (err) {
        console.error('Failed to load user:', err);
      }
    };

    const fetchArt = async () => {
      try {
        const res = await axios.get(`/api/art?uid=${uid}`);
        setArtworks(res.data);
      } catch (err) {
        console.error('Failed to load artwork:', err);
      }
    };

    fetchProfile();
    fetchArt();
  }, [uid]);

  if (!user) return <p style={{ textAlign: 'center' }}>Loading profile...</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <img src={user.photo} alt="Profile" style={{ borderRadius: '50%', width: '100px' }} />
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>👥 0 followers</p> {/* Placeholder */}
          <p>📝 Bio coming soon...</p> {/* Placeholder */}
        </div>
      </div>

      <h3 style={{ marginTop: '30px' }}>🎨 Artworks</h3>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {artworks.map((art) => (
          <img key={art.id} src={art.image} alt={art.title} style={{ width: '200px', borderRadius: '10px' }} />
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;