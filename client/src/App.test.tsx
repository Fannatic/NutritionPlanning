import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('it renders', async () => {
    render(<App />);
    expect(screen.getByText('Welcome in app')).toBeInTheDocument();
  });
 })
