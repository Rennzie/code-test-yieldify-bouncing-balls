/**
 * DISCLAIMER: I borrowed this hook from Dan Abramov.
 * The origional post describing it can be found [here](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)
 */

import { useEffect, useRef } from 'react';

/**
 * Creates a new interval with fresh arguments based on the delay.
 * - This gets around the interval closing over its values
 */
export function useInterval(callback: any, delay: number) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      //@ts-ignore
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
