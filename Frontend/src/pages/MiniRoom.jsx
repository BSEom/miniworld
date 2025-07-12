import React from 'react';
import './MiniRoom.css';

const imageList = [
  'bed.png',
  'table_01.png',
  'chair.png',
  'bookcase.png',
  'clock.png',
  'picture.png',
  'wall_01.png',
  'closet.png',
  'side_table.png',
  'sitting_mat.png',
  // 필요시 추가
];

const MiniRoom = () => {
  return (
    <div className="miniroom">
      {imageList.map((img, idx) => (
        <img
          key={img}
          src={`/img/${img}`}
          alt={img.replace('.png', '')}
          className={`miniroom-img miniroom-img-${idx}`}
        />
      ))}
    </div>
  );
};

export default MiniRoom;
