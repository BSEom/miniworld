import React from 'react';
import './DiaryCalendar.css'
<<<<<<< HEAD

const DiaryCalendar = ({ currentDate, diaryEntries, onDateClick }) => {
=======
import './Theme.css';
import { getThemeClass } from '../utils/Theme';

const DiaryCalendar = ({ currentDate, diaryEntries, onDateClick, todayMood }) => {
>>>>>>> main
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getDiaryForDate = (day) => {
    const dateStr = formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
<<<<<<< HEAD
    return diaryEntries.find(entry => entry.date === dateStr);
=======
    return diaryEntries.find(entry => {
      const entryDate = new Date(entry.selectDate); // selectDate는 ISO 문자열
      return formatDate(entryDate) === dateStr;
    });
>>>>>>> main
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  const dayHeaders = dayNames.map(day => (
<<<<<<< HEAD
    <div key={day} className="day-header">{day}</div>
=======
    <div key={day} className={`calendar-day-header ${getThemeClass(todayMood)}`}>{day}</div>
>>>>>>> main
  ));

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="empty-day"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const diary = getDiaryForDate(day);
    const isToday = new Date().getDate() === day &&
<<<<<<< HEAD
      new Date().getMonth() === currentDate.getMonth() &&
      new Date().getFullYear() === currentDate.getFullYear();
=======
                    new Date().getMonth() === currentDate.getMonth() &&
                    new Date().getFullYear() === currentDate.getFullYear();
>>>>>>> main

    const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

    days.push(
      <div
        key={day}
<<<<<<< HEAD
        className={`calendar-day ${diary ? 'has-diary' : ''} ${isToday ? 'today' : ''}`}
        onClick={() => onDateClick(dateObj)}
      >
        <span className="day-number">{day}</span>
        {diary && (
          <div className="diary-indicator">
            <span className="mood-icon">{diary.mood}</span>
=======
        className={`calendar-day ${diary ? 'has-diary' : ''} ${isToday ? 'today' : ''} ${getThemeClass(todayMood)}`}
        onClick={() => onDateClick(dateObj)}
      >
        <span className="calendar-day-number">{day}</span>
        {diary && (
          <div className="calendar-indicator">
            {diary.isPublic === "N" && <span className="calendar-lock-icon">🔒</span>}
            <span>{diary.mood}</span>
>>>>>>> main
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
