/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          primary: "#2563EB",
          background: "#F8FAFC",
          card: "#FFFFFF",
          textPrimary: "#0F172A",
          textSecondary: "#64748B",
          border: "#E2E8F0",
          success: "#10B981",
          warning: "#F59E0B",
          danger: "#EF4444"
        },
        boxShadow: {
          soft: "0 10px 30px rgba(0,0,0,0.05)"
        },
        borderRadius: {
          xl2: "20px"
        }
      }
    },
    plugins: []
  }