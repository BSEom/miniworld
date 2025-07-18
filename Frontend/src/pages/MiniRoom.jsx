import React, { useEffect, useRef, useState } from 'react';
import './MiniRoom.css';
import { getThemeClass } from '../utils/Theme';

const MiniRoom = (todayMood) => {
  const boardRef = useRef(null);  // board 정보 접근용
  const imageRefs = useRef({});   // image 정보 접근용
  const draggingRef = useRef({ isDragging: false, offsetX: 0, offsetY: 0, targetId: null });  // 드래그 중인 요소 접근용
  const [positions, setPositions] = useState({});   // 위치 저장용
  const [grabbingId, setGrabbingId] = useState(null); // 드래그 중인 obj id 저장용

  // 최근 방문자
  const recentVisitors = [
    { name: '정현', status:'온라인', time: '2분전', avatar: '😊', mood:'집에 가고 싶어요...' },
    { name: '은지', status:'자리비움', time: '5분전', avatar: '😄', mood:'드라마 보는중...' },
    { name: '서영', status:'오프라인', time: '1시간전', avatar: '😉', mood:'bye bye🤚' },
    { name: '보성', status:'온라인', time: '3시간전', avatar: '🤓', mood:'안녕하세요' }
  ];
  // 일촌 친구
  const ilchonFriends = [
    { name: '정민', status: '온라인', avatar: '😎', mood: '행복해요~' },
    { name: '은희', status: '자리비움', avatar: '🤗', mood: '미궁게임 하는중..' },
    { name: '혜빈', status: '온라인', avatar: '😋', mood: '공부중..' },
    { name: '혜미', status: '오프라인', avatar: '😴', mood: 'bye bye🤚' }
  ];
  // 미니룸 아이템 이미지 목록
  const imageList = [
    { id: 'img1', src: 'img/miniroom/table.gif' },
    { id: 'img2', src: 'img/miniroom/window.gif' },
    { id: 'img3', src: 'img/miniroom/chair.gif', width: 33 },
    { id: 'img4', src: 'img/miniroom/ddd.gif' }
  ];
  // 초기 위치 로드
  useEffect(() => {
    const saved = {};
    imageList.forEach(({ id }) => {
      const data = localStorage.getItem(id);
      if (data) {
        saved[id] = JSON.parse(data);
      } else {
        saved[id] = {
          left: Math.random() * 300,
          top: Math.random() * 200,
        };
      }
    });
    setPositions(saved);
  }, []);

  const handleMouseDown = (e, id) => {
    draggingRef.current = {
      isDragging: true,
      offsetX: e.nativeEvent.offsetX, // (브라우저 원본 이벤트) 실제 마우스 클릭 위치 
      offsetY: e.nativeEvent.offsetY,
      targetId: id
    };
    setGrabbingId(id);
  };

  const handleMouseMove = (e) => {
    const { isDragging, offsetX, offsetY, targetId } = draggingRef.current;
    const el = imageRefs.current[targetId];

    if (!isDragging || !targetId) return;

    if (!el) return;

    const boardRect = boardRef.current.getBoundingClientRect();     // board의 크기, 위치 정보를 가져와 저장
    let newLeft = e.clientX - boardRect.left - offsetX;     // 드래그 중인 object의 위치 조정
    let newTop = e.clientY - boardRect.top - offsetY;

    newLeft = Math.max(0, Math.min(newLeft, boardRef.current.offsetWidth - el.offsetWidth));
    newTop = Math.max(0, Math.min(newTop, boardRef.current.offsetHeight - el.offsetHeight));

    setPositions(prev => {
      const updated = { ...prev, [targetId]: { left: newLeft, top: newTop } };
      localStorage.setItem(targetId, JSON.stringify(updated[targetId]));
      return updated;
    });
  };

  const handleMouseUp = () => {
    draggingRef.current.isDragging = false;
    setGrabbingId(null);
  };

  return (
    <div className="miniroom_container">
      <div
        className="board"
        ref={boardRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {imageList.map((item) => (
          <img
            key={item.id}
            id={item.id}
            src={item.src}
            alt={item.id}
            ref={(el) => (imageRefs.current[item.id] = el)}
            className="draggable"
            style={{
              position: 'absolute',
              left: positions[item.id]?.left || 0,
              top: positions[item.id]?.top || 0,
              cursor: grabbingId === item.id ? 'grabbing' : 'grab'
            }}
            onMouseDown={(e) => handleMouseDown(e, item.id)}
            draggable={false}
          />
        ))}
      </div>
      <div className='rightbar'>

      {/* 일촌 친구 */}
      <div className="friends-card">
        <div className={`card-header ${getThemeClass(todayMood.todayMood)}`}>
        <span>💕 일촌 친구</span>
        </div>
        <div className="card-body">
          <div className="friend-list">
            {ilchonFriends.slice(0, 4).map((friend, index) => (
              <div key={index} className="friend-item">
                <div className="friend-avatar">
                  <span className="friend-avatar">{friend.avatar}</span>
                  <div className={`status-dot ${friend.status === '온라인' ? 'online' : friend.status === '자리비움' ? 'away' : 'offline'}`}></div>
                </div>
                <div className="friend-info">
                  <p className="friend-name">{friend.name}</p>
                  <p className="friend-mood">{friend.mood}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 최근 방문자 */}
      <div className="visitors-card">
        <div className={`card-header ${getThemeClass(todayMood.todayMood)}`}>
        <span>👋</span>
        <span>최근 방문자</span>
        </div>
        <div className="card-body">
          <div className="visitor-list">
            {recentVisitors.slice(0, 3).map((visitor, index) => (
              <div key={index} className="visitor-item">
                <div className="visitor-avatar">
                  <span className="avatar">{visitor.avatar}</span>
                  <div className={`status-dot ${visitor.status === '온라인' ? 'online' : visitor.status === '자리비움' ? 'away' : 'offline'}`}></div>
                  </div>
                <div className="visitor-info">
                  <p className="visitor-name">{visitor.name}</p>
                  <p className="visitor-mood">{visitor.mood}</p>
                  <p className="visitor-time">{visitor.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default MiniRoom;
