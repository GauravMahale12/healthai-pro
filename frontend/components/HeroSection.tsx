import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  ShieldCheck,
  MapPin,
  Upload
} from "lucide-react";

const HeroSection = () => {
  return (
    <section className="w-full py-10 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Main Hero Card */}
        <div className="bg-white rounded-3xl shadow-soft border border-border p-8 md:p-10">

          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-primary font-semibold mb-3">
                AI-Powered Smart Healthcare Platform
              </p>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-textPrimary">
                Your Personal <br />
                Medical Assistant <br />
                for Real-Life Care
              </h1>

              <p className="text-textSecondary text-lg mt-5 leading-relaxed">
                Predict diseases, analyze skin conditions, find nearby hospitals,
                get emergency support, and receive AI-guided medical help —
                all in one premium healthcare platform.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mt-8">

                {/* FIXED: Start Diagnosis now opens symptom-checker */}
                <Link href="/symptom-checker">
                  <button className="btn-primary flex items-center gap-2">
                    <Activity size={18} />
                    Start Diagnosis
                  </button>
                </Link>

                <Link href="/skin-analysis">
                  <button className="btn-outline flex items-center gap-2">
                    <Upload size={18} />
                    Upload Skin Scan
                  </button>
                </Link>

                <Link href="/hospitals">
                  <button className="btn-outline flex items-center gap-2">
                    <MapPin size={18} />
                    Nearby Hospitals
                  </button>
                </Link>

                <Link href="/emergency">
                  <button className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-red-600 transition">
                    Emergency Help
                  </button>
                </Link>

              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 mt-8">
                <div className="flex items-center gap-2 text-sm text-textSecondary">
                  <ShieldCheck size={18} className="text-success" />
                  Trusted AI Assistance
                </div>

                <div className="flex items-center gap-2 text-sm text-textSecondary">
                  <MapPin size={18} className="text-primary" />
                  Live Nearby Hospitals
                </div>
              </div>
            </motion.div>

            {/* Right Stats Cards */}
            <motion.div
              className="grid grid-cols-2 gap-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-border">
                <h3 className="text-3xl font-bold text-primary">95%</h3>
                <p className="text-sm text-textSecondary mt-2">
                  AI Prediction Accuracy
                </p>
              </div>

              <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-border">
                <h3 className="text-3xl font-bold text-success">24/7</h3>
                <p className="text-sm text-textSecondary mt-2">
                  Emergency Support
                </p>
              </div>

              <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-border">
                <h3 className="text-3xl font-bold text-warning">500+</h3>
                <p className="text-sm text-textSecondary mt-2">
                  Nearby Hospitals Access
                </p>
              </div>

              <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-border">
                <h3 className="text-3xl font-bold text-danger">Instant</h3>
                <p className="text-sm text-textSecondary mt-2">
                  First Aid Guidance
                </p>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;