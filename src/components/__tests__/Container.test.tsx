import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Contianer from '../Container';

test('renders a rectangular container and adds a ball on click', async () => {
  const { findByTestId, debug } = render(<Contianer />);
  const ballContainer = await findByTestId('ball-container');
  expect(ballContainer).toBeTruthy();
  debug();
  fireEvent.click(ballContainer);
  const ball = await findByTestId('ball-0');
  expect(ball).toBeTruthy();
  debug();
});
