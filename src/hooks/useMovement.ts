/* eslint-disable no-return-assign */
import { useState, useEffect, useRef, useCallback } from 'react';
import { BallSetup } from '../components/Ball';
import { useInterval } from './useInterval';
import useVelocity from './useVelocity';

import useDirection from './useDirection';

/**
 * Creates a random start angle between 0 and 45degrees
 */
function randomAngle() {
  const angle = Math.floor(Math.random() * 45);
  return angle;
}

/**
 * Handles the movement of a ball within a container.
 * @returns Object {x: number, y: number}
 */
export default function useMovement(ballSetup: BallSetup, handleRemoveBall: (id: string) => void) {
  const {
    startCoords,
    containerRect: { top, bottom, left, right },
    radius
  } = ballSetup;

  const angle = useRef<number>(randomAngle());

  const {
    horizDirection,
    vertDirection,
    changeHorizDirection,
    changeVertDirection
  } = useDirection();

  const { horizVelocity, vertVelocity, changeVelocity } = useVelocity(angle.current);

  const energy = useRef<number>(100);

  const [x, setX] = useState<number>(startCoords.x - radius);
  const [y, setY] = useState<number>(startCoords.y - radius);

  const moveVertical = useCallback(() => {
    switch (vertDirection) {
      case 'DOWN':
        return setY(oldY => oldY + vertVelocity);
      case 'UP':
        return setY(oldY => oldY - (vertVelocity * energy.current) / 100);
      default:
        throw new Error('Incorrect vertDirection given');
    }
  }, [vertDirection, vertVelocity]);

  const moveHorizontal = useCallback(() => {
    switch (horizDirection) {
      case 'LEFT':
        return setX(oldX => oldX - (horizVelocity * energy.current) / 100);
      case 'RIGHT':
        return setX(oldX => oldX + (horizVelocity * energy.current) / 100);
      default:
        throw new Error('Incorrect vertDirection given');
    }
  }, [horizDirection, horizVelocity]);

  useInterval(() => {
    moveVertical();
    moveHorizontal();
    changeVelocity(vertDirection);
  }, 16);

  // change the vertDirection when the ball hits the bottom, top or has a 0 velocity
  // NOTE: all very imperative
  useEffect(() => {
    if (y + radius * 2 >= bottom) {
      changeVertDirection('UP');
      setTimeout(() => {
        energy.current *= 0.75;
      }, 100);

      if (energy.current <= 0.000000001) {
        setTimeout(() => {
          handleRemoveBall(ballSetup.id);
        }, 500);
      }
    }
    if (y <= top || vertVelocity < 0) {
      changeVertDirection('DOWN');
    }

    if (x + radius * 2 > right) {
      changeHorizDirection('LEFT');
    }
    if (x < left) {
      changeHorizDirection('RIGHT');
    }
  });

  return { x, y };
}
