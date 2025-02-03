module.exports = {
  mangadex: {
    input: './src/shared/api/mangadex/swagger.yaml',
    output: {
      target: './src/shared/api/mangadex/generated.ts',
      override: {
        mutator: {
          path: './src/shared/api/mangadex/axios.instance.ts',
          name: 'customInstance',
        },
      },
    },
  },
  mangadexZod: {
    input: './src/shared/api/mangadex/swagger.yaml',
    output: {
      client: 'zod',
      mode: 'single',
      target: './src/shared/api/mangadex/zod/generated.ts',
    },
  },
  jikan: {
    input:
      'https://raw.githubusercontent.com/jikan-me/jikan-rest/master/storage/api-docs/api-docs.json',
    output: {
      target: './src/shared/api/jikan/generated.ts',
      override: {
        mutator: {
          path: './src/shared/api/jikan/axios.instance.ts',
          name: 'jikanInstance',
        },
      },
    },
  },
}
