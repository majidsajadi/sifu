/**
 * @type {import("prettier").Config}
 */
const config = {
  endOfLine: "lf",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  printWidth: 120,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "<BUILTIN_MODULES>",
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "^(@radix-ui/themes/(.*)$)|^(@radix-ui/themes$)",
    "^(@radix-ui/react-icons/(.*)$)|^(@radix-ui/react-icons$)",
    "<TYPES>",
    "^(@/(.*)$)|^(@/$)",
    "^[.]",
    "<TYPES>^[.]",
  ],
};

export default config;
