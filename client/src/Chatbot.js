// client/src/components/Chatbot.js
import React, { useState } from 'react';

function Chatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_API_KEY`
      },
      body: JSON.stringify({
        prompt: input,
        max_tokens: 150
      })
    });
    const data = await response.json();
    setMessages([...messages, { input, response: data.choices[0].text }]);
    setInput('');
  };

  return (
    <div>
      <h2>Chatbot Interface</h2>
      <div>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Type your message here..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <p><strong>You:</strong> {msg.input}</p>
            <p><strong>Bot:</strong> {msg.response}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chatbot;
