import React from "react";
import {
  Send,
  Bot,
  User,
} from "lucide-react";

const ChatbotBox = () => {
  return (
    <section className="w-full px-6 py-6">
      <div className="max-w-7xl mx-auto">

        <div className="bg-white border border-border rounded-3xl shadow-soft p-6">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-primary font-semibold mb-1">
                AI Medical Chatbot
              </p>
              <h2 className="text-2xl font-bold text-textPrimary">
                Your Personal Health Assistant
              </h2>
              <p className="text-textSecondary text-sm mt-1">
                Smart follow-up questions for better disease prediction
              </p>
            </div>

            <div className="bg-blue-50 text-primary px-4 py-2 rounded-xl text-sm font-medium">
              AI Powered
            </div>
          </div>

          {/* Chat Area */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Left Chat Window */}
            <div className="border border-border rounded-2xl p-5 bg-[#FAFCFF]">

              {/* AI Message */}
              <div className="flex items-start gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Bot size={20} className="text-primary" />
                </div>

                <div className="bg-white border border-border rounded-2xl px-4 py-3 max-w-[80%] shadow-sm">
                  <p className="text-sm text-textPrimary">
                    Hello! I’m your AI Health Assistant.
                    How can I help you today?
                  </p>
                </div>
              </div>

              {/* User Message */}
              <div className="flex items-start justify-end gap-3 mb-5">
                <div className="bg-primary text-white rounded-2xl px-4 py-3 max-w-[80%] shadow-sm">
                  <p className="text-sm">
                    I have fever and headache since 2 days.
                  </p>
                </div>

                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <User size={20} className="text-primary" />
                </div>
              </div>

              {/* AI Follow-up */}
              <div className="flex items-start gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Bot size={20} className="text-primary" />
                </div>

                <div className="bg-white border border-border rounded-2xl px-4 py-3 max-w-[80%] shadow-sm">
                  <p className="text-sm text-textPrimary">
                    Do you also have body pain, cough,
                    sore throat, or breathing issues?
                  </p>
                </div>
              </div>

              {/* Quick Reply Chips */}
              <div className="flex flex-wrap gap-3 mb-6">
                <button className="px-4 py-2 rounded-xl border border-border text-sm hover:bg-blue-50">
                  Yes, I have cough
                </button>

                <button className="px-4 py-2 rounded-xl border border-border text-sm hover:bg-blue-50">
                  Body pain
                </button>

                <button className="px-4 py-2 rounded-xl border border-border text-sm hover:bg-blue-50">
                  Sore throat
                </button>

                <button className="px-4 py-2 rounded-xl border border-border text-sm hover:bg-blue-50">
                  None of these
                </button>
              </div>

              {/* Input */}
              <div className="flex items-center border border-border rounded-2xl px-4 py-3 bg-white">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full outline-none bg-transparent text-sm"
                />

                <button>
                  <Send size={18} className="text-primary" />
                </button>
              </div>
            </div>

            {/* Right Summary Panel */}
            <div className="space-y-5">

              <div className="bg-[#F8FAFC] border border-border rounded-2xl p-5">
                <h3 className="font-bold text-textPrimary mb-3">
                  Chat Summary
                </h3>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-textSecondary">Primary Symptoms</p>
                    <p className="font-medium">Fever, Headache</p>
                  </div>

                  <div>
                    <p className="text-textSecondary">Additional Symptoms</p>
                    <p className="font-medium">Cough, Body Pain</p>
                  </div>

                  <div>
                    <p className="text-textSecondary">Duration</p>
                    <p className="font-medium">2 Days</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-border rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-textPrimary mb-3">
                  AI Suggestion
                </h3>

                <p className="text-sm text-textSecondary leading-relaxed">
                  Possible viral fever or flu symptoms detected.
                  Continue diagnosis for severity analysis and
                  doctor recommendations.
                </p>

                <button className="btn-primary mt-5 w-full">
                  Continue Diagnosis
                </button>
              </div>

              <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
                <p className="text-sm text-danger font-medium">
                  AI-generated prediction only. This is not a substitute
                  for professional medical advice.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ChatbotBox;