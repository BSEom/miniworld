import React, { useState } from 'react';
import './WriteDiaryPage.css';

const WriteDiaryPage = ({ onBack, onSaveDiary, selectedDate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [weather, setWeather] = useState('맑음');
  const [mood, setMood] = useState('😊');

  const formatDateForDisplay = (date) => {
    if (!date) return new Date().toLocaleDateString('ko-KR');
    const dateObj = new Date(date);
    return `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${String(dateObj.getDate()).padStart(2, '0')}`;
  };

  const formatDateForSave = (date) => {
    if (!date) {
      const today = new Date();
      return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    }
    if (typeof date === 'string') return date;
    const dateObj = new Date(date);
    return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요!');
      return;
    }

    const newDiary = {
      id: Date.now(),
      date: formatDateForSave(selectedDate),
      title: title.trim(),
      content: content.trim(),
      weather,
      mood
    };

    if (onSaveDiary) {
      onSaveDiary(newDiary);
    }
    
    // 저장 후 뒤로가기
    if (onBack) {
      onBack();
    }
  };

  const weatherOptions = [
    { value: '맑음', emoji: '☀️', label: '맑음' },
    { value: '흐림', emoji: '☁️', label: '흐림' },
    { value: '비', emoji: '🌧️', label: '비' }
  ];

  const moodOptions = ['😊', '😍', '🤔', '🥹', '😢', '😡', '😴', '🤗'];

  return (
    <div className="write-diary-page">
      <div className="write-diary-header">
        <button onClick={onBack} className="back-btn">← 뒤로가기</button>
        <h2>✏️ 일기 쓰기</h2>
        <div className="write-date">{formatDateForDisplay(selectedDate)}</div>
      </div>
            
      <div className="write-diary-content">
        <div className="diary-form">
          <div className="form-group">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="일기 제목을 입력하세요"
              maxLength={50}
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="오늘 하루는 어땠나요? 자유롭게 적어보세요!"
              rows={10}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>날씨</label>
              <div className="weather-options">
                {weatherOptions.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    className={`weather-btn ${weather === option.value ? 'selected' : ''}`}
                    onClick={() => setWeather(option.value)}
                  >
                    {option.emoji} {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>기분</label>
              <div className="mood-options">
                {moodOptions.map(moodOption => (
                  <button
                    key={moodOption}
                    type="button"
                    className={`mood-btn ${mood === moodOption ? 'selected' : ''}`}
                    onClick={() => setMood(moodOption)}
                  >
                    {moodOption}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button onClick={onBack} className="cancel-btn">취소</button>
            <button onClick={handleSave} className="save-btn">💾 저장하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteDiaryPage;