import React, { useState, useEffect } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todayMood, setTodayMood] = useState('😊');
  const [weatherIcon, setWeatherIcon] = useState('☀️');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const recentUpdates = [
    { type: 'diary', icon: '📔', title: '오늘의 일기를 작성했습니다', time: '2시간 전', isNew: true },
    { type: 'photo', icon: '📸', title: '사진 6장을 업로드했습니다', time: '5시간 전', isNew: true },
    { type: 'guestbook', icon: '💌', title: '방명록에 새로운 메시지가 있습니다', time: '1일 전', isNew: false },
    { type: 'friend', icon: '👥', title: '새로운 일촌 신청이 있습니다', time: '2일 전', isNew: false }
  ];

  const achievements = [
    { icon: '🏆', title: '인기 미니홈피', desc: '방문자 15,000명 달성!' },
    { icon: '✍️', title: '열정적인 블로거', desc: '다이어리 100개 작성' },
    { icon: '📸', title: '사진 수집가', desc: '사진 500장 업로드' },
    { icon: '💌', title: '인기쟁이', desc: '방명록 1,000개 달성' }
  ];

  const todayStats = {
    visitors: 47,
    newMessages: 12,
    photoUploads: 3,
    diaryWrites: 1
  };

  const moodOptions = ['😊', '😄', '😆', '🥰', '😎', '🤗', '😋', '🤔', '😴', '😵‍💫'];

  return (
    <div className="homepage">
      <div className="welcome-section">
        <div className="welcome-header">
          <div className="welcome-avatar">
            <span className="avatar-emoji">{todayMood}</span>
            <button 
              className="mood-selector"
              onClick={() => {
                const randomMood = moodOptions[Math.floor(Math.random() * moodOptions.length)];
                setTodayMood(randomMood);
              }}
            >
              기분 바꾸기
            </button>
          </div>
          <div className="welcome-text">
            <h1>안녕하세요! 유빈이 미니홈피입니다. 🌟</h1>
            <p className="welcome-message">
              제 미니홈피에 방문해주셔서 감사합니다!<br/>
              오늘도 즐거운 하루 되세요 ^^
            </p>
          </div>
        </div>

        <div className="status-bar">
          <div className="status-item">
            <span className="status-icon">🕐</span>
            <div className="status-info">
              <span className="status-label">현재 시간</span>
              <span className="status-value">{currentTime.toLocaleTimeString('ko-KR')}</span>
            </div>
          </div>
          <div className="status-item">
            <span className="status-icon">{weatherIcon}</span>
            <div className="status-info">
              <span className="status-label">오늘 날씨</span>
              <span className="status-value">맑음 30°C</span>
            </div>
          </div>
          <div className="status-item">
            <span className="status-icon">🎵</span>
            <div className="status-info">
              <span className="status-label">BGM</span>
              <span className="status-value">첫사랑 - 버즈</span>
            </div>
          </div>
        </div>
      </div>

      <div className="main-grid">
        <div className="left-column">
          <div className="today-stats-card">
            <h3 className="card-title">
              <span className="title-icon">📊</span>
              오늘의 현황
            </h3>
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-number">{todayStats.visitors}</div>
                <div className="stat-label">방문자</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{todayStats.newMessages}</div>
                <div className="stat-label">새 메시지</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{todayStats.photoUploads}</div>
                <div className="stat-label">사진 업로드</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{todayStats.diaryWrites}</div>
                <div className="stat-label">다이어리 작성</div>
              </div>
            </div>
          </div>

          <div className="recent-updates-card">
            <h3 className="card-title">
              <span className="title-icon">🔔</span>
              최근 업데이트
            </h3>
            <div className="updates-list">
              {recentUpdates.map((update, index) => (
                <div key={index} className="update-item">
                  <div className="update-icon">{update.icon}</div>
                  <div className="update-content">
                    <div className="update-title">
                      {update.title}
                      {update.isNew && <span className="new-badge">NEW</span>}
                    </div>
                    <div className="update-time">{update.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="right-column">
          <div className="achievements-card">
            <h3 className="card-title">
              <span className="title-icon">🏅</span>
              나의 성취
            </h3>
            <div className="achievements-grid">
              {achievements.map((achievement, index) => (
                <div key={index} className="achievement-item">
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-content">
                    <div className="achievement-title">{achievement.title}</div>
                    <div className="achievement-desc">{achievement.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="quick-actions-card">
            <h3 className="card-title">
              <span className="title-icon">⚡</span>
              빠른 실행
            </h3>
            <div className="quick-actions">
              <button className="quick-action-btn diary-btn">
                <span className="action-icon">📝</span>
                <span className="action-label">일기 쓰기</span>
              </button>
              <button className="quick-action-btn photo-btn">
                <span className="action-icon">📷</span>
                <span className="action-label">사진 올리기</span>
              </button>
              <button className="quick-action-btn message-btn">
                <span className="action-icon">💬</span>
                <span className="action-label">메시지 확인</span>
              </button>
              <button className="quick-action-btn profile-btn">
                <span className="action-icon">👤</span>
                <span className="action-label">프로필 수정</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-section">
        <div className="quote-card">
          <div className="quote-content">
            <span className="quote-icon">💫</span>
            <p className="quote-text">
              "오늘 하루도 소중한 추억을 만들어가세요!"
            </p>
            <div className="quote-author">- 오늘의 한마디 -</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;