import React, { useState, useEffect } from 'react';
import './LoginPage.css';

const LoginPage = ({ setCurrentPage, goToSignup }) => {
  const [formData, setFormData] = useState({
    loginId: '',
    loginPassword: ''
  });
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');

  // 임시 사용자 데이터
  const tempUsers = [
    { id: 'test@test.com', password: '1234', nickname: '테스트유저', avatar: '😊' },
    { id: 'user@user.com', password: 'user', nickname: '사용자', avatar: '👤' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ 로그인 성공 후 미니룸으로 이동
  const handleLogin = () => {
    const { loginId, loginPassword } = formData;

    if (!loginId || !loginPassword) {
      alert('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    const user = tempUsers.find(u => u.id === loginId && u.password === loginPassword);
    
    if (user) {
      setWelcomeMessage(`${user.nickname}님, 로그인 성공! ${user.avatar}`);
      setShowWelcome(true);

      // ✅ 잠깐 환영 메시지 보여준 후 미니룸으로 전환
      setTimeout(() => {
        setCurrentPage('home');
      }, 1000);
    } else {
      alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [formData]);

  return (
    <div className="login-app">
      {/* 배경 요소들 */}
      <div className="background-elements">
        <div className="floating-element house"></div>
        <div className="floating-element tree"></div>
        <div className="floating-element car"></div>
        <div className="floating-element balloon"></div>
        <div className="floating-element circle-gold"></div>
        <div className="floating-element circle-pink"></div>
      </div>

      {/* 로그인 컨테이너 */}
      <div className="login-container">
        <div className="login-box">
          <div className="logo">
            <h1>🚏기분 정거장</h1>
            <div className="beta">Beta</div>
          </div>

          <div className="login-form-group">
            <input
              type="text"
              name="loginId"
              value={formData.loginId}
              onChange={handleInputChange}
              placeholder="아이디(이메일)"
              required
            />
          </div>

          <div className="login-form-group">
            <input
              type="password"
              name="loginPassword"
              value={formData.loginPassword}
              onChange={handleInputChange}
              placeholder="비밀번호"
              required
            />
          </div>

          <button className="login-btn" onClick={handleLogin}>
            로그인
          </button>

          <div className="links">
            <a href="#" onClick={goToSignup}>아이디/비밀번호 찾기</a>
            <a href="#" onClick={goToSignup}>회원가입</a>
          </div>
        </div>
      </div>

      {/* 환영 메시지 */}
      {showWelcome && (
        <div className="welcome-message show">
          <h2>환영합니다! 🎉</h2>
          <p>{welcomeMessage}</p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
