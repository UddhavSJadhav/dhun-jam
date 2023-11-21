/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        heading: "32px",
      },
      colors: {
        "bg-screen": "#030303",
        "graph-bar": "#F0C3F1",
        btn: "#6741D9",
        "radio-btn": "#6741D9",
        "custom-border": "#F0C3F1",
        greyed: "#C2C2C2",
      },
      width: {
        "616px": "min(616px,100%)",
        "600px": "min(600px,100%)",
        "300px": "min(300px,100%)",
      },
    },
  },
  plugins: [],
};
