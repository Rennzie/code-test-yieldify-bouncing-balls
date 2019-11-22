/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import './Container.css';

import Ball, { BallStarter } from './Ball';

export default function Container() {
  const [balls, setBalls] = useState<BallStarter[]>([]);

  const handleClick = (event: any) => {
    const x = event.clientX; // - rect.x;
    const y = event.clientY; // - rect.y;
    const id = Math.floor(Math.random() * 1000);
    setBalls(b => [...b, { id: `ball-${id}`, startCoords: { x, y } }]);
  };

  return (
    <main onClick={handleClick} data-testid="ball-container" className="container-wrapper">
      {balls.map((ball, idx) => (
        <Ball key={ball.id} ballStart={ball} idx={idx} />
      ))}
    </main>
  );
}
