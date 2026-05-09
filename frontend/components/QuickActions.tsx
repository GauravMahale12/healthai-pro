import React from "react";
import Link from "next/link";
import {
  Stethoscope,
  ScanLine,
  Building2,
  Ambulance,
  HeartPulse,
  MessageCircleMore
} from "lucide-react";

const actions = [
  {
    title: "Symptom Checker",
    desc: "Predict possible diseases using symptoms",
    icon: Stethoscope,

    // FIXED: now opens real symptom-checker page
    link: "/symptom-checker"
  },
  {
    title: "Skin Detection",
    desc: "Upload image for skin disease analysis",
    icon: ScanLine,
    link: "/skin-analysis"
  },
  {
    title: "Nearby Hospitals",
    desc: "Find nearest hospitals using live location",
    icon: Building2,
    link: "/hospitals"
  },
  {
    title: "Emergency Ambulance",
    desc: "Quick ambulance support and emergency help",
    icon: Ambulance,
    link: "/emergency"
  },
  {
    title: "First Aid Guide",
    desc: "Instant first-aid suggestions and care steps",
    icon: HeartPulse,
    link: "/first-aid"
  },
  {
    title: "AI Medical Chatbot",
    desc: "Ask health questions with AI guidance",
    icon: MessageCircleMore,
    link: "/chatbot"
  }
];

const QuickActions = () => {
  return (
    <section className="w-full px-6 py-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-8">
          <p className="text-primary font-semibold mb-2">
            Smart Healthcare Tools
          </p>

          <h2 className="text-3xl font-bold text-textPrimary">
            Quick Actions
          </h2>

          <p className="text-textSecondary mt-2">
            Access powerful AI-driven medical assistance tools instantly
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">

          {actions.map((item, index) => {
            const Icon = item.icon;

            return (
              <Link href={item.link} key={index}>
                <div
                  className="bg-white border border-border rounded-3xl p-6 shadow-soft hover:shadow-lg transition duration-300 cursor-pointer group"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-5 group-hover:scale-105 transition">
                    <Icon
                      size={26}
                      className="text-primary"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-textPrimary mb-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-textSecondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Link>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default QuickActions;