import { Bot, Send, Sparkles, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Button from '../components/Button';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { chatConfig, sendChatMessage } from '../services/chatService';

const prompts = [
  'Summarize the datasets used in this dashboard.',
  'Which project type has the highest estimated capacity?',
  'How much CO2 was sequestered from 2016 to 2022?',
  'Compare planned and operational CCUS projects.',
];

export default function AskAI() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Hi. I can answer questions about the imported CCUS datasets, explain the dashboard metrics, and keep track of our conversation as we go.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function submit(value = input) {
    const trimmed = value.trim();
    if (!trimmed || loading) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed,
      createdAt: new Date().toISOString(),
    };
    setMessages((items) => [...items, userMessage]);
    setInput('');
    setLoading(true);
    try {
      const response = await sendChatMessage([...messages, userMessage]);
      setMessages((items) => [...items, response]);
    } catch (error) {
      setMessages((items) => [
        ...items,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: `I could not reach the OpenAI API. Check the API key, network access, and browser console details.\n\n\`${error.message}\``,
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pb-24 pt-32">
      <section className="section-shell grid gap-8 lg:grid-cols-[.82fr_1.18fr]">
        <Reveal>
          <SectionHeader
            eyebrow="Ask AI"
            title="A conversational assistant for the carbon capture datasets."
            copy="The chatbot sends recent conversation history plus a compressed summary of the imported IEA, CCS map, and sequestration datasets to the OpenAI API. Replace the placeholder API key in the chat service when you are ready."
          />
          <div className="mt-8 grid gap-3">
            {prompts.map((prompt) => (
              <button
                key={prompt}
                className="glass rounded-[8px] px-4 py-3 text-left text-sm text-slate-200 transition hover:border-climate-mint/40 hover:text-white"
                onClick={() => submit(prompt)}
              >
                <Sparkles className="mr-2 inline text-climate-mint" size={16} />
                {prompt}
              </button>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="glass flex h-[680px] flex-col overflow-hidden rounded-[8px]">
            <div className="flex items-center gap-3 border-b border-white/10 p-5">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-climate-mint text-carbon-950">
                <Bot size={21} />
              </span>
              <div>
                <h2 className="font-display text-xl text-white">Carbon Intelligence Assistant</h2>
                <p className="text-sm text-slate-400">
                  {chatConfig.hasApiKey ? `OpenAI API mode - ${chatConfig.model}` : 'OpenAI API placeholder mode'}
                </p>
              </div>
            </div>
            {!chatConfig.hasApiKey ? (
              <div className="border-b border-climate-mint/20 bg-climate-mint/10 px-5 py-3 text-sm text-climate-mint">
                Replace <code>PASTE_YOUR_OPENAI_API_KEY_HERE</code> in <code>src/services/chatService.js</code> to enable live replies.
              </div>
            ) : null}
            <div className="flex-1 space-y-5 overflow-y-auto p-5">
              {messages.map((message) => {
                const isUser = message.role === 'user';
                return (
                  <motion.div
                    key={message.id}
                    className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {!isUser ? <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-climate-mint"><Bot size={16} /></span> : null}
                    <div className={`max-w-[82%] rounded-[8px] px-4 py-3 text-sm leading-7 ${isUser ? 'bg-climate-cyan text-carbon-950' : 'bg-white/10 text-slate-100'}`}>
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                    {isUser ? <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-white"><User size={16} /></span> : null}
                  </motion.div>
                );
              })}
              {loading ? (
                <div className="flex gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-climate-mint"><Bot size={16} /></span>
                  <div className="rounded-[8px] bg-white/10 px-4 py-3">
                    <span className="inline-flex gap-1">
                      {[0, 1, 2].map((item) => (
                        <motion.span
                          key={item}
                          className="h-2 w-2 rounded-full bg-climate-mint"
                          animate={{ opacity: [0.25, 1, 0.25], y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: item * 0.12 }}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              ) : null}
              <div ref={endRef} />
            </div>
            <form
              className="border-t border-white/10 p-4"
              onSubmit={(event) => {
                event.preventDefault();
                submit();
              }}
            >
              <div className="flex gap-3">
                <input
                  className="min-w-0 flex-1 rounded-full border border-white/10 bg-carbon-950/75 px-5 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-climate-mint/60"
                  placeholder="Ask about carbon capture..."
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                />
                <Button type="submit" className="px-4" aria-label="Send message"><Send size={18} /></Button>
              </div>
            </form>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
