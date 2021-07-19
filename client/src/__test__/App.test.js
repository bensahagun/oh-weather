import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

test('Loads with default heading', () => {
  const { getByTestId } = render(<App />);

  expect(getByTestId('pageTitle').textContent).toBe('Oh! Weather 🌈');
});

test('Textbox starts empty', () => {
  const { getByPlaceholderText } = render(<App />);
  const element = getByPlaceholderText('Type a city and press Enter');

  expect(element.textContent).toBeFalsy();
});

test('Search input is working correctly', () => {
  const { getByTestId } = render(<App />);
  const input = getByTestId('searchInput');

  //assign valid input
  fireEvent.change(input, { target: { value: 'Manila' } });
  expect(input.value).toBe('Manila');
});
