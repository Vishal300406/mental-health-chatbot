import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // List of offensive words to detect abusive language
  const offensiveWords = ['stupid', 'idiot', 'dumb', 'hate', 'useless', 'fool', 'fuck', 'shut up'];

  // List of food items to detect
  const foodItems = ['pizza', 'burger', 'pasta', 'sushi', 'salad', 'ice cream', 'sandwich', 'fries', 'steak','chips','biryani'];

  // Function to generate a response based on emotion or food in the input message
  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    // Food detection
    const detectedFood = foodItems.filter(food => lowerMessage.includes(food));
    if (detectedFood.length > 0) {
      const foodList = detectedFood.join(', ');
      return `Yum! I see you're thinking about: ${foodList}. I can't bring food, but I'm here for emotional support too! 🍕🍔🍣`;
    }

    // Offensive words check
    for (let word of offensiveWords) {
      if (lowerMessage.includes(word)) {
        return "Please don't talk like that. Let's keep the conversation respectful. 😊";
      }
    }

    // Emotion-based responses
    if (lowerMessage.includes('happy') || lowerMessage.includes('good') || lowerMessage.includes('great')) {
      return "That's wonderful! I'm so happy to hear that! 😊";
    } else if (lowerMessage.includes('sad') || lowerMessage.includes('down') || lowerMessage.includes('blue')) {
      return "I'm sorry you're feeling down. I'm here for you. 💙";
    } else if (lowerMessage.includes('angry') || lowerMessage.includes('rage') || lowerMessage.includes('mad')) {
      return "I can understand that you're upset. Take a deep breath, it's okay to feel this way. 🧘‍♀";
    } else if (lowerMessage.includes('anxious') || lowerMessage.includes('nervous') || lowerMessage.includes('scared')) {
      return "It’s normal to feel anxious sometimes. You're not alone in this. 🤝";
    } else if (lowerMessage.includes('stressed') || lowerMessage.includes('stress') || lowerMessage.includes('burnout') || lowerMessage.includes('tired') || lowerMessage.includes('exhausted')) {
      // New improved stressed statements - randomly pick one
      const stressedResponses = [
        "Remember to take deep breaths and give yourself a moment to pause.",
        "Try to focus on what you can control and let go of what you can't.",
        "Taking short breaks can help clear your mind and reduce stress.",
        "Listening to calming music or nature sounds might help you relax.",
        "You’re doing your best-be kind to yourself during stressful times."
      ];
      return stressedResponses[Math.floor(Math.random() * stressedResponses.length)];
    } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks') || lowerMessage.includes('appreciate')) {
      return "You're very welcome! I'm always here for you. 😊";
    } else {
      return "I'm here for you! Let's talk more. 🤗";
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response with a delay
    const botResponse = getBotResponse(input);
    setTimeout(() => {
      const botMessage = { sender: 'bot', text: botResponse };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="app">
      <div className="chat-container">
        <h2>🤖 Mental Health Buddy</h2>

        <div className="robot">
          <div className="eyes">
            <div className="eye"></div>
            <div className="eye"></div>
          </div>
          <div className="mouth"></div>
        </div>

        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}
            >
              <p><strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}</p>
            </div>
          ))}
        </div>

        <div className="input-container">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="How are you feeling today?"
            onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
