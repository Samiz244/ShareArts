import React, { useState } from 'react';
import axios from 'axios'; // ✅ Make sure axios is imported

function Upload({ user }) {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('📤 FORM SUBMITTED');
    const payload = {
      uid: user?.uid,
      artist: user?.displayName,
      title,
      image: imageUrl,
    };

    console.log('Payload:', payload);

    try {
      const response = await axios.post('/api/art', payload); // ✅ Real POST
      console.log('✅ Artwork uploaded!', response.data);
      setSuccess(true);
      setTitle('');
      setImageUrl('');
    } catch (error) {
      console.error('❌ Upload failed:', error.response?.data || error.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h2>Upload Your Artwork</h2>

      {!user ? (
        <p style={{ color: 'red' }}>Please log in to upload</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
            required
          />
          <input
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
            required
          />
          <button type="submit" style={{ padding: '10px 20px' }}>Upload</button>
        </form>
      )}

      {success && (
        <p style={{ color: 'green', marginTop: '20px' }}>✅ Artwork successfully uploaded!</p>
      )}
    </div>
  );
}

export default Upload;