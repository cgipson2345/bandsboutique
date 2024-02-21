// src/index.js or src/index.jsx
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';
require('./styles.css'); // Using require here

// Use createRoot to render the app
const root = document.getElementById('root') || document.createElement('div');
const rootInstance = createRoot(root);

rootInstance.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);