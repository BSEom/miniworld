import React, { useState } from 'react';
import Header from './pages/Header';
import Sidebar from './pages/Sidebar';
import Navigation from './pages/Navigation';
import HomePage from './pages/HomePage';
import DiaryPage from './pages/DiaryPage';
import PhotoPage from './pages/PhotoPage';
import ProfilePage from './pages/ProfilePage';
import GuestBookPage from './pages/GuestBookPage';
import FriendsPage from './pages/FriendsPage';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [visitCount, setVisitCount] = useState({ today: 127, total: 15847 });

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
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
        return <HomePage />;
    }
  };

  return (
    <div className="app">
      <Header visitCount={visitCount} />
      
      <div className="container">
        <div className="layout">
          <Sidebar onPageChange={setCurrentPage} />
          
          <div className="main-content">
            <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
            <div className="content-area">
              {renderCurrentPage()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;