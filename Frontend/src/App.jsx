import React, { useState } from 'react';
import Header from './pages/Header';
import LeftBar from './pages/LeftBar';
import Navigation from './pages/Navigation';
import MiniRoom from './pages/MiniRoom';
import DiaryPage from './pages/DiaryPage';
import PhotoPage from './pages/PhotoPage';
import ProfilePage from './pages/ProfilePage';
import GuestBookPage from './pages/GuestBookPage';
import FriendsPage from './pages/FriendsPage';
import RegisterTest from './pages/RegisterTest';
import { getThemeClass } from './utils/Theme';
import WriteDiaryPage from './pages/DiaryWritePage';

import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [visitCount, setVisitCount] = useState({ today: 127, total: 15847 });
  const [todayMood, setTodayMood] = useState('😊');
  const [selectedDate, setSelectedDate] = useState(null);
  const [diaryToEdit, setDiaryToEdit] = useState(null); // 수정할 일기

  // 일기 데이터
  const [diaryEntries, setDiaryEntries] = useState([
    {
      id: 1,
      date: '2025-07-11',
      title: '오늘의 일기',
      content: '오늘은 정말 좋은 하루였다. 친구들과 함께 카페에서 수다를 떨고, 새로운 책도 읽었다. 이런 평범한 일상이 얼마나 소중한지 다시 한번 느꼈다.',
      weather: '맑음',
      mood: '😊'
    },
    {
      id: 2,
      date: '2025-07-10',
      title: '영화 관람 후기',
      content: '오늘 본 영화가 정말 인상깊었다. 스토리도 좋고 연출도 훌륭했다. 다음에 또 보고 싶을 정도로 재미있었다.',
      weather: '흐림',
      mood: '😍'
    },
    {
      id: 3,
      date: '2025-07-09',
      title: '새로운 취미',
      content: '요즘 사진 찍는 재미에 푹 빠져있다. 일상의 소소한 순간들을 담아보니 세상이 더 아름답게 보인다.',
      weather: '비',
      mood: '🤔'
    }
  ]);

  // 👉 새 일기 쓰기로 이동
  const handleNavigateToWrite = (date) => {
    setSelectedDate(date);
    setDiaryToEdit(null); // 새 일기 쓰기 모드
    setCurrentPage('write');
  };

  // 👉 일기 편집으로 이동
  const handleNavigateToEdit = (date, diary) => {
    setSelectedDate(date);
    setDiaryToEdit(diary); // 편집 모드
    setCurrentPage('write');
  };

  // 👉 새 일기 저장
  const handleSaveDiary = (newDiary) => {
    setDiaryEntries((prev) => [...prev, newDiary]);
    setCurrentPage('diary');
    setSelectedDate(null);
    setDiaryToEdit(null);
  };

  // 👉 뒤로가기
  const handleBack = () => {
    setCurrentPage('diary');
    setSelectedDate(null);
    setDiaryToEdit(null);
  };
  
  // 👉 일기 수정
  const handleUpdateDiary = (updatedDiary) => {
    setDiaryEntries((prev) => 
      prev.map((diary) => 
        diary.id === updatedDiary.id ? updatedDiary : diary
      )
    );
    setCurrentPage('diary');
    setSelectedDate(null);
    setDiaryToEdit(null);
  };

  // 페이지 렌더링 분기
  const renderCurrentPage = (todayMood) => {
    switch (currentPage) {
      case 'home':
        return <MiniRoom todayMood={todayMood} />;
      case 'diary':
        return (
          <DiaryPage
            diaryEntries={diaryEntries}
            onNavigateToWrite={handleNavigateToWrite}
            onNavigateToEdit={handleNavigateToEdit}
          />
        );
      case 'photos':
        return <PhotoPage />;
      case 'profile':
        return <ProfilePage />;
      case 'guestbook':
        return <GuestBookPage />;
      case 'friends':
        return <FriendsPage />;
      case 'register':
        return <RegisterTest />;
      case 'write':
        return (
          <WriteDiaryPage
            selectedDate={selectedDate}
            onSaveDiary={handleSaveDiary}
            onUpdateDiary={handleUpdateDiary}
            onBack={handleBack}
            initialDiary={diaryToEdit} // 편집모드면 기존 일기 데이터 전달
          />
        );
      default:
        return <MiniRoom todayMood={todayMood} />;
    }
  };

  return (
    <div className={`app ${getThemeClass(todayMood)}`}>
      <div className="test">
        <div className="container">
          <Header
            visitCount={visitCount}
            todayMood={todayMood}
            setTodayMood={setTodayMood}
            onRegisterClick={() => setCurrentPage('register')}
          />
          <div className="layout">
            <LeftBar
              onPageChange={setCurrentPage}
              todayMood={todayMood}
            />
            <div className="main-content">
              <div className={`content-area ${getThemeClass(todayMood)}`}>
                {renderCurrentPage(todayMood)}
              </div>
              <div className="tag_area">
                <Navigation
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                  todayMood={todayMood}
                />
              </div>
            </div>
          </div>

          {/* 수정 및 로그아웃 */}
          <div className="nav-actions">
            <button className="action-btn settings-btn">
              <span>⚙️</span>
            </button>
            <button className="action-btn logout-btn">
              <span>🚪</span>
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default App;