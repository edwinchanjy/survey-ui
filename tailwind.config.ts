import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: ["node_modules/tailvue/dist/tailvue.es.js"],
  theme: {
    extend: {
      colors: {
        primary: "#FF4B55",
        primarybackground: "#F3F3F3",
      },
    },
  },
  plugins: [],
};
