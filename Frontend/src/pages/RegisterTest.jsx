// React의 useState, useEffect 훅 import (상태 및 생명주기 관리)
import { useState, useEffect } from 'react';
// axios 라이브러리 import (HTTP 통신)
import axios from 'axios';
// 회원가입 페이지 전용 CSS import
import './RegisterTest.css';

// 입력값 변경 시 일정 시간 후에만 값이 반영되도록 하는 커스텀 훅 (디바운스)
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

// RegisterTest 컴포넌트 정의
const RegisterTest = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    passwordCheck: '',
    nickname: '',
    email: '',
    birthDate: '',
    isPublic: 'Y',
  });
  const [emailValid, setEmailValid] = useState(null);
  const [nicknameValid, setNicknameValid] = useState(null);
  const [emailMsg, setEmailMsg] = useState('');
  const [nicknameMsg, setNicknameMsg] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const debouncedEmail = useDebounce(form.email, 1000);
  const debouncedNickname = useDebounce(form.nickname, 1000);

  useEffect(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!debouncedEmail || !emailPattern.test(debouncedEmail)) {
      setEmailValid(null);
      setEmailMsg('');
      return;
    }
    (async () => {
      try {
        const res = await axios.get(`/api/users/check-email?email=${debouncedEmail}`);
        if (res.data) {
          setEmailValid(true);
          setEmailMsg('✅ 사용 가능한 이메일입니다.');
        } else {
          setEmailValid(false);
          setEmailMsg('❌ 이미 사용 중인 이메일입니다.');
        }
      } catch {
        setEmailValid(false);
        setEmailMsg('❌ 이메일 확인 중 오류 발생');
      }
    })();
  }, [debouncedEmail]);

  useEffect(() => {
    if (!debouncedNickname) {
      setNicknameValid(null);
      setNicknameMsg('');
      return;
    }
    (async () => {
      try {
        const res = await axios.get(`/api/users/check-nickname?nickname=${debouncedNickname}`);
        if (res.data) {
          setNicknameValid(true);
          setNicknameMsg('✅ 사용 가능한 닉네임입니다.');
        } else {
          setNicknameValid(false);
          setNicknameMsg('❌ 이미 사용 중인 닉네임입니다.');
        }
      } catch {
        setNicknameValid(false);
        setNicknameMsg('❌ 닉네임 확인 중 오류 발생');
      }
    })();
  }, [debouncedNickname]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult('');
    setError('');

    if (form.password !== form.passwordCheck) {
      setError('❌ 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    if (emailValid === false || nicknameValid === false) {
      setError('❌ 중복된 이메일 또는 닉네임이 존재합니다.');
      return;
    }

    try {
      const user = { ...form };
      delete user.passwordCheck;
      const res = await axios.post('/api/users/register', user);
      setResult('✅ ' + res.data);
      setForm({
        username: '',
        password: '',
        passwordCheck: '',
        nickname: '',
        email: '',
        birthDate: '',
        isPublic: 'Y',
      });
      setEmailValid(null);
      setNicknameValid(null);
      setEmailMsg('');
      setNicknameMsg('');
    } catch (err) {
      setError(err.response?.data || '❌ 오류 발생');
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">회원가입</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <label>아이디</label>
        <input name="username" value={form.username} onChange={handleChange} required />

        <label>비밀번호</label>
        <input name="password" type="password" value={form.password} onChange={handleChange} required />

        <label>비밀번호 확인</label>
        <input name="passwordCheck" type="password" value={form.passwordCheck} onChange={handleChange} required />
        {form.passwordCheck && (
          <div className={form.password === form.passwordCheck ? 'signup-success' : 'signup-error'}>
            {form.password === form.passwordCheck ? '✅ 비밀번호가 일치합니다.' : '❌ 비밀번호가 일치하지 않습니다.'}
          </div>
        )}

        <label>닉네임</label>
        <input name="nickname" value={form.nickname} onChange={handleChange} required />
        {nicknameMsg && (
          <div className={nicknameValid === false ? 'signup-error' : 'signup-success'}>{nicknameMsg}</div>
        )}

        <label>이메일</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} required />
        {emailMsg && (
          <div className={emailValid === false ? 'signup-error' : 'signup-success'}>{emailMsg}</div>
        )}

        <label>생년월일</label>
        <input name="birthDate" type="date" value={form.birthDate} onChange={handleChange} />

        <label>공개여부</label>
        <select name="isPublic" value={form.isPublic} onChange={handleChange}>
          <option value="Y">공개</option>
          <option value="N">비공개</option>
        </select>

        <button type="submit" className="signup-btn" disabled={
          emailValid === false ||
          nicknameValid === false ||
          !form.username ||
          !form.password ||
          !form.passwordCheck ||
          !form.nickname ||
          !form.email ||
          form.password !== form.passwordCheck
        }>
          회원가입
        </button>
      </form>
      {result && <div className="result-msg">{result}</div>}
      {error && <div className="error-msg">{error}</div>}
    </div>
  );
};

export default RegisterTest;
