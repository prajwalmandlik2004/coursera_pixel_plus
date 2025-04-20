import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQProps {
  question: string;
  answer: string;
}

const FAQ: React.FC<FAQProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-neutral-200 py-5">
      <button 
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-neutral-800">{question}</h3>
        {isOpen ? (
          <ChevronUp size={20} className="text-neutral-500 flex-shrink-0" />
        ) : (
          <ChevronDown size={20} className="text-neutral-500 flex-shrink-0" />
        )}
      </button>
      
      {isOpen && (
        <div className="mt-3 text-neutral-600 pr-8 animate-fadeIn">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQ;