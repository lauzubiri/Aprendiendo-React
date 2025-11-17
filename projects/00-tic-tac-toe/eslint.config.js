// @ts-check

import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import refreshPlugin from "eslint-plugin-react-refresh";

export default [
  // 1. Reglas base de ESLint
  js.configs.recommended,

  // 2. Reglas de React (usando los plugins nuevos)
  {
    files: ["src/**/*.{js,jsx}"],
    plugins: {
      "react": pluginReact,
      "react-hooks": hooksPlugin,
      "react-refresh": refreshPlugin
    },
    languageOptions: {
      globals: {
        ...globals.browser // Habilita 'window', 'document', etc.
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true // Habilita el análisis de JSX
        }
      }
    },
    rules: {
      // 3. --- Tus reglas estilo "standard" que querías ---
      "semi": ["error", "never"], // No usar punto y coma
      "quotes": ["error", "single"], // Usar comillas simples
      "space-before-function-paren": ["error", "always"], // Espacio en: function ()
      "indent": ["error", 2], // Indentación de 2 espacios

      // 4. --- Reglas de React ---
      ...pluginReact.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      "react-refresh/only-export-components": "warn",
      "react/react-in-jsx-scope": "off", // No se necesita en React 17+
      "react/prop-types": "off" // Deshabilita la necesidad de prop-types
    }
  }
];