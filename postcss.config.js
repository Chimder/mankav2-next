module.exports = {
  plugins: {
    'postcss-import': {},
    '@csstools/postcss-global-data': {
      files: ['./src/styles/vars.css', './src/styles/media.css'],
    },
    'postcss-mixins': {
      mixinsFiles: ['./src/styles/mixins.css'],
    },
    'postcss-nested': {},
    'autoprefixer': {},
    'cssnano': {},
    'postcss-preset-env': {
      stage: 0,
      features: {
        'custom-media-queries': true,
        'custom-properties': true,
        'custom-selectors': true,
      },
    },
  },
}
