<<<<<<< HEAD
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
import { getThemeClass } from './utils/Theme';

import './App.css';
=======
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/LoginPage";
import "./App.css";
import MainLayout from "./MainLayout";
>>>>>>> main


const AppContent = () => {
  const [visitCount, setVisitCount] = useState({ today: 127, total: 15847 });
<<<<<<< HEAD
  const [todayMood, setTodayMood] = useState('😊');
=======
  const [todayMood, setTodayMood] = useState("😊");
  const [selectedDate, setSelectedDate] = useState(null);
  const [diaryToEdit, setDiaryToEdit] = useState(null);
  const [diaryEntries, setDiaryEntries] = useState([]);
  const navigate = useNavigate();
  // localStorage에서 userId 읽기
  const userId = localStorage.getItem("userId");
>>>>>>> main

   // 일기 데이터 불러오기

useEffect(() => {
  if (!userId) return;
  const fetchDiaries = async () => {
    try {
      const res = await axios.get(`/api/diaries/${userId}`);
      setDiaryEntries(res.data);
    } catch (error) {
      console.error('일기 데이터 불러오기 실패:', error);
    }
  };
  fetchDiaries();
}, [userId]);


  // 페이지 이동 함수들
  const handleNavigateToWrite = (date) => {
    setSelectedDate(date);
    setDiaryToEdit(null);
    if (userId) {
      navigate(`/write/${userId}`);
    }
  };
  const handleNavigateToEdit = (date, diary) => {
    setSelectedDate(date);
    setDiaryToEdit(diary);
    if (userId) {
      navigate(`/write/${userId}`);
    }
  };
   // 👉 새 일기 저장
  const handleSaveDiary = async (newDiary) => {
    try {
      const formattedDiary = {
        ...newDiary,
        isPublic: newDiary.isPublic === true || newDiary.isPublic === "Y" ? "Y" : "N",
        userId: userId, // localStorage에서 가져온 userId 사용
        selectDate: selectedDate
          ? new Date(selectedDate).toLocaleDateString('sv-SE')
          : new Date().toLocaleDateString('sv-SE')
      };
      const res = await axios.post('/api/diaries', formattedDiary, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      setDiaryEntries((prev) => [...prev, res.data]);
      // 저장 후 다이어리 페이지로 이동
      setSelectedDate(null);
      setDiaryToEdit(null);
      if (userId) {
        navigate(`/diary/${userId}`);
      }
    } catch (error) {
      console.error('일기 저장 실패:', error);
      console.error('에러 상세:', error.response?.data);
    }
  };
  const handleBack = () => {
    setSelectedDate(null);
    setDiaryToEdit(null);
    if (userId) {
      navigate(`/diary/${userId}`);
    }
  };

  // 👉 일기 수정
  const handleUpdateDiary = async (updatedDiary) => {
    try {
      const res = await axios.put(`/api/diaries/${updatedDiary.id}`, updatedDiary);
      setDiaryEntries((prev) =>
        prev.map((diary) => (diary.id === updatedDiary.id ? res.data : diary))
      );
      setSelectedDate(null);
      setDiaryToEdit(null);
      if (userId) {
        navigate(`/diary/${userId}`);
      }
    } catch (error) {
      console.error('일기 수정 실패:', error);
    }
  };

  return (
<<<<<<< HEAD
    <div className={`app ${getThemeClass(todayMood)}`}>
      <div className='test'>
        <div className="container">
          <Header
            visitCount={visitCount}
            todayMood={todayMood}
            setTodayMood={setTodayMood}
          />
          <div className="layout">
            <LeftBar
              onPageChange={setCurrentPage}
              todayMood={todayMood}
            />
            <div className="main-content">
              <div className={`content-area ${getThemeClass(todayMood)}`}>
                {renderCurrentPage()}
              </div>
              <div className="tag_area">
                <Navigation currentPage={currentPage} onPageChange={setCurrentPage} todayMood={todayMood} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

=======
    <Routes>
      {/* 로그인/회원가입은 별도 전체화면 */}
      <Route path="/login" element={<Login goToSignup={() => navigate("/signup")} setCurrentPage={navigate} />} />
      <Route path="/signup" element={<Signup goToLogin={() => navigate("/login")} />} />
      {/* 나머지는 공통 레이아웃 */}
      <Route path="/*" element={
        <MainLayout
          visitCount={visitCount}
          todayMood={todayMood}
          setTodayMood={setTodayMood}
          navigate={navigate}
          diaryEntries={diaryEntries}
          handleNavigateToWrite={handleNavigateToWrite}
          handleNavigateToEdit={handleNavigateToEdit}
          handleSaveDiary={handleSaveDiary}
          handleUpdateDiary={handleUpdateDiary}
          handleBack={handleBack}
          selectedDate={selectedDate}
          diaryToEdit={diaryToEdit}
        />
      } />
    </Routes>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

>>>>>>> main
export default App;
