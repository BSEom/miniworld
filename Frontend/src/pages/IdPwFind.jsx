import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./IdPwFind.css";

const IdPwFind = () => {
  const [activeTab, setActiveTab] = useState("id"); // 'id' 또는 'password'
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    emailForPassword: "",
  });
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setResult("");
    setError("");
  };

  const handleFindId = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");
    setError("");

    try {
      const res = await axios.post("/api/users/find-username", {
        email: formData.email,
      });
      setResult(`✅ 찾은 아이디: ${res.data.username}`);
    } catch (err) {
      setError(err.response?.data || "❌ 등록된 이메일을 찾을 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");
    setError("");

    // 새 비밀번호 확인 검증
    if (formData.newPassword !== formData.confirmPassword) {
      setError("❌ 새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      setLoading(false);
      return;
    }

    // 비밀번호 형식 검증
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    if (!passwordPattern.test(formData.newPassword)) {
      setError("❌ 비밀번호는 8~20자, 영문/숫자/특수문자를 포함해야 합니다.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/api/users/change-password", {
        username: formData.username,
        email: formData.emailForPassword,
        newPassword: formData.newPassword,
      });
      setResult("✅ 비밀번호가 성공적으로 변경되었습니다.");
      // 폼 초기화
      setFormData({
        email: "",
        username: "",
        emailForPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.response?.data || "❌ 입력한 정보와 일치하는 계정을 찾을 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="find-account-app">
      <div className="find-account-container">
        <div className="find-account-box">
          <button 
            className="find-account-back-btn" 
            type="button" 
            onClick={() => navigate("/login")}
          >
            ← 뒤로가기
          </button>
          
          <div className="find-account-logo">
            <h1>🚏기분 정거장</h1>
            <div className="find-account-beta">계정 찾기</div>
          </div>

          <div className="find-account-tabs">
            <button
              className={`tab-btn ${activeTab === "id" ? "active" : ""}`}
              onClick={() => setActiveTab("id")}
            >
              아이디 찾기
            </button>
            <button
              className={`tab-btn ${activeTab === "password" ? "active" : ""}`}
              onClick={() => setActiveTab("password")}
            >
              비밀번호 변경
            </button>
          </div>

          {activeTab === "id" && (
            <form onSubmit={handleFindId} className="find-form">
              <div className="find-form-group">
                <label>이메일</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="가입할 때 사용한 이메일을 입력하세요"
                  required
                />
              </div>
              <button
                type="submit"
                className="find-btn"
                disabled={loading || !formData.email}
              >
                {loading ? "찾는 중..." : "아이디 찾기"}
              </button>
            </form>
          )}

          {activeTab === "password" && (
            <form onSubmit={handleChangePassword} className="find-form">
              <div className="find-form-group">
                <label>아이디</label>
                <input
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="아이디를 입력하세요"
                  required
                />
                
                <label>이메일</label>
                <input
                  name="emailForPassword"
                  type="email"
                  value={formData.emailForPassword}
                  onChange={handleInputChange}
                  placeholder="가입할 때 사용한 이메일을 입력하세요"
                  required
                />

                <label>새 비밀번호</label>
                <input
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="새 비밀번호 (8~20자, 영문/숫자/특수문자 포함)"
                  required
                />

                <label>새 비밀번호 확인</label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="새 비밀번호를 다시 입력하세요"
                  required
                />
                {formData.confirmPassword && (
                  <div
                    className={
                      formData.newPassword === formData.confirmPassword
                        ? "password-match success"
                        : "password-match error"
                    }
                  >
                    {formData.newPassword === formData.confirmPassword
                      ? "✅ 비밀번호가 일치합니다."
                      : "❌ 비밀번호가 일치하지 않습니다."}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="find-btn"
                disabled={
                  loading || 
                  !formData.username || 
                  !formData.emailForPassword || 
                  !formData.newPassword || 
                  !formData.confirmPassword ||
                  formData.newPassword !== formData.confirmPassword
                }
              >
                {loading ? "변경 중..." : "비밀번호 변경"}
              </button>
            </form>
          )}

          {result && <div className="result-msg success">{result}</div>}
          {error && <div className="result-msg error">{error}</div>}

          <div className="find-account-links">
            <a href="#" onClick={() => navigate("/login")}>로그인</a>
            <a href="#" onClick={() => navigate("/signup")}>회원가입</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdPwFind;