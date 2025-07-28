import React, { useState } from 'react';
<<<<<<< HEAD
// import './RightBar.css';
=======
import { getThemeClass } from '../utils/Theme';
import './RightBar.css';
>>>>>>> main

const RightBar = (todayMood) => {

  // 최근 방문자
  const recentVisitors = [
    { name: '정현', status:'온라인', time: '2분전', avatar: '😊', mood:'집에 가고 싶어요...' },
    { name: '은지', status:'자리비움', time: '5분전', avatar: '😄', mood:'드라마 보는중...' },
    { name: '서영', status:'오프라인', time: '1시간전', avatar: '😉', mood:'bye bye🤚' },
    { name: '보성', status:'온라인', time: '3시간전', avatar: '🤓', mood:'안녕하세요' }
  ];
  // 일촌 친구
  const ilchonFriends = [
    { name: '정민', status: '온라인', avatar: '😎', mood: '행복해요~' },
    { name: '은희', status: '자리비움', avatar: '🤗', mood: '미궁게임 하는중..' },
    { name: '혜빈', status: '온라인', avatar: '😋', mood: '공부중..' },
    { name: '혜미', status: '오프라인', avatar: '😴', mood: 'bye bye🤚' }
  ];

  return (
    <div className='rightbar'>
      {/* 일촌 친구 */}
      <div className="friends-card">
        <div className={`card-header ${getThemeClass(todayMood.todayMood)}`}>
          <span>💕 일촌 친구</span>
        </div>
        <div className="card-body">
          <div className="friend-list">
            {ilchonFriends.slice(0, 4).map((friend, index) => (
              <div key={index} className="friend-item">
                <div className="friend-avatar">
                  <span className="friend-avatar">{friend.avatar}</span>
                  <div className={`status-dot ${friend.status === '온라인' ? 'online' : friend.status === '자리비움' ? 'away' : 'offline'}`}></div>
                </div>
                <div className="friend-info">
                  <p className="friend-name">{friend.name}</p>
                  <p className="friend-mood">{friend.mood}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 최근 방문자 */}
      <div className="visitors-card">
        <div className={`card-header ${getThemeClass(todayMood.todayMood)}`}>
          <span>👋</span>
          <span>최근 방문자</span>
        </div>
        <div className="card-body">
          <div className="visitor-list">
            {recentVisitors.slice(0, 3).map((visitor, index) => (
              <div key={index} className="visitor-item">
                <div className="visitor-avatar">
                  <span className="avatar">{visitor.avatar}</span>
                  <div className={`status-dot ${visitor.status === '온라인' ? 'online' : visitor.status === '자리비움' ? 'away' : 'offline'}`}></div>
                </div>
                <div className="visitor-info">
                  <p className="visitor-name">{visitor.name}</p>
                  <p className="visitor-mood">{visitor.mood}</p>
                  <p className="visitor-time">{visitor.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;