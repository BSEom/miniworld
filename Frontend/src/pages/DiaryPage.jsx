import React, { useState } from 'react';
import Calendar from './DiaryCalendar';
import './DiaryPage.css';
import './Theme.css';
import { getThemeClass } from '../utils/Theme';

/**
 * DiaryPage: 달력과 일기 보기 기능이 있는 메인 페이지
 * props:
 * - onNavigateToWrite: 일기 작성 페이지로 이동하는 함수
 * - onNavigateToEdit: 일기 수정 페이지로 이동하는 함수
 * - diaryEntries: 전체 일기 데이터 배열
 * - todayMood: 오늘의 기분 (이모지 기반 테마용)
 */

const DiaryPage = ({ userId, onNavigateToWrite, onNavigateToEdit, diaryEntries, todayMood = [] }) => {

  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 보고 있는 월
  const [selectedDate, setSelectedDate] = useState(null);     // 클릭한 날짜
  const [showDiary, setShowDiary] = useState(false);          // 일기 표시 여부

  const myUserId = localStorage.getItem("userId");

  const isMyPage = String(userId) === String(myUserId);

  // 날짜를 yyyy-mm-dd 형식으로 변환
  const formatDate = (date) => {

    const year = date.getFullYear(); // 연도 4자리 숫자로 반환

    // getMonth는 월을 반환하지만 0부터 시작하기 때문에 +1 해줘야됨
    const month = String(date.getMonth() + 1).padStart(2, '0'); // padStart는 앞을 0으로 채워 2자리로 만들어줌

    // getDate는 1~31일까지 반환하기 때문에 +1 안해줘도 됨
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  // 일기  UI 출력용 날짜 포맷 (예: 2025.07.27)
  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString);

    // formatDate와 같은 구조
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };


  // 특정 날짜에 해당하는 일기 데이터 반환
  const getDiaryForDate = (date) => {
    // 위에서 선언한 formatDate 함수를 이용해 yyyy-mm-dd 형식으로 변환해줌
    const dateStr = formatDate(date);

    // diaryEntries는 MainLayout.jsx에서 props로 전달된 전체 일기 데이터 배열
    return diaryEntries.find(entry => formatDate(new Date(entry.selectDate)) === dateStr);
  };

  // 날짜 클릭 시 일기 표시
  const handleDateClick = (date) => {
    setSelectedDate(date);
    const found = getDiaryForDate(date);
    setShowDiary(!!found);
  };

  // 새 일기 작성 페이지로 이동
  const handleWriteNewDiary = () => {
    if (onNavigateToWrite) {
      onNavigateToWrite(selectedDate);
    }
  };

  // 기존 일기 수정 페이지로 이동
  const handleEditDiary = () => {
    const diary = getDiaryForDate(selectedDate);
    if (onNavigateToEdit && diary) {
      onNavigateToEdit(selectedDate, diary);
    }
  };


  // 월 변경 (이전/다음 달)
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
    setShowDiary(false);
    setSelectedDate(null);
  };

  const selectedDiary = selectedDate ? getDiaryForDate(selectedDate) : null;

  return (
    <div className={`calendar-diary-page ${getThemeClass(todayMood)}`}>
      {/* 상단 - 캘린더 헤더 */}
      <div className="calendar-header">
        <h2>📅 나의 다이어리 캘린더</h2>
        <div className="calendar-month-navigation">
          <button onClick={() => navigateMonth(-1)} className={`calendar-nav-btn ${getThemeClass(todayMood)}`}>‹</button>
          <span className="calendar-current-month">
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
          </span>
          <button onClick={() => navigateMonth(1)} className={`calendar-nav-btn ${getThemeClass(todayMood)}`}>›</button>
        </div>
      </div>

      {/* 본문 - 캘린더와 일기 */}
      <div className="calendar-content">
        {/* 좌측 - 달력 */}
        <div className="calendar-section">
          <Calendar
            currentDate={currentDate}
            diaryEntries={diaryEntries}
            onDateClick={handleDateClick}
            todayMood={todayMood}
          />
        </div>

        {/* 우측 - 일기 상세 보기 */}
        <div className="diary-section">
          {selectedDate && (
            <div className="selected-date-info">
              <div className="calendar-date-header">
                <h3>{formatDateForDisplay(formatDate(selectedDate))}</h3>
                {showDiary && selectedDiary && isMyPage && (
                  <button className="write-btn" onClick={handleEditDiary}>
                    ✏️ 편집
                  </button>
                )}
              </div>

              {/* 일기 존재 여부에 따라 분기 */}
              {showDiary && selectedDiary ? (
                <div className="diary-detail">
                  <div className="diary-meta">
                    <span className="weather">
                      {selectedDiary.weather === '맑음' ? '☀️' : selectedDiary.weather === '흐림' ? '☁️' : '🌧️'}
                      {selectedDiary.weather}
                    </span>
                    <span className="mood">
                      {selectedDiary.mood}
                    </span>
                  </div>
                  <h4>
                    {selectedDiary.title}
                    {selectedDiary.isPublic === "N" && <span className="diary-lock-icon">🔒</span>}
                  </h4>
                  <p>{selectedDiary.content}</p>
                </div>
              ) : (
                <div className="no-diary">
                  <p>
                    {formatDate(selectedDate) === formatDate(new Date())
                      ? '오늘은 일기가 없어요'
                      : '이 날에는 일기가 없어요'}
                  </p>
                  {isMyPage && (
                    <button className="write-btn" onClick={handleWriteNewDiary}>
                      ✏️ 새 일기 쓰기
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
          {/* 아무 날짜도 선택하지 않았을 때 */}
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