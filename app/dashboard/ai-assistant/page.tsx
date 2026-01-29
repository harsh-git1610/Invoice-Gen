"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send, Bot, User, ArrowUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { askAI } from "@/app/actions/ai";
import { motion, AnimatePresence } from "framer-motion";

const suggestedPrompts = [
    "Draft a past due invoice email",
    "How much managed revenue this month?",
    "List my top 3 pending clients",
    "Create a new invoice for Acme Corp",
];

export default function AIAssistantPage() {
    const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isThinking]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setInput("");
        setIsThinking(true);

        try {
            const response = await askAI(userMessage);
            setMessages(prev => [...prev, { role: "assistant", content: response }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: "assistant", content: "I encountered an error. Please try again." }]);
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <div className="flex h-[calc(100vh-6rem)] flex-col items-center justify-center">
            <div className="flex w-full max-w-3xl flex-1 flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900/50">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-100 bg-white/50 px-6 py-4 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/50">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
                            <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">AI Assistant</h2>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">Always here to help</p>
                        </div>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-800">
                    {messages.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center space-y-8 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-4"
                            >
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-500 shadow-lg shadow-blue-500/20">
                                    <Sparkles className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
                                    How can I help you today?
                                </h3>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="grid w-full max-w-lg grid-cols-2 gap-3"
                            >
                                {suggestedPrompts.map((prompt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setInput(prompt)}
                                        className="rounded-xl border border-neutral-200 bg-white/50 px-4 py-3 text-left text-sm text-neutral-600 transition-all hover:border-blue-400 hover:bg-white hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:border-blue-700 dark:hover:bg-neutral-800"
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </motion.div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {messages.map((message, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={index}
                                    className={`flex w-full gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    {message.role === "assistant" && (
                                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                                            <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                    )}

                                    <div className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${message.role === "user"
                                            ? "rounded-tr-sm bg-blue-600 text-white shadow-md shadow-blue-600/10"
                                            : "rounded-tl-sm bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                                        }`}>
                                        {message.content}
                                    </div>

                                    {message.role === "user" && (
                                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                                            <User className="h-5 w-5 text-neutral-500" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            {isThinking && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex w-full gap-4"
                                >
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                                        <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-neutral-100 px-5 py-4 dark:bg-neutral-800">
                                        <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.3s]"></div>
                                        <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.15s]"></div>
                                        <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-400"></div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="border-t border-neutral-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
                    <div className="relative mx-auto flex w-full items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 p-1 pl-4 transition-all focus-within:border-blue-400 focus-within:bg-white focus-within:shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:focus-within:border-blue-700">
                        <input
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            className="flex-1 bg-transparent text-sm text-neutral-900 placeholder-neutral-400 outline-none dark:text-neutral-100"
                        />
                        <Button
                            onClick={handleSend}
                            size="icon"
                            disabled={!input.trim() || isThinking}
                            className={`h-9 w-9 rounded-lg transition-all ${input.trim()
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "bg-neutral-200 text-neutral-400 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-500"
                                }`}
                        >
                            <ArrowUp className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="mt-2 text-center text-[10px] text-neutral-400">
                        AI can make mistakes. Verify important information.
                    </div>
                </div>
            </div>
        </div>
    );
}
