import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Sparkles,
  Copy,
  CheckCircle2,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Edit3,
  X,
  Loader2,
  Wand2,
  History,
  Save
} from 'lucide-react';

// Rosita's Master Tone Guide
// Get API base URL based on environment
const getApiBase = () => {
  if (typeof window !== 'undefined' && !window.location.host.includes('localhost')) {
    return '/api';
  }
  return 'http://localhost:3001/api';
};

const ROSITAS_TONE_GUIDE = `
ROSITA'S TONE COPYWRITING GUIDE:

VOICE GUIDELINES:
• Warm, Heritage-Rooted & Community-Proud: All copy should feel like it's coming from a real member of the Rosita's family — proud of our traditions, our community, and our place in DeKalb since '72.
• Northern Mexican, Not Generic Mexican: Highlight ranch-style comfort food, traditional prep, and time-honored flavors.
• Descriptive & Sensory: Use warm, vivid food descriptions that let people see, smell, and taste what we're offering.
• Natural Spanglish Is Encouraged: Phrases like "caliente," "Abuela's," "familia," "siempre" can be used sparingly and only if the meaning is clear from context.
• 1 Emoji Max: Only one emoji may be used per post, if any. Never use more than one. Never use emoji chains.
• No Buzzwords or Generic Language: Never use terms like "big batch," "famous," "delicious," "crave-worthy," "satisfying," or "made fresh daily." Instead, reference our legacy, homemade roots, and specific prep.
• No Corporate Tone: No calls to "order now!" with exclamation points, no promotional fluff. Instead, invite the reader with a welcoming, proud tone.
• No Walls of Hashtags: Only include hashtags if absolutely essential to the post's purpose or campaign. One max per post, two in rare cases, woven in naturally.

EXAMPLES OF ROSITA'S STYLE:
• "Since 1972, we've served tacos the northern way — crisp, golden shells filled with stewed beef, layered by hand, and paired with jalapeños like Abuela would've done it."
• "We've served generations of DeKalb families, and the tradition keeps simmering — slow, rich, and worth gathering around."
• "Super Sunday? We've got the platters covered. Call by Friday and we'll set aside your spread — tacos, guac, the works — all prepped the Rosita's way."

CAMPAIGN CONTEXT:
- Restaurant: Rosita's Mexican Restaurant, DeKalb, IL
- Heritage: Family-run since 1972
- Cuisine: Northern Mexican / Ranch-style comfort food
- Phone: 815-756-3817
- Address: 642 E Lincoln Hwy, DeKalb
`;

