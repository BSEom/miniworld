import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MiniRoom.css';
import { loadMiniroomState, saveMiniroomState } from '../utils/useMiniroomStorage';
import RightBar from './RightBar';
import ItemList from './ItemList';

const MiniRoom = (todayMood) => {
  const boardRef = useRef(null);  // board 정보 접근용
  const imageRefs = useRef({});   // image 정보 접근용
  const draggingRef = useRef({ isDragging: false, offsetX: 0, offsetY: 0, targetId: null });  // 드래그 중인 요소 접근용
  const [selectedId, setSelectedId] = useState(null); // 선택 object id 저장
  const [isEditable, setIsEditable] = useState(false); // 수정 가능 여부
  
  const [myItemList, setMyItemList] = useState([  // 미니룸 아이템 목록
    
  ])

<<<<<<< HEAD
  // 최근 방문자
  const recentVisitors = [
    { name: '정현', time: '2분전', avatar: '😊', isOnline: true },
    { name: '은지', time: '5분전', avatar: '😄', isOnline: false },
    { name: '서영', time: '1시간전', avatar: '😉', isOnline: true },
    { name: '보성', time: '3시간전', avatar: '🤓', isOnline: false }
  ];
  // 일촌 친구
  const ilchonFriends = [
    { name: '정민', status: '온라인', avatar: '😎', mood: '행복해요~' },
    { name: '은희', status: '자리비움', avatar: '🤗', mood: '밥먹는중' },
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
=======
  // const [userId, setUserId] = useState(163);
  const { userId: userIdParam } = useParams();
  const [userId, setUserId] = useState();
>>>>>>> main

  useEffect(() => {
    // 파라미터가 바뀔 때마다 userId를 갱신
    console.log(userIdParam)
    if (userIdParam) setUserId(Number(userIdParam));
  }, [userIdParam]);


  useEffect(() => {
    if (!userId) return;
    
    const fetchMiniroomState = async () => {
      try {
        const items = await loadMiniroomState(userId);
        setMyItemList(Array.isArray(items) ? items : []);
        console.log("미니룸 배열",items);
      } catch (error) {
        console.error("미니룸 상태 불러오기 실패:", error);
        setMyItemList([]);
      }
    };
    fetchMiniroomState();
  }, [userId]);


  const handleMouseDown = (e, id) => {
    
    draggingRef.current = {
      isDragging: true,
      offsetX: e.nativeEvent.offsetX, // (브라우저 원본 이벤트) 실제 마우스 클릭 위치 
      offsetY: e.nativeEvent.offsetY,
      targetId: id
    };
    setSelectedId(id);
  };

  const handleMouseMove = (e) => {
    const { isDragging, offsetX, offsetY, targetId } = draggingRef.current;
    const el = imageRefs.current[targetId];
    if (!isDragging || !targetId || !el) return;

    const boardRect = boardRef.current.getBoundingClientRect();
    let newX = e.clientX - boardRect.left - offsetX;
    let newY = e.clientY - boardRect.top - offsetY;

    newX = Math.max(0, Math.min(newX, boardRef.current.offsetWidth - el.offsetWidth));
    newY = Math.max(0, Math.min(newY, boardRef.current.offsetHeight - el.offsetHeight));

    setMyItemList(prev =>
      prev.map(item =>
        item.itemId === targetId
          ? { ...item, position: { x: newX, y: newY } }
          : item
      )
    );
  };

  const handleMouseUp = () => {
    draggingRef.current.isDragging = false;
  
  };

  const handleClickDelete = () => {
    if (!selectedId) return;
    setMyItemList(prev => prev.filter(item => item.itemId !== selectedId));
    setSelectedId(null);
  };


  const handleClickTurn = (id) => {
    console.log("반전 클릭함")
    setMyItemList(prev =>
      prev.map(item =>
        item.itemId === id ? { ...item, flipped: !item.flipped } : item
      )
    );
  };

  const handleClickClose = () => {
    console.log("닫기 클릭함")
    setSelectedId(null);
  }

  const handleBoardClick = (e) => {
    if (e.target === boardRef.current) {
      handleClickClose();
    }
  };

  const handleEditBtnClick = async () => {
    if (isEditable) {
      try {
        await saveMiniroomState(userId, myItemList); // myItemList만 전송!
        console.log("✅ 서버 저장 완료");
      } catch (err) {
        console.error("❌ 서버 저장 실패:", err);
      }
      setSelectedId(null);
      setIsEditable(false);
    } else {
      setIsEditable(true);
    }
  };


  const handleAddItem = (item) => {
    const newId = item.name;
    const newItem = {
      itemId: newId,
      position: { x: Math.random() * 300, y: Math.random() * 200 },
      size: { width: null, height: null }, // 또는 기본값
      flipped: false,
      itemSrc: item.imagePath
    };
    setMyItemList(prev => [...prev, newItem]);
  };


  return (
    <div className="miniroom_container">
      <div
        className="board"
        ref={boardRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleBoardClick}
        style={{ pointerEvents: isEditable ? "auto" : "none"}}
      >
        {myItemList.map((item) => (
          <div 
            key={item.itemId}  
            className='img_frame'
            style={{
              position: 'absolute',
              left: item.position?.x || 0,
              top: item.position?.y || 0,
            }}
            ref={(el) => (imageRefs.current[item.itemId] = el)}
          >
            {selectedId == item.itemId && (
              <div className='toolbar'>
                <button id='btn_delete' onClick={handleClickDelete}></button>
                <button id='btn_turn' onClick={() => handleClickTurn(item.itemId)}></button>
                <button id='btn_close' onClick={handleClickClose}></button>
              </div>
            )}

            <div className='draggable-box'
              onMouseDown={(e) => handleMouseDown(e, item.itemId)}
            > 
              <img
                key={item.itemId}
                id={item.itemId}
                src={item.itemSrc}
                alt={item.itemId}
                className={`draggable ${item.flipped ? 'flipped' : ''}`}
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>
<<<<<<< HEAD
      <div className='rightbar'>

      {/* 일촌 친구 */}
      <div className="friends-card">
        <div className="card-header">
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
        <div className="card-header">
        <span>👋</span>
        <span>최근 방문자</span>
        </div>
        <div className="card-body">
          <div className="visitor-list">
            {recentVisitors.slice(0, 3).map((visitor, index) => (
              <div key={index} className="visitor-item">
                {/* <div className="visitor-avatar">
                  <span className="avatar">{visitor.avatar}</span>
                  </div> */}
                <div className="visitor-info">
                  <p className="visitor-name">{visitor.name}</p>
                  <p className="visitor-time">{visitor.time}</p>
                  {visitor.isOnline && <div className="online-dot"></div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
=======
      <div className='side_wrapper'>
        {isEditable ? <ItemList onItemClick={handleAddItem} myItemList={myItemList}/>: <RightBar todayMood={todayMood.todayMood}/>}
      </div>
  
      <button className='btn_edit' onClick={handleEditBtnClick}>
        {isEditable ? '완료' : '수정'}
      </button>  
>>>>>>> main
    </div>
  </div>
  );
};

export default MiniRoom;
