import React, { useState } from "react";
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
  const [diaryToEdit, setDiaryToEdit] = useState(null);
  const [diaryEntries, setDiaryEntries] = useState([
    {
      id: 1,
      date: "2025-07-11",
      title: "오늘의 일기",
      content:
        "오늘은 정말 좋은 하루였다. 친구들과 함께 카페에서 수다를 떨고, 새로운 책도 읽었다. 이런 평범한 일상이 얼마나 소중한지 다시 한번 느꼈다.",
      weather: "맑음",
      mood: "😊",
    },
    {
      id: 2,
      date: "2025-07-10",
      title: "영화 관람 후기",
      content:
        "오늘 본 영화가 정말 인상깊었다. 스토리도 좋고 연출도 훌륭했다. 다음에 또 보고 싶을 정도로 재미있었다.",
      weather: "흐림",
      mood: "😍",
    },
    {
      id: 3,
      date: "2025-07-09",
      title: "새로운 취미",
      content:
        "요즘 사진 찍는 재미에 푹 빠져있다. 일상의 소소한 순간들을 담아보니 세상이 더 아름답게 보인다.",
      weather: "비",
      mood: "🤔",
    },
  ]);
  const navigate = useNavigate();

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
  const handleSaveDiary = (newDiary) => {
    setDiaryEntries((prev) => [...prev, newDiary]);
    setSelectedDate(null);
    setDiaryToEdit(null);
    navigate("/diary");
  };
  const handleBack = () => {
    setSelectedDate(null);
    setDiaryToEdit(null);
    navigate("/diary");
  };
  const handleUpdateDiary = (updatedDiary) => {
    setDiaryEntries((prev) =>
      prev.map((diary) => (diary.id === updatedDiary.id ? updatedDiary : diary))
    );
    setSelectedDate(null);
    setDiaryToEdit(null);
    navigate("/diary");
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
