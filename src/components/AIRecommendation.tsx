import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

interface Message {
  id: number;
  type: 'user' | 'ai';
  message: string;
  timestamp: Date;
}

interface AIRecommendationProps {
  onRecommend: (category: string) => void;
}

export default function AIRecommendation({ onRecommend }: AIRecommendationProps) {
  const [userInput, setUserInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([
    { id: 1, type: 'ai', message: 'Welcome to CaRS AI Assistant! I can help you with:\n\n• Finding cars by budget or passengers\n• Rental policies and insurance\n• Booking assistance\n• Login/Signup help\n• Special discounts\n\nHow may I assist you today?', timestamp: new Date() }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node) && showAI) {
        setShowAI(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showAI]);

  const extractBudget = (text: string): number | null => {
    const patterns = [
      /budget\s*(?:is|of)?\s*\$?(\d+)/i,
      /(\d+)\s*(?:dollars?|rupees?|rs|pkrs?|price)/i,
      /only\s*\$?(\d+)/i,
      /under\s*\$?(\d+)/i,
      /within\s*\$?(\d+)/i,
      /^\s*(\d+)\s*$/,
      /\b(\d+)\b\s*(?:per day|daily)/i
    ];
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        const num = parseInt(match[1]);
        if (num >= 1 && num <= 10000) return num;
      }
    }
    return null;
  };

  const extractPassengers = (text: string): number | null => {
    const patterns = [
      /(\d+)\s*(?:people|persons|passengers|seats|members|pax)/i,
      /for\s*(\d+)\s*(?:people|persons)/i,
      /(\d+)\s*seater/i,
      /(\d+)\s*seat/i,
      /family\s*of\s*(\d+)/i,
      /group\s*of\s*(\d+)/i
    ];
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) return parseInt(match[1]);
    }
    return null;
  };

  const extractDays = (text: string): number | null => {
    const patterns = [
      /(\d+)\s*(?:days?|weeks?|month)/i,
      /for\s*(\d+)\s*(?:days?)/i,
      /(\d+)\s*days?/i
    ];
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        let days = parseInt(match[1]);
        if (text.toLowerCase().includes('week')) days = days * 7;
        if (text.toLowerCase().includes('month')) days = days * 30;
        if (days > 0 && days < 365) return days;
      }
    }
    return null;
  };

  const checkLoginStatus = (): boolean => {
    return !!localStorage.getItem('isLoggedIn') || !!localStorage.getItem('user');
  };

  const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    if (user) return JSON.parse(user);
    return null;
  };

  const extractIntent = (text: string): string => {
    const lower = text.toLowerCase();
    
    if (lower.includes('login') || lower.includes('sign in')) return 'login';
    if (lower.includes('signup') || lower.includes('register')) return 'signup';
    if (lower.includes('logout')) return 'logout';
    if (lower.includes('my account') || lower.includes('profile')) return 'account';
    if (lower.includes('book') || lower.includes('reserve')) return 'booking';
    if (lower.includes('cancel')) return 'cancel';
    if (lower.includes('payment') || lower.includes('pay')) return 'payment';
    if (lower.includes('discount') || lower.includes('offer')) return 'discount';
    if (lower.includes('insurance')) return 'insurance';
    if (lower.includes('license')) return 'license';
    if (lower.includes('age')) return 'age';
    if (lower.includes('policy')) return 'policy';
    if (lower.includes('toyota') || lower.includes('86')) return 'car_toyota';
    if (lower.includes('kia') || lower.includes('rio')) return 'car_kia';
    if (lower.includes('hyundai') || lower.includes('palisade')) return 'car_hyundai';
    if (lower.includes('mercedes') || lower.includes('sprinter')) return 'car_mercedes';
    if (lower.includes('dont want') || lower.includes('no car')) return 'decline';
    if (lower.includes('bye') || lower.includes('goodbye')) return 'exit';
    if (lower.includes('thank')) return 'thank';
    if (lower.includes('help')) return 'help';
    if (lower.includes('price') || lower.includes('cost')) return 'price';
    if (lower.includes('available') || lower.includes('list')) return 'list';
    
    return 'search';
  };

  const getAIResponse = (userMessage: string): string => {
    const budget = extractBudget(userMessage);
    const passengers = extractPassengers(userMessage);
    const days = extractDays(userMessage);
    const intent = extractIntent(userMessage);
    const isLoggedIn = checkLoginStatus();
    const currentUser = getCurrentUser();

    if (intent === 'login') {
      if (isLoggedIn) return `You are already logged in${currentUser ? ` as ${currentUser.email || currentUser.username}` : ''}. Need help with booking?`;
      return "Please click 'Sign In' at the top right corner. You'll need your registered email and password. Would you like help with anything else?";
    }

    if (intent === 'signup') {
      if (isLoggedIn) return `You already have an account. Would you like to logout and create a new one?`;
      return "Click 'Sign Up' on top right. You'll need: name, email, phone, password (8+ chars), and age (18+). Need assistance?";
    }

    if (intent === 'account') {
      if (isLoggedIn && currentUser) {
        return `Account: ${currentUser.full_name || currentUser.username}\nEmail: ${currentUser.email}\nPhone: ${currentUser.phone || 'Not set'}\nCity: ${currentUser.city || 'Not set'}`;
      }
      return "Please login first to view your account details. Click 'Sign In' at the top right.";
    }

    if (intent === 'booking') {
      if (!isLoggedIn) return "Please login first to make a booking. Click 'Sign In' at the top right.";
      if (budget || passengers) {
        const recCategory = budget ? (budget >= 180 ? 'luxury' : budget >= 130 ? 'suv' : 'economy') : (passengers && passengers <= 2 ? 'luxury' : passengers && passengers <= 5 ? 'economy' : passengers && passengers <= 7 ? 'suv' : 'van');
        const price = recCategory === 'luxury' ? 200 : recCategory === 'suv' ? 150 : recCategory === 'van' ? 100 : 90;
        return `Recommended: ${recCategory} category at $${price}/day${days ? ` for ${days} days = $${price * days}` : ''}. Go to Services page to book.`;
      }
      return "To book: Go to Services > Select car > Fill form > Make payment. Need car recommendation? Tell me budget or passengers.";
    }

    if (intent === 'cancel') {
      return "Cancellation Policy:\n• Free up to 48hrs before pickup\n• 50% refund 24-48hrs before\n• No refund same day\nCall 042-111-CaRS to cancel.";
    }

    if (intent === 'payment') {
      return "Payment Methods: Credit/Debit Card, Nayapay. Weekly: 10% off, Monthly: 20% off. Need help with payment?";
    }

    if (intent === 'discount') {
      let msg = "Discounts:\n";
      if (days && days >= 7) msg += "✓ 10% weekly discount\n";
      if (days && days >= 30) msg += "✓ 20% monthly discount\n";
      msg += "✓ Student: 15% off\n✓ Group booking: 10% off\n✓ Refer friend: $20 credit";
      return msg;
    }

    if (intent === 'insurance') {
      return "Insurance:\n• Basic (Included): Third-party liability\n• Premium ($15/day): Full coverage, theft protection, roadside assistance\nAdd during booking.";
    }

    if (intent === 'license') {
      return "Requirements:\n• Valid license (1+ year)\n• Minimum age: 18\n• International license accepted\nCarry original during pickup.";
    }

    if (intent === 'age') {
      return "Age: Minimum 18 years. Young driver fee (18-21): $10/day extra. Senior citizen (60+): 5% discount.";
    }

    if (intent === 'policy') {
      return "Policies:\n• Security deposit: $200 (refundable)\n• Late return: $25/hour\n• Fuel: Full to full\n• No smoking ($250 fine)\n• No pets";
    }

    if (intent === 'car_toyota') {
      return "Toyota 86 | $200/day | 2 seats | Manual | Petrol\nFeatures: Premium sound, 2.0L engine, sporty design. Perfect for couples/luxury experience.";
    }

    if (intent === 'car_kia') {
      return "Kia Rio | $90/day | 5 seats | Automatic | Petrol\nFeatures: Apple CarPlay, Bluetooth, fuel efficient. Best for budget/city driving.";
    }

    if (intent === 'car_hyundai') {
      return "Hyundai Palisade | $150/day | 7 seats | Automatic | Petrol\nFeatures: 3.8L V6, AWD, premium sound. Perfect for families.";
    }

    if (intent === 'car_mercedes') {
      return "Mercedes Sprinter | $100/day | 12 seats | Automatic | Diesel\nFeatures: GPS, rear camera, premium interior. Ideal for groups.";
    }

    if (budget !== null && budget < 90) {
      return `Budget $${budget} is below minimum. Our cheapest car is Kia Rio at $90/day. Would you like to see it?`;
    }

    if (budget !== null && budget >= 90) {
      let category = '';
      let price = 0;
      if (budget >= 180) { category = 'luxury'; price = 200; }
      else if (budget >= 130) { category = 'suv'; price = 150; }
      else { category = 'economy'; price = 90; }
      let msg = `With $${budget}, I recommend ${category} at $${price}/day.`;
      if (days) msg += ` Total: $${price * days}.`;
      return msg;
    }

    if (passengers !== null) {
      let rec = '';
      if (passengers <= 2) rec = 'luxury (Toyota 86, $200/day)';
      else if (passengers <= 5) rec = 'economy (Kia Rio, $90/day)';
      else if (passengers <= 7) rec = 'SUV (Hyundai Palisade, $150/day)';
      else rec = 'van (Mercedes Sprinter, $100/day)';
      return `For ${passengers} passenger(s), I recommend ${rec}. Would you like to book?`;
    }

    if (intent === 'decline') return "I understand. Need help with anything else? (policies, discounts, login, etc.)";
    if (intent === 'exit') return "Thank you for using CaRS AI. Have a great day! Goodbye.";
    if (intent === 'thank') return "You're welcome! Happy to help. Need anything else?";
    if (intent === 'help') return "I can help with: budget/passenger recommendations, booking, login, policies, discounts, insurance. What would you like to know?";
    if (intent === 'list') return "Cars: Toyota 86 ($200), Kia Rio ($90), Hyundai Palisade ($150), Mercedes Sprinter ($100). All available now!";
    if (intent === 'price') return "Prices: Kia Rio $90, Mercedes $100, Hyundai $150, Toyota $200 per day. Weekly: 10% off, Monthly: 20% off.";

    return "How can I help? Tell me:\n• Budget (e.g., 100 dollars)\n• Passengers (e.g., 5 people)\n• Or ask about login, policies, discounts";
  };

  const handleAskAI = () => {
    if (!userInput.trim()) return;
    
    const newUserMessage: Message = {
      id: chatHistory.length + 1,
      type: 'user',
      message: userInput,
      timestamp: new Date()
    };
    setChatHistory(prev => [...prev, newUserMessage]);
    setIsThinking(true);
    
    setTimeout(() => {
      const response = getAIResponse(userInput);
      
      const newAIMessage: Message = {
        id: chatHistory.length + 2,
        type: 'ai',
        message: response,
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, newAIMessage]);
      setIsThinking(false);
      
      const lower = userInput.toLowerCase();
      const budget = extractBudget(userInput);
      const passengers = extractPassengers(userInput);
      
      if (lower.includes('toyota') || lower.includes('86')) onRecommend('luxury');
      else if (lower.includes('kia') || lower.includes('rio')) onRecommend('economy');
      else if (lower.includes('hyundai') || lower.includes('palisade')) onRecommend('suv');
      else if (lower.includes('mercedes') || lower.includes('sprinter')) onRecommend('van');
      else if (budget && budget >= 130) onRecommend('suv');
      else if (budget && budget >= 80) onRecommend('economy');
      else if (passengers) {
        if (passengers <= 2) onRecommend('luxury');
        else if (passengers <= 5) onRecommend('economy');
        else if (passengers <= 7) onRecommend('suv');
        else onRecommend('van');
      }
    }, 500);
    
    setUserInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAskAI();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* AI Button - Smaller */}
      <button
        onClick={() => setShowAI(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: '#dd0707',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(221,7,7,0.4)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          fontWeight: 'bold',
          color: 'white',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(221,7,7,0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(221,7,7,0.4)';
        }}
      >
        AI
      </button>

      {/* AI Chat Window - Smaller Box */}
      {showAI && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.4)',
              zIndex: 1000,
            }}
            onClick={() => setShowAI(false)}
          />
          
          <div
            ref={modalRef}
            style={{
              position: 'fixed',
              bottom: '80px',
              right: '20px',
              width: '350px',
              height: '480px',
              backgroundColor: '#1a1a1a',
              borderRadius: '10px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid rgba(221,7,7,0.2)'
            }}
          >
            {/* Header - Smaller */}
            <div style={{
              background: '#dd0707',
              padding: '12px',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '30px',
                height: '30px',
                backgroundColor: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#dd0707'
              }}>
                AI
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 'bold' }}>CaRS AI Assistant</h3>
                <p style={{ margin: 0, fontSize: '9px', opacity: 0.8 }}>Online • Smart Assistant</p>
              </div>
              <button
                onClick={() => setShowAI(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '18px',
                  cursor: 'pointer',
                  padding: '4px',
                  width: '26px',
                  height: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                ×
              </button>
            </div>

            {/* Messages Area - Smaller */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              backgroundColor: '#121212'
            }}>
              {chatHistory.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div
                    style={{
                      maxWidth: '85%',
                      padding: '8px 10px',
                      borderRadius: msg.type === 'user' 
                        ? '12px 12px 4px 12px' 
                        : '12px 12px 12px 4px',
                      backgroundColor: msg.type === 'user' ? '#dd0707' : '#2a2a2a',
                      color: 'white',
                      fontSize: '12px',
                      lineHeight: '1.4',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word'
                    }}
                  >
                    {msg.message}
                    <div style={{
                      fontSize: '9px',
                      opacity: 0.5,
                      marginTop: '4px',
                      textAlign: msg.type === 'user' ? 'right' : 'left'
                    }}>
                      {formatTime(msg.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
              
              {isThinking && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{
                    padding: '8px 12px',
                    borderRadius: '12px',
                    backgroundColor: '#2a2a2a',
                    display: 'flex',
                    gap: '4px'
                  }}>
                    <span style={{ animation: 'typing 1.4s infinite' }}>●</span>
                    <span style={{ animation: 'typing 1.4s infinite', animationDelay: '0.2s' }}>●</span>
                    <span style={{ animation: 'typing 1.4s infinite', animationDelay: '0.4s' }}>●</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Smaller */}
            <div style={{
              padding: '10px',
              borderTop: '1px solid #333',
              backgroundColor: '#1a1a1a',
              display: 'flex',
              gap: '8px'
            }}>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me..."
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #444',
                  backgroundColor: '#2a2a2a',
                  color: 'white',
                  outline: 'none',
                  fontSize: '12px',
                  fontFamily: 'inherit'
                }}
              />
              <button
                onClick={handleAskAI}
                disabled={isThinking || !userInput.trim()}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#dd0707',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: !isThinking && userInput.trim() ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  transition: 'all 0.3s',
                  opacity: !isThinking && userInput.trim() ? 1 : 0.5
                }}
              >
                Send
              </button>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes typing {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-2px); }
        }
      `}</style>
    </>
  );
}