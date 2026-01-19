import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useChat } from "@/hooks/use-chat";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  role: "user" | "ai";
  content: string;
};

export default function AiVet() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hello! I'm your AI Veterinarian assistant. How can I help with your pet today?" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatMutation = useChat();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || chatMutation.isPending) return;

    const userMessage = input.trim();
    setInput("");
    
    // Optimistic update
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);

    try {
      const response = await chatMutation.mutateAsync(userMessage);
      setMessages(prev => [...prev, { role: "ai", content: response.response }]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get response from AI Vet. Please try again.",
      });
      // Remove failed user message or handle error state
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold">AI Vet Assistant</h1>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Online & Ready to help
          </p>
        </div>
      </div>

      <Card className="flex-1 overflow-hidden flex flex-col shadow-2xl shadow-black/5 border-border/50 bg-white/80 backdrop-blur-sm rounded-3xl">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
                className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 border border-green-200">
                    <Sparkles className="w-4 h-4 text-green-600" />
                  </div>
                )}
                
                <div
                  className={`
                    max-w-[80%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-sm
                    ${msg.role === "user" 
                      ? "bg-primary text-white rounded-tr-none" 
                      : "bg-white border border-border text-foreground rounded-tl-none"
                    }
                  `}
                >
                  {msg.content}
                </div>

                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {chatMutation.isPending && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 border border-green-200">
                <Sparkles className="w-4 h-4 text-green-600" />
              </div>
              <div className="bg-white border border-border rounded-2xl rounded-tl-none px-5 py-4 flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white border-t border-border/50">
          <form 
            onSubmit={handleSubmit}
            className="flex gap-2 relative"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your pet's symptoms..."
              className="pr-12 py-6 rounded-2xl border-2 border-muted focus-visible:ring-primary/20 focus-visible:border-primary text-base shadow-inner bg-background"
              disabled={chatMutation.isPending}
            />
            <Button 
              type="submit" 
              size="icon"
              disabled={!input.trim() || chatMutation.isPending}
              className="absolute right-2 top-2 h-8 w-8 rounded-xl bg-primary hover:bg-primary/90 transition-all shadow-md disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-white" />
            </Button>
          </form>
          <p className="text-center text-xs text-muted-foreground mt-3">
            AI can make mistakes. Always consult a real vet for emergencies.
          </p>
        </div>
      </Card>
    </div>
  );
}
