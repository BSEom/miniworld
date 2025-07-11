import React from 'react';
import './Navigation.css';

const Navigation = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'home', label: '홈', icon: '🏠', color: '#ff6b9d' },
    { id: 'profile', label: '프로필', icon: '👤', color: '#4ecdc4' },
    { id: 'diary', label: '다이어리', icon: '📔', color: '#45b7d1' },
    { id: 'photos', label: '사진첩', icon: '📸', color: '#f9ca24' },
    { id: 'guestbook', label: '방명록', icon: '💌', color: '#f0932b' },
    { id: 'friends', label: '친구', icon: '👥', color: '#eb4d4b' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-tabs">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-tab ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => onPageChange(item.id)}
              style={{
                '--tab-color': item.color,
                '--tab-color-light': item.color + '20'
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {currentPage === item.id && (
                <div className="active-indicator"></div>
              )}
            </button>
          ))}
        </div>
        
        <div className="nav-actions">
          <button className="action-btn settings-btn">
            <span>⚙️</span>
          </button>
          <button className="action-btn logout-btn">
            <span>🚪</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;