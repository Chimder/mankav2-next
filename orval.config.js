module.exports = {
  main: {
    input: './src/shared/api/swagger/swagger.yaml',
    output: {
      target: './src/shared/api/swagger/generated.ts',
      override: {
        mutator: {
          path: './src/shared/api/swagger/axios.instance.ts',
          name: 'customInstance',
        },
      },
    },
  },
}
