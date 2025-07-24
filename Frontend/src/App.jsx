import axios from 'axios';
import React, { useState, useEffect } from "react";
import Header from "./pages/Header";
import LeftBar from "./pages/LeftBar";
import Navigation from "./pages/Navigation";
import MiniRoom from "./pages/MiniRoom";
import DiaryPage from "./pages/DiaryPage";
import PhotoPage from "./pages/PhotoPage";
import ProfilePage from "./pages/ProfilePage";
import GuestBookPage from "./pages/GuestBookPage";
import FriendsPage from "./pages/FriendsPage";
import RegisterTest from "./pages/RegisterTest";
import { getThemeClass } from "./utils/Theme";
import WriteDiaryPage from "./pages/DiaryWritePage";
import Signup from "./pages/Signup";
import Login from "./pages/LoginPage";

import "./App.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState("login");
  const [visitCount, setVisitCount] = useState({ today: 127, total: 15847 });
  const [todayMood, setTodayMood] = useState("😊");
  const [selectedDate, setSelectedDate] = useState(null);
  const [diaryToEdit, setDiaryToEdit] = useState(null); // 수정할 일기

  // 일기 데이터 불러오기
useEffect(() => {
  const fetchDiaries = async () => {
    try {
      const res = await axios.get('/api/diaries/1'); // 유저 ID는 예시로 1
      setDiaryEntries(res.data);
    } catch (error) {
      console.error('일기 데이터 불러오기 실패:', error);
    }
  };

  fetchDiaries();
}, []);


  // 👉 새 일기 쓰기로 이동
  const handleNavigateToWrite = (date) => {
    setSelectedDate(date);
    setDiaryToEdit(null); // 새 일기 쓰기 모드
    setCurrentPage("write");
  };

  // 👉 일기 편집으로 이동
  const handleNavigateToEdit = (date, diary) => {
    setSelectedDate(date);
    setDiaryToEdit(diary); // 편집 모드
    setCurrentPage("write");
  };

  // 👉 새 일기 저장
  const handleSaveDiary = async (newDiary) => {
    try {
      const formattedDiary = {
        ...newDiary,
        isPublic: newDiary.isPublic === true || newDiary.isPublic === "Y" ? "Y" : "N",
        userId: 1, // 유저 ID 예시
      };
      const res = await axios.post('/api/diaries', formattedDiary);
      setDiaryEntries((prev) => [...prev, res.data]);
      setCurrentPage("diary");
      setSelectedDate(null);
      setDiaryToEdit(null);
    } catch (error) {
      console.error('일기 저장 실패:', error);
    }
  };

  // 👉 뒤로가기
  const handleBack = () => {
    setCurrentPage("diary");
    setSelectedDate(null);
    setDiaryToEdit(null);
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

  // 페이지 렌더링 분기
  const renderCurrentPage = (todayMood) => {
    switch (currentPage) {
      case "login":
        return <Login goToSignup={() => setCurrentPage("signup")} />;
      case "signup":
        return <Signup goToLogin={() => setCurrentPage("login")} />;
      case "home":
        return <MiniRoom todayMood={todayMood} />;
      case "diary":
        return (
          <DiaryPage
            todayMood={todayMood}
            diaryEntries={diaryEntries}
            onNavigateToWrite={handleNavigateToWrite}
            onNavigateToEdit={handleNavigateToEdit}
          />
        );
      case "photos":
        return <PhotoPage />;
      case "profile":
        return <ProfilePage />;
      case "guestbook":
        return <GuestBookPage />;
      case "friends":
        return <FriendsPage />;
      case "register":
        return <RegisterTest />;
      case "write":
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

  // ✅ 로그인/회원가입 전용 조건 렌더링
  if (currentPage === "login") {
    return (
      <div className="login-wrapper">
        <Login
          goToSignup={() => setCurrentPage("signup")}
          setCurrentPage={setCurrentPage}
        />
      </div>
    );
  }

  if (currentPage === "signup") {
    return (
      <div className="signup-wrapper">
        <Signup goToLogin={() => setCurrentPage("login")} />
      </div>
    );
  }

  return (
    <div className={`app ${getThemeClass(todayMood)}`}>
      <div className="test">
        <div className="container">
          <Header
            visitCount={visitCount}
            todayMood={todayMood}
            setTodayMood={setTodayMood}
            onRegisterClick={() => setCurrentPage("register")}
          />
          <div className="layout">
            <LeftBar onPageChange={setCurrentPage} todayMood={todayMood} />
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
            <button
              className="action-btn logout-btn"
              onClick={() => setCurrentPage("login")}
            >
              <span>🚪</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
