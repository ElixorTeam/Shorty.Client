// @ts-check

import baseConfig from './base.config.mjs'
import reactConfig from './react.config.mjs'
import nextPlugin from '@next/eslint-plugin-next'
import pluginQuery from '@tanstack/eslint-plugin-query'

export default [
  ...baseConfig,
  ...reactConfig,
  ...pluginQuery.configs['flat/recommended'],
  {
    plugins: { '@next/next': nextPlugin },
    rules: {
      ...nextPlugin.configs['recommended'].rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
]
