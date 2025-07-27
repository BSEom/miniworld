import Header from "./pages/Header";
import LeftBar from "./pages/LeftBar";
import Navigation from "./pages/Navigation";
import MiniRoom from "./pages/MiniRoom";
import DiaryPage from "./pages/DiaryPage";
import PhotoPage from "./pages/PhotoPage";
import ProfilePage from "./pages/ProfilePage";
import GuestBookPage from "./pages/GuestBookPage";
import FriendsPage from "./pages/FriendsPage";
import WriteDiaryPage from "./pages/DiaryWritePage";
import { Routes, Route, Navigate } from "react-router-dom";
import { getThemeClass } from "./utils/Theme";
import "./App.css";
import axios from "axios";

const MainLayout = ({
  visitCount, todayMood, setTodayMood, navigate,
  diaryEntries, handleNavigateToWrite, handleNavigateToEdit,
  handleSaveDiary, handleUpdateDiary, handleBack,
  selectedDate, diaryToEdit
}) => {
  // 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      await axios.post("/api/users/logout", {}, { withCredentials: true });
      navigate("/login"); // 성공 시에만 이동
    } catch (e) {
      alert("로그아웃 실패: " + (e.response?.data?.message || e.message));
    }
  };

  return (
    <div className={`app ${getThemeClass(todayMood)}`}>
      <div className="test">
        <div className="container">
          <Header visitCount={visitCount} todayMood={todayMood} setTodayMood={setTodayMood} />
          <div className="layout">
            <LeftBar onPageChange={navigate} todayMood={todayMood} />
            <div className="main-content">
              <div className={`content-area ${getThemeClass(todayMood)}`}> 
                <Routes>
                  <Route path="/home/:userId" element={<MiniRoom todayMood={todayMood} />} />
                  <Route path="/diary" element={
                    <DiaryPage
                      todayMood={todayMood}
                      diaryEntries={diaryEntries}
                      onNavigateToWrite={handleNavigateToWrite}
                      onNavigateToEdit={handleNavigateToEdit}
                    />
                  } />
                  <Route path="/photos" element={<PhotoPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/guestbook" element={<GuestBookPage />} />
                  <Route path="/friends" element={<FriendsPage />} />
                  <Route path="/write" element={
                    <WriteDiaryPage
                      selectedDate={selectedDate}
                      onSaveDiary={handleSaveDiary}
                      onUpdateDiary={handleUpdateDiary}
                      onBack={handleBack}
                      initialDiary={diaryToEdit}
                    />
                  } />
                  <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
              </div>
              <div className="tag_area">
                <Navigation currentPage={null} onPageChange={navigate} todayMood={todayMood} />
              </div>
            </div>
          </div>
          <div className="nav-actions">
            <button className="action-btn settings-btn">
              <span>⚙️</span>
            </button>
            <button className="action-btn logout-btn" onClick={handleLogout}> 
              <span>🚪</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;