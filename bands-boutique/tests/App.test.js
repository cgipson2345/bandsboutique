import { render, screen } from '@testing-library/react';
import App from '../src/App';
import '@testing-library/jest-dom/';
import React from 'react'; 


test('renders App component', () => {
  render(<App />);
  const loginButton = screen.getByTestId('login-button'); // Assuming your login button has a test ID
  expect(loginButton).toBeInTheDocument();
});