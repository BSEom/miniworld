import React, { useState, useRef, useEffect } from 'react';
import './Header.css';
import './Theme.css';
import { getThemeClass } from '../utils/Theme';

const Header = ({ userId, visitCount, todayMood, setTodayMood, onRegisterClick }) => {
  const [nickname, setNickname] = useState("");

  const currentDate = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\. /g, '.').replace('.', '');
  // const [todayMood, setTodayMood] = useState('😊');
  const moodOptions = ['😊', '😄', '😆', '🥰', '🤗', '😎', '✈️', '😴', '😵‍💫','😢','🥹', '😡'];
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const moodRef = useRef(null);
  // const [visitCount, setVisitCount] = useState({ today: 127, total: 15847 });

  useEffect(() => {
    if (!userId) return;
    fetch(`/api/users/who/${userId}`)
      .then(res => res.text())
      .then(setNickname)
      .catch(() => setNickname(""));
  }, [userId]);
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (moodRef.current && !moodRef.current.contains(event.target)) {
        setShowMoodSelector(false);
      }
    }
    if (showMoodSelector) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMoodSelector]);

  const handleMoodSelectorClick = () => {
    setShowMoodSelector(!showMoodSelector);
  };

  return (
    <header className={`header ${getThemeClass(todayMood)}`}>
      <div className="header-content">
        <div className="header-left">
          <div className="logo" ref={moodRef}>
            <span className="avatar-emoji">{todayMood}</span>
            <button 
              className="mood-selector"
              onClick={handleMoodSelectorClick}>
              기분 바꾸기
            </button>
            {showMoodSelector && (
              <div className="mood-options">
                {moodOptions.map((mood, idx) => (
                  <button
                    key={mood}
                    className="mood-option-btn"
                    onClick={() => {
                      setTodayMood(mood);
                      setShowMoodSelector(false);
                    }}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="logo-text">
              <h1>{nickname ? nickname : `User ${userId}`}의 미니홈피</h1>
              <p className='now-status'>프로젝트 열씨미 합시당!! 😁</p>
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