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
      // @ts-ignore
      setMessages([...messages, response.data.botResponse]);
      // Clear input field
      setInputMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    // Fetch initial chat history or any previous messages from the backend
    // Update messages state
  }, []);

  return (
    <div className="live-service-chat">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className="message">{message}</div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default LiveServiceChat;
