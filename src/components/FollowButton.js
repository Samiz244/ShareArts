import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FollowButton({ followerUid, followedUid }) {
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (!followerUid || !followedUid) return;

    const fetchFollowStatus = async () => {
      try {
        const res = await axios.get(`/api/follows/${followerUid}`);
        setFollowing(res.data.includes(followedUid));
      } catch (err) {
        console.error('❌ Failed to check follow status:', err);
      }
    };

    fetchFollowStatus();
  }, [followerUid, followedUid]);

  const handleToggle = async () => {
    try {
      const res = await axios.post('/api/follows', {
        follower_uid: followerUid,
        followed_uid: followedUid,
      });
      setFollowing(res.data.following);
    } catch (err) {
      console.error('❌ Failed to toggle follow:', err);
    }
  };

  if (!followerUid || followerUid === followedUid) return null; // Don't follow yourself

  return (
    <button
      onClick={handleToggle}
      style={{
        marginTop: '10px',
        padding: '6px 12px',
        borderRadius: '8px',
        background: following ? '#ccc' : '#007bff',
        color: following ? '#000' : '#fff',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 600,
      }}
    >
      {following ? '✓ Following' : '+ Follow'}
    </button>
  );
}

export default FollowButton;