import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LikeButton from '../components/LikeButton';
import CommentBox from '../components/CommentBox';

function Gallery({ user }) {
  const [artworks, setArtworks] = useState([]);
  const [followedUIDs, setFollowedUIDs] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchFollowsAndArt = async () => {
      try {
        // Step 1: Get who the user follows
        const followRes = await axios.get(`/api/follows/${user.uid}`);
        const followed = followRes.data;

        // Step 2: Get all art
        const artRes = await axios.get('/api/art');
        const allArt = artRes.data;

        // Step 3: Filter art by followed users only (exclude self unless following self)
        const filteredArt = allArt.filter((art) =>
          followed.includes(art.uid)
        );

        setArtworks(filteredArt);
        setFollowedUIDs(followed);
      } catch (err) {
        console.error('❌ Gallery load failed:', err);
      }
    };

    fetchFollowsAndArt();
  }, [user]);

  if (!user) {
    return (
      <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
        <h2 style={{ color: 'red' }}>Please log in to view your gallery feed.</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h2>🖼️ Your Gallery Feed</h2>
      {artworks.length === 0 ? (
        <p style={{ marginTop: '20px' }}>
          Your feed is empty! Follow some artists to see their posts here.
        </p>
      ) : (
        <div
          style={{
            display: 'grid',
            gap: '30px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            marginTop: '30px',
          }}
        >
          {artworks.map((art) => (
            <div
              key={art.id}
              style={{
                background: '#fff',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                padding: '16px',
                textAlign: 'center',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <img
                src={art.image}
                alt={art.title}
                style={{ width: '100%', borderRadius: '10px', marginBottom: '10px' }}
              />
              <h4>{art.title}</h4>
              <LikeButton artId={art.id} uid={user?.uid} />
              <CommentBox artId={art.id} uid={user?.uid} />
              <p style={{ fontSize: '0.8em', color: '#999' }}>
                {new Date(art.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;