import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  config: {
    namingConvention: {
      enumValues: 'change-case-all#upperCase',
    },
  },
  schema: './src/services/graphql/types/**/*.graphql',
  generates: {
    'src/services/graphql/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
}

export default config
