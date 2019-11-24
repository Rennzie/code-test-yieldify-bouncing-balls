/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef, useEffect } from 'react';
import './Container.css';

import Ball, { BallSetup } from './Ball';

export type ContainerRect = {
  bottom: number;
  top: number;
  left: number;
  right: number;
};

export default function Container() {
  const containerRef = useRef(null);
  const [balls, setBalls] = useState<BallSetup[]>([]);
  const [containerRect, setContainerRect] = useState<ContainerRect>({
    bottom: 0,
    top: 0,
    left: 0,
    right: 0
  });

  useEffect(() => {
    if (containerRef.current) {
      //@ts-ignore
      const { bottom, top, left, right } = containerRef.current.getBoundingClientRect();
      setContainerRect({ bottom, top, left, right });
    }
  }, []);

  const handleClick = (event: any) => {
    const x = event.clientX; // - rect.x;
    const y = event.clientY; // - rect.y;
    const id = Math.floor(Math.random() * 1000000);
    setBalls(b => [
      ...b,
      {
        id: `ball-${id}`,
        startCoords: { x, y },
        containerRect,
        radius: 15
      }
    ]);
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
        <Ball ballSetup={ball} handleRemoveBall={handleRemoveBall} key={ball.id} idx={idx} />
      ))}
    </main>
  );
}
