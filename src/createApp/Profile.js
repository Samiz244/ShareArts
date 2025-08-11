import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LikeButton from '../components/LikeButton';
import CommentBox from '../components/CommentBox';
import FollowButton from '../components/FollowButton';

function Profile({ user }) {
  const { uid } = useParams();
  const [artist, setArtist] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const resUser = await axios.get(`/api/users/${uid}`);
      setArtist(resUser.data);

      const resArt = await axios.get(`/api/art?uid=${uid}`);
      setArtworks(resArt.data);

      const resFollowers = await axios.get(`/api/follows/count/${uid}`);
      setFollowerCount(resFollowers.data.count);
    };
    fetch();
  }, [uid]);

  if (!artist) return <p style={{ padding: '40px' }}>🔄 Loading artist profile...</p>;

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '30px' }}>
        <img
          src={artist.photo}
          alt={artist.name}
          style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
        />
        <div>
          <h2>{artist.name}</h2>
          <p>{artist.email}</p>
          <p style={{ fontSize: '0.9em', color: '#666' }}>🧑‍🤝‍🧑 Followers: {followerCount}</p>
          <FollowButton followerUid={user?.uid} followedUid={artist.uid} />
        </div>
      </div>

      <h3>🎨 {artist.name}'s Artworks</h3>
      <div
        style={{
          display: 'grid',
          gap: '30px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          marginTop: '20px',
        }}
      >
        {artworks.map((art) => (
          <div key={art.id} style={{ background: '#fff', borderRadius: '12px', padding: '16px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
            <img src={art.image} alt={art.title} style={{ width: '100%', borderRadius: '10px', marginBottom: '10px' }} />
            <h4>{art.title}</h4>
            <LikeButton artId={art.id} uid={user?.uid} />
            <CommentBox artId={art.id} uid={user?.uid} />
            <p style={{ fontSize: '0.8em', color: '#999' }}>{new Date(art.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;