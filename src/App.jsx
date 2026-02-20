import { useState, useRef, useEffect } from 'react'
import OpenAI from 'openai'
import './App.css'

const client = new OpenAI({
  apiKey: import.meta.env.VITE_GROK_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
  dangerouslyAllowBrowser: true,
})

const SYSTEM_PROMPT = `You are a super friendly and fun teacher for little kids! 
Your job is to explain EVERYTHING as if you're talking to a 5-year-old child.
Rules you must always follow:
- Use very simple words that a young child would understand
- Use fun comparisons and silly analogies (like "imagine a cookie" or "it's like when you play with blocks")
- Keep sentences short and easy
- Add enthusiasm with exclamation marks!
- Use emojis to make things fun 🎉
- Never use big scary words — if you must, explain them right away in the simplest way
- Be warm, patient, and encouraging`

function App() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi there! 👋 I'm your super simple explainer! Ask me ANYTHING and I'll explain it like you're 5 years old! 🎈",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMessage = { role: 'user', content: text }
    const updatedMessages = [...messages, userMessage]

    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {
      const response = await client.chat.completions.create({
        model: 'openai/gpt-oss-20b',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        ],
      })

      const assistantMessage = {
        role: 'assistant',
        content: response.choices[0].message.content,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Oops! Something went wrong 😢 — ${err.message}. Make sure your API key is set in the .env file!`,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-icon">🧠</div>
        <div>
          <h1>ELI5 Bot</h1>
          <p>Explains everything like you&apos;re 5!</p>
        </div>
      </header>

      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={i} className={`message-row ${msg.role}`}>
            <div className="avatar">{msg.role === 'assistant' ? '🤖' : '🧒'}</div>
            <div className={`bubble ${msg.role}`}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="message-row assistant">
            <div className="avatar">🤖</div>
            <div className="bubble assistant typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="input-area">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything... like 'what is gravity?' 🚀"
          rows={1}
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()}>
          {loading ? '⏳' : '➤'}
        </button>
      </div>
    </div>
  )
}

export default App
