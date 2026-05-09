import React from "react";
import {
  Ambulance,
  PhoneCall,
  Siren,
  AlertTriangle
} from "lucide-react";

const EmergencyCard = () => {
  return (
    <section className="w-full px-6 py-6">
      <div className="max-w-7xl mx-auto">

        <div className="bg-white border border-border rounded-3xl shadow-soft p-6">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-danger font-semibold mb-1">
                Emergency Support
              </p>

              <h2 className="text-2xl font-bold text-textPrimary">
                Ambulance + Urgent Medical Help
              </h2>

              <p className="text-sm text-textSecondary mt-1">
                Quick emergency response, ambulance support
                and nearest hospital assistance
              </p>
            </div>

            <button className="bg-danger text-white px-5 py-3 rounded-xl font-medium shadow-md hover:opacity-90 transition flex items-center gap-2">
              <Siren size={18} />
              Emergency Alert
            </button>
          </div>

          {/* Main Grid */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Left Emergency Services */}
            <div className="space-y-5">

              <div className="border border-border rounded-2xl p-5 bg-[#FFF8F8]">
                <div className="flex items-center gap-3 mb-3">
                  <Ambulance size={22} className="text-danger" />
                  <h3 className="font-bold text-textPrimary">
                    Nearest Ambulance Service
                  </h3>
                </div>

                <p className="text-sm text-textSecondary mb-4">
                  City Emergency Ambulance Service
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    ETA: 8–10 mins
                  </span>

                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-danger text-white text-sm">
                    <PhoneCall size={16} />
                    Call Now
                  </button>
                </div>
              </div>

              <div className="border border-border rounded-2xl p-5 bg-[#FAFCFF]">
                <h3 className="font-bold text-textPrimary mb-4">
                  India Emergency Numbers
                </h3>

                <div className="space-y-3">

                  <div className="flex items-center justify-between">
                    <span className="text-textSecondary">
                      Ambulance
                    </span>
                    <span className="font-bold text-danger">
                      108
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-textSecondary">
                      Emergency Helpline
                    </span>
                    <span className="font-bold text-danger">
                      112
                    </span>
                  </div>

                </div>
              </div>
            </div>

            {/* Right Emergency Warning */}
            <div className="bg-red-50 border border-red-100 rounded-3xl p-6 flex flex-col justify-between">

              <div>
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-5 shadow-sm">
                  <AlertTriangle size={30} className="text-danger" />
                </div>

                <h3 className="text-2xl font-bold text-textPrimary mb-3">
                  High-Risk Symptoms Detected
                </h3>

                <p className="text-sm text-textSecondary leading-relaxed mb-5">
                  Chest pain + sweating + breathing issue may indicate
                  a serious emergency condition. Immediate medical
                  attention is strongly recommended.
                </p>

                <div className="space-y-3">
                  <div className="bg-white rounded-xl p-4 border border-red-100">
                    <p className="font-medium text-danger">
                      Severity Level: EMERGENCY
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-red-100">
                    <p className="font-medium">
                      Recommended Action:
                    </p>
                    <p className="text-sm text-textSecondary mt-1">
                      Call ambulance immediately and visit nearest hospital
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 bg-danger text-white py-4 rounded-2xl font-semibold text-lg shadow-md hover:opacity-90 transition">
                🚑 Get Emergency Help Now
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default EmergencyCard;