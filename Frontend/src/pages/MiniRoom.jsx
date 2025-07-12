import React, { useState, useEffect } from 'react';
import './MiniRoom.css';

const MiniRoom = () => {

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  return (
    <div className="miniroom">
    </div>
  );
};

export default MiniRoom;