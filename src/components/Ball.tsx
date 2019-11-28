import React from 'react';
import './Ball.css';

import { useMovement } from '../hooks';
import { ContainerRect } from './Container';

export type Position = {
  x: number;
  y: number;
};

export type BallSetup = {
  id: string;
  containerRect: ContainerRect;
  startCoords: Position;
  radius: number;
};

const BALL_COLORS = [
  '#FF0300',
  '#FF2000',
  '#FF6800',
  '#FF7000',
  '#FF9100',
  '#FFA900',
  '#FFB100',
  '#FFC800',
  '#FFCF00',
  '#FFE500',
  '#FFEB00',
  '#FFF900',
  '#FFF900',
  '#F6FD02',
  '#C0F40C',
  '#B3F10E',
  '#A7EF10',
  '#86E817',
  '#7BE619',
  '#72E41C',
  '#57DD22',
  '#4FDA25',
  '#47D827',
  '#40D629',
  '#37C84F',
  '#39C657',
  '#3EC167',
  '#40BF6E',
  '#43BC75',
  '#45BA7B'
];
type Props = {
  ballSetup: BallSetup;
  idx: number;
  handleRemoveBall: (id: string) => void;
};

export default function Ball({ idx, ballSetup, handleRemoveBall }: Props) {
  const position = useMovement(ballSetup, handleRemoveBall);

  return (
    <div
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        height: ballSetup.radius * 2,
        width: ballSetup.radius * 2,
        backgroundColor: BALL_COLORS[idx],
        borderRadius: '50%'
      }}
      className="ball-wrapper"
      data-testid={`ball-${idx}`}
    />
  );
}
