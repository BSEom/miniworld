import React, { useState } from 'react';
import './Header.css';

const Header = ({ visitCount }) => {
  const currentDate = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\. /g, '.').replace('.', '');
  const [todayMood, setTodayMood] = useState('😊');
  const moodOptions = ['😊', '😄', '😆', '🥰', '😎', '🤗', '😋', '🤔', '😴', '😵‍💫','😢','🥹'];

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
            <span className="avatar-emoji">{todayMood}</span>
              <button 
                className="mood-selector"
                onClick={() => {
                  const randomMood = moodOptions[Math.floor(Math.random() * moodOptions.length)];
                  setTodayMood(randomMood);
                }}>
              기분 바꾸기
            </button>
          </div>
          <div className="logo-text">
              <h1>유빈이의 미니홈피</h1>
              <p className='now-status'>집에 가고 싶어요...</p>
          </div>
        </div>
        
        <div className="header-right">
          <div className="visit-counter">
            <div className="visit-item">
              <span className="visit-label">오늘</span>
              <span className="visit-count today">{visitCount.today}</span>
            </div>
            <div className="visit-item">
              <span className="visit-label">전체</span>
              <span className="visit-count total">{visitCount.total}</span>
            </div>
          </div>
          
          {/* <div className="profile-avatar">
            <span className="avatar-emoji">😊</span>
            <div className="status-indicator online"></div>
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;