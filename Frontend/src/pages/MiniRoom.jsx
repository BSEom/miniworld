import React, { useEffect, useRef, useState } from 'react';
import './MiniRoom.css';

const MiniRoom = () => {
  const boardRef = useRef(null);  // board 정보 접근용
  const imageRefs = useRef({});   // image 정보 접근용
  const draggingRef = useRef({ isDragging: false, offsetX: 0, offsetY: 0, targetId: null });  // 드래그 중인 요소 접근용
  const [positions, setPositions] = useState({});   // 위치 저장용
  const [grabbingId, setGrabbingId] = useState(null); // 드래그 중인 obj id 저장용 

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
    </div>
  );
};

export default MiniRoom;
