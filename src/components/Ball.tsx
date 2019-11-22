import React from 'react';
import './Ball.css';

export type BallStarter = {
  id: string;
  startCoords: { x: number; y: number };
};

type Props = {
  idx: number;
  ballStart: BallStarter;
};

export default function Ball({ idx, ballStart }: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        top: ballStart.startCoords.y - 15,
        left: ballStart.startCoords.x - 15
      }}
      className="ball-wrapper"
      data-testid={`ball-${idx}`}
    />
  );
}
