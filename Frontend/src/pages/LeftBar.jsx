import React, { useState } from 'react';
import './LeftBar.css';

const LeftBar = ({ onPageChange }) => {
  const [bgmPlaying, setBgmPlaying] = useState(false);

  return (
    <div className="sidebar">
      {/* 프로필 카드 */}
      <div className="profile-card">
        <div className="profile-header">
            <span className="profile-avatar">😊</span>
            <div className="level-badge">Lv.15</div>
            <div className="status-indicator online"></div>
          </div>
          <div className="profile-info">
            <h3 className="profile-name">박유빈</h3>
            
            <p className="profile-message">안녕하세요! 제 미니홈피에 오신걸 환영합니다 ^_^</p>
          </div>
        
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-label">일촌</span>
            <span className="stat-value">24</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">방문</span>
            <span className="stat-value">15,847</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;