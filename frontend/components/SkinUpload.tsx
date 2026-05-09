import React, { useState } from "react";
import {
  Upload,
  ShieldAlert,
  Image as ImageIcon
} from "lucide-react";

const SkinUpload = () => {
  const [file, setFile] = useState<any>(null);
  const [preview, setPreview] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload an image first");
      return;
    }

    const userId = localStorage.getItem("user_id");

    if (!userId) {
      alert("Please login first");
      return;
    }

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", String(userId));

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/skin-analysis",
        {
          method: "POST",
          body: formData
        }
      );

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();

      // 🔍 DEBUG (important)
      console.log("SKIN RESULT:", data);

      setResult(data);

    } catch (err) {
      console.error(err);
      alert("Upload failed - check backend");
    }

    setLoading(false);
  };

  return (
    <section className="w-full px-6 py-6">
      <div className="max-w-7xl mx-auto">

        <div className="bg-white border border-border rounded-3xl shadow-soft p-6">

          {/* Header */}
          <div className="mb-6">
            <p className="text-primary font-semibold mb-1">
              Skin Disease Analysis
            </p>

            <h2 className="text-2xl font-bold text-textPrimary">
              Upload Skin Image for AI Detection
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Upload Section */}
            <div className="border-2 border-dashed border-border rounded-3xl p-8 text-center">

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4"
              />

              <button
                onClick={handleUpload}
                className="btn-primary flex items-center gap-2 mx-auto"
              >
                <Upload size={18} />
                {loading ? "Analyzing..." : "Upload Image"}
              </button>

              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="mt-4 rounded-xl max-h-60 mx-auto"
                />
              )}

            </div>

            {/* Result Section */}
            <div>

              {!result ? (
                <div className="bg-[#F8FAFC] border border-border rounded-2xl p-6 text-center">
                  <ImageIcon size={30} className="mx-auto mb-2 text-primary" />
                  <p>No image analyzed yet</p>
                </div>
              ) : (
                <div className="bg-white border border-border rounded-2xl p-5 shadow-sm">

                  <h3 className="font-bold mb-4">
                    AI Prediction Result
                  </h3>

                  <div className="space-y-3">

                    {/* ✅ FIXED MAPPING */}
                    <p>
                      <b>Prediction:</b>{" "}
                      {result.prediction || result.disease || "N/A"}
                    </p>

                    <p>
                      <b>Confidence:</b>{" "}
                      {result.confidence || "N/A"}
                    </p>

                    <p>
                      <b>Severity:</b>{" "}
                      {result.severity || "N/A"}
                    </p>

                  </div>

                </div>
              )}

              <div className="mt-4 bg-red-50 border border-red-100 rounded-2xl p-4 flex gap-3">
                <ShieldAlert size={20} className="text-danger mt-1" />
                <p className="text-sm text-danger">
                  This is not a final diagnosis. Consult a doctor.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default SkinUpload;