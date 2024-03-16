import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import Navbar from '../src/Navbar';
import Home from '../src/Home';
import Shop from '../src/Shop';
import Login from '../src/Login';
import LiveServiceChat from '../src/SendMessage';

describe('Navbar component', () => {
  test('renders Home page when Home link is clicked', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Home'));
    expect(screen.getByText('Welcome to Home')).toBeInTheDocument();
  });

  test('renders Shop page when Shop link is clicked', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Shop'));
    expect(screen.getByText('Welcome to the Shop')).toBeInTheDocument();
  });

  test('renders Login page when Login link is clicked', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Login'));
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  test('renders LiveServiceChat page when chatbot link is clicked', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('chatbot'));
    expect(screen.getByText('Live Chat Page')).toBeInTheDocument();
  });
});
