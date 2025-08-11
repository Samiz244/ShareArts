import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CommentBox({ artId, uid }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/comments/${artId}`);
      setComments(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch comments:', err);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comments/${artId}`);
        setComments(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch comments:', err);
      }
    };
  
    fetchComments();
  }, [artId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await axios.post('/api/comments', { art_id: artId, uid, content });
      setContent('');
      fetchComments(); // Refresh comments
    } catch (err) {
      console.error('❌ Failed to post comment:', err);
    }
  };

  return (
    <div style={{ marginTop: '20px', fontFamily: 'sans-serif' }}>
      <h4 style={{ marginBottom: '8px' }}>💬 Comments</h4>

      {comments.length === 0 ? (
        <p>No comments yet. Be the first to say something!</p>
      ) : (
        <ul style={{ padding: 0, listStyle: 'none', marginBottom: '10px' }}>
          {comments.map((c) => (
            <li key={c.id} style={{ padding: '6px 0', borderBottom: '1px solid #eee' }}>
              <strong>{c.name}</strong> <br />
              <span style={{ fontSize: '0.9em' }}>{c.content}</span>
              <div style={{ fontSize: '0.75em', color: '#999' }}>
                {new Date(c.created_at).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}

      {uid ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            rows={2}
            style={{ width: '100%', padding: '8px', resize: 'none' }}
          />
          <button type="submit" style={{ marginTop: '5px', padding: '6px 12px' }}>
            Submit
          </button>
        </form>
      ) : (
        <p style={{ color: 'red', fontStyle: 'italic' }}>Login to leave a comment.</p>
      )}
    </div>
  );
}

export default CommentBox;