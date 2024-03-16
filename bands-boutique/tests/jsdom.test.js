import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/';

// Simple functional component for testing
const TestComponent = () => <h1>Hello JSDOM!</h1>;

test('JSDOM renders component correctly', () => {
  render(<TestComponent />);
  const headingElement = screen.getByText(/Hello JSDOM!/i);
  expect(headingElement).toBeInTheDocument();
});
