import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

axios.defaults.withCredentials = true;

const LoginPage = ({ setCurrentPage, goToSignup }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const res = await axios.post(
        "/api/users/login",
        { email, password },
        { withCredentials: true }
      );

      const { nickname } = res.data;

      setWelcomeMessage(`${nickname}님, 로그인 성공! 🎉`);
      setShowWelcome(true);
      setTimeout(() => {
        setCurrentPage("home"); // 또는 navigate('/') 사용 가능
      }, 1000);
    } catch (err) {
      if (err.response?.status === 401) {
        alert("❌ 이메일 또는 비밀번호가 올바르지 않습니다.");
      } else {
        alert("❌ 로그인 실패: " + (err.response?.data?.message || err.message));
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-app">
      <div className="login-container">
        <div className="login-box">
          <div className="logo">
            <h1>🚏기분 정거장</h1>
            <div className="beta">Beta</div>
          </div>

          <div className="login-form-group">
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="이메일"
              required
              onKeyPress={handleKeyPress}
            />
          </div>

          <div className="login-form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="비밀번호"
              required
              onKeyPress={handleKeyPress}
            />
          </div>

          <button className="login-btn" onClick={handleLogin}>
            로그인
          </button>

          <div className="links">
            <a href="#" onClick={goToSignup}>
              아이디/비밀번호 찾기
            </a>
            <a href="#" onClick={goToSignup}>
              회원가입
            </a>
          </div>
        </div>
      </div>

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
