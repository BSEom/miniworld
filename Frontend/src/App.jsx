import axios from 'axios';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./pages/Header";
import LeftBar from "./pages/LeftBar";
import Navigation from "./pages/Navigation";
import MiniRoom from "./pages/MiniRoom";
import DiaryPage from "./pages/DiaryPage";
import PhotoPage from "./pages/PhotoPage";
import ProfilePage from "./pages/ProfilePage";
import GuestBookPage from "./pages/GuestBookPage";
import FriendsPage from "./pages/FriendsPage";
import { getThemeClass } from "./utils/Theme";
import WriteDiaryPage from "./pages/DiaryWritePage";
import Signup from "./pages/Signup";
import Login from "./pages/LoginPage";
import "./App.css";
import MainLayout from "./MainLayout";

const AppContent = () => {
  const [visitCount, setVisitCount] = useState({ today: 127, total: 15847 });
  const [todayMood, setTodayMood] = useState("😊");
  const [selectedDate, setSelectedDate] = useState(null);
  const [diaryToEdit, setDiaryToEdit] = useState(null); // 수정할 일기
  const [diaryEntries, setDiaryEntries] = useState([]);

  const test_USER_ID = 162;

  // 일기 데이터 불러오기
useEffect(() => {
  const fetchDiaries = async () => {
    try {
      const res = await axios.get(`/api/diaries/${test_USER_ID}`); // 유저 ID는 유빈이 id 예시로
      setDiaryEntries(res.data);
    } catch (error) {
      console.error('일기 데이터 불러오기 실패:', error);
    }
  };

  fetchDiaries();
}, []);


  // 페이지 이동 함수들
  const handleNavigateToWrite = (date) => {
    setSelectedDate(date);
    setDiaryToEdit(null);
    navigate("/write");
  };
  const handleNavigateToEdit = (date, diary) => {
    setSelectedDate(date);
    setDiaryToEdit(diary);
    navigate("/write");
  };

  // 👉 새 일기 저장
  const handleSaveDiary = async (newDiary) => {
    try {
      const formattedDiary = {
        ...newDiary,
        isPublic: newDiary.isPublic === true || newDiary.isPublic === "Y" ? "Y" : "N",
        userId: test_USER_ID, // 유저 ID 예시(유빈)
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
      setCurrentPage("diary");
      setSelectedDate(null);
      setDiaryToEdit(null);
    } catch (error) {
      console.error('일기 저장 실패:', error);
      console.error('에러 상세:', error.response?.data);
    }
  };
  const handleBack = () => {
    setSelectedDate(null);
    setDiaryToEdit(null);
    navigate("/diary");
  };

  // 👉 일기 수정
  const handleUpdateDiary = async (updatedDiary) => {
    try {
      const res = await axios.put(`/api/diaries/${updatedDiary.id}`, updatedDiary);
      setDiaryEntries((prev) =>
        prev.map((diary) => (diary.id === updatedDiary.id ? res.data : diary))
      );
      setCurrentPage("diary");
      setSelectedDate(null);
      setDiaryToEdit(null);
    } catch (error) {
      console.error('일기 수정 실패:', error);
    }
  };

  return (
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

export default App;
