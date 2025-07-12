import React, { useState } from 'react';
import './RightBar.css';

const RightBar = ({ onPageChange }) => {
  const [bgmPlaying, setBgmPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState({
    title: '첫사랑',
    artist: '버즈',
    progress: 35
  });

  const recentVisitors = [
    { name: '정현', time: '2분전', avatar: '😊', isOnline: true },
    { name: '은지', time: '5분전', avatar: '😄', isOnline: false },
    { name: '서영', time: '1시간전', avatar: '😉', isOnline: true },
    { name: '보성', time: '3시간전', avatar: '🤓', isOnline: false }
  ];

  const ilchonFriends = [
    { name: '정민', status: '온라인', avatar: '😎', mood: '행복해요~' },
    { name: '은희', status: '자리비움', avatar: '🤗', mood: '밥먹는중' },
    { name: '혜빈', status: '온라인', avatar: '😋', mood: '공부중..' },
    { name: '혜미', status: '오프라인', avatar: '😴', mood: '잠시 자리를 비웠어요' }
  ];

  return (
    <div className="sidebar">
      {/* BGM */}
      <div className="bgm-card">
        <div className="card-header">
          <span className="header-icon">🎵</span>
          BGM
        </div>
        <div className="card-body">
          <div className="bgm-player">
            <div className="song-info">
              <p className="song-title">{currentSong.title}</p>
              <p className="song-artist">{currentSong.artist}</p>
            </div>
            <div className="player-controls">
              <button
                className={`play-btn ${bgmPlaying ? 'playing' : ''}`}
                onClick={() => setBgmPlaying(!bgmPlaying)}
              >
                {bgmPlaying ? '⏸️' : '▶️'}
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

      {/* 최근 방문자 */}
      <div className="visitors-card">
        <div className="card-header">
          <span className="header-icon">👋</span>
          최근 방문자
        </div>
        <div className="card-body">
          <div className="visitor-list">
            {recentVisitors.map((visitor, index) => (
              <div key={index} className="visitor-item">
                {/* <div className="visitor-avatar">
                  <span className="avatar">{visitor.avatar}</span>
                </div> */}
                <div className="visitor-info">
                  <p className="visitor-name">{visitor.name}</p>
                  <p className="visitor-time">{visitor.time}</p>
                  {visitor.isOnline && <div className="online-dot"></div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 일촌 친구 */}
      <div className="friends-card">
        <div className="card-header">
          <span className="header-icon">💕</span>
          일촌 친구
        </div>
        <div className="card-body">
          <div className="friend-list">
            {ilchonFriends.slice(0, 3).map((friend, index) => (
              <div key={index} className="friend-item">
                <div className="friend-avatar">
                  <span className="avatar-emoji">{friend.avatar}</span>
                  <div className={`status-dot ${friend.status === '온라인' ? 'online' : friend.status === '자리비움' ? 'away' : 'offline'}`}></div>
                </div>
                <div className="friend-info">
                  <p className="friend-name">{friend.name}</p>
                  <p className="friend-mood">{friend.mood}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="view-all-btn" onClick={() => onPageChange('friends')}>
            전체보기 →
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightBar;