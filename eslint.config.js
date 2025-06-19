import { configs } from '@eslint/js';
import { config, configs as _configs } from 'typescript-eslint';
import { configs as __configs, processInlineTemplates } from 'angular-eslint';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default config(
  {
    files: ['**/*.ts'],
    extends: [
      configs.recommended,
      ..._configs.recommended,
      ..._configs.stylistic,
      ...__configs.tsRecommended,
      prettierConfig,
    ],
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
    processor: processInlineTemplates,
  },
  {
    files: ['**/*.html'],
    extends: [...__configs.templateRecommended, ...__configs.templateAccessibility, prettierConfig],
    rules: {},
  },
);
