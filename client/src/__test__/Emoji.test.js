import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Emoji from '../components/Emoji';

test('It loads rainbow emoji', () => {
  const { getByTestId } = render(<Emoji />);
  expect(getByTestId('emoji').textContent).toBe('🌈');
});
