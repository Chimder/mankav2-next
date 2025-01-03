/**
 * This is intended to be a basic starting point for linting in your app.
 * It relies on recommended configs out of the box for simplicity, but you can
 * and should modify this configuration to best suit your team's needs.
 */

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  ignorePatterns: ['!**/.server', '!**/.client'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  // Base config
  plugins: [
    'react',
    'react-refresh',
    '@typescript-eslint',
    'react-hooks',
    'jsx-a11y',
    'eslint-plugin-react-compiler',
    'react-compiler',
    '@tanstack/query',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],

  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'prefer-const': 'warn',
    'no-unused-vars': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'react-compiler/react-compiler': 'error',
    'react/prop-types': 'off',
    'jsx-a11y/heading-has-content': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
    '@tanstack/query/exhaustive-deps': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-require-imports': 'warn',
    '@tanstack/query/no-rest-destructuring': 'warn',
    '@typescript-eslint/no-empty-object-type': 'warn',
    '@tanstack/query/stable-query-client': 'error',
    '@typescript-eslint/ban-types': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/media-has-caption': 'warn',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
  },

  // overrides: [
  //   // React
  //   {
  //     files: ["**/*.{js,jsx,ts,tsx}"],
  //     plugins: ["react", "jsx-a11y"],
  //     extends: [
  //       "plugin:react/recommended",
  //       "plugin:react/jsx-runtime",
  //       "plugin:react-hooks/recommended",
  //       "plugin:jsx-a11y/recommended",
  //     ],

  //     settings: {
  //       react: {
  //         version: "detect",
  //       },
  //       formComponents: ["Form"],
  //       linkComponents: [
  //         { name: "Link", linkAttribute: "to" },
  //         { name: "NavLink", linkAttribute: "to" },
  //       ],
  //       "import/resolver": {
  //         typescript: {},
  //       },
  //     },
  //   },

  //   // Typescript
  //   {
  //     files: ["**/*.{ts,tsx}"],
  //     plugins: ["@typescript-eslint", "import"],
  //     parser: "@typescript-eslint/parser",
  //     settings: {
  //       "import/internal-regex": "^~/",
  //       "import/resolver": {
  //         node: {
  //           extensions: [".ts", ".tsx"],
  //         },
  //         typescript: {
  //           alwaysTryTypes: true,
  //         },
  //       },
  //     },
  //     extends: [
  //       "plugin:@typescript-eslint/recommended",
  //       "plugin:import/recommended",
  //       "plugin:import/typescript",
  //     ],
  //   },

  //   // Node
  //   {
  //     files: [".eslintrc.cjs"],
  //     env: {
  //       node: true,
  //     },
  //   },
  // ],
}
