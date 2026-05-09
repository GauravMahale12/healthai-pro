import React from "react";
import AuthGuard from "../components/AuthGuard";

import Navbar from "../components/Navbar";
import QuickActions from "../components/QuickActions";
import ChatbotBox from "../components/ChatbotBox";
import SkinUpload from "../components/SkinUpload";
import HospitalMap from "../components/HospitalMap";
import EmergencyCard from "../components/EmergencyCard";
import ReportCard from "../components/ReportCard";

export default function Dashboard() {
  return (
    <AuthGuard>
      <main className="bg-background min-h-screen">

        {/* Top Navbar */}
        <Navbar />

        {/* Welcome Section */}
        <section className="w-full px-6 py-8">
          <div className="max-w-7xl mx-auto">

            <div className="bg-white border border-border rounded-3xl shadow-soft p-8">

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                {/* Left */}
                <div>
                  <p className="text-primary font-semibold mb-2">
                    Welcome Back
                  </p>

                  <h1 className="text-4xl font-bold text-textPrimary mb-3">
                    Your Health Dashboard
                  </h1>

                  <p className="text-textSecondary max-w-2xl">
                    Track symptoms, analyze skin conditions,
                    check reports, find nearby hospitals and
                    access emergency medical support — all in one place.
                  </p>
                </div>

                {/* Right Stats */}
                <div className="grid grid-cols-2 gap-4">

                  <div className="bg-[#F8FAFC] border border-border rounded-2xl p-5 min-w-[180px]">
                    <p className="text-sm text-textSecondary mb-2">
                      Total Reports
                    </p>

                    <h3 className="text-3xl font-bold text-primary">
                      12
                    </h3>
                  </div>

                  <div className="bg-[#F8FAFC] border border-border rounded-2xl p-5 min-w-[180px]">
                    <p className="text-sm text-textSecondary mb-2">
                      Health Score
                    </p>

                    <h3 className="text-3xl font-bold text-success">
                      Good
                    </h3>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>

        {/* Quick Actions */}
        <QuickActions />

        {/* AI Chatbot */}
        <ChatbotBox />

        {/* Skin Upload */}
        <SkinUpload />

        {/* Nearby Hospitals */}
        <HospitalMap />

        {/* Emergency Section */}
        <EmergencyCard />

        {/* Reports Dashboard */}
        <ReportCard />

      </main>
    </AuthGuard>
  );
}