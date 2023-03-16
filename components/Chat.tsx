import { useEffect, useState } from 'react'
import { Button } from './Button'
import { type ChatGPTMessage, ChatLine, LoadingChatLine } from './ChatLine'
import { useCookies } from 'react-cookie'

const COOKIE_NAME = 'nextjs-example-ai-chat-gpt3'

// default first message to display in UI (not necessary to define the prompt)
export const initialMessages: ChatGPTMessage[] = [
  {
    role: 'assistant',
    content: 'Hi! I am a friendly AI assistant. Ask me anything!',
  },
]

const InputMessage = ({ input, setInput, sendMessage, toggleSpeechRecognition, isListening }: any) => (
  <div className="mt-6 flex clear-both">
    <input
      type="text"
      aria-label="chat input"
      required
      className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
      value={input}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          sendMessage(input)
          setInput('')
        }
      }}
      onChange={(e) => {
        setInput(e.target.value)
      }}
    />
    <Button
      className="ml-2 flex-none"
      onClick={() => {
        toggleSpeechRecognition()
      }}
    >
      {isListening ? '音声認識停止' : '音声認識開始'}
    </Button>
    <Button
      type="submit"
      className="ml-4 flex-none"
      onClick={() => {
        sendMessage(input)
        setInput('')
      }}
    >
      Say
    </Button>
  </div>
)

export function Chat() {
  const [messages, setMessages] = useState<ChatGPTMessage[]>(initialMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [cookie, setCookie] = useCookies([COOKIE_NAME])
  const [isListening, setIsListening] = useState(false)

  const toggleSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('お使いのブラウザは音声認識に対応していません。Google Chromeをお試しください。')
      return
    }

    const recognition = new webkitSpeechRecognition()
    recognition.lang = 'ja-JP'
    recognition.interimResults = true

    if (!isListening) {
      recognition.start()
      setIsListening(true)
    } else {
      recognition.stop()
      setIsListening(false)
    }

    recognition.onresult = (event) => {
      const lastIndex = event.results.length - 1
      const transcript = event.results[lastIndex][0].transcript
      setInput(transcript)
    }

    recognition.onerror = (event) => {
      console.error(event)
      recognition.stop()
      setIsListening(false)
    }
  }

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      // generate a semi random short id
      const randomId = Math.random().toString(36).substring(7)
      setCookie(COOKIE_NAME, randomId)
    }
  }, [cookie, setCookie])

  // send message to API /api/chat endpoint
  const sendMessage = async (message: string) => {
    setLoading(true)
    const newMessages = [
      ...messages,
      { role: 'user', content: message } as ChatGPTMessage,
    ]
    setMessages(newMessages)
    const last10messages = newMessages.slice(-10) // remember last 10 messages

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: last10messages,
        user: cookie[COOKIE_NAME],
      }),
    })

    console.log('Edge function returned.')

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    // This data is a ReadableStream
    const data = response.body
    if (!data) {
      return
    }

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    let lastMessage = ''

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)

      lastMessage = lastMessage + chunkValue

      setMessages([
        ...newMessages,
        { role: 'assistant', content: lastMessage } as ChatGPTMessage,
      ])

      setLoading(false)
    }
  }
  
  return (
    <div className="rounded-2xl border-zinc-100  lg:border lg:p-6">
      {messages.map(({ content, role }, index) => (
        <ChatLine key={index} role={role} content={content} />
      ))}

      {loading && <LoadingChatLine />}

      {messages.length < 2 && (
        <span className="mx-auto flex flex-grow text-gray-600 clear-both">
          Type a message to start the conversation
        </span>
      )}
      <InputMessage
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        toggleSpeechRecognition={toggleSpeechRecognition}
        isListening={isListening}
      />
    </div>
  )
}
