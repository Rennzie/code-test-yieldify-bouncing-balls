import { useRef } from 'react';
import { Direction } from './useMovement';

export default function useVelocity(direction: Direction) {
  const velocity = useRef<number>(1);
  const intervalRef = useRef<any>(null);

  const increaseVelocity = () => {
    if (velocity.current <= 10) {
      console.log(velocity.current);
      return (velocity.current += 0.1);
    }
  };

  const decreaseVelocity = () => {
    if (velocity.current > 0) {
      return (velocity.current -= 0.1);
    }
  };

  const changeVelocity = () => {
    switch (direction) {
      case 'UP':
        return decreaseVelocity();
      case 'DOWN':
        return increaseVelocity();
    }
  };

  // const startGravity = () => {
  //   intervalRef.current = setInterval(() => {
  //     console.log('useVelocity fired', direction);
  //     changeVelocity();
  //   }, 500);
  // };

  const cleanUpVelocity = clearInterval(intervalRef.current);

  return { velocity: velocity.current, changeVelocity, cleanUpVelocity };
}
