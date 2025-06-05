import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setMessages((prev) => [...prev, `🧑: ${userMessage}`]);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    });
    const data = await res.json();
    setMessages((prev) => [...prev, `🤖: ${data.reply}`]);
    setLoading(false);
  };

  return (
    <main className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Yurei.dev</h1>
      <div className="space-y-2 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="bg-gray-800 p-2 rounded">
            {msg}
          </div>
        ))}
        {loading && <div className="text-purple-400 animate-pulse">🤖: ...thinking</div>}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 p-2 bg-gray-700 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask me anything..."
        />
        <button onClick={sendMessage} className="bg-purple-600 px-4 py-2 rounded">Send</button>
      </div>
    </main>
  );
}
