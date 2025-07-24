import React, { useEffect, useRef, useState } from 'react';
import './MiniRoom.css';
import { loadMiniroomState, saveMiniroomState } from '../utils/useMiniroomStorage';
import RightBar from './RightBar';
import ItemList from './ItemList';

const MiniRoom = (todayMood) => {
  const boardRef = useRef(null);  // board 정보 접근용
  const imageRefs = useRef({});   // image 정보 접근용
  const draggingRef = useRef({ isDragging: false, offsetX: 0, offsetY: 0, targetId: null });  // 드래그 중인 요소 접근용
  const [positions, setPositions] = useState({});   // 위치 저장용
  const [flippedItems, setFlippedItems] = useState({}); // object 반전 여부 저장용
  const [grabbingId, setGrabbingId] = useState(null); // 드래그 중인 obj id 저장용 
  const [selectedId, setSelectedId] = useState(null); // 선택 object id 저장
  const [isEditable, setIsEditable] = useState(false); // 수정 가능 여부
  
  const [myItemList, setMyItemList] = useState([  // 미니룸 아이템 목록
    
  ])


  // 초기 위치 로드
  useEffect(() => {
    const { items, positions, flipped } = loadMiniroomState();
    setMyItemList(items);
    setPositions(positions);
    setFlippedItems(flipped);
  }, []);

  const handleMouseDown = (e, id) => {
    
    draggingRef.current = {
      isDragging: true,
      offsetX: e.nativeEvent.offsetX, // (브라우저 원본 이벤트) 실제 마우스 클릭 위치 
      offsetY: e.nativeEvent.offsetY,
      targetId: id
    };
    setGrabbingId(id);
    setSelectedId(id);
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

    saveMiniroomState(myItemList, positions, flippedItems);
  };

  const handleClickDelete = () => {
    if (!selectedId) return;

    const updatedItems = myItemList.filter(item => item.id !== selectedId);
    const updatedPositions = { ...positions };
    const updatedFlipped = { ...flippedItems };

    delete updatedPositions[selectedId];
    delete updatedFlipped[selectedId];

    setMyItemList(updatedItems);
    setPositions(updatedPositions);
    setFlippedItems(updatedFlipped);
    setSelectedId(null);

    saveMiniroomState(updatedItems, updatedPositions, updatedFlipped);
  };

  const handleClickTurn = (id) => {
    console.log("반전 클릭함")
    setFlippedItems(prev => {
      const updated = {
        ...prev,
        [id]: !prev[id]
      };

      // 저장 위치도 함께 반영(localstorage 기준)
      saveMiniroomState(myItemList, positions, updated);

      return updated;
    });
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

  const handleEditBtnClick = () => {
    if (isEditable) {
      setSelectedId(null);
      setIsEditable(false);
    } else {
      setIsEditable(true);
    }
  };

  const handleAddItem = (item) => {
    const newId = item.name;
    const newItem = {
      id: newId,
      src: item.imagePath,
      flipped: false
    };

    const newPosition = {
      left: Math.random() * 300,
      top: Math.random() * 200
    };

    const updatedItems = [...myItemList, newItem];
    const updatedPositions = { ...positions, [newId]: newPosition };
    const updatedFlipped = { ...flippedItems, [newId]: false };

    setMyItemList(updatedItems);
    setPositions(updatedPositions);
    setFlippedItems(updatedFlipped);

    saveMiniroomState(updatedItems, updatedPositions, updatedFlipped);
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
            key={item.id}  
            className='img_frame'
            style={{
                position: 'absolute',
                left: positions[item.id]?.left || 0,
                top: positions[item.id]?.top || 0,
                // cursor: grabbingId === item.id ? 'grabbing' : 'grab'
            }}
            ref={(el) => (imageRefs.current[item.id] = el)}
          >
            {selectedId == item.id && (
              <div className='toolbar'>
                <button id='btn_delete' onClick={handleClickDelete}></button>
                <button id='btn_turn' onClick={() => handleClickTurn(item.id)}></button>
                <button id='btn_close' onClick={handleClickClose}></button>
              </div>
            )}

            <div className='draggable-box'
              onMouseDown={(e) => handleMouseDown(e, item.id)}
            > 
              <img
                key={item.id}
                id={item.id}
                src={item.src}
                alt={item.id}
                className={`draggable ${flippedItems[item.id] ? 'flipped' : ''}`}
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>
      <div className='side_wrapper'>
        {isEditable ? <ItemList onItemClick={handleAddItem} myItemList={myItemList}/>: <RightBar todayMood={todayMood.todayMood}/>}
      </div>
  
      {isEditable ? <button className='btn_edit' onClick={handleEditBtnClick}>완료</button> : <button className='btn_edit' onClick={handleEditBtnClick}>수정</button>}  
    </div>
  );
};

export default MiniRoom;
