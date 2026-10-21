import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  User,
  Copy,
  Check,
  Zap,
  Disc3,
  Film,
  History,
  TrendingUp,
  Radio,
  RefreshCw,
} from 'lucide-react';
import { ButterflyLogo } from '../components/brand/ButterflyLogo';
import { askAIAssistant } from '../services/api';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AIAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `سلام سعید عزیز! من دستیار هوشمند و اختصاصی رشد کانال یوتیوب شما (SPM AI Music Growth Assistant) هستم.

آماده‌ام در هر یک از موارد زیر مستقیماً کمکتان کنم:
• ممیزی و احیای ویدیوهای قبلی کانال (مثل آهنگ‌های «برنگشتی»، «شب تاریک» و «قسم»)
• تولید عنوان‌های سئو شده دو زبانه و دیسکریپشن‌های استاندارد
• مهندسی پرامپت‌های ۱۶:۹ تامنیل با عینک تیره و المان نئونی پروانه
• تدوین کمپین ۴ مرحله‌ای شورتس برای آهنگ‌های جدید
• تحلیل آمار بازدیدها و تعیین بهترین ساعت انتشار هفتگی

می‌توانید هر دستوری را به زبان فارسی مطرح کنید یا از پیشنهادهای آماده زیر استفاده کنید:`,
      timestamp: 'همین الان',
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const quickPrompts = [
    'ویدیوی آهنگ برنگشتی را بررسی کن و پیشنهاد اصلاح بده.',
    'برای آهنگ جدیدم شب تاریک ۵ عنوان استراتژیک بنویس.',
    'کدام ویدیوهای قدیمی کانالم نیاز به اصلاح فوری دارند؟',
    'برای قطعه جدید یک کمپین شورتس ۴ بخشی آماده کن.',
    'تامنیل این ویدیو را بررسی کن و پرامپت ۱۶:۹ نئونی بنویس.',
    'بهترین روز و ساعت هفته برای انتشار ترک جدید چه زمانی است؟',
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const response = await askAIAssistant(text, messages);
      const assistantMsg: Message = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        text: response,
        timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: Message = {
        id: `err_${Date.now()}`,
        sender: 'assistant',
        text: 'متاسفانه در برقراری ارتباط با مدل هوش مصنوعی مشکلی پیش آمد. لطفاً اتصال اینترنت یا کلید Gemini را بررسی فرمایید.',
        timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (txt: string, id: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] space-y-4">
      {/* Top Banner */}
      <div className="p-4 rounded-2xl bg-[#0F1422] border border-blue-500/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ButterflyLogo size="sm" showText={false} />
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span>SPM AI MUSIC GROWTH ASSISTANT</span>
              <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Gemini 3.8 Active
              </span>
            </h2>
            <p className="text-[11px] text-slate-400">
              دستیار هوشمند استراتژیست رشد یوتیوب، سئو، انتشار موسیقی و برندینگ اختصاصی سعید پروانه
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: 'reset',
                sender: 'assistant',
                text: 'گفتگو بازنشانی شد. چطور می‌توانم در رشد کانال و بهینه‌سازی قطعات به شما کمک کنم؟',
                timestamp: 'همین الان',
              },
            ])
          }
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
        >
          <RefreshCw size={12} />
          <span>شروع مجدد</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-2xl bg-[#0B0E17] border border-white/8">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.3)]'
              }`}
            >
              {msg.sender === 'user' ? <User size={16} /> : <Sparkles size={16} />}
            </div>

            <div
              className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-[#0F1422] text-slate-200 border border-white/8 rounded-tl-none'
              }`}
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/6 pb-1 text-[10px] text-slate-400">
                <span className="font-bold">
                  {msg.sender === 'user' ? 'سعید پروانه (هنرمند)' : 'SPM AI Assistant'}
                </span>
                <div className="flex items-center gap-2">
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'assistant' && (
                    <button
                      onClick={() => handleCopy(msg.text, msg.id)}
                      className="hover:text-white text-slate-400"
                      title="کپی متن پاسخ"
                    >
                      {copiedId === msg.id ? (
                        <Check size={12} className="text-emerald-400" />
                      ) : (
                        <Copy size={12} />
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div className="whitespace-pre-line text-[12px] leading-relaxed select-text">
                {msg.text}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center animate-spin">
              <Sparkles size={16} />
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0F1422] border border-white/8 text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>دستیار SPM در حال آنالیز داده‌های کانال و تدوین پاسخ است...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-2.5 py-1.5 rounded-xl bg-white/[0.03] hover:bg-blue-600/20 text-slate-300 hover:text-blue-300 border border-white/6 hover:border-blue-500/30 whitespace-nowrap transition-colors flex items-center gap-1"
          >
            <Zap size={12} className="text-blue-400" />
            <span>{prompt}</span>
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="flex items-center gap-2 p-2 rounded-2xl bg-[#0F1422] border border-white/10">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="دستور یا پرسش خود را درباره رشد کانال، بررسی ویدیوها، شورتس و استراتژی موسیقی بنویسید..."
          className="flex-1 px-3 py-2 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
        />

        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || isLoading}
          className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white transition-all shadow-[0_0_12px_rgba(59,130,246,0.3)]"
          aria-label="ارسال"
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
};
