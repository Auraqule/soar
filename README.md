# 💼 Soar Financial Dashboard

Financial dashboard application built with **React (Vite)**, **TailwindCSS**, **Redux Toolkit**, **TypeScript**, and more. This project provides an overview of financial activities, transaction history, card details, and user settings.

---

## 🚀 Live Demo

[soar-pi.vercel.app](soar-pi.vercel.app)
[![Screenshot of Dashboard](https://i.postimg.cc/wB3dhsmY/Screen-Shot-2025-03-13-at-10-57-40-PM.png)](https://krowdshield.vercel.app)

---

## 📂 Tech Stack

- **Frontend:** React (Vite) + TypeScript
- **State Management:** Redux Toolkit
- **Styling:** TailwindCSS
- **Forms & Validation:** React Hook Form + Zod
- **Charts:** Chart.js
- **Routing:** React Router
- **API Handling:** Axios (mocked endpoints)

---

## ✨ Features

### 📊 Dashboard View:

- Displays multiple financial cards with balance details
- Shows recent transactions with icons, descriptions, and amounts
- Interactive weekly activity & balance history charts
- Expense breakdown with a pie chart
- Quick transfer UI (static)

### ⚙️ Settings View:

- Profile editing with name, email, password, address, and more
- Profile picture upload/edit feature
- Preferences and security settings
- Form validation using **Zod** & **React Hook Form**

### 🌟 Other Features:

- Fully responsive (mobile, tablet, desktop)
- Smooth transitions and hover effects
- Lazy loading for optimized performance
- Accessible (ARIA labels & keyboard navigation)
- Works on all modern browsers

---

## 📦 Installation & Setup

1. **Clone the repository:**

   ```
   git clone https://github.com/auraqules/soar.git
   cd soar
   ```

2. **Install dependencies:**

   ```
   yarn install
   ```

3. **Start the development server:**
   ```
   yarn run dev
   ```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
