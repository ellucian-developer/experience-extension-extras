module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: process.env.BABEL_ENV === 'esm' ? false : 'commonjs',
        targets: {
          node: '22'
        }
      }
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic'
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        useESModules: process.env.BABEL_ENV === 'esm'
      }
    ]
  ]
};
