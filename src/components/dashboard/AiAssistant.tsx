import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Lightbulb, Book, BarChart, Download } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Message type
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// AI responses for specific topics
const AI_RESPONSES: Record<string, string[]> = {
  course: [
    "Based on your interest in web development, I'd recommend 'React - The Complete Guide' by Maximilian Schwarzmüller. It has excellent reviews and covers everything from basics to advanced concepts.",
    "Looking at your progress in Python, you might enjoy 'Machine Learning A-Z'. It builds on your programming skills and introduces you to an exciting new field.",
    "Since you've completed several beginner courses, I think you're ready for 'Advanced JavaScript Concepts'. It covers performance optimization, functional programming, and more advanced topics."
  ],
  progress: [
    "You've been making steady progress! You've completed 3 courses this month, which is 20% more than last month. Keep it up!",
    "I notice you typically study most effectively in the evenings. Consider scheduling your more challenging lessons during that time for optimal learning.",
    "You're progressing well in the Web Development track. You've completed 60% of the curriculum in just 4 weeks!"
  ],
  goals: [
    "Based on your current pace, you'll complete your Data Science certification in approximately 3 months. Do you want to adjust your timeline?",
    "I've noticed you've set a goal to learn JavaScript, but haven't enrolled in any related courses yet. Would you like me to recommend some beginner JavaScript courses?",
    "Looking at your learning patterns, setting aside 45 minutes every morning seems to work best for your schedule. Should I update your study plan accordingly?"
  ],
  general: [
    "I'm here to help with course recommendations, track your progress, and help you set and achieve your learning goals. What would you like to know?",
    "If you're feeling stuck on a particular topic, I can suggest supplementary resources or alternative explanations that might help.",
    "Remember, consistent daily practice, even if it's just for 15 minutes, is more effective than occasional long study sessions."
  ]
};

// Function to generate a unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Function to get a random AI response based on keywords
const getAIResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('course') || lowerMessage.includes('recommend') || lowerMessage.includes('learn')) {
    const responses = AI_RESPONSES.course;
    return responses[Math.floor(Math.random() * responses.length)];
  } else if (lowerMessage.includes('progress') || lowerMessage.includes('improve') || lowerMessage.includes('doing')) {
    const responses = AI_RESPONSES.progress;
    return responses[Math.floor(Math.random() * responses.length)];
  } else if (lowerMessage.includes('goal') || lowerMessage.includes('plan') || lowerMessage.includes('target')) {
    const responses = AI_RESPONSES.goals;
    return responses[Math.floor(Math.random() * responses.length)];
  } else {
    const responses = AI_RESPONSES.general;
    return responses[Math.floor(Math.random() * responses.length)];
  }
};

const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateId(),
      content: "Hi there! I'm your Coursera AI Learning Assistant. I can help you with course recommendations, track your progress, and help you achieve your learning goals. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Suggested questions
  const suggestedQuestions = [
    "What courses should I take next?",
    "How am I progressing in my current courses?",
    "Can you help me create a study plan?",
    "What are the trending courses in data science?"
  ];

  // Autoscroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: generateId(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI thinking and respond after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: generateId(),
        content: getAIResponse(userMessage.content),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white rounded-lg shadow-card p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">AI Learning Assistant</h2>
        <p className="text-neutral-600">
          Your personalized AI assistant can help with course recommendations, answer questions about your courses, 
          and provide guidance to improve your learning experience.
        </p>
      </div>
      
      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        <div className="lg:w-3/4 flex flex-col bg-white rounded-lg shadow-card overflow-hidden">
          {/* Chat header */}
          <div className="p-4 border-b border-neutral-200 flex items-center bg-primary-50">
            <div className="bg-primary-500 p-2 rounded-full mr-3">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-medium">Coursera Learning Assistant</h3>
              <p className="text-xs text-neutral-500">Powered by AI</p>
            </div>
          </div>
          
          {/* Messages area */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-primary-500 text-white rounded-tr-none'
                        : 'bg-neutral-100 text-neutral-800 rounded-tl-none'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-primary-50' : 'text-neutral-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-neutral-100 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-neutral-400 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-neutral-400 animate-pulse delay-75"></div>
                      <div className="w-2 h-2 rounded-full bg-neutral-400 animate-pulse delay-150"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef}></div>
            </div>
          </div>
          
          {/* Input area */}
          <div className="border-t border-neutral-200 p-3">
            <form onSubmit={handleSendMessage} className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about your learning journey..."
                className="flex-1 border border-neutral-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <button
                type="submit"
                className="bg-primary-500 text-white px-4 py-2 rounded-r-md hover:bg-primary-600 transition-colors disabled:opacity-50"
                disabled={!inputValue.trim() || isTyping}
              >
                <Send size={20} />
              </button>
            </form>
            
            {/* Suggested questions */}
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm px-3 py-1 rounded-full transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/4 space-y-6">
          {/* Learning Insights */}
          <div className="bg-white rounded-lg shadow-card p-4">
            <div className="flex items-center mb-4">
              <BarChart size={20} className="text-primary-500 mr-2" />
              <h3 className="font-medium">Learning Insights</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-neutral-600">Weekly Goal</span>
                  <span className="text-sm font-medium">5h / 10h</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div className="bg-primary-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-neutral-600">Course Completion</span>
                  <span className="text-sm font-medium">2 / 5</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div className="bg-success-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-neutral-600">Quiz Accuracy</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div className="bg-accent-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Learning Recommendations */}
          <div className="bg-white rounded-lg shadow-card p-4">
            <div className="flex items-center mb-4">
              <Lightbulb size={20} className="text-primary-500 mr-2" />
              <h3 className="font-medium">Recommendations</h3>
            </div>
            <div className="space-y-3">
              <div className="text-sm p-2 bg-neutral-50 rounded-md">
                <p className="font-medium text-neutral-800">Complete JavaScript Basics</p>
                <p className="text-neutral-600 text-xs mt-1">You're 75% complete - finish this week!</p>
              </div>
              <div className="text-sm p-2 bg-neutral-50 rounded-md">
                <p className="font-medium text-neutral-800">Try "Python for Data Science"</p>
                <p className="text-neutral-600 text-xs mt-1">Based on your interests</p>
              </div>
              <div className="text-sm p-2 bg-neutral-50 rounded-md">
                <p className="font-medium text-neutral-800">Join the Web Dev community</p>
                <p className="text-neutral-600 text-xs mt-1">Connect with 5,000+ learners</p>
              </div>
            </div>
          </div>
          
          {/* Resources */}
          <div className="bg-white rounded-lg shadow-card p-4">
            <div className="flex items-center mb-4">
              <Book size={20} className="text-primary-500 mr-2" />
              <h3 className="font-medium">Learning Resources</h3>
            </div>
            <div className="space-y-3">
              <a 
                href="#" 
                className="flex items-center text-sm text-neutral-700 hover:text-primary-500"
              >
                <Download size={14} className="mr-2" />
                <span>JavaScript Cheat Sheet</span>
              </a>
              <a 
                href="#" 
                className="flex items-center text-sm text-neutral-700 hover:text-primary-500"
              >
                <Download size={14} className="mr-2" />
                <span>Web Development Roadmap</span>
              </a>
              <a 
                href="#" 
                className="flex items-center text-sm text-neutral-700 hover:text-primary-500"
              >
                <Download size={14} className="mr-2" />
                <span>Study Planner Template</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;