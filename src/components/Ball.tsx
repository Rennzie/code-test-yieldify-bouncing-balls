import React from 'react';
import './Ball.css';

import { useMovement } from '../hooks';

export type Position = {
  x: number;
  y: number;
};

export type BallSetup = {
  id: string;
  containerBottom: number;
  containerTop: number;
  startCoords: Position;
  radius: number;
};

type Props = {
  ballSetup: BallSetup;
  idx: number;
  handleRemoveBall: (id: string) => void;
};

export default function Ball({ idx, ballSetup }: Props) {
  const { position } = useMovement(ballSetup);

  // if (position.y >= containerBottom) {
  //   endMovement();
  //   handleRemoveBall(ballSetup.id);
  // }

  return (
    <div
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x
      }}
      className="ball-wrapper"
      data-testid={`ball-${idx}`}
    />
  );
}
