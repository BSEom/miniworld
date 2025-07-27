import React from 'react';
import './DiaryCalendar.css'
import './Theme.css';
import { getThemeClass } from '../utils/Theme';

/**
 * DiaryCalendar: 월간 달력 렌더링 컴포넌트
 * props:
 * - currentDate: 현재 보고 있는 월(Date 객체)
 * - diaryEntries: 작성된 전체 일기 목록
 * - onDateClick: 날짜 클릭 시 실행될 함수
 * - todayMood: 오늘의 기분(이모지) → 테마에 적용됨
 */

const DiaryCalendar = ({ currentDate, diaryEntries, onDateClick, todayMood }) => {

  // 해당 월의 총 일 수
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // 해당 월의 1일이 무슨 요일인지 반환 (0: 일요일 ~ 6: 토요일)
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // 날짜를 yyyy-mm-dd 형식으로 변환
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 특정 날짜에 해당하는 일기 객체 찾기
  const getDiaryForDate = (day) => {
    const dateStr = formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    return diaryEntries.find(entry => {
      const entryDate = new Date(entry.selectDate); // selectDate는 ISO 문자열
      return formatDate(entryDate) === dateStr;
    });
  };


  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

   // 요일 헤더 생성
  const dayHeaders = dayNames.map(day => (
    <div key={day} className={`calendar-day-header ${getThemeClass(todayMood)}`}>{day}</div>
  ));

   // 해당 월 1일 이전의 빈 칸 생성
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="empty-day"></div>);
  }

  // 각 날짜 칸 생성
  for (let day = 1; day <= daysInMonth; day++) {
    const diary = getDiaryForDate(day);
    const isToday = new Date().getDate() === day &&
                    new Date().getMonth() === currentDate.getMonth() &&
                    new Date().getFullYear() === currentDate.getFullYear();

    const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

    days.push(
      <div
        key={day}
        className={`calendar-day ${diary ? 'has-diary' : ''} ${isToday ? 'today' : ''} ${getThemeClass(todayMood)}`}
        onClick={() => onDateClick(dateObj)}
      >
        <span className="calendar-day-number">{day}</span>

        {/* 일기가 있는 날은 이모지랑 비공개일때 잠금 표시 */}
        {diary && (
          <div className="calendar-indicator">
            {diary.isPublic === "N" && <span className="calendar-lock-icon">🔒</span>}
            <span>{diary.mood}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="calendar">
      <div className="calendar-grid">
        {dayHeaders}
        {days}
      </div>
    </div>
  );
};

export default DiaryCalendar;
