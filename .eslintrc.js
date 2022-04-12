module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: `./tsconfig.json`,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
  ],
  rules: {
    /* POSSIBLES PROBLEMS */

    // "array-callback-return": "error",
    "no-await-in-loop": "error",
    "no-constructor-return": "error",
    "no-promise-executor-return": "error",
    "no-self-compare": "error",
    "no-template-curly-in-string": "error",
    "no-unmodified-loop-condition": "error",
    "no-unreachable-loop": "error",
    "no-unused-private-class-members": "error",
    // "no-use-before-define": "error",
    "require-atomic-updates": "error",

    /* SUGGESTIONS */

    "accessor-pairs": "warn",
    "arrow-body-style": "warn",
    "block-scoped-var": "warn",
    // camelcase: "warn",
    // "capitalized-comments": "warn",
    // "class-methods-use-this": "warn",
    // complexity: "warn",
    "consistent-return": "warn",
    "consistent-this": "warn",
    // curly: "warn",
    "default-case": "warn",
    "default-case-last": "warn",
    eqeqeq: "error",
    "func-name-matching": "warn",
    "func-names": "warn",
    "func-style": ["warn", "declaration"],
    "grouped-accessor-pairs": "warn",
    "guard-for-in": "warn",
    "id-denylist": ["error", "data", "err", "e", "cb", "callback", "i"],
    // "id-length": "warn",
    "id-match": "warn",
    "max-classes-per-file": ["error", 1],
    // "max-depth": ["warn", 4],
    // "max-lines": "warn",
    // "max-lines-per-function": "warn",
    // "max-nested-callbacks": "warn",
    // "max-params": "warn",
    // "max-statements": "warn",
    "multiline-comment-style": "warn",
    "new-cap": "warn",
    "no-alert": "warn",
    "no-bitwise": "warn",
    "no-caller": "warn",
    "no-confusing-arrow": "warn",
    "no-continue": "warn",
    "no-else-return": "warn",
    "no-eq-null": "warn",
    "no-eval": "warn",
    "no-extend-native": "warn",
    "no-extra-bind": "warn",
    "no-floating-decimal": "warn",
    "no-implicit-coercion": "warn",
    "no-implicit-globals": "warn",
    "no-inline-comments": "warn",
    "no-iterator": "warn",
    "no-label-var": "warn",
    "no-labels": "warn",
    "no-lone-blocks": "warn",
    "no-lonely-if": "warn",
    // "no-magic-numbers": "warn",
    "no-mixed-operators": "warn",
    "no-multi-assign": "warn",
    "no-multi-str": "warn",
    "no-negated-condition": "warn",
    // "no-nested-ternary": "warn",
    "no-new": "warn",
    "no-new-func": "warn",
    "no-new-object": "warn",
    "no-new-wrappers": "warn",
    "no-octal-escape": "warn",
    "no-param-reassign": "warn",
    "no-plusplus": "warn",
    "no-proto": "warn",
    "no-restricted-exports": "warn",
    "no-restricted-globals": "warn",
    "no-restricted-imports": "warn",
    "no-restricted-properties": "warn",
    "no-restricted-syntax": "warn",
    "no-return-assign": "warn",
    // "no-return-await": "warn",
    "no-script-url": "warn",
    "no-sequences": "warn",
    // "no-ternary": "off",
    "no-throw-literal": "warn",
    "no-undef": "off",
    "no-undef-init": "warn",
    // "no-undefined": "warn",
    // "no-underscore-dangle": "warn",
    "no-unneeded-ternary": "warn",
    "no-useless-call": "warn",
    "no-useless-computed-key": "warn",
    "no-useless-concat": "warn",
    "no-useless-rename": "warn",
    "no-useless-return": "warn",
    "no-var": "warn",
    "no-void": "warn",
    "no-warning-comments": "warn",
    // "object-shorthand": "warn",
    "operator-assignment": "warn",
    "prefer-arrow-callback": "warn",
    "prefer-const": "warn",
    "prefer-destructuring": ["warn", { array: false, object: true }],
    "prefer-exponentiation-operator": "warn",
    "prefer-named-capture-group": "warn",
    "prefer-numeric-literals": "warn",
    // "prefer-object-has-own": "warn",
    "prefer-object-spread": "warn",
    "prefer-promise-reject-errors": "warn",
    "prefer-regex-literals": "warn",
    "prefer-rest-params": "warn",
    "prefer-spread": "warn",
    "prefer-template": "warn",
    // "quote-props": "warn",
    radix: "warn",
    "require-unicode-regexp": "warn",
    // "sort-imports": "warn",
    // "sort-keys": "warn",
    "sort-vars": "warn",
    "spaced-comment": "warn",
    strict: "warn",
    "symbol-description": "warn",
    "vars-on-top": "warn",
    yoda: "warn",

    /* TYPESCRIPT */

    "@typescript-eslint/array-type": "warn",
    "@typescript-eslint/ban-tslint-comment": "warn",
    "@typescript-eslint/class-literal-property-style": "warn",
    "@typescript-eslint/consistent-indexed-object-style": "warn",
    "@typescript-eslint/consistent-type-assertions": [
      "warn",
      { assertionStyle: "as" },
    ],
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/explicit-module-boundary-types": "warn",
    "@typescript-eslint/method-signature-style": ["error", "property"],
    "@typescript-eslint/no-base-to-string": "warn",
    "@typescript-eslint/no-confusing-non-null-assertion": "warn",
    "@typescript-eslint/no-confusing-void-expression": [
      "error",
      { ignoreArrowShorthand: true },
    ],
    "@typescript-eslint/no-dynamic-delete": "error",
    "@typescript-eslint/no-empty-interface": [
      "error",
      { allowSingleExtends: true },
    ],
    "@typescript-eslint/no-invalid-void-type": "error",
    "@typescript-eslint/no-meaningless-void-operator": "error",
    "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
    "@typescript-eslint/no-parameter-properties": "error",
    "@typescript-eslint/no-require-imports": "error",
    // "@typescript-eslint/no-type-alias": "warn",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "warn",
    "@typescript-eslint/no-unnecessary-condition": "warn",
    "@typescript-eslint/no-unnecessary-qualifier": "warn",
    "@typescript-eslint/no-unnecessary-type-arguments": "warn",
    "@typescript-eslint/prefer-enum-initializers": "error",
    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/prefer-includes": "error",
    "@typescript-eslint/prefer-literal-enum-member": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "warn",
    "@typescript-eslint/prefer-optional-chain": "warn",
    "@typescript-eslint/prefer-readonly": "warn",
    // "@typescript-eslint/prefer-readonly-parameter-types": "warn",
    "@typescript-eslint/prefer-reduce-type-parameter": "warn",
    // "@typescript-eslint/prefer-regexp-exec": "warn",
    "@typescript-eslint/prefer-return-this-type": "warn",
    "@typescript-eslint/prefer-string-starts-ends-with": "error",
    "@typescript-eslint/promise-function-async": "error",
    "@typescript-eslint/require-array-sort-compare": "error",
    "@typescript-eslint/sort-type-union-intersection-members": "warn",
    // "@typescript-eslint/strict-boolean-expressions": "error",
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    "@typescript-eslint/typedef": "error",
    "@typescript-eslint/unified-signatures": "error",

    /* EXTENSION OF ESLINT */
    "@typescript-eslint/no-duplicate-imports": "error",
    "@typescript-eslint/default-param-last": "warn",
    "@typescript-eslint/dot-notation": "warn",
    "@typescript-eslint/init-declarations": "warn",
    "@typescript-eslint/no-array-constructor": "warn",
    "@typescript-eslint/no-implied-eval": "warn",
    "@typescript-eslint/no-invalid-this": "warn",
    "@typescript-eslint/no-loop-func": "warn",
    "@typescript-eslint/no-shadow": "warn",
    "@typescript-eslint/no-unused-expressions": "warn",
    "@typescript-eslint/no-useless-constructor": "warn",
    "@typescript-eslint/require-await": "warn",

    /* NEXTJS */
    "@next/next/no-img-element": "off",
  },
};
