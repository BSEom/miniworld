// src/pages/ResetPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import "./ResetPassword.css"; 

const ResetPassword = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = async () => {
    if (!username || !newPassword || !confirmPassword) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await axios.post("/api/users/reset-password", {
        username,
        newPassword,
      });
      alert("✅ 비밀번호가 성공적으로 변경되었습니다.");
    } catch (err) {
      alert("❌ 실패: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="reset-password-page">
      <h2>🔑 비밀번호 재설정</h2>
      <input
        type="text"
        placeholder="아이디 (username)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="새 비밀번호"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleReset}>비밀번호 변경</button>
    </div>
  );
};

export default ResetPassword;
