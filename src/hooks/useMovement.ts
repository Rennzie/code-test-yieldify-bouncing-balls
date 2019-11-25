/* eslint-disable no-return-assign */
import { useState, useEffect, useRef } from 'react';
import { BallSetup } from '../components/Ball';
// import useVelocity from './useVelocity';

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

/**
 * Creates a random start velocity between 0 and 10px
 */
function randomVelocity() {
  const velocity = Math.floor(Math.random() * 10) + 5;
  return velocity;
}

/**
 * Creates a random start angle between 0 and 10px
 */
function randomAngle() {
  const angle = Math.floor(Math.random() * 45);
  return angle;
}

function randomDirection() {
  const randomNumber = Math.floor(Math.random() * 1000);
  if (randomNumber > 500) return 'LEFT';

  return 'RIGHT';
}

function toRadians(angle: number) {
  const radians = angle * (Math.PI / 180);
  return radians;
}

/**
 * Calculate x component velocity as a function of the velocity
 * @return number
 */
function xComponent(angle: number, velocity: number) {
  const componentVelocity = velocity * Math.sin(toRadians(angle));

  return componentVelocity;
}

/**
 * Calculate y component velocity as a function of the velocity
 * @return number
 */
function yComponent(angle: number, velocity: number) {
  const componentVelocity = velocity * Math.cos(toRadians(angle));

  return componentVelocity;
}

/**
 * Problem:
 *  - react updates everytime we set state which starts a new interval
 *  - this create multiple intervals which all change the ball position
 *  - can we use a useCallback?
 */
export default function useMovement(ballSetup: BallSetup, handleRemoveBall: (id: string) => void) {
  const {
    startCoords,
    containerRect: { top, bottom, left, right },
    radius
  } = ballSetup;

  const intervalRef = useRef<any>(null);
  const vertDirection = useRef<Direction>('UP');
  const horizDirection = useRef<Direction>(randomDirection());

  const velocity = useRef<number>(randomVelocity());
  const angle = useRef<number>(randomAngle());
  const horizVelocity = useRef<number>(xComponent(angle.current, velocity.current));
  const energy = useRef<number>(100);

  const [x, setX] = useState<number>(startCoords.x - radius);
  const [y, setY] = useState<number>(startCoords.y - radius);

  const increaseVelocity = () => {
    if (velocity.current >= 20) return;

    velocity.current += 0.1;
  };

  const decreaseVelocity = () => {
    if (velocity.current < 0) return;

    velocity.current -= 0.1;
  };

  const changeVelocity = () => {
    switch (vertDirection.current) {
      case 'UP':
        return decreaseVelocity();
      case 'DOWN':
        return increaseVelocity();
      default:
        throw new Error('Incorrect vertDirection given');
    }
  };

  const moveVertical = () => {
    switch (vertDirection.current) {
      case 'DOWN':
        return setY(oldY => oldY + yComponent(angle.current, velocity.current));
      case 'UP':
        return setY(
          oldY => oldY - (yComponent(angle.current, velocity.current) * energy.current) / 100
        );
      default:
        throw new Error('Incorrect vertDirection given');
    }
  };

  const moveHorizontal = () => {
    switch (horizDirection.current) {
      case 'LEFT':
        return setX(oldX => oldX - horizVelocity.current);
      case 'RIGHT':
        return setX(oldX => oldX + horizVelocity.current);
      default:
        throw new Error('Incorrect vertDirection given');
    }
  };

  // this call setState every 16ms!! for every ball
  const startMovement = () => {
    intervalRef.current = setInterval(() => {
      moveVertical();
      moveHorizontal();
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

  // change the vertDirection when the ball hits the bottom, top or has a 0 velocity
  // NOTE: all very imperative
  useEffect(() => {
    if (y + radius * 2 >= bottom) {
      vertDirection.current = 'UP';
      energy.current -= 25;
      if (energy.current <= 0.000000001) {
        endMovement();
        setTimeout(() => {
          handleRemoveBall(ballSetup.id);
        }, 500);
      }
    }
    if (y <= top || velocity.current < 0) {
      vertDirection.current = 'DOWN';
    }

    if (x + radius * 2 > right) {
      horizDirection.current = 'LEFT';
    }
    if (x < left) {
      horizDirection.current = 'RIGHT';
    }
  });

  return { x, y };
}
