import { useRef } from 'react';

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

function randomDirection() {
  const randomNumber = Math.floor(Math.random() * 1000);
  if (randomNumber > 500) return 'LEFT';

  return 'RIGHT';
}

export default function useDirection() {
  const vertDirection = useRef<Direction>('UP');
  const horizDirection = useRef<Direction>(randomDirection());

  const changeVertDirection = (direction: Direction) => {
    vertDirection.current = direction;
  };
  const changeHorizDirection = (direction: Direction) => {
    horizDirection.current = direction;
  };

  return {
    horizDirection: horizDirection.current,
    vertDirection: vertDirection.current,
    changeHorizDirection,
    changeVertDirection
  };
}
