import React from 'react';
import './FriendsPage.css';

const FriendsPage = () => {
  return (
    <div className="friends-page">
      <h2>👥 친구 목록</h2>
      <p>친구들의 미니홈피를 구경해보세요.</p>
      <div style={{ width: "100%", borderRadius: "8px", padding: "10px", backgroundColor: "#fff", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
        안정민
      </div>
    </div>
  );
};

export default FriendsPage;
