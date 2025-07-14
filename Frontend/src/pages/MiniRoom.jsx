import React, { useState, useEffect, useRef } from 'react';
import './MiniRoom.css';

const MiniRoom = () => {
  const [positions, setPositions] = useState({});
  const [isDragging, setIsDragging] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const boardRef = useRef(null);

  // 드래그 가능한 아이템들
  const draggableItems = [
    { id: 'img1', src: 'img/miniroom/table.gif', width: 120 },
    { id: 'img2', src: 'img/miniroom/window.gif', width: 120 },
    { id: 'img3', src: 'img/miniroom/chair.gif', width: 33 },
    { id: 'img4', src: 'img/miniroom/ddd.gif', width: 120 }
  ];

  // 초기 위치 설정
  useEffect(() => {
    const initialPositions = {};
    draggableItems.forEach((item) => {
      // 실제 환경에서는 localStorage를 사용하지만, 
      // 여기서는 메모리 내 상태로 관리
      const randomLeft = Math.random() * 300;
      const randomTop = Math.random() * 200;
      initialPositions[item.id] = {
        left: randomLeft,
        top: randomTop
      };
    });
    setPositions(initialPositions);
  }, []);

  const handleMouseDown = (e, itemId) => {
    setIsDragging(itemId);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !boardRef.current) return;

    const gridSize = 50;
    const boardRect = boardRef.current.getBoundingClientRect();
    const draggedItem = draggableItems.find(item => item.id === isDragging);
    
    if (!draggedItem) return;

    // 드래그 후 계산된 위치
    let newLeft = e.clientX - boardRect.left - dragOffset.x;
    let newTop = e.clientY - boardRect.top - dragOffset.y;

    // board 영역 내로 제한
    newLeft = Math.max(0, Math.min(newLeft, boardRef.current.offsetWidth - draggedItem.width));
    newTop = Math.max(0, Math.min(newTop, boardRef.current.offsetHeight - draggedItem.width));

    // 격자에 맞춤
    newLeft = Math.round(newLeft / gridSize) * gridSize;
    newTop = Math.round(newTop / gridSize) * gridSize;

    setPositions(prev => ({
      ...prev,
      [isDragging]: { left: newLeft, top: newTop }
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(null);
    setDragOffset({ x: 0, y: 0 });
  };

  // 전역 마우스 이벤트 리스너
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div className="container">
      <div className="board" ref={boardRef}>
        <div className="grid-overlay"></div>
        {draggableItems.map((item) => (
          <img
            key={item.id}
            id={item.id}
            src={item.src}
            alt={item.id}
            className={`draggable ${isDragging === item.id ? 'dragging' : ''}`}
            style={{
              left: `${positions[item.id]?.left || 0}px`,
              top: `${positions[item.id]?.top || 0}px`
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