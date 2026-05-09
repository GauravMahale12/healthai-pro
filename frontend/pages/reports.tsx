import React from "react";

import Navbar from "../components/Navbar";
import ReportCard from "../components/ReportCard";

export default function ReportsPage() {
  return (
    <main className="bg-background min-h-screen">

      {/* Navbar */}
      <Navbar />

      {/* Page Header */}
      <section className="w-full px-6 py-8">
        <div className="max-w-7xl mx-auto">

          <div className="bg-white border border-border rounded-3xl shadow-soft p-8 mb-6">
            <p className="text-primary font-semibold mb-2">
              Reports + Medical History
            </p>

            <h1 className="text-4xl font-bold text-textPrimary mb-3">
              Health Reports Dashboard
            </h1>

            <p className="text-textSecondary max-w-3xl">
              Track past predictions, skin analysis reports,
              symptom history, severity reports, health trends
              and downloadable PDF medical reports.
            </p>
          </div>

        </div>
      </section>

      {/* Reports Dashboard */}
      <ReportCard />

    </main>
  );
}