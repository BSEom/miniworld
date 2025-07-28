import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './FriendsPage.css';
import axios from 'axios';

const FriendsPage = () => {
  const [nickname, setNickname] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const timer = useRef(null);
  const navigate = useNavigate();

  const handleSearch = (value) => {
    setNickname(value);

    if (timer.current) clearTimeout(timer.current);
    if (value.trim() === '') {
      setResults([]);
      return;
    }

    // 디바운스 (0.4초 후에 검색 요청)
    timer.current = setTimeout(async () => {
      setLoading(true);
      try {
        // axios GET 요청
        const res = await axios.get(`/api/users/search/${value}`);
        setResults(res.data); 
      } catch (err) {
        setResults([]);
      }
      setLoading(false);
    }, 400);
  };

  const onUserClick = async (user) => {
    try {
      // username으로 userId 조회
      const res = await axios.get(`/api/users/userId/${user.username}`);
      const userId = res.data; // userId가 그대로 응답으로 온다고 가정
      console.log(userId)
      // userId로 이동
      navigate(`/home/${userId}`);
    } catch (error) {
      console.log(error)
      alert("유저 ID를 불러오는 데 실패했습니다.");
      // 추가로 에러 처리 로직(예: toast)도 가능
    }
  };

  return (
    <div className="friends-page">
      <h2>👥 친구 목록</h2>
      <p>친구들의 미니홈피를 구경해보세요.</p>
      {/* <div style={{ width: "100%", borderRadius: "8px", padding: "10px", backgroundColor: "#fff", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
        안정민
      </div> */}


      <div>
        <input
          id="friend_searchbar"
          type="text"
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {loading && <div>검색중...</div>}
        <ul className="user_list">
          {results.map((user) => (
            <li
              key={user.username}
              className="user_list_item"
              tabIndex={0}
              onClick={() => onUserClick(user)}
            >
              <div className="user_list_main">
                <span className="user_nickname">{user.nickname}</span>
                <span
                  className={`user_status_dot status_${user.status}`}
                  aria-label={user.status}
                />
              </div>
              <div className="user_username">{user.username}</div>
            </li>
          ))}
          {nickname && !loading && results.length === 0 && (
            <li className="user_list_empty">검색 결과가 없습니다.</li>
          )}
        </ul>
      </div>

    </div>
  );
};

export default FriendsPage;
