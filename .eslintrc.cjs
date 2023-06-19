module.exports = {
  env: {
    node: true,
    es2022: true,
    browser: true,
  },
  extends: ['eslint:recommended', 'plugin:astro/recommended', 'plugin:astro/jsx-a11y-strict'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: '.',
      },
    },
    react: {
      version: 'detect',
    },
  },
  root: true,
  rules: {
    'no-unused-vars': 'off',
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            // https://docs.astro.build/en/guides/typescript/#component-props says one does not need to export.
            //  And I dont want to export if no one uses it, just to remove the linting error.
            //  So the idea is now, to prefix alls Props in .astro files with "Prop*"
            // https://github.com/ota-meshi/eslint-plugin-astro does not mention how to handle this case properly
            varsIgnorePattern: '^Prop',
          },
        ],
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:react/jsx-runtime',
        'plugin:prettier/recommended',
      ],
      // Docs: off=0, warn=1, error=2, see https://eslint.org/docs/user-guide/configuring/rules
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        'react/prop-types': 'off',
        // https://eslint.org/docs/latest/rules/no-unused-vars#options
        // https://stackoverflow.com/a/61555310/729221
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            varsIgnorePattern: '^_',
            argsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
          },
        ],
        // https://typescript-eslint.io/rules/ban-ts-comment/#allow-with-description
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {
            'ts-ignore': 'allow-with-description',
            'ts-expect-error': 'allow-with-description',
          },
        ],
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      // Define the configuration for `<script>` tag.
      // Script in `<script>` is assigned a virtual file name with the `.js` extension.
      files: ['**/*.astro/*.js', '*.astro/*.js'],
      parser: '@typescript-eslint/parser',
    },
  ],
}
