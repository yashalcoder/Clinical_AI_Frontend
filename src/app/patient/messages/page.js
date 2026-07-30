"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, Activity, User, AlertCircle, Info } from "lucide-react";
import { getMessages, sendMessage } from "@/lib/api";
import { H2, Body } from "@/components/common/Typography";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { ChatSkeleton } from "@/components/common/Skeleton";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sendLoading, setSendLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const chatEndRef = useRef(null);

  const loadMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch messages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
    
    // Set up a polling interval for mock AI replies since we simulate AI writing after 2 seconds
    const interval = setInterval(async () => {
      try {
        const data = await getMessages();
        setMessages(data);
      } catch (err) {
        // quiet error
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const tempText = inputText;
    setInputText("");
    
    // Optimistic UI update: insert client message immediately
    const tempId = `optimistic-${Date.now()}`;
    const optimisticMsg = {
      id: tempId,
      sender: "patient",
      text: tempText,
      timestamp: new Date().toISOString(),
      pending: true
    };

    setMessages((prev) => [...prev, optimisticMsg]);
    
    try {
      // API call to register message
      const confirmedMsg = await sendMessage({ text: tempText });
      
      // Replace optimistic placeholder with real backend object once resolved
      setMessages((prev) =>
        prev.map((msg) => (msg.id === tempId ? confirmedMsg : msg))
      );
    } catch (err) {
      // Remove message on fail and show warning
      setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
      alert("Failed to send message. Please retry.");
    }
  };

  return (
    <div className="space-y-6 font-poppins flex flex-col h-[calc(100vh-140px)]">
      {/* Header Info */}
      <div>
        <H2 className="text-brand-primary !mb-1">Care Messenger</H2>
        <Body variant="secondary">
          Consult directly with support assistants and administrative clinic coordinators.
        </Body>
      </div>

      {loading ? (
        <ChatSkeleton />
      ) : error ? (
        <div className="bg-red-50 border border-brand-error/20 p-6 rounded-xl flex gap-3 items-center">
          <AlertCircle className="text-brand-error" />
          <Body className="text-brand-error">{error}</Body>
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-h-0 bg-white border border-brand-primary/10 rounded-xl overflow-hidden shadow-sm">
          {/* Chat Header banner */}
          <div className="bg-brand-primary text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 bg-brand-accent/20 border border-brand-accent/40 rounded-full flex items-center justify-center text-brand-accent">
                <Activity size={18} />
              </div>
              <div>
                <span className="font-bold text-sm block">ClinicFlow AI Assistant</span>
                <span className="text-[10px] text-brand-accent font-medium uppercase tracking-wider block">
                  Online • Typically replies instantly
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-xs text-gray-200 border border-white/10">
              <Info size={12} /> HIPAA Secure Channel
            </div>
          </div>

          {/* Messages list area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-brand-bg-light/30">
            {messages.map((msg) => {
              const isPatient = msg.sender === "patient";
              const isSystem = msg.sender === "system";

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 max-w-[75%] ${
                    isPatient ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  {/* Avatar Icon */}
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      isPatient
                        ? "bg-brand-accent text-white"
                        : isSystem
                        ? "bg-brand-primary text-brand-accent"
                        : "bg-gray-200 text-brand-primary"
                    }`}
                  >
                    {isPatient ? "YS" : isSystem ? "AI" : "CF"}
                  </div>

                  {/* Bubble body */}
                  <div className="space-y-1">
                    <div
                      className={`p-3.5 rounded-2xl text-[15px] font-poppins leading-relaxed shadow-sm ${
                        isPatient
                          ? "bg-brand-primary text-white rounded-tr-none"
                          : "bg-white text-brand-dark rounded-tl-none border border-brand-primary/5"
                      }`}
                    >
                      {msg.text}
                    </div>
                    
                    {/* Timestamp / Pending indicator */}
                    <div
                      className={`text-[10px] text-brand-secondary px-1 flex items-center gap-1 ${
                        isPatient ? "justify-end" : "justify-start"
                      }`}
                    >
                      <span>
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </span>
                      {msg.pending && <span className="text-brand-accent italic">• sending</span>}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          {/* Message Input box */}
          <form onSubmit={handleSend} className="p-4 border-t border-brand-bg-light flex gap-3 bg-white">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about lab results, schedule slots, payments..."
              className="flex-grow p-3 border border-brand-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-sm font-poppins bg-white"
            />
            <Button type="submit" variant="accent" className="px-5 py-3 rounded-lg shrink-0">
              <Send size={18} />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
