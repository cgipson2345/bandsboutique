import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/register', { username, password });
      console.log('Registration response:', response);
      setError(''); // Clear any previous error message
      setUsername(''); // Clear username field
      setPassword(''); // Clear password field
      alert('User registered successfully!');
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response && error.response.status === 409) {
        setError('Username is already registered');
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      const token = response.data.token;
      console.log('User logged in successfully');
      setIsLoggedIn(true);
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
      <Navbar />
      {!isLoggedIn && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md">
          <h1 className="text-2xl font-bold mb-4">User Authentication</h1>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-red-500 text-xs italic">{error}</p>}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleRegister}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="footer bg-cyan-950 w-full flex shrink-0 text-white bottom-0 fixed justify-between"> 
        <div className="flex pl-2"> Contact us! </div> 
        <div className="flex gap-x-2 pr-2">
          <p> 123-4567-891 </p>
          <p>email@gmail.com</p>
          </div>
      </div>
    </div>
  );
}

export default App;
