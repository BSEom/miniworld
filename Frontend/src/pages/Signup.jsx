// React의 useState, useEffect 훅 import (상태 및 생명주기 관리)
import React, { useState, useEffect } from "react";
// 회원가입 페이지 전용 CSS import
import "./Signup.css";
// axios 라이브러리 import (HTTP 통신)
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 📌 디바운스 커스텀 훅
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    passwordCheck: "",
    nickname: "",
    email: "",
    birthDate: "",
    isPublic: "Y",
  });

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [emailValid, setEmailValid] = useState(null);
  const [nicknameValid, setNicknameValid] = useState(null);
  const [usernameValid, setUsernameValid] = useState(null);
  const [emailMsg, setEmailMsg] = useState("");
  const [nicknameMsg, setNicknameMsg] = useState("");
  const [usernameMsg, setUsernameMsg] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const debouncedEmail = useDebounce(form.email, 1000);
  const debouncedUsername = useDebounce(form.username, 1000);
  const debouncedNickname = useDebounce(form.nickname, 1000);

  const navigate = useNavigate();

  useEffect(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!debouncedEmail || !emailPattern.test(debouncedEmail)) {
      setEmailValid(null);
      setEmailMsg("");
      return;
    }
    (async () => {
      try {
        const res = await axios.get(
          `/api/users/check-email?email=${debouncedEmail}`
        );
        setEmailValid(res.data);
        setEmailMsg(
          res.data
            ? "✅ 사용 가능한 이메일입니다."
            : "❌ 이미 사용 중인 이메일입니다."
        );
      } catch {
        setEmailValid(false);
        setEmailMsg("❌ 이메일 확인 중 오류 발생");
      }
    })();
  }, [debouncedEmail]);

  useEffect(() => {
    if (!debouncedNickname) {
      setNicknameValid(null);
      setNicknameMsg("");
      return;
    }
    (async () => {
      try {
        const res = await axios.get(
          `/api/users/check-nickname?nickname=${debouncedNickname}`
        );
        setNicknameValid(res.data);
        setNicknameMsg(
          res.data
            ? "✅ 사용 가능한 닉네임입니다."
            : "❌ 이미 사용 중인 닉네임입니다."
        );
      } catch {
        setNicknameValid(false);
        setNicknameMsg("❌ 닉네임 확인 중 오류 발생");
      }
    })();
  }, [debouncedNickname]);

  useEffect(() => {
    if (!debouncedUsername) {
      setUsernameValid(null);
      setUsernameMsg("");
      return;
    }
    (async () => {
      try {
        const res = await axios.get(
          `/api/users/check-username?username=${debouncedUsername}`
        );
        setUsernameValid(res.data);
        setUsernameMsg(
          res.data
            ? "✅ 사용 가능한 아이디입니다."
            : "❌ 이미 사용 중인 아이디입니다."
        );
      } catch {
        setUsernameValid(false);
        setUsernameMsg("❌ 아이디 확인 중 오류 발생");
      }
    })();
  }, [debouncedUsername]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "username") {
      const isValid = /^[a-zA-Z0-9]{4,12}$/.test(value);
      setUsernameError(
        isValid ? "" : "❌ 아이디는 4~12자의 영문 또는 숫자만 가능합니다."
      );
    }

    if (name === "password") {
      const isValid =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/.test(
          value
        );
      setPasswordError(
        isValid
          ? ""
          : "❌ 비밀번호는 8~20자, 영문/숫자/특수문자를 포함해야 합니다."
      );
    }

    if (name === "nickname") {
      const isValid = /^[가-힣a-zA-Z0-9]{2,10}$/.test(value);
      setNicknameError(
        isValid ? "" : "❌ 닉네임은 2~10자, 한글/영문/숫자만 사용 가능합니다."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("");
    setError("");

    if (form.password !== form.passwordCheck) {
      setError("❌ 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    if (!emailValid || !nicknameValid || !usernameValid) {
      setError("❌ 중복 확인을 완료해주세요.");
      return;
    }

    try {
      const newUser = { ...form };
      delete newUser.passwordCheck;
      const res = await axios.post("/api/users/register", newUser);
      setResult("✅ " + res.data);
      setForm({
        username: "",
        password: "",
        passwordCheck: "",
        nickname: "",
        email: "",
        birthDate: "",
        isPublic: "Y",
      });
      setEmailValid(null);
      setNicknameValid(null);
      setUsernameValid(null);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data || "❌ 오류 발생");
    }
  };

  return (
    <div className="signup-app">
      <div className="signup-container">
        <form onSubmit={handleSubmit} className="signup-box">
          <button className="signup-back-btn" type="button" onClick={() => navigate("/login")}>← 뒤로가기</button>
          <div className="singup-logo">
            <h1>🚏기분 정거장</h1>
            <div className="singup-beta">회원가입</div>
          </div>

          <div className="singup-form-group">
            <label className="singup-form-user">아이디</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
            {usernameMsg && (
              <div
                className={usernameValid ? "signup-success" : "signup-error"}
              >
                {usernameMsg}
              </div>
            )}
            {usernameError && (
              <div className="signup-error">{usernameError}</div>
            )}

            <label>비밀번호</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            {passwordError && (
              <div className="signup-error">{passwordError}</div>
            )}

            <label>비밀번호 확인</label>
            <input
              name="passwordCheck"
              type="password"
              value={form.passwordCheck}
              onChange={handleChange}
              required
            />
            {form.passwordCheck && (
              <div
                className={
                  form.password === form.passwordCheck
                    ? "signup-success"
                    : "signup-error"
                }
              >
                {form.password === form.passwordCheck
                  ? "✅ 비밀번호가 일치합니다."
                  : "❌ 비밀번호가 일치하지 않습니다."}
              </div>
            )}

            <label>닉네임</label>
            <input
              name="nickname"
              value={form.nickname}
              onChange={handleChange}
              required
            />
            {nicknameMsg && (
              <div
                className={nicknameValid ? "signup-success" : "signup-error"}
              >
                {nicknameMsg}
              </div>
            )}
            {nicknameError && (
              <div className="signup-error">{nicknameError}</div>
            )}

            <label>이메일</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            {emailMsg && (
              <div
                className={
                  emailValid === false ? "signup-error" : "signup-success"
                }
              >
                {emailMsg}
              </div>
            )}

            <label>생년월일</label>
            <input
              name="birthDate"
              type="date"
              value={form.birthDate}
              onChange={handleChange}
            />

            <label>공개여부</label>
            <select
              name="isPublic"
              value={form.isPublic}
              onChange={handleChange}
            >
              <option value="Y">공개</option>
              <option value="N">비공개</option>
            </select>
          </div>
          <button
            type="submit"
            className="signup-btn"
            disabled={
              emailValid === false ||
              nicknameValid === false ||
              usernameValid === false ||
              !form.username ||
              usernameError ||
              !form.password ||
              passwordError ||
              !form.nickname ||
              nicknameError ||
              !form.email ||
              form.password !== form.passwordCheck
            }
          >
            회원가입
          </button>
          {result && <div className="result-msg">{result}</div>}
          {error && <div className="error-msg">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
