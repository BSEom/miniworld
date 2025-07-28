// Navigation.jsx
import React from 'react';
import './Navigation.css';
import { getThemeClass } from '../utils/Theme';
<<<<<<< HEAD

const Navigation = ({ currentPage, onPageChange, todayMood }) => {
  const navItems = [
    { id: 'home', label: '홈', icon: '🏠' },
    { id: 'profile', label: '프로필', icon: '👤' },
    { id: 'diary', label: '다이어리', icon: '📔' },
    { id: 'photos', label: '사진첩', icon: '📸' },
    { id: 'guestbook', label: '방명록', icon: '💌' },
    { id: 'friends', label: '친구', icon: '👥' }
=======
import { useLocation } from 'react-router-dom';


const Navigation = ({ onPageChange, todayMood }) => {
  const location = useLocation();
  const userId = localStorage.getItem("userId");
  const navItems = [
    { id: 'home', label: '홈', icon: '🏠', path: userId ? `/home/${userId}` : '/home' },
    { id: 'profile', label: '프로필', icon: '👤', path: userId ? `/profile/${userId}` : '/profile' },
    { id: 'diary', label: '다이어리', icon: '📔', path: userId ? `/diary/${userId}` : '/diary' },
    { id: 'photos', label: '사진첩', icon: '📸', path: userId ? `/photos/${userId}` : '/photos' },
    { id: 'guestbook', label: '방명록', icon: '💌', path: userId ? `/guestbook/${userId}` : '/guestbook' },
    { id: 'friends', label: '친구', icon: '👥', path: userId ? `/friends/${userId}` : '/friends' }
>>>>>>> main
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-tabs">
          {navItems.map(item => (
            <button 
              key={item.id}
<<<<<<< HEAD
              className={`nav-tab ${getThemeClass(todayMood)} ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => onPageChange(item.id)}
=======
              className={`nav-tab ${getThemeClass(todayMood)} ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => onPageChange(item.path)}
>>>>>>> main
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {location.pathname === item.path && (
                <div className="active-indicator"></div>
              )}
            </button>
          ))}
        </div>
<<<<<<< HEAD

        <div className="nav-actions">
          <button className="action-btn settings-btn">
            <span>⚙️</span>
          </button>
          <button className="action-btn logout-btn">
            <span>🚪</span>
          </button>
        </div>
=======
>>>>>>> main
      </div>
    </nav>
  );
};

export default Navigation;
