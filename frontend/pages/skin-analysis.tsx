import { useState } from "react";

export default function SkinAnalysisPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const analyzeSkin = async () => {
    if (!selectedFile) {
      alert("Please select an image first");
      return;
    }

    const userId = localStorage.getItem("user_id");

    if (!userId) {
      alert("Please login first");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("user_id", String(userId)); // ✅ FIX

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/skin-analysis",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();

      // 🔍 Debug (optional)
      console.log("SKIN RESULT:", data);

      setResult(data);

    } catch (error) {
      console.error(error);
      alert("Unable to analyze image");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">
          Skin Disease Analysis
        </h1>

        <p className="text-[#64748B] mb-8">
          Upload a skin image for AI-powered analysis
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-6"
          />

          {preview && (
            <div className="mb-6">
              <img
                src={preview}
                alt="Preview"
                className="w-64 h-64 object-cover rounded-xl border"
              />
            </div>
          )}

          <button
            onClick={analyzeSkin}
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold"
          >
            {loading ? "Analyzing..." : "Analyze Skin"}
          </button>

        </div>

        {result && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-6">
              Analysis Result
            </h2>

            <div className="space-y-4">

              {/* ✅ FIXED KEYS */}
              <p>
                <strong>Predicted Disease:</strong>{" "}
                {result.prediction || result.predicted_skin_disease || "N/A"}
              </p>

              <p>
                <strong>Confidence:</strong>{" "}
                {result.confidence || result.confidence_score || "N/A"}
              </p>

              <p>
                <strong>Severity:</strong>{" "}
                {result.severity || "N/A"}
              </p>

              <p>
                <strong>Doctor Recommendation:</strong>{" "}
                {result.doctor_recommendation || "Consult Dermatologist"}
              </p>

              <p className="text-gray-600">
                {result.note}
              </p>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}