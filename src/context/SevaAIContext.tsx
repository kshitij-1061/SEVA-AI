import React, { createContext, useContext, useState, useEffect } from "react";
import type { ChatMessage, SevaAIInput, SevaAIResult } from "../types";
import { sevaAIService } from "../services/sevaAI";
import { useAuth } from "./AuthContext";

interface SevaAIContextValue {
  messages: ChatMessage[];
  isProcessing: boolean;
  analyzeMessage: (input: SevaAIInput) => Promise<SevaAIResult>;
  sendMessage: (message: string) => Promise<void>;
  clearConversation: () => void;
}

const STORAGE_KEY_SEVAAI_HISTORY = "sevafix_sevaai_history";
const MAX_HISTORY_MESSAGES = 50;

const SevaAIContext = createContext<SevaAIContextValue | undefined>(undefined);

export const SevaAIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Load chat history from LocalStorage
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(STORAGE_KEY_SEVAAI_HISTORY);
      if (savedHistory) {
        const parsed: ChatMessage[] = JSON.parse(savedHistory);
        setMessages(parsed);
      }
    } catch (err) {
      console.error("Failed to restore SevaAI chat history:", err);
      localStorage.removeItem(STORAGE_KEY_SEVAAI_HISTORY);
    }
  }, []);

  // Save conversation history (capped at 50)
  const saveMessages = (msgs: ChatMessage[]) => {
    try {
      const capped = msgs.slice(-MAX_HISTORY_MESSAGES);
      setMessages(capped);
      localStorage.setItem(STORAGE_KEY_SEVAAI_HISTORY, JSON.stringify(capped));
    } catch (err) {
      console.error("Failed to save SevaAI history:", err);
    }
  };

  const analyzeMessage = async (input: SevaAIInput): Promise<SevaAIResult> => {
    setIsProcessing(true);
    try {
      const result = await sevaAIService.analyze({
        ...input,
        userId: user?.id,
        location: {
          city: user?.city || "Meerut",
        },
      });
      return result;
    } finally {
      setIsProcessing(false);
    }
  };

  const sendMessage = async (userText: string) => {
    if (!userText.trim() || isProcessing) return;

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      role: "user",
      content: userText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newHistoryWithUser = [...messages, userMsg];
    saveMessages(newHistoryWithUser);

    setIsProcessing(true);

    try {
      const aiResult = await sevaAIService.analyze({
        message: userText,
        userId: user?.id,
        location: {
          city: user?.city || "Meerut",
        },
      });

      const assistantMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        role: "assistant",
        content: aiResult.explanation,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        aiResult,
      };

      saveMessages([...newHistoryWithUser, assistantMsg]);
    } catch (err) {
      console.error("Error analyzing message with SevaAI:", err);
      const errorMsg: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        role: "assistant",
        content: "Apologies, I encountered an issue analyzing your request. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      saveMessages([...newHistoryWithUser, errorMsg]);
    } finally {
      setIsProcessing(false);
    }
  };

  const clearConversation = () => {
    localStorage.removeItem(STORAGE_KEY_SEVAAI_HISTORY);
    setMessages([]);
  };

  return (
    <SevaAIContext.Provider
      value={{
        messages,
        isProcessing,
        analyzeMessage,
        sendMessage,
        clearConversation,
      }}
    >
      {children}
    </SevaAIContext.Provider>
  );
};

export const useSevaAI = (): SevaAIContextValue => {
  const context = useContext(SevaAIContext);
  if (!context) {
    throw new Error("useSevaAI must be used within a SevaAIProvider");
  }
  return context;
};
