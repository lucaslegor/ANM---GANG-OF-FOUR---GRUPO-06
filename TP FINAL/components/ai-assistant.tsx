'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateResponse } from '@/lib/chatbot-engine'
import { useGrowthData } from '@/lib/use-growth-data'
import { CLUSTER_OPTIONS } from '@/lib/data-processor'
import ReactMarkdown from 'react-markdown'

interface Message {
  role: 'user' | 'assistant'
  content: string
  type?: 'theoretical' | 'calculation' | 'mixed' | 'greeting' | 'unknown'
  calculationResult?: any
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '¡Hola! 👋 Soy tu asistente inteligente para **BioGrowth Analytics**.\n\nPuedo ayudarte con:\n\n📊 **Cálculos**: Tasas de crecimiento, proyecciones, métricas (R², RMSE)\n📚 **Teoría**: Explicaciones sobre regresión lineal, mínimos cuadrados, modelos de crecimiento\n\n¿En qué puedo ayudarte?',
      type: 'greeting',
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { getClusterById, loading: dataLoading } = useGrowthData()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isTyping) return

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simular delay para efecto de escritura
    await new Promise(resolve => setTimeout(resolve, 500))

    try {
      const response = generateResponse(input.trim(), getClusterById)
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.content,
        type: response.type,
        calculationResult: response.calculationResult,
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error generating response:', error)
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: '⚠️ Lo siento, ocurrió un error al procesar tu pregunta. Por favor, intenta de nuevo.',
          type: 'unknown',
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const handleQuickAction = (action: string) => {
    const quickActions: Record<string, string> = {
      'tasa-crecimiento': '¿Cuál es la tasa de crecimiento entre 2 y 4 horas para 25°C - Medio Rico?',
      'r2': '¿Qué es el coeficiente de determinación R²?',
      'regresion': '¿Qué es la regresión lineal?',
      'minimos-cuadrados': '¿Cómo funciona el método de mínimos cuadrados?',
      'proyeccion': 'Proyecta el crecimiento a 12 horas para 30°C - Medio Rico',
    }

    if (quickActions[action]) {
      setInput(quickActions[action])
    }
  }

  // Debug: verificar que el componente se renderiza
  useEffect(() => {
    console.log('AIAssistant renderizado, isOpen:', isOpen)
  }, [isOpen])

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ 
            zIndex: 9999,
            position: 'fixed',
            bottom: '24px',
            right: '24px',
          }}
        >
          <Button
            onClick={() => {
              console.log('Botón clickeado')
              setIsOpen(true)
            }}
            className="h-14 w-14 rounded-full shadow-2xl neon-border"
            style={{
              background: 'linear-gradient(135deg, oklch(0.75 0.25 200), oklch(0.7 0.28 320))',
              color: 'oklch(0.98 0 0)',
              zIndex: 9999,
              position: 'relative',
              border: '2px solid oklch(0.75 0.25 200)',
              boxShadow: '0 0 20px oklch(0.75 0.25 200 / 0.5)',
            }}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </motion.div>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <Card
              className="fixed bottom-6 right-6 w-96 h-[600px] glass border-2 flex flex-col overflow-hidden"
              style={{
                borderColor: 'oklch(0.75 0.25 200)',
                boxShadow: '0 0 30px oklch(0.75 0.25 200 / 0.3)',
                zIndex: 9999,
                position: 'fixed',
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between p-4 border-b"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.75 0.25 200 / 0.2), oklch(0.7 0.28 320 / 0.2))',
                  borderColor: 'oklch(0.75 0.25 200 / 0.3)',
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[oklch(0.8_0.22_140)] animate-pulse" />
                  <span className="font-semibold neon-glow" style={{ color: 'oklch(0.75 0.25 200)' }}>
                    Asistente IA
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className="flex items-start gap-2 max-w-[85%]">
                        {msg.role === 'assistant' && (
                          <div
                            className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{
                              background: 'linear-gradient(135deg, oklch(0.75 0.25 200), oklch(0.7 0.28 320))',
                            }}
                          >
                            <Bot className="h-4 w-4" style={{ color: 'oklch(0.98 0 0)' }} />
                          </div>
                        )}
                        <div
                          className={`p-3 rounded-lg ${
                            msg.role === 'user'
                              ? 'glass border'
                              : 'glass border'
                          }`}
                          style={{
                            background:
                              msg.role === 'user'
                                ? 'linear-gradient(135deg, oklch(0.75 0.25 200 / 0.3), oklch(0.65 0.25 240 / 0.3))'
                                : 'oklch(0.12 0.04 240 / 0.6)',
                            borderColor:
                              msg.role === 'user'
                                ? 'oklch(0.75 0.25 200 / 0.5)'
                                : 'oklch(0.3 0.1 200 / 0.3)',
                          }}
                        >
                          <div
                            className="text-sm prose prose-invert max-w-none"
                            style={{ color: 'oklch(0.95 0.01 200)' }}
                          >
                            <ReactMarkdown
                              components={{
                                h2: ({ children }) => (
                                  <h2 className="text-base font-bold mt-2 mb-1" style={{ color: 'oklch(0.75 0.25 200)' }}>
                                    {children}
                                  </h2>
                                ),
                                h3: ({ children }) => (
                                  <h3 className="text-sm font-semibold mt-1 mb-1" style={{ color: 'oklch(0.7 0.28 320)' }}>
                                    {children}
                                  </h3>
                                ),
                                code: ({ children }) => (
                                  <code
                                    className="px-1 py-0.5 rounded text-xs"
                                    style={{
                                      background: 'oklch(0.2 0.1 200 / 0.5)',
                                      color: 'oklch(0.8 0.22 140)',
                                    }}
                                  >
                                    {children}
                                  </code>
                                ),
                                pre: ({ children }) => (
                                  <pre
                                    className="p-2 rounded text-xs overflow-x-auto my-1"
                                    style={{
                                      background: 'oklch(0.1 0.05 200 / 0.8)',
                                      border: '1px solid oklch(0.3 0.1 200 / 0.3)',
                                    }}
                                  >
                                    {children}
                                  </pre>
                                ),
                                strong: ({ children }) => (
                                  <strong style={{ color: 'oklch(0.75 0.25 200)' }}>{children}</strong>
                                ),
                                ul: ({ children }) => <ul className="list-disc list-inside space-y-1 my-1">{children}</ul>,
                                ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 my-1">{children}</ol>,
                                li: ({ children }) => <li className="text-xs">{children}</li>,
                                p: ({ children }) => <p className="mb-1">{children}</p>,
                              }}
                            >
                              {msg.content}
                            </ReactMarkdown>
                          </div>
                        </div>
                        {msg.role === 'user' && (
                          <div
                            className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{
                              background: 'linear-gradient(135deg, oklch(0.65 0.25 240), oklch(0.7 0.28 320))',
                            }}
                          >
                            <User className="h-4 w-4" style={{ color: 'oklch(0.98 0 0)' }} />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-start gap-2"
                  >
                    <div
                      className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, oklch(0.75 0.25 200), oklch(0.7 0.28 320))',
                      }}
                    >
                      <Bot className="h-4 w-4" style={{ color: 'oklch(0.98 0 0)' }} />
                    </div>
                    <div className="flex gap-1 p-3 rounded-lg glass border" style={{ borderColor: 'oklch(0.3 0.1 200 / 0.3)' }}>
                      <motion.div
                        className="h-2 w-2 rounded-full"
                        style={{ background: 'oklch(0.75 0.25 200)' }}
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="h-2 w-2 rounded-full"
                        style={{ background: 'oklch(0.7 0.28 320)' }}
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="h-2 w-2 rounded-full"
                        style={{ background: 'oklch(0.8 0.22 140)' }}
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length === 1 && (
                <div className="px-4 pb-2 border-t" style={{ borderColor: 'oklch(0.75 0.25 200 / 0.3)' }}>
                  <p className="text-xs mb-2" style={{ color: 'oklch(0.7 0.05 200)' }}>
                    Acciones rápidas:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {[
                      { id: 'tasa-crecimiento', label: 'Tasa' },
                      { id: 'r2', label: 'R²' },
                      { id: 'regresion', label: 'Regresión' },
                      { id: 'proyeccion', label: 'Proyección' },
                    ].map(action => (
                      <button
                        key={action.id}
                        onClick={() => handleQuickAction(action.id)}
                        className="px-2 py-1 text-xs rounded glass border transition-all hover:scale-105"
                        style={{
                          borderColor: 'oklch(0.75 0.25 200 / 0.3)',
                          color: 'oklch(0.75 0.25 200)',
                        }}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div
                className="p-4 border-t"
                style={{
                  borderColor: 'oklch(0.75 0.25 200 / 0.3)',
                }}
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                    placeholder="Escribe tu pregunta..."
                    className="flex-1 px-3 py-2 rounded-lg glass border text-sm"
                    style={{
                      borderColor: 'oklch(0.75 0.25 200 / 0.3)',
                      color: 'oklch(0.95 0.01 200)',
                      background: 'oklch(0.12 0.04 240 / 0.3)',
                    }}
                    disabled={isTyping || dataLoading}
                  />
                  <Button
                    onClick={handleSend}
                    size="icon"
                    className="h-10 w-10"
                    disabled={isTyping || dataLoading || !input.trim()}
                    style={{
                      background: 'linear-gradient(135deg, oklch(0.75 0.25 200), oklch(0.7 0.28 320))',
                      color: 'oklch(0.98 0 0)',
                      opacity: isTyping || dataLoading || !input.trim() ? 0.5 : 1,
                    }}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
