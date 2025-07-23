import React from 'react';
import './DiaryCalendar.css'

const Calendar = ({ currentDate, diaryEntries, onDateClick }) => {
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
    return diaryEntries.find(entry => entry.date === dateStr);
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  const dayHeaders = dayNames.map(day => (
    <div key={day} className="day-header">{day}</div>
  ));

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="empty-day"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const diary = getDiaryForDate(day);
    const isToday = new Date().getDate() === day &&
                    new Date().getMonth() === currentDate.getMonth() &&
                    new Date().getFullYear() === currentDate.getFullYear();

    const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

    days.push(
      <div
        key={day}
        className={`calendar-day ${diary ? 'has-diary' : ''} ${isToday ? 'today' : ''}`}
        onClick={() => onDateClick(dateObj)}
      >
        <span className="day-number">{day}</span>
        {diary && (
          <div className="diary-indicator">
            <span className="mood-icon">{diary.mood}</span>
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
