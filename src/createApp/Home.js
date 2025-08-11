function Home() {
    return (
      <div style={{ maxWidth: '600px', margin: '40px auto' }}>
        <h2>🎨 Featured Art Feed</h2>
  
        <div style={{
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '16px',
          marginBottom: '20px'
        }}>
          <div style={{ fontWeight: 'bold' }}>@art_by_sammy</div>
          <img 
            src="https://picsum.photos/500/300" 
            alt="Artwork" 
            style={{ width: '100%', borderRadius: '8px', marginTop: '10px' }}
          />
          <div style={{ marginTop: '10px' }}>🖌️ “Reflections in Time”</div>
          <div style={{ color: '#999', fontSize: '14px' }}>Tags: #digital #surreal #colorblast</div>
          <div style={{ marginTop: '10px' }}>
            ❤️ 122 Likes &nbsp;&nbsp; 💬 4 Comments &nbsp;&nbsp; 🔖
          </div>
        </div>
      </div>
    );
  }
  
  export default Home;