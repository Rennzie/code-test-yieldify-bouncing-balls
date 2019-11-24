/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef, useEffect } from 'react';
import './Container.css';

import Ball, { BallSetup } from './Ball';

export default function Container() {
  const [balls, setBalls] = useState<BallSetup[]>([]);
  const [bottom, setBottom] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      //@ts-ignore
      const newBottom = containerRef.current.getBoundingClientRect().bottom;
      setBottom(newBottom);
    }
  }, []);

  const handleClick = (event: any) => {
    const x = event.clientX; // - rect.x;
    const y = event.clientY; // - rect.y;
    const id = Math.floor(Math.random() * 1000000);
    setBalls(b => [...b, { id: `ball-${id}`, startCoords: { x, y }, containerBottom: bottom }]);
  };

  const handleRemoveBall = (ballId: string) => {
    setBalls(bls => {
      const updatedBalls = bls.filter(bl => bl.id !== ballId);
      return [...updatedBalls];
    });
  };

  // if (containerRef.current) {
  //   console.log(containerRef.current.getBoundingClientRect());
  // }

  return (
    <main
      ref={containerRef}
      onClick={handleClick}
      data-testid="ball-container"
      className="container-wrapper"
    >
      {balls.map((ball, idx) => (
        <Ball
          ballSetup={ball}
          containerBottom={bottom}
          handleRemoveBall={handleRemoveBall}
          key={ball.id}
          idx={idx}
        />
      ))}
    </main>
  );
}
