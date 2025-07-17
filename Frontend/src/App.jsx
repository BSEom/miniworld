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

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [visitCount, setVisitCount] = useState({ today: 127, total: 15847 });
  const [todayMood, setTodayMood] = useState('😊');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <MiniRoom />;
      case 'diary':
        return <DiaryPage />;
      case 'photos':
        return <PhotoPage />;
      case 'profile':
        return <ProfilePage />;
      case 'guestbook':
        return <GuestBookPage />;
      case 'friends':
        return <FriendsPage />;
      default:
        return <MiniRoom />;
    }
  };

  return (
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

export default App;
