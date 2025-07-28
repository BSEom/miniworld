<<<<<<< HEAD
import React, { useState } from 'react';
import './DiaryWritePage.css';

const DiaryWritePage = ({ onBack, onSaveDiary, selectedDate }) => {
=======
import React, { useState, useEffect } from 'react';
import './DiaryWritePage.css';

const DiaryWritePage = ({ onBack, onSaveDiary, onUpdateDiary, selectedDate, initialDiary = null }) => {
>>>>>>> main
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [weather, setWeather] = useState('맑음');
  const [mood, setMood] = useState('😊');
<<<<<<< HEAD
=======
   const [isPublic, setIsPublic] = useState(true);

  const isEditMode = !!initialDiary;

  // 편집 모드일 때 초기값 설정
  useEffect(() => {
    if (initialDiary) {
      setTitle(initialDiary.title);
      setContent(initialDiary.content);
      setWeather(initialDiary.weather);
      setMood(initialDiary.mood);
      setIsPublic(initialDiary.isPublic ?? true);
    }
  }, [initialDiary]);
>>>>>>> main

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

<<<<<<< HEAD
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

    if (onBack) {
      onBack();
    }
  };
=======
      if (isEditMode) {
    // 편집 모드: id 포함
    const diaryData = {
      id: initialDiary.id,
      selectDate: formatDateForSave(selectedDate),
      title: title.trim(),
      content: content.trim(),
      weather,
      mood,
      isPublic: isPublic ? "Y" : "N",
    };
    if (onUpdateDiary) {
      onUpdateDiary(diaryData);
    }
  } else {
    // 새 일기: id 없음
    const diaryData = {
      selectDate: formatDateForSave(selectedDate),
      title: title.trim(),
      content: content.trim(),
      weather,
      mood,
       isPublic: isPublic ? "Y" : "N",
    };
    if (onSaveDiary) {
      onSaveDiary(diaryData);
    }
  }

  if (onBack) {
    onBack();
  }
};
>>>>>>> main

  const weatherOptions = [
    { value: '맑음', emoji: '☀️', label: '맑음' },
    { value: '흐림', emoji: '☁️', label: '흐림' },
    { value: '비', emoji: '🌧️', label: '비' },
    { value: '눈', emoji: '🌨️', label: '눈' },
    { value: '안개', emoji: '🌫️', label: '안개' },
    { value: '번개', emoji: '⛈️', label: '번개' }
  ];

  const moodOptions = ['😊', '😍', '🤔', '🥹', '😢', '😡', '😴', '🤗'];

  return (
    <div className="write-diary-page">
      <button onClick={onBack} className="back-btn">← 뒤로가기</button>
      <div className="write-diary-header">
<<<<<<< HEAD
        <h2>✏️ 일기 쓰기</h2>
=======
        <h2>{isEditMode ? '✏️ 일기 수정' : '✏️ 일기 쓰기'}</h2>
>>>>>>> main
        <div className="write-date">{formatDateForDisplay(selectedDate)}</div>
      </div>

      <div className="write-diary-content">
        <div className="diary-form">

          <div className="diary-form-group">
            <div className='diary-weather-mood-group'>
              <div className='diary-weather'>
                <label htmlFor="weather-select">날씨</label>
                <select
                  id="weather-select"
                  value={weather}
                  onChange={(e) => setWeather(e.target.value)}
                  className="diary-select-box"
                >
                  {weatherOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.emoji} {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className='diary-mood'>
                <label htmlFor="mood-select">기분</label>
                <select
                  id="mood-select"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="diary-select-box"
<<<<<<< HEAD
                >
=======
                  >
>>>>>>> main
                  {moodOptions.map(moodOption => (
                    <option key={moodOption} value={moodOption}>
                      {moodOption}
                    </option>
                  ))}
                </select>
              </div>
<<<<<<< HEAD
=======
               <div className='diary-visibility'>
                <label htmlFor="public-select">공개여부</label>
                <select
                  id="public-select"
                  value={isPublic ? 'true' : 'false'}
                  onChange={(e) => setIsPublic(e.target.value === 'true')}
                  className="diary-select-box"
                >
                  <option value="true">공개</option>
                  <option value="false">비공개</option>
                </select>
              </div>
>>>>>>> main
            </div>

            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="일기 제목을 입력하세요"
              maxLength={50}
<<<<<<< HEAD
            />
=======
              />
>>>>>>> main

            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="오늘 하루는 어땠나요? 자유롭게 적어보세요!"
              rows={10}
<<<<<<< HEAD
            />
=======
              />
>>>>>>> main
          </div>

          <div className="diary-form-actions">
            <button onClick={onBack} className="diary-form-cancel-btn">취소</button>
<<<<<<< HEAD
            <button onClick={handleSave} className="diary-form-save-btn">💾 저장하기</button>
=======
            <button onClick={handleSave} className="diary-form-save-btn">
              💾 {isEditMode ? '수정완료' : '저장하기'}
            </button>
>>>>>>> main
          </div>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default DiaryWritePage;
=======
export default DiaryWritePage;
>>>>>>> main
