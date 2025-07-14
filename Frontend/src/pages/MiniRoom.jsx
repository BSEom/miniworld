import React from 'react';
import './MiniRoom.css';

const imageList = [
  'bed.png',
  'bookcase.png',
  'chair.png',
  'clock.png',
  'closet.png',
  'cup.png',
  'picture.png',
  'side_table.png',
  'sitting_mat.png',
  'table_01.png',
  'table_02.png',
  'table_03.png',
  'table_04.png',
  'wall_01.png',
  'wall_02.png',
  'wall_03.png',
  'wooden_tile.png',
  // 필요시 추가
];

const MiniRoom = () => {
  return (
    <div className="miniroom">
      <img className='room' src="/img/room.jpg" alt="Room" />
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
