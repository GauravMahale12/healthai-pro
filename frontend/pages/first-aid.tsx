import React from "react";
import {
  Flame,
  Droplets,
  HeartPulse,
  Wind,
  Bone,
  Thermometer,
  ShieldAlert
} from "lucide-react";

const firstAidItems = [
  {
    title: "Burns",
    icon: Flame,
    steps: [
      "Cool the burn under running water for 10–15 minutes",
      "Do not apply ice directly",
      "Cover with a clean cloth or sterile dressing",
      "Seek medical help for severe burns"
    ]
  },
  {
    title: "Bleeding",
    icon: Droplets,
    steps: [
      "Apply firm pressure using a clean cloth",
      "Keep the injured area elevated if possible",
      "Do not remove deeply stuck objects",
      "Call emergency help if bleeding is heavy"
    ]
  },
  {
    title: "Fainting",
    icon: HeartPulse,
    steps: [
      "Lay the person flat on their back",
      "Raise legs slightly for better blood flow",
      "Loosen tight clothing",
      "Seek help if unconscious for long"
    ]
  },
  {
    title: "Choking",
    icon: Wind,
    steps: [
      "Encourage coughing first",
      "Give back blows if needed",
      "Perform abdominal thrusts carefully",
      "Call emergency services immediately"
    ]
  },
  {
    title: "Fracture",
    icon: Bone,
    steps: [
      "Do not move the injured part unnecessarily",
      "Support with a splint if safe",
      "Apply ice pack outside cloth",
      "Visit hospital immediately"
    ]
  },
  {
    title: "High Fever",
    icon: Thermometer,
    steps: [
      "Keep body hydrated",
      "Use light clothing",
      "Check temperature regularly",
      "Consult doctor if fever remains high"
    ]
  }
];

export default function FirstAidPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-blue-600 font-semibold mb-2">
            Emergency Medical Support
          </p>

          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            First Aid Guide
          </h1>

          <p className="text-slate-600 text-lg max-w-3xl">
            Quick first-aid steps for common emergencies before
            professional medical help arrives.
          </p>
        </div>

        {/* Emergency Alert */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-10">
          <div className="flex items-start gap-4">
            <ShieldAlert className="text-red-600" size={30} />

            <div>
              <h2 className="text-xl font-bold text-red-700 mb-2">
                Important Emergency Note
              </h2>

              <p className="text-slate-700">
                First aid is temporary support only.
                For severe injury, breathing difficulty,
                unconsciousness, chest pain, or heavy bleeding,
                immediately call emergency ambulance service:
                <span className="font-bold text-red-700"> 108</span>
              </p>
            </div>
          </div>
        </div>

        {/* First Aid Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {firstAidItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 hover:shadow-xl transition"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-5">
                  <Icon className="text-blue-600" size={28} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {item.title}
                </h3>

                {/* Steps */}
                <ul className="space-y-3">
                  {item.steps.map((step, i) => (
                    <li
                      key={i}
                      className="text-slate-600 text-sm leading-relaxed"
                    >
                      • {step}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}