import { useState, useCallback, useEffect, useRef } from 'react';
import { BallSetup } from '../components/Ball';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

/**
 * Problem:
 *  - react updates everytime we set state which starts a new interval
 *  - this create multiple intervals which all change the ball position
 *  - can we use a useCallback?
 */
export default function useMovement(ballSetup: BallSetup) {
  const { startCoords, containerBottom } = ballSetup;
  const direction = useRef<Direction>('DOWN');
  const [x] = useState(startCoords.x);
  const [y, setY] = useState(startCoords.y);

  const intervalRef = useRef<any>(null);

  const moveBallDown = useCallback(() => {
    switch (direction.current) {
      case 'DOWN':
        return setY(oldY => oldY + 10);
      case 'UP':
        return setY(oldY => oldY - 10);
      default:
        throw new Error('Incorrect direction given');
    }
    // position.y -= 10;
  }, [direction]);

  const startMovement = useCallback(() => {
    intervalRef.current = setInterval(() => {
      moveBallDown();
    }, 100);
  }, [moveBallDown]);

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

  useEffect(() => {
    if (y + 15 >= containerBottom) {
      direction.current = 'UP';
    }
  });

  return { position: { x, y }, endMovement };
}
