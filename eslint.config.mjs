import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
import react from "eslint-plugin-react";
import disableAutofix from "eslint-plugin-disable-autofix";
import testingLibrary from "eslint-plugin-testing-library";

export default [
  ...tseslint.configs.recommended,
  {
    files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
    plugins: {
      react,
      testingLibrary,
      "@stylistic": stylistic,
      "disable-autofix": disableAutofix,
    },
    rules: {
      "@stylistic/quotes": ["warn", "double"],
      "@stylistic/array-bracket-newline": ["warn", { minItems: 1 }],
      "@stylistic/array-element-newline": ["warn", "always"],
      "@stylistic/arrow-parens": ["warn", "always"],
      "@stylistic/comma-spacing": ["warn", { before: false, after: true }],
      "@stylistic/dot-location": ["warn", "object"],
      "@stylistic/line-comment-position": ["warn", "above"],
      "@stylistic/spaced-comment": ["warn", "always"],
      "@stylistic/no-mixed-operators": ["warn", { allowSamePrecedence: false }],
      "@stylistic/function-call-argument-newline": ["warn", "always"],
      "@stylistic/function-paren-newline": ["warn", { minItems: 2 }],
      "prefer-const": "off",
      "disable-autofix/prefer-const": "error",
      "no-async-promise-executor": ["error"],
      "no-await-in-loop": ["error"],
      "no-fallthrough": ["warn"],
      "no-promise-executor-return": ["error", { allowVoid: true }],
      "no-obj-calls": ["error"],
      "no-unreachable-loop": ["warn"],
      "no-invalid-regexp": ["error"],
      "react/react-in-jsx-scope": "off",
      "no-restricted-imports": "off",
      "@typescript-eslint/no-restricted-imports": [
        "warn",
        {
          name: "react-redux",
          importNames: ["useSelector", "useDispatch"],
          message:
            "Use typed hooks `useAppDispatch` and `useAppSelector` instead.",
        },
      ],
    },
  },
];
