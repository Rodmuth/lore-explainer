import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { ChatMessage, LoreTopic } from '../types';
import { LORE_CONTENT } from '../lore_data/content';
import { getAiResponse } from '../services/geminiService';
import { BackArrowIcon, SendIcon, AILoadingIcon } from './icons';

interface LorePageProps {
  topic: LoreTopic;
}

const LorePage: React.FC<LorePageProps> = ({ topic }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatCache = useRef<Map<string, string>>(new Map());
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const loreContent = LORE_CONTENT[topic.slug] || "Lore for this topic is not available.";
  
  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  const handleSendMessage = useCallback(async () => {
    const trimmedInput = userInput.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: trimmedInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    let aiResponseText: string;

    // Check cache first
    if (chatCache.current.has(trimmedInput)) {
      aiResponseText = chatCache.current.get(trimmedInput)!;
    } else {
      // If not in cache, call API
      aiResponseText = await getAiResponse(loreContent, trimmedInput);
      // Store in cache
      chatCache.current.set(trimmedInput, aiResponseText);
    }
    
    // NOTE: A real-world "kill switch" for API cost would involve a backend check.
    // If a flag from the backend indicated the limit was reached, we would set aiResponseText
    // to a message like "The monthly API limit has been reached. Please try again later."
    // and disable the input permanently for the session.

    const aiMessage: ChatMessage = { sender: 'ai', text: aiResponseText };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  }, [userInput, isLoading, loreContent, topic.slug]);

  return (
    <div className="flex flex-col h-screen max-h-screen bg-bays-dark-200">
      <header className="flex items-center p-4 bg-bays-dark shadow-md z-10">
        <a 
          href="/#" 
          className="p-2 rounded-full hover:bg-bays-dark-300 transition-colors mr-4"
          aria-label="Back to home"
        >
          <BackArrowIcon className="w-6 h-6 text-bays-cyan" />
        </a>
        <h1 className="text-2xl font-bold text-bays-text">{topic.name} Lore</h1>
      </header>

      <main ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        <div className="bg-bays-dark p-4 rounded-lg">
           <p className="text-bays-text-muted">
             This is the Bay Lore IPC. Please ask your questions about <span className="font-bold text-bays-cyan">{topic.name}</span>. My knowledge is limited to approved station documents.
           </p>
        </div>
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-md lg:max-w-2xl px-4 py-3 rounded-xl ${msg.sender === 'user' ? 'bg-bays-blue text-white' : 'bg-bays-dark-300 text-bays-text'}`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="max-w-md lg:max-w-2xl px-4 py-3 rounded-xl bg-bays-dark-300 text-bays-text flex items-center space-x-2">
                <AILoadingIcon className="w-5 h-5 animate-spin text-bays-cyan"/>
                <span>IPC is thinking...</span>
             </div>
          </div>
        )}
      </main>

      <footer className="p-4 bg-bays-dark shadow-md">
        <div className="flex items-center bg-bays-dark-200 rounded-lg p-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={`Ask about ${topic.name}...`}
            disabled={isLoading}
            className="flex-1 bg-transparent text-bays-text placeholder-bays-text-muted px-3 py-2 border-none focus:outline-none focus:ring-0 disabled:opacity-50"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !userInput.trim()}
            className="p-2 rounded-full bg-bays-cyan text-bays-dark disabled:bg-bays-dark-300 disabled:text-bays-text-muted transition-colors"
            aria-label="Send message"
          >
            <SendIcon className="w-6 h-6" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default LorePage;