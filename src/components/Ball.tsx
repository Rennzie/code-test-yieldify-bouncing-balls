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
  startCoords: Position;
};

type Props = {
  ballSetup: BallSetup;
  containerBottom: number;
  idx: number;
  handleRemoveBall: (id: string) => void;
};

export default function Ball({ containerBottom, idx, ballSetup }: Props) {
  console.log(containerBottom);
  // const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  // const [intervalId, setIntervalId] = useState();

  const { position } = useMovement(ballSetup);

  // if (position.y >= containerBottom) {
  //   endMovement();
  //   handleRemoveBall(ballSetup.id);
  // }

  // // setstate triggers another run of the effect,
  // // BUG: more balls added the faster the earlier ones go
  // // need to move this logic out of the effect
  // useEffect(() => {
  //   const moveBallDown = () => {
  //     setPosition(pos => ({ ...pos, y: pos.y + 1 }));
  //   };
  //   setTimeout(() => moveBallDown(), 100);
  // });

  return (
    <div
      style={{
        position: 'absolute',
        top: position.y - 15,
        left: position.x - 15
      }}
      className="ball-wrapper"
      data-testid={`ball-${idx}`}
    />
  );
}
