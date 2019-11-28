import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Contianer from '../Container';

describe('container renders and can add balls', () => {
  test('renders a rectangular container', async () => {
    const { findByTestId } = render(<Contianer />);
    const ballContainer = await findByTestId('ball-container');
    expect(ballContainer).toBeTruthy();
  });

  test('renders a rectangular container and adds a ball on click', async () => {
    const { findByTestId } = render(<Contianer />);
    const ballContainer = await findByTestId('ball-container');
    fireEvent.click(ballContainer);
    const ball1 = await findByTestId('ball-0');
    expect(ball1).toBeTruthy();
    fireEvent.click(ballContainer);
    const ball2 = await findByTestId('ball-1');
    expect(ball2).toBeTruthy();
  });
});
