import React, { useState } from 'react';
import './LeftBar.css';
import './Theme.css';
import { getThemeClass } from '../utils/Theme';

const LeftBar = ({ onPageChange, todayMood}) => {
  const [bgmPlaying, setBgmPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState({
    title: '첫사랑',
    artist: '버즈',
    progress: 35
  });

  console.log("typeof:", typeof todayMood);
  return (
    <div className="sidebar">
      {/* 프로필 카드 */}
      <div className={`profile-card ${getThemeClass(todayMood)}`}>
        <div className="profile-header">
            <img className="profile-avatar" src="/img/avatar/profile.png" alt="profile" />
            <div className="level-badge">Lv.15</div>
            <div className="status-indicator online"></div>
          </div>
          <div className="profile-info">
            <h3 className="profile-name">박유빈</h3>
            <p className="profile-message">안녕하세요! 제 미니홈피에 오신걸 환영합니다 ^_^</p>
          </div>

      {/* BGM */}
      <div className="bgm-card">
        <div className="card-body">
          <div className={`bgm-player ${getThemeClass(todayMood)}`}>
            <div className="song-info">
              <p className="song-title">{currentSong.title}</p>
              <p className="song-artist">{currentSong.artist}</p>
            </div>
            <div className="player-controls">
              <button
                className={`play-btn ${getThemeClass(todayMood)} ${bgmPlaying ? 'playing' : ''}`}
                onClick={() => setBgmPlaying(!bgmPlaying)}
              >
                {bgmPlaying ? '⏸' : '▶'}
              </button>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${currentSong.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default LeftBar;