/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xxlarge36: ["2.25rem", { lineHeight: "3rem" }],
        xxlarge32: ["2rem", { lineHeight: "2.625rem" }],
        xlarge28: ["1.75rem", { lineHeight: "2.375rem" }],
        large26: ["1.625rem", { lineHeight: "2.125rem" }],
        medium24: ["1.5rem", { lineHeight: "2rem" }],
        medium22: ["1.375rem", { lineHeight: "1.875rem" }],
        small20: ["1.25rem", { lineHeight: "1.75rem" }],
        small18: ["1.125rem", { lineHeight: "1.625rem" }],
        xsmall16: ["1rem", { lineHeight: "1.5rem" }],
        xsmall14: ["0.875rem", { lineHeight: "1.25rem" }],
        xxsmall12: ["0.75rem", { lineHeight: "1rem" }],
      },
      screens: {
        xs: "390px",
        sm: "640px",
        md: "768px",
        lg: "991px",
        xl: "1280px",
        "2xl": "1440px",
      },
      colors: {
        primary: {
          DEFAULT: "#4D55F5",
          dark: "#4138A3",
          light: "#757BFF",
          xlight: "#A9C1FF",
          10: "#EDEEFE",
          20: "#DBDDFD",
          30: "#CACCFC",
          40: "#B8BBFB",
        },
        secondary: {
          DEFAULT: "#1BC47D",
          dark: "#009C89",
          light: "#43EC91",
          10: "#E9FAF2",
        },
        tertiary: {
          DEFAULT: "#CB81F2",
          light: "#FBF2FF",
        },
        point: "#DAFF7C",
        system: {
          "positive-green": "#1BC47D",
          "positive-blue": "#5177FF",
          error: "#F64E39",
        },
        static: {
          100: "#FFFFFF",
          0: "#000000",
        },
        neutral: {
          0: "#27272D",
          10: "#2A2D34",
          20: "#3E4148",
          30: "#4C4F56",
          35: "#5C5F66",
          40: "#7A7D84",
          45: "#989BA2",
          50: "#ACAFB6",
          60: "#BDBDBD",
          70: "#CFCFCF",
          75: "#D8D8D8",
          80: "#E7E7E7",
          85: "#EFEFEF",
          90: "#F3F3F3",
          95: "#F9F9F8",
          100: "#FAFAFA",
        },
      },
    },
    borderRadius: {
      none: "0",
      xxs: "0.25rem",
      xs: "0.375rem",
      sm: "0.5rem",
      md: "0.75rem",
      lg: "1rem",
      xl: "1.25rem",
      xxl: "1.5rem",
      full: "9999px",
    },
  },
  plugins: [],
};
