import React, { useEffect, useRef } from 'react';
import './MiniRoom.css';

const MiniRoom = () => {
  const boardRef = useRef(null);
  const draggablesRef = useRef({});

  const imageList = [
    { id: 'img1', src: 'img/miniroom/table.gif' },
    { id: 'img2', src: 'img/miniroom/window.gif' },
    { id: 'img3', src: 'img/miniroom/chair.gif', width: 33 },
    { id: 'img4', src: 'img/miniroom/ddd.gif' }
  ];

  useEffect(() => {
    imageList.forEach(({ id }) => {
      const el = draggablesRef.current[id];
      const saved = localStorage.getItem(id);

      if (el) {
        if (saved) {
          const pos = JSON.parse(saved);
          el.style.left = pos.left + 'px';
          el.style.top = pos.top + 'px';
        } else {
          el.style.left = Math.random() * 300 + 'px';
          el.style.top = Math.random() * 200 + 'px';
        }

        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        const handleMouseDown = (e) => {
          isDragging = true;
          offsetX = e.offsetX;
          offsetY = e.offsetY;
          el.style.cursor = 'grabbing';
        };

        const handleMouseMove = (e) => {
          if (!isDragging) return;
          const boardRect = boardRef.current.getBoundingClientRect();
          let newLeft = e.clientX - boardRect.left - offsetX;
          let newTop = e.clientY - boardRect.top - offsetY;

          newLeft = Math.max(0, Math.min(newLeft, boardRef.current.offsetWidth - el.offsetWidth));
          newTop = Math.max(0, Math.min(newTop, boardRef.current.offsetHeight - el.offsetHeight));

          el.style.left = newLeft + 'px';
          el.style.top = newTop + 'px';

          localStorage.setItem(id, JSON.stringify({ left: newLeft, top: newTop }));
        };

        const handleMouseUp = () => {
          isDragging = false;
          el.style.cursor = 'grab';
        };

        el.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
          el.removeEventListener('mousedown', handleMouseDown);
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };
      }
    });
  }, []);

  return (
    <div className="container">
      <div className="board" ref={boardRef}>
        {imageList.map((item) => (
          <img
            key={item.id}
            id={item.id}
            ref={(el) => (draggablesRef.current[item.id] = el)}
            src={item.src}
            alt={item.id}
            className="draggable"
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
};

export default MiniRoom;