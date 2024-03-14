import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Use axios or another HTTP client to communicate with your backend

const LiveServiceChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = async () => {
    try {
      // Send the user message to the backend
      const response = await axios.post('/api/send-message', { message: inputMessage });
      // Update messages state with bot response
      setMessages(prevMessages => [...prevMessages, { text: inputMessage, isBot: false }]);
      setMessages(prevMessages => [...prevMessages, { text: response.data.botResponse, isBot: true }]);
      // Clear input field
      setInputMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };


  return (
    <div className="live-service-chat">
      <div className="message holder"></div>
      <form className="send holder">
      <input type = "text" className="message input"></input>
      <button type = "submit" id = "send-button">Send</button>
      </form>
    </div>
  );
};

export default LiveServiceChat;
