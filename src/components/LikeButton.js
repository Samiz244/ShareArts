import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LikeButton({ artId, uid }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Fetch initial count
    const fetchCount = async () => {
      const res = await axios.get(`/api/likes/count/${artId}`);
      setCount(res.data.count);
    };

    // Check if this user already liked
    const checkLiked = async () => {
      const res = await axios.get(`/api/likes/check?art_id=${artId}&uid=${uid}`);
      setLiked(res.data.liked);
    };

    if (uid) {
      fetchCount();
      checkLiked();
    }
  }, [artId, uid]);

  const handleToggleLike = async () => {
    try {
      const res = await axios.post('/api/likes', { art_id: artId, uid });
      setLiked(res.data.liked);
      setCount((prev) => prev + (res.data.liked ? 1 : -1));
    } catch (err) {
      console.error('❌ Like error:', err);
    }
  };

  return (
    <div style={{ marginTop: '10px' }}>
      <button
        onClick={handleToggleLike}
        style={{
          backgroundColor: liked ? '#e74c3c' : '#ccc',
          border: 'none',
          padding: '6px 12px',
          borderRadius: '8px',
          cursor: 'pointer',
          color: 'white',
        }}
      >
        ❤️ {count}
      </button>
    </div>
  );
}

export default LikeButton;