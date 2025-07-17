// DiaryPage.jsx
import React, { useState } from 'react';
import './DiaryPage.css';

const weatherOptions = ['맑음', '흐림', '비', '눈'];
const moodOptions = ['😊', '😢', '😍', '😡', '🤔'];

const DiaryPage = () => {
  // 기존 일기 목록
  const [diaryEntries, setDiaryEntries] = useState([
    { id: 1, date: '2025.07.11', title: '오늘의 일기', content: '오늘은 정말 좋은 하루였다. 친구들과 함께 …', weather: '맑음', mood: '😊' },
    { id: 2, date: '2025.07.10', title: '영화 관람 후기', content: '오늘 본 영화가 정말 인상깊었다. …', weather: '흐림', mood: '😍' },
    { id: 3, date: '2025.07.09', title: '새로운 취미', content: '요즘 사진 찍는 재미에 푹 빠져있다. …', weather: '비', mood: '🤔' }
  ]);



  // 페이징
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(diaryEntries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEntries = diaryEntries.slice(startIndex, startIndex + itemsPerPage);

  // 글쓰기 모드 토글 & 폼 데이터
  const [isWriting, setIsWriting] = useState(false);
  const [formData, setFormData] = useState({
    weather: weatherOptions[0],
    mood: moodOptions[0],
    title: '',
    content: '',
    isPublic: true,
  });

  // 입력값 변경 핸들러
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  // 저장
  const handleSave = e => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
      ...formData
    };
    setDiaryEntries(entries => [newEntry, ...entries]);
    setIsWriting(false);
    // 폼 초기화 & 1페이지로 이동
    setFormData({ weather: weatherOptions[0], mood: moodOptions[0], title: '', content: '' });
    setCurrentPage(1);
  };

  return (
    <div className="diary-page">

      {/* 헤더 */}
      <div className="diary-header">
        <h2>📝 나의 다이어리</h2>
        <div className="diary-actions">
          <button
            className="write-btn"
            onClick={() => setIsWriting(true)}
          >
            ✏️ 새 일기 쓰기
          </button>
        </div>
        <div className="diary-stats">
          <span>총 {diaryEntries.length}개의 일기</span>
        </div>
      </div>

      {/* 글쓰기 폼 */}
      {isWriting && (
        <form className="diary-form" onSubmit={handleSave}>
          <div className="form-row">
            <label>날짜</label>
            <input
              type="text"
              value={new Date().toLocaleDateString()}
              readOnly
            />
          </div>
          <div className="form-row">
            <label>날씨</label>
            <select name="weather" value={formData.weather} onChange={handleChange}>
              {weatherOptions.map(w => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>
          <div className="form-row">
            <label>기분</label>
            <select name="mood" value={formData.mood} onChange={handleChange}>
              {moodOptions.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="form-row">
            <label>제목</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="오늘의 일기 제목"
              required
            />
          </div>
          <div className="form-row">
            <label>내용</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={5}
              placeholder="오늘은 어땠나요?"
              required
            />
          </div>
          <div className="form-row">
            <label>공개 설정</label>
            <select
              name="isPublic"
              value={formData.isPublic ? "true" : "false"}
              onChange={e =>
                setFormData(fd => ({
                  ...fd,
                  isPublic: e.target.value === "true"
                }))
              }
            >
              <option value="true">공개</option>
              <option value="false">비공개</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => setIsWriting(false)}>취소</button>
            <button type="submit">저장</button>
          </div>
        </form>
      )}

      {/* 리스트 */}
      {!isWriting && (
        <>
          <div className="diary-list">
            {currentEntries.map(entry => (
              <div key={entry.id} className="diary-entry">
                <div className="entry-header">
                  <div className="entry-date">{entry.date}</div>
                  <div className="entry-weather">
                    <span className="weather-icon">
                      {entry.weather === '맑음' ? '☀️' :
                        entry.weather === '흐림' ? '☁️' : '🌧️'}
                    </span>
                    <span>{entry.weather}</span>
                  </div>
                  <div className="entry-mood">{entry.mood}</div>
                  <div className={`entry-visibility ${entry.isPublic ? 'public' : 'private'}`}>
                    {entry.isPublic ? '🔓 공개' : '🔒 비공개'}
                  </div>
                </div>
                <div className="entry-content">
                  <h3 className="entry-title">{entry.title}</h3>
                  <p className="entry-text">{entry.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={currentPage === i + 1 ? 'active' : ''}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}

    </div>
  );
};

export default DiaryPage;
