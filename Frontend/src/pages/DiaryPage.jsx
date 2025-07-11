import React, { useState } from 'react';
import './DiaryPage.css';

const DiaryPage = () => {
  const [diaryEntries] = useState([
    {
      id: 1,
      date: '2025.07.11',
      title: '오늘의 일기',
      content: '오늘은 정말 좋은 하루였다. 친구들과 함께 카페에서 수다를 떨고, 새로운 책도 읽었다. 이런 평범한 일상이 얼마나 소중한지 다시 한번 느꼈다.',
      weather: '맑음',
      mood: '😊'
    },
    {
      id: 2,
      date: '2025.07.10',
      title: '영화 관람 후기',
      content: '오늘 본 영화가 정말 인상깊었다. 스토리도 좋고 연출도 훌륭했다. 다음에 또 보고 싶을 정도로 재미있었다.',
      weather: '흐림',
      mood: '😍'
    },
    {
      id: 3,
      date: '2025.07.09',
      title: '새로운 취미',
      content: '요즘 사진 찍는 재미에 푹 빠져있다. 일상의 소소한 순간들을 담아보니 세상이 더 아름답게 보인다.',
      weather: '비',
      mood: '🤔'
    }
  ]);

  return (
    <div className="diary-page">
      <div className="diary-header">
        <h2>📝 나의 일기장</h2>
        <div className="diary-stats">
          <span>총 {diaryEntries.length}개의 일기</span>
        </div>
      </div>

      <div className="diary-list">
        {diaryEntries.map(entry => (
          <div key={entry.id} className="diary-entry">
            <div className="entry-header">
              <div className="entry-date">{entry.date}</div>
              <div className="entry-weather">
                <span className="weather-icon">
                  {entry.weather === '맑음' ? '☀️' : entry.weather === '흐림' ? '☁️' : '🌧️'}
                </span>
                <span>{entry.weather}</span>
              </div>
              <div className="entry-mood">{entry.mood}</div>
            </div>
            <div className="entry-content">
              <h3 className="entry-title">{entry.title}</h3>
              <p className="entry-text">{entry.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="diary-actions">
        <button className="write-btn">✏️ 새 일기 쓰기</button>
      </div>
    </div>
  );
};

export default DiaryPage;
