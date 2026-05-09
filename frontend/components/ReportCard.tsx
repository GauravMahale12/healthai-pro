import React, { useEffect, useState } from "react";
import {
  FileText,
  Download,
  TrendingUp,
  Activity
} from "lucide-react";

const ReportCard = () => {

  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const userId = localStorage.getItem("user_id");

        if (!userId) return;

        const res = await fetch(
          `http://127.0.0.1:8000/api/user-reports?user_id=${userId}`
        );

        const data = await res.json();

        setReports(data.reports || []);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchReports();
  }, []);

  // 🔴 If no reports → hide entire section
  if (!loading && (!reports || reports.length === 0)) {
    return null;
  }

  return (
    <section className="w-full px-6 py-6">
      <div className="max-w-7xl mx-auto">

        <div className="bg-white border border-border rounded-3xl shadow-soft p-6">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-primary font-semibold mb-1">
                Reports Dashboard
              </p>

              <h2 className="text-2xl font-bold text-textPrimary">
                Medical Reports + History
              </h2>

              <p className="text-sm text-textSecondary mt-1">
                View diagnosis history, trends and analytics
              </p>
            </div>

            <button className="btn-outline flex items-center gap-2">
              <Download size={18} />
              Download PDF
            </button>
          </div>

          {/* Main Grid */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* LEFT: Real Reports */}
            <div className="space-y-4">

              {reports.map((report, index) => (
                <div
                  key={index}
                  className="border border-border rounded-2xl p-5 bg-[#FAFCFF] hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between mb-3">

                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-border flex items-center justify-center">
                        <FileText size={20} className="text-primary" />
                      </div>

                      <div>
                        <h3 className="font-bold text-textPrimary">
                          {report.disease || "Disease Prediction"}
                        </h3>

                        <p className="text-sm text-textSecondary mt-1">
                          {new Date(report.date).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-primary font-medium">
                      {report.severity || "Normal"}
                    </span>
                  </div>

                  <p className="text-sm text-textSecondary">
                    Symptoms: {report.symptoms}
                  </p>
                </div>
              ))}

            </div>

            {/* RIGHT: Static Analytics (can improve later) */}
            <div className="space-y-5">

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-[#F8FAFC] border border-border rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp size={20} className="text-primary" />
                    <p className="text-sm text-textSecondary">
                      Risk Score
                    </p>
                  </div>

                  <h3 className="text-3xl font-bold text-textPrimary">
                    72%
                  </h3>

                  <p className="text-xs text-warning mt-2">
                    Moderate Health Risk
                  </p>
                </div>

                <div className="bg-[#F8FAFC] border border-border rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity size={20} className="text-success" />
                    <p className="text-sm text-textSecondary">
                      Health Status
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-textPrimary">
                    Stable
                  </h3>

                  <p className="text-xs text-success mt-2">
                    No Critical Alert
                  </p>
                </div>

              </div>

              <div className="border border-border rounded-2xl p-5 bg-white shadow-sm">
                <h3 className="font-bold text-textPrimary mb-4">
                  AI Summary
                </h3>

                <p className="text-sm text-textSecondary leading-relaxed">
                  Based on your recent activity, your health appears stable.
                  Continue monitoring and consult a doctor if needed.
                </p>

                <div className="mt-5 bg-red-50 border border-red-100 rounded-xl p-4">
                  <p className="text-sm text-danger font-medium">
                    AI-generated prediction only.
                    Not a substitute for medical advice.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ReportCard;