export default function PostChatEditor({
  post,
  onUpdatePost,
  onClose,
  platform,
  dateLabel,
  theme
}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editedContent, setEditedContent] = useState(post?.content || '');
  const [showHistory, setShowHistory] = useState(false);
  const [contentHistory, setContentHistory] = useState([post?.content || '']);
  const [copiedText, setCopiedText] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: `Hey! I'm here to help you refine this ${platform} post for "${theme}".

I can see your current draft and I'm ready to help you:
• Rewrite it in Rosita's authentic voice
• Make it more nostalgic, festive, or urgent
• Adjust the length or tone
• Add specific details or offers
• Tweak the call-to-action

Just tell me what you'd like to change! For example:
- "Make it warmer and more family-focused"
- "Add more urgency for the deadline"
- "Rewrite in Rosita's heritage voice"
- "Make it shorter for Instagram Stories"`
      }]);
    }
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${getApiBase()}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage }
          ],
          currentPost: editedContent,
          platform,
          dateLabel,
          theme,
          toneGuide: ROSITAS_TONE_GUIDE
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.message,
        revisedPost: data.revisedPost
      }]);

      // If AI provided a revised post, update the editor
      if (data.revisedPost) {
        setContentHistory(prev => [...prev, editedContent]);
        setEditedContent(data.revisedPost);
      }

    } catch (error) {
      console.error('AI Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `I apologize, but I'm having trouble connecting right now. Please make sure your OpenAI API key is configured in the server.

In the meantime, here are some quick tips for Rosita's voice:
- Lead with heritage: "Since 1972..."
- Use sensory descriptions
- Keep it warm and community-proud
- One emoji max
- No corporate buzzwords`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const undoLastChange = () => {
    if (contentHistory.length > 1) {
      const newHistory = [...contentHistory];
      const previousContent = newHistory.pop();
      setContentHistory(newHistory);
      setEditedContent(newHistory[newHistory.length - 1]);
    }
  };

  const applyQuickTone = async (toneRequest) => {
    setInput(toneRequest);
    // Trigger send after a brief delay to show the input
    setTimeout(() => {
      const fakeEvent = { key: 'Enter', shiftKey: false, preventDefault: () => {} };
      sendMessage();
    }, 100);
  };

  const saveChanges = () => {
    if (onUpdatePost) {
      onUpdatePost(editedContent);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wand2 className="w-6 h-6" />
            <div>
              <h2 className="font-bold text-lg">AI Post Editor</h2>
              <p className="text-white/80 text-sm">{platform} • {dateLabel} • {theme}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Post Editor */}
          <div className="w-1/2 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-purple-600" />
                  Current Draft
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={undoLastChange}
                    disabled={contentHistory.length <= 1}
                    className="p-1.5 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Undo last change"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="p-1.5 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded"
                    title="View history"
                  >
                    <History className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => copyToClipboard(editedContent)}
                    className="p-1.5 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded"
                    title="Copy to clipboard"
                  >
                    {copiedText ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              {contentHistory.length > 1 && (
                <p className="text-xs text-gray-500">{contentHistory.length - 1} revision(s) made</p>
              )}
            </div>

            {/* Post Content Editor */}
            <div className="flex-1 p-4 overflow-auto">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full h-full p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm font-mono"
                placeholder="Your post content..."
              />
            </div>

            {/* Quick Tone Buttons */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <p className="text-xs text-gray-500 mb-2">Quick tone adjustments:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Heritage Voice", prompt: "Rewrite this in Rosita's warm, heritage-rooted voice. Reference our 1972 legacy." },
                  { label: "More Urgent", prompt: "Add more urgency about the deadline while keeping Rosita's warm tone." },
                  { label: "Family Focus", prompt: "Make this more family-focused and community-proud." },
                  { label: "Shorter", prompt: "Make this more concise while keeping the key message and Rosita's voice." },
                  { label: "Add Sensory", prompt: "Add more sensory, descriptive language about the food." }
                ].map((tone, idx) => (
                  <button
                    key={idx}
                    onClick={() => applyQuickTone(tone.prompt)}
                    disabled={isLoading}
                    className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-full hover:border-purple-300 hover:bg-purple-50 transition-colors disabled:opacity-50"
                  >
                    {tone.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={saveChanges}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes & Close
              </button>
            </div>
          </div>

          {/* Right Panel - Chat */}
          <div className="w-1/2 flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-purple-600" />
                Chat with AI
              </h3>
              <p className="text-xs text-gray-500 mt-1">Tell me how you'd like to change the post</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, idx) => (
                <div
                  key={idx}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    {message.revisedPost && (
                      <div className="mt-3 pt-3 border-t border-gray-300/30">
                        <p className="text-xs opacity-70 mb-1">✨ Updated your draft</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Tell me how to improve this post..."
                  rows={2}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="p-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* History Panel (collapsible) */}
        {showHistory && contentHistory.length > 1 && (
          <div className="border-t border-gray-200 bg-gray-50 p-4 max-h-48 overflow-y-auto">
            <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
              <History className="w-4 h-4" />
              Version History
            </h4>
            <div className="space-y-2">
              {contentHistory.map((content, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded border cursor-pointer hover:border-purple-300 ${
                    idx === contentHistory.length - 1 ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-white'
                  }`}
                  onClick={() => {
                    setEditedContent(content);
                    setContentHistory(contentHistory.slice(0, idx + 1));
                  }}
                >
                  <p className="text-xs text-gray-500 mb-1">
                    {idx === 0 ? 'Original' : `Revision ${idx}`}
                    {idx === contentHistory.length - 1 && ' (current)'}
                  </p>
                  <p className="text-sm text-gray-700 line-clamp-2">{content.substring(0, 100)}...</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
