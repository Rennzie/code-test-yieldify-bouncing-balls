/* eslint-disable no-return-assign */
import { useState, useEffect, useRef } from 'react';
import { BallSetup } from '../components/Ball';
// import useVelocity from './useVelocity';

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

/**
 * Problem:
 *  - react updates everytime we set state which starts a new interval
 *  - this create multiple intervals which all change the ball position
 *  - can we use a useCallback?
 */
export default function useMovement(ballSetup: BallSetup) {
  const { startCoords, containerBottom, containerTop, radius } = ballSetup;

  const intervalRef = useRef<any>(null);
  const direction = useRef<Direction>('DOWN');

  const [x] = useState<number>(startCoords.x - radius);
  const [y, setY] = useState<number>(startCoords.y - radius);

  const velocity = useRef<number>(1);

  const increaseVelocity = () => {
    if (velocity.current >= 10) return;

    velocity.current += 0.1;
  };

  const decreaseVelocity = () => {
    if (velocity.current < 0) return;

    velocity.current -= 0.1;
  };

  const changeVelocity = () => {
    switch (direction.current) {
      case 'UP':
        return decreaseVelocity();
      case 'DOWN':
        return increaseVelocity();
      default:
        throw new Error('Incorrect direction given');
    }
  };

  const moveVertical = () => {
    switch (direction.current) {
      case 'DOWN':
        return setY(oldY => oldY + velocity.current);
      case 'UP':
        return setY(oldY => oldY - velocity.current);
      default:
        throw new Error('Incorrect direction given');
    }
  };

  // this call setState every 16ms!! for every ball
  const startMovement = () => {
    intervalRef.current = setInterval(() => {
      moveVertical();
      changeVelocity();
    }, 16);
  };

  // clean up the interval when ball unmounts
  const endMovement = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // start the movement when the hook is loaded
  // prevent further starts
  useEffect(() => {
    startMovement();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // change the direction when the ball hits the bottom, top or has a 0 velocity
  useEffect(() => {
    if (y + radius * 2 >= containerBottom) {
      direction.current = 'UP';
    }
    if (y <= containerTop || velocity.current < 0) {
      direction.current = 'DOWN';
    }
  });

  return { position: { x, y }, endMovement };
}
