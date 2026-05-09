import { useState } from "react";

const symptomOptions = [
  "itching",
  "skin_rash",
  "nodal_skin_eruptions",
  "fever",
  "cough",
  "headache",
  "fatigue",
  "vomiting",
  "body_pain",
  "sore_throat",
  "chest pain",
  "sweating",
  "breathing issue"
];

export default function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(
        selectedSymptoms.filter((item) => item !== symptom)
      );
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handlePrediction = async () => {
    if (selectedSymptoms.length === 0) {
      alert("Please select at least one symptom");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const userId = localStorage.getItem("user_id"); // ✅ FIX

      const response = await fetch(
        "http://127.0.0.1:8000/api/predict-disease",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            symptoms: selectedSymptoms,
            user_id: userId // ✅ FIX
          })
        }
      );

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">
          Smart Symptom Checker
        </h1>

        <p className="text-[#64748B] mb-8">
          Select your symptoms and get AI-powered medical assistance
        </p>

        {/* Symptoms Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {symptomOptions.map((symptom) => (
            <button
              key={symptom}
              onClick={() => toggleSymptom(symptom)}
              className={`p-4 rounded-xl border transition-all ${
                selectedSymptoms.includes(symptom)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white border-gray-200 text-gray-700"
              }`}
            >
              {symptom.split("_").join(" ")}
            </button>
          ))}
        </div>

        {/* Diagnose Button */}
        <button
          onClick={handlePrediction}
          className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg"
        >
          {loading ? "Analyzing..." : "Start Diagnosis"}
        </button>

        {/* Result Section */}
        {result && (
          <div className="mt-10 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-[#0F172A]">
              AI Diagnosis Result
            </h2>

            {/* Top Predictions */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">
                Top Possible Conditions
              </h3>

              <div className="space-y-4">
                {result.top_predictions?.map(
                  (item: any, index: number) => (
                    <div key={index} className="border rounded-xl p-4">
                      <div className="flex justify-between">
                        <span className="font-medium">
                          {index + 1}. {item.disease}
                        </span>

                        <span className="text-blue-600 font-bold">
                          {item.confidence}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Severity + Risk */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-orange-50 p-6 rounded-xl">
                <h4 className="font-semibold mb-2">
                  Severity Level
                </h4>
                <p className="text-xl font-bold text-orange-600">
                  {result.severity}
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-xl">
                <h4 className="font-semibold mb-2">
                  Risk Score
                </h4>
                <p className="text-xl font-bold text-green-600">
                  {result.risk_score}
                </p>
              </div>
            </div>

            {/* Doctor Recommendation */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">
                Doctor Recommendation
              </h4>
              <p className="text-[#0F172A]">
                {result.doctor_recommendation}
              </p>
            </div>

            {/* Medical Disclaimer */}
            <div className="text-sm text-red-500 bg-red-50 p-4 rounded-xl">
              {result.note}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}