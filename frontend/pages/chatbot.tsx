import React, { useState } from "react";
import { Send, Bot, User, ShieldAlert } from "lucide-react";

export default function ChatbotPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [chat, setChat] = useState([
    {
      sender: "bot",
      text: "Hello! I am your AI Medical Assistant. Ask me about symptoms, fever, headache, first-aid, emergency care, or general health guidance."
    }
  ]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message
    };

    // Show user message instantly
    setChat((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/chatbot",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: message
          })
        }
      );

      const data = await response.json();

      const botReply = {
        sender: "bot",
        text:
          data.reply ||
          "Unable to get AI response right now."
      };

      setChat((prev) => [...prev, botReply]);
    } catch (error) {
      console.error(error);

      setChat((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Server connection failed. Please try again."
        }
      ]);
    }

    setMessage("");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p className="text-blue-600 font-semibold mb-2">
            Smart Healthcare Assistant
          </p>

          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            AI Medical Chatbot
          </h1>

          <p className="text-slate-600 text-lg">
            Ask health questions, get first-aid guidance,
            and receive real AI-powered medical suggestions.
          </p>
        </div>

        {/* Medical Disclaimer */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8">
          <div className="flex items-start gap-4">
            <ShieldAlert
              className="text-red-600"
              size={28}
            />

            <div>
              <h2 className="font-bold text-red-700 mb-1">
                Important Medical Disclaimer
              </h2>

              <p className="text-slate-700 text-sm">
                This chatbot provides AI-assisted medical
                guidance only. For severe symptoms,
                emergencies, or exact diagnosis,
                please consult a doctor or call
                ambulance service: 108
              </p>
            </div>
          </div>
        </div>

        {/* Chat Box */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">

          {/* Messages */}
          <div className="space-y-5 max-h-[500px] overflow-y-auto mb-6">
            {chat.map((item, index) => (
              <div
                key={index}
                className={`flex ${
                  item.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-5 py-4 ${
                    item.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {item.sender === "user" ? (
                      <User size={18} />
                    ) : (
                      <Bot size={18} />
                    )}

                    <span className="font-semibold text-sm">
                      {item.sender === "user"
                        ? "You"
                        : "AI Assistant"}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 rounded-2xl px-5 py-4">
                  <p className="text-sm">
                    AI is typing...
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Ask your health question here..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              className="flex-1 border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-blue-600 text-white px-6 rounded-2xl font-semibold flex items-center gap-2 hover:bg-blue-700 transition"
            >
              <Send size={18} />
              Send
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}