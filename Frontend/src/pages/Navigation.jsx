// Navigation.jsx
import React from 'react';
import './Navigation.css';
import { getThemeClass } from '../utils/Theme';
import { useLocation } from 'react-router-dom';


const Navigation = ({ userId, onPageChange, todayMood }) => {
  const location = useLocation();
  // const userId = localStorage.getItem("userId");
  const navItems = [
    { id: 'home', label: '홈', icon: '🏠', path: userId ? `/home/${userId}` : '/home' },
    { id: 'profile', label: '프로필', icon: '👤', path: userId ? `/profile/${userId}` : '/profile' },
    { id: 'diary', label: '다이어리', icon: '📔', path: userId ? `/diary/${userId}` : '/diary' },
    { id: 'photos', label: '사진첩', icon: '📸', path: userId ? `/photos/${userId}` : '/photos' },
    { id: 'guestbook', label: '방명록', icon: '💌', path: userId ? `/guestbook/${userId}` : '/guestbook' },
    { id: 'friends', label: '친구', icon: '👥', path: userId ? `/friends/${userId}` : '/friends' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-tabs">
          {navItems.map(item => (
            <button 
              key={item.id}
              className={`nav-tab ${getThemeClass(todayMood)} ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => onPageChange(item.path)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {location.pathname === item.path && (
                <div className="active-indicator"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
