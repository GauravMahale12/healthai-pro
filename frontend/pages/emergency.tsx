import React from "react";

import Navbar from "../components/Navbar";
import EmergencyCard from "../components/EmergencyCard";

export default function EmergencyPage() {
  return (
    <main className="bg-background min-h-screen">

      {/* Navbar */}
      <Navbar />

      {/* Page Header */}
      <section className="w-full px-6 py-8">
        <div className="max-w-7xl mx-auto">

          <div className="bg-white border border-border rounded-3xl shadow-soft p-8 mb-6">
            <p className="text-danger font-semibold mb-2">
              Emergency Medical Support
            </p>

            <h1 className="text-4xl font-bold text-textPrimary mb-3">
              Ambulance + Urgent Care Help
            </h1>

            <p className="text-textSecondary max-w-3xl">
              Immediate emergency assistance for high-risk symptoms,
              nearest ambulance support, emergency hospital access
              and urgent medical response.
            </p>
          </div>

        </div>
      </section>

      {/* Emergency Section */}
      <EmergencyCard />

    </main>
  );
}