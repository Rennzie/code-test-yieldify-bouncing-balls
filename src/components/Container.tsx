/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import './Container.css';

import Ball from './Ball';

export default function Container() {
  const [balls, setBalls] = useState<string[]>([]);

  const handleClick = () => {
    const id = Math.floor(Math.random() * 1000);
    setBalls(b => [...b, `ball-${id}`]);
  };
  return (
    <main onClick={handleClick} data-testid="ball-container" className="container-wrapper">
      {balls.map((ball, idx) => (
        <Ball key={ball} idx={idx} />
      ))}
    </main>
  );
}
