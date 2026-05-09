import React, { useEffect, useState } from "react";
import {
  User,
  HeartPulse,
  Activity,
  AlertCircle
} from "lucide-react";

import Navbar from "../components/Navbar";
import AuthGuard from "../components/AuthGuard";

export default function ProfilePage() {

  const [form, setForm] = useState<any>({});
  const [history, setHistory] = useState<any[]>([]);

  const userId =
    typeof window !== "undefined"
      ? localStorage.getItem("user_id")
      : null;

  // Load profile + history
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        // Profile
        const res1 = await fetch(
          `http://127.0.0.1:8000/api/get-profile?user_id=${userId}`
        );
        const data1 = await res1.json();
        setForm(data1 || {});

        // History
        const res2 = await fetch(
          `http://127.0.0.1:8000/api/user-reports?user_id=${userId}`
        );
        const data2 = await res2.json();
        setHistory(data2.reports || []);

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // Handle input change
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Save profile
  const handleSave = async () => {
    try {
      await fetch("http://127.0.0.1:8000/api/save-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          user_id: userId
        })
      });

      alert("Profile saved successfully");
    } catch (err) {
      console.error(err);
      alert("Error saving profile");
    }
  };

  return (
    <AuthGuard>
      <main className="bg-background min-h-screen">

        <Navbar />

        <section className="w-full px-6 py-8">
          <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="bg-white border border-border rounded-3xl shadow-soft p-8 mb-6">
              <p className="text-primary font-semibold mb-2">
                Patient Profile
              </p>

              <h1 className="text-4xl font-bold text-textPrimary mb-3">
                Personal Health Information
              </h1>

              <p className="text-textSecondary max-w-3xl">
                Manage your medical profile, history, allergies,
                and health conditions to improve AI predictions.
              </p>
            </div>

            {/* Main Grid */}
           <div className="grid md:grid-cols-2 gap-6">

              {/* LEFT FORM */}
              <div className="bg-white border border-border rounded-3xl shadow-soft p-6">

                <h2 className="text-xl font-bold text-textPrimary mb-5">
                  Basic Information
                </h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={form.age || ""}
                    onChange={handleChange}
                    className="border border-border rounded-xl p-3"
                  />

                  <input
                    type="text"
                    name="weight"
                    placeholder="Weight (kg)"
                    value={form.weight || ""}
                    onChange={handleChange}
                    className="border border-border rounded-xl p-3"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <select
                    name="gender"
                    value={form.gender || ""}
                    onChange={handleChange}
                    className="border border-border rounded-xl p-3"
                  >
                    <option value="">Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>

                  <input
                    type="text"
                    name="blood_pressure"
                    placeholder="Blood Pressure"
                    value={form.blood_pressure || ""}
                    onChange={handleChange}
                    className="border border-border rounded-xl p-3"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="diabetes"
                    placeholder="Diabetes"
                    value={form.diabetes || ""}
                    onChange={handleChange}
                    className="border border-border rounded-xl p-3"
                  />

                  <input
                    type="text"
                    name="smoking"
                    placeholder="Smoking"
                    value={form.smoking || ""}
                    onChange={handleChange}
                    className="border border-border rounded-xl p-3"
                  />
                </div>

                <textarea
                  name="allergies"
                  placeholder="Allergies"
                  value={form.allergies || ""}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 mb-4"
                />

                <textarea
                  name="previous_illnesses"
                  placeholder="Previous Illnesses"
                  value={form.previous_illnesses || ""}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 mb-4"
                />

                <button
                  onClick={handleSave}
                  className="btn-primary w-full"
                >
                  Save Profile
                </button>
              </div>

              {/* RIGHT INFO */}
              <div className="space-y-5">
                <div className="bg-[#F8FAFC] p-5 rounded-2xl">
                  <User size={20} />
                  <p>Patient Overview</p>
                </div>

                <div className="bg-[#F8FAFC] p-5 rounded-2xl">
                  <HeartPulse size={20} />
                  <p>Medical Conditions</p>
                </div>

                <div className="bg-[#F8FAFC] p-5 rounded-2xl">
                  <Activity size={20} />
                  <p>Health Monitoring</p>
                </div>

                <div className="bg-red-50 p-4 rounded-2xl flex gap-3">
                  <AlertCircle size={20} />
                  <p>This is not a medical diagnosis.</p>
                </div>
              </div>

            </div>

            {/* 🔥 HISTORY SECTION */}
            <div className="mt-10">
  <h2 className="text-2xl font-bold mb-4">
    Your Medical History
  </h2>

  {history.length === 0 ? (
    <p>No reports yet.</p>
  ) : (
    <div className="space-y-4">
      {history.map((item: any, i) => (
        <div key={i} className="bg-white p-4 rounded-xl shadow flex justify-between items-start">

          <div>
            <p><b>Disease:</b> {item.disease}</p>
            <p><b>Severity:</b> {item.severity}</p>
            <p className="text-sm text-gray-500">
              {new Date(item.date).toLocaleString()}
            </p>
          </div>

          <button
            onClick={async () => {
              await fetch(
                `http://127.0.0.1:8000/api/delete-report?report_id=${item.id}`,
                { method: "DELETE" }
              );

              // remove from UI instantly
              setHistory(history.filter((r) => r.id !== item.id));
            }}
            className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
          >
            Delete
          </button>

        </div>
      ))}
    </div>
  )}
</div>

          </div>
        </section>

      </main>
    </AuthGuard>
  );
}