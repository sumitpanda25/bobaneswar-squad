"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Send, X, Sparkles, RefreshCw, Lightbulb } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "@/app/utils/cn"
import { chatbotService, type ChatMessage } from "@/app/services/chatbot/chatbot-service"

const samplePrompts = [
  "Which products are overpriced?",
  "Show competitor pricing trends",
  "Which category has strongest growth?",
  "What products need attention?",
]

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Hello! I'm your PulseIQ AI Assistant powered by IBM ICA Agentic Runtime. I can help you analyze product data, understand market trends, and get actionable insights. What would you like to know?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Load chat history on mount
  useEffect(() => {
    const loadHistory = async () => {
      const history = await chatbotService.getChatHistory()
      if (history.length > 0) {
        setMessages(history)
      }
    }
    loadHistory()
  }, [])

  const handleSendMessage = async (text?: string) => {
    const message = text || input
    if (!message.trim()) return

    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    }

    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInput("")
    setIsLoading(true)
    setSuggestions([])

    try {
      // Call real chatbot service
      const response = await chatbotService.sendMessage(message)

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        sender: "ai",
        timestamp: new Date(),
        metadata: {
          confidence: response.confidence,
          sources: response.sources,
          suggestions: response.suggestions,
        },
      }

      const finalMessages = [...updatedMessages, aiMsg]
      setMessages(finalMessages)
      setSuggestions(response.suggestions || [])
      
      // Save chat history
      await chatbotService.saveChatHistory(finalMessages)
    } catch (error) {
      console.error("Failed to get AI response:", error)
      
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble connecting to the AI service. Please try again in a moment.",
        sender: "ai",
        timestamp: new Date(),
      }
      
      setMessages([...updatedMessages, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearChat = () => {
    chatbotService.clearSession()
    setMessages([
      {
        id: "1",
        text: "Chat cleared. How can I help you today?",
        sender: "ai",
        timestamp: new Date(),
      },
    ])
    setSuggestions([])
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/60"
      >
        {isOpen ? <X className="h-6 w-6 text-white" /> : <MessageCircle className="h-6 w-6 text-white" />}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 h-[600px] w-[450px] flex flex-col rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/95 to-slate-900/80 shadow-2xl backdrop-blur-lg"
          >
            {/* Header */}
            <div className="border-b border-slate-700/50 bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-400" />
                  <div>
                    <h3 className="font-bold text-white">PulseIQ AI</h3>
                    <p className="text-xs text-slate-400">IBM ICA Agentic Runtime</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClearChat}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-800/50 hover:text-white"
                  title="Clear chat"
                >
                  <RefreshCw className="h-4 w-4" />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 p-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn("flex flex-col", msg.sender === "user" ? "items-end" : "items-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-lg px-4 py-3",
                      msg.sender === "user"
                        ? "bg-blue-600/30 text-white border border-blue-500/30"
                        : "bg-slate-800/50 text-slate-300 border border-slate-700/50",
                    )}
                  >
                    {msg.sender === "ai" ? (
                      <div className="prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            table: ({ node, ...props }) => (
                              <div className="overflow-x-auto my-2">
                                <table className="min-w-full divide-y divide-slate-600 border border-slate-600 rounded" {...props} />
                              </div>
                            ),
                            thead: ({ node, ...props }) => (
                              <thead className="bg-slate-700/50" {...props} />
                            ),
                            th: ({ node, ...props }) => (
                              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-200 border-b border-slate-600" {...props} />
                            ),
                            td: ({ node, ...props }) => (
                              <td className="px-3 py-2 text-sm text-slate-300 border-b border-slate-700/50" {...props} />
                            ),
                            tr: ({ node, ...props }) => (
                              <tr className="hover:bg-slate-700/30 transition-colors" {...props} />
                            ),
                            ul: ({ node, ...props }) => (
                              <ul className="list-disc list-inside space-y-1 my-2" {...props} />
                            ),
                            ol: ({ node, ...props }) => (
                              <ol className="list-decimal list-inside space-y-1 my-2" {...props} />
                            ),
                            li: ({ node, ...props }) => (
                              <li className="text-sm text-slate-300" {...props} />
                            ),
                            p: ({ node, ...props }) => (
                              <p className="text-sm text-slate-300 my-1" {...props} />
                            ),
                            strong: ({ node, ...props }) => (
                              <strong className="font-bold text-white" {...props} />
                            ),
                            em: ({ node, ...props }) => (
                              <em className="italic text-slate-200" {...props} />
                            ),
                            code: ({ node, inline, ...props }: any) =>
                              inline ? (
                                <code className="bg-slate-700/50 px-1 py-0.5 rounded text-xs text-blue-300" {...props} />
                              ) : (
                                <code className="block bg-slate-700/50 p-2 rounded text-xs text-blue-300 overflow-x-auto" {...props} />
                              ),
                            h1: ({ node, ...props }) => (
                              <h1 className="text-lg font-bold text-white mt-3 mb-2" {...props} />
                            ),
                            h2: ({ node, ...props }) => (
                              <h2 className="text-base font-bold text-white mt-2 mb-1" {...props} />
                            ),
                            h3: ({ node, ...props }) => (
                              <h3 className="text-sm font-semibold text-white mt-2 mb-1" {...props} />
                            ),
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    )}
                    {msg.metadata?.confidence && msg.sender === "ai" && (
                      <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                        <span>Confidence: {(msg.metadata.confidence * 100).toFixed(0)}%</span>
                      </div>
                    )}
                  </div>
                  {msg.metadata?.sources && msg.metadata.sources.length > 0 && (
                    <div className="mt-1 text-xs text-slate-500">
                      Sources: {msg.metadata.sources.join(", ")}
                    </div>
                  )}
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-slate-400"
                >
                  <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce" />
                  <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0.2s" }} />
                  <span className="text-xs ml-2">AI is thinking...</span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="border-t border-slate-700/50 px-4 py-3 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Lightbulb className="h-3 w-3" />
                  <span>Suggested follow-ups:</span>
                </div>
                <div className="space-y-2">
                  {suggestions.map((suggestion, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleSendMessage(suggestion)}
                      className="w-full rounded-lg border border-slate-700/50 bg-slate-800/30 px-3 py-2 text-left text-xs text-slate-400 transition-colors hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-slate-300"
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Prompts */}
            {messages.length === 1 && (
              <div className="border-t border-slate-700/50 px-4 py-3 space-y-2">
                <p className="text-xs text-slate-500">Try asking:</p>
                <div className="space-y-2">
                  {samplePrompts.map((prompt, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleSendMessage(prompt)}
                      className="w-full rounded-lg border border-slate-700/50 bg-slate-800/30 px-3 py-2 text-left text-xs text-slate-400 transition-colors hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-slate-300"
                    >
                      "{prompt}"
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-slate-700/50 bg-slate-800/30 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="flex-1 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-blue-500/50 disabled:opacity-50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage()}
                  disabled={isLoading || !input.trim()}
                  className="rounded-lg bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
