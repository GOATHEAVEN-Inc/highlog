import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // React 19의 신규 룰. 광범위하게 발생하는 props→state 동기화 패턴은
      // 점진적으로 derived state로 리팩터링할 예정이므로 우선 warn으로 운영
      'react-hooks/set-state-in-effect': 'warn',
      // Context와 hook을 같은 파일에서 export하는 일반 패턴 허용
      'react-refresh/only-export-components': 'warn',
    },
  },
])
