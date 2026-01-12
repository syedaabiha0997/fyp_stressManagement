import { ArrowLeft, Send, Loader, Sparkles, User, MessageCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HealthAIChatbot() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const messagesEndRef = useRef(null);

  const suggestions = [
    "Analyze my recent BP trends",
    "What diet helps with high heart rate?",
    "Show my activity summary for October",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    handleSendMessage(suggestion);
  };

  const handleSendMessage = async (messageText = inputValue) => {
    if (!messageText.trim()) return;

    const lowerText = messageText.toLowerCase().trim();

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setShowSuggestions(false);

    // 👋 Greeting handling
    const greetings = ["hi", "hello", "hey", "assalam", "salam", "hii", "helo"];
    if (greetings.includes(lowerText)) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            text: "👋 Hello! I am your AI Health partner. I can analyze your biometric reports or answer wellness questions. How can I help you today?",
            sender: "ai",
            timestamp: new Date()
          }
        ]);
      }, 600);
      return; 
    }

    const healthKeywords = [
      "health", "diet", "exercise", "bp", "blood", "pressure", "diabetes",
      "fitness", "pain", "sleep", "mental", "weight", "doctor", "medicine",
      "heart", "rate", "heart rate", "bpm", "stress", "temperature", "eat",
      "fever", "headache", "nutrition", "vitamins", "glucose", "workout",
      "anxiety", "water", "drink", "hydration", "flu", "cold", "sugar"
    ];

    const isHealthRelated = healthKeywords.some(word => lowerText.includes(word));

    if (!isHealthRelated) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            text: "I specialize in health and vitals analysis. Please ask me something related to your physical or mental health!",
            sender: "ai",
            timestamp: new Date()
          }
        ]);
      }, 600);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText, user_id: "user_001" })
      });

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 2,
          text: aiResponse,
          sender: "ai",
          timestamp: new Date()
        }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 2,
          text: "⚠️ Neural link offline. Please ensure your local health server is active.",
          sender: "ai",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col font-sans">
      {/* HEADER */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between p-6">
        <Link to="/reports">
          <button className="h-12 w-12 bg-white hover:bg-slate-50 rounded-2xl flex items-center justify-center transition-all shadow-sm border border-slate-100 group">
            <ArrowLeft className="text-slate-400 group-hover:text-emerald-600 transition-colors" size={20} />
          </button>
        </Link>
        <div className="flex flex-col items-center">
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full mb-1">Live Analysis</span>
            <h1 className="text-[#111827] font-black text-sm uppercase tracking-tight">Biometric AI</h1>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-[#111827] flex items-center justify-center shadow-lg shadow-slate-200">
            <Sparkles className="text-emerald-400" size={20} />
        </div>
      </div>

      {/* CHAT CONTAINER */}
      <div className="flex-grow overflow-y-auto px-4">
        <div className="max-w-4xl mx-auto w-full py-8">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="w-24 h-24 bg-[#111827] rounded-[2.5rem] shadow-xl flex items-center justify-center mb-8 relative">
                <MessageCircle className="text-emerald-400" size={40} />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-[#F8FAFC]"></div>
              </div>
              <h2 className="text-3xl font-black text-[#111827] tracking-tight mb-4">
                What can I analyze today?
              </h2>
              <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-12 font-medium">
                I can interpret your blood pressure history, heart rate trends, or suggest wellness routines.
              </p>

              {showSuggestions && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full px-4">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="bg-white hover:border-emerald-500 border border-slate-200 rounded-2xl p-5 text-xs font-bold text-slate-600 transition-all shadow-sm hover:shadow-emerald-100 text-center"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-4 duration-300`}>
                  <div className={`flex gap-4 max-w-[85%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center ${message.sender === "user" ? "bg-[#111827]" : "bg-emerald-500"}`}>
                        {message.sender === "user" ? <User size={14} className="text-white" /> : <Sparkles size={14} className="text-white" />}
                    </div>
                    <div className={`px-6 py-4 rounded-[1.8rem] shadow-sm ${
                      message.sender === "user" 
                        ? "bg-[#111827] text-white rounded-tr-none font-medium" 
                        : "bg-white text-slate-700 border border-slate-100 rounded-tl-none leading-relaxed"
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <span className={`text-[10px] mt-2 block opacity-50 font-black uppercase tracking-tighter ${message.sender === "user" ? "text-emerald-400" : "text-slate-400"}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-4 items-center bg-white border border-slate-100 rounded-[1.5rem] px-6 py-4 shadow-sm">
                    <Loader className="animate-spin text-emerald-500" size={16} />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Processing Vitals...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* INPUT SECTION */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto w-full relative group">
          <div className="relative bg-white border border-slate-200 rounded-[2.2rem] shadow-2xl flex items-center p-2 pr-4 overflow-hidden focus-within:border-emerald-500 transition-colors">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading) handleSendMessage();
              }}
              placeholder="Ask about your health data..."
              disabled={isLoading}
              className="flex-grow px-6 py-4 bg-transparent text-slate-700 placeholder-slate-300 outline-none text-sm font-bold disabled:opacity-50"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputValue.trim()}
              className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-100 h-12 w-12 rounded-[1.5rem] flex items-center justify-center transition-all shadow-lg shadow-emerald-100"
            >
              <Send className={`${isLoading || !inputValue.trim() ? 'text-slate-300' : 'text-white'}`} size={18} />
            </button>
          </div>
          <p className="text-center text-[10px] text-slate-400 mt-4 font-black uppercase tracking-[0.2em]">
            Precision Biometric Assistant • v2.0
          </p>
        </div>
      </div>
    </div>
  );
}