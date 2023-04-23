/** @type {import('tailwindcss').Config} */
module.exports = {
  // 템플릿 파일의 경로 설정 👀
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class',
  theme: {
    extend: {},
  },
  plugins: [],
};
