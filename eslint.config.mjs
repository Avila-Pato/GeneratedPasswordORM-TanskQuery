import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // ⬇ Esto agrega tus presets de Next.js + TS
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // ⬇ Aquí defines los patrones que quieres ignorar
  {
    ignores: [
      "app/generated/prisma/wasm.js",  // Ignora ese archivo específico
      "app/generated/prisma/**/*.js",  // O puedes ignorar todos los archivos de esa carpeta
    ]
  }
];

export default eslintConfig;
