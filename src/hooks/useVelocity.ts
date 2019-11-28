import { useRef } from 'react';
import { Direction } from './useDirection';

function toRadians(angle: number) {
  const radians = angle * (Math.PI / 180);
  return radians;
}

/**
 * Creates a random start velocity between 0 and 10px
 */
function randomVelocity() {
  const velocity = Math.floor(Math.random() * 10) + 5;

  return velocity;
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
 * Handles the velocity of an object.
 * - returns the horizontal and vertical components of that verlocity given an angle between 0-90
 */
export default function useVelocity(angle: number) {
  const velocity = useRef<number>(randomVelocity());
  const horizVelocity = useRef<number>(xComponent(angle, velocity.current));
  const vertVelocity = useRef<number>(yComponent(angle, velocity.current));

  const increaseVelocity = () => {
    if (velocity.current >= 20) return;

    velocity.current += 0.1;
    vertVelocity.current = yComponent(angle, velocity.current);
  };

  const decreaseVelocity = () => {
    if (velocity.current < 0) return;

    velocity.current -= 0.1;
    vertVelocity.current = yComponent(angle, velocity.current);
  };

  const changeVelocity = (vertDirection: Direction) => {
    switch (vertDirection) {
      case 'UP':
        return decreaseVelocity();
      case 'DOWN':
        return increaseVelocity();
      default:
        throw new Error('Incorrect vertDirection given');
    }
  };

  return {
    vertVelocity: vertVelocity.current,
    horizVelocity: horizVelocity.current,
    changeVelocity
  };
}
