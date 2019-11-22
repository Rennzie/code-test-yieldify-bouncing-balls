import React from 'react';
import './Ball.css';

type Props = {
  idx: number;
};

export default function Ball({ idx }: Props) {
  return <div className="ball-wrapper" data-testid={`ball-${idx}`} />;
}
