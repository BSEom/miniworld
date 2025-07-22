import React, { useState } from 'react';
import Calendar from './Calendar';
import './DiaryPage.css';

const DiaryPage = ({ onNavigateToWrite, diaryEntries = [] }) => {

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDiary, setShowDiary] = useState(false);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  const getDiaryForDate = (date) => {
    const dateStr = formatDate(date);
    return diaryEntries.find(entry => entry.date === dateStr);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const found = getDiaryForDate(date);
    setShowDiary(!!found);
  };

  const handleWriteNewDiary = () => {
    if (onNavigateToWrite) {
      onNavigateToWrite(selectedDate);
    }
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
    setShowDiary(false);
    setSelectedDate(null);
  };

  const selectedDiary = selectedDate ? getDiaryForDate(selectedDate) : null;

  return (
    <div className="calendar-diary-page">
      <div className="calendar-header">
        <h2>📅 나의 다이어리 캘린더</h2>
        <div className="month-navigation">
          <button onClick={() => navigateMonth(-1)} className="nav-btn">‹</button>
          <span className="current-month">
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
          </span>
          <button onClick={() => navigateMonth(1)} className="nav-btn">›</button>
        </div>
      </div>

      <div className="calendar-content">
        <div className="calendar-section">
          <Calendar
            currentDate={currentDate}
            diaryEntries={diaryEntries}
            onDateClick={handleDateClick}
          />
        </div>

        <div className="diary-section">
          {selectedDate && (
            <div className="selected-date-info">
              <h3>{formatDateForDisplay(formatDate(selectedDate))}</h3>
              {showDiary && selectedDiary ? (
                <div className="diary-detail">
                  <div className="diary-meta">
                    <span className="weather">
                      {selectedDiary.weather === '맑음' ? '☀️' : selectedDiary.weather === '흐림' ? '☁️' : '🌧️'}
                      {selectedDiary.weather}
                    </span>
                    <span className="mood">{selectedDiary.mood}</span>
                  </div>
                  <h4>{selectedDiary.title}</h4>
                  <p>{selectedDiary.content}</p>
                </div>
              ) : (
                <div className="no-diary">
                  <p>
                    {formatDate(selectedDate) === formatDate(new Date())
                      ? '오늘은 일기가 없어요'
                      : '이 날에는 일기가 없어요'}
                  </p>
                  <button className="write-new-btn" onClick={handleWriteNewDiary}>
                    ✏️ 새 일기 쓰기
                  </button>
                </div>
              )}
            </div>
          )}
          {!selectedDate && (
            <div className="no-selection">
              <p>📝 날짜를 클릭해보세요!</p>
              <p className="hint">일기가 있는 날에는 이모지가 표시돼요</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiaryPage;