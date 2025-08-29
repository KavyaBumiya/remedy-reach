import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Loader2, Heart, Pill, Home } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  remedies?: string[];
  medications?: string[];
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your AI Medical Assistant. Please describe your symptoms and I'll help suggest possible treatments and care tips. Remember, this is for informational purposes only - always consult a healthcare professional for proper diagnosis.",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "Based on your symptoms, here are some suggestions. Please note this is for informational purposes only.",
        timestamp: new Date(),
        medications: ["Acetaminophen 500mg", "Ibuprofen 200mg", "Vitamin C supplements"],
        remedies: ["Stay hydrated", "Get plenty of rest", "Use a humidifier", "Gargle with salt water"],
        suggestions: ["Monitor your temperature", "Avoid strenuous activities", "Eat light, nutritious meals"]
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[600px] medical-card">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border medical-gradient rounded-t-lg">
        <div className="w-10 h-10 rounded-full bg-primary-foreground flex items-center justify-center">
          <Bot className="w-6 h-6 text-primary medical-bounce" />
        </div>
        <div>
          <h3 className="font-semibold text-primary-foreground">AI Medical Assistant</h3>
          <p className="text-sm text-primary-foreground/80">Ready to help with your health concerns</p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-bubble-enter flex gap-3 ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.type === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-secondary-foreground" />
                </div>
              )}
              
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : ''}`}>
                <div
                  className={`rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'medical-gradient text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>

                {/* AI Suggestions */}
                {message.type === 'bot' && (message.medications || message.remedies || message.suggestions) && (
                  <div className="mt-3 space-y-3">
                    {message.medications && (
                      <Card className="p-3 bg-primary/5 border-primary/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Pill className="w-4 h-4 text-primary" />
                          <h4 className="font-medium text-primary">Suggested Medications</h4>
                        </div>
                        <ul className="text-sm space-y-1">
                          {message.medications.map((med, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                              {med}
                            </li>
                          ))}
                        </ul>
                      </Card>
                    )}

                    {message.remedies && (
                      <Card className="p-3 bg-secondary/5 border-secondary/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Home className="w-4 h-4 text-secondary" />
                          <h4 className="font-medium text-secondary">Home Remedies</h4>
                        </div>
                        <ul className="text-sm space-y-1">
                          {message.remedies.map((remedy, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                              {remedy}
                            </li>
                          ))}
                        </ul>
                      </Card>
                    )}

                    {message.suggestions && (
                      <Card className="p-3 bg-accent/5 border-accent/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Heart className="w-4 h-4 text-accent" />
                          <h4 className="font-medium text-accent">Care Tips</h4>
                        </div>
                        <ul className="text-sm space-y-1">
                          {message.suggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </Card>
                    )}
                  </div>
                )}
              </div>

              {message.type === 'user' && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1 order-3">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="chat-bubble-enter flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                <Loader2 className="w-4 h-4 text-secondary-foreground animate-spin" />
              </div>
              <div className="max-w-[80%]">
                <div className="rounded-lg p-3 bg-muted">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-secondary rounded-full animate-pulse delay-75"></div>
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-150"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">Analyzing symptoms...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your symptoms..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || !input.trim()}
            className="medical-gradient hover:opacity-90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          ⚠️ This AI assistant provides information only. Always consult healthcare professionals for medical advice.
        </p>
      </div>
    </div>
  );
};