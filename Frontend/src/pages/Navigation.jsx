// Navigation.jsx
import React from 'react';
import './Navigation.css';
import { getThemeClass } from '../utils/Theme';

const Navigation = ({ currentPage, onPageChange, todayMood }) => {
  const navItems = [
    { id: 'home', label: '홈', icon: '🏠' },
    { id: 'profile', label: '프로필', icon: '👤' },
    { id: 'diary', label: '다이어리', icon: '📔' },
    { id: 'photos', label: '사진첩', icon: '📸' },
    { id: 'guestbook', label: '방명록', icon: '💌' },
    { id: 'friends', label: '친구', icon: '👥' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-tabs">
          {navItems.map(item => (
            <button 
              key={item.id}
              className={`nav-tab ${getThemeClass(todayMood)} ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => onPageChange(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {currentPage === item.id && (
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
