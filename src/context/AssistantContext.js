import React, { createContext, useContext, useMemo, useState, useCallback, useRef } from 'react';
import { getAssistantReply } from '../utils/assistantResponses';

const AssistantContext = createContext(null);

const WELCOME_MESSAGE = {
  id: 'welcome',
  author: 'assistant',
  text: 'Oi! Sou o assistente do PetMais 🐾 Posso ajudar com dúvidas sobre produtos, promoções e pedidos.',
};

export function AssistantProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const nextId = useRef(1);
  const typingTimeout = useRef(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const sendMessage = useCallback((text) => {
    const trimmed = (text || '').trim();
    if (!trimmed) return;

    const userMsg = { id: `msg-${nextId.current}`, author: 'user', text: trimmed };
    nextId.current += 1;
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      const reply = getAssistantReply(trimmed);
      const assistantMsg = { id: `msg-${nextId.current}`, author: 'assistant', text: reply };
      nextId.current += 1;
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 500);
  }, []);

  const value = useMemo(
    () => ({ isOpen, open, close, messages, sendMessage, isTyping }),
    [isOpen, open, close, messages, sendMessage, isTyping]
  );

  return <AssistantContext.Provider value={value}>{children}</AssistantContext.Provider>;
}

export function useAssistant() {
  const ctx = useContext(AssistantContext);
  if (!ctx) throw new Error('useAssistant deve ser usado dentro de um AssistantProvider');
  return ctx;
}
