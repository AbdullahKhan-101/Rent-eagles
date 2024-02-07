const { nextui } = require("@nextui-org/react");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        web_brown: "#99000B",
        web_pink: "#F0D9DB",
        web_darkgray: "#616161",
        web_gray: "#F4F4F4",
        web_lightgray: "#EDEDED",
      },
    },
  },
  plugins: [nextui()],
};
