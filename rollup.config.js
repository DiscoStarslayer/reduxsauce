import babel from 'rollup-plugin-babel'

const externalModules = ['ramda'];

function isImportExternal(importStr) {
  let external = false;

  // Check for each of the external modules defined above
  externalModules.forEach(externalModule => {
    if (importStr.indexOf(externalModule) >= 0) external = true;
  });

  return external;
}

export default {
  entry: 'lib/reduxsauce.js',
  format: 'cjs',
  plugins: [
    babel({
      babelrc: false,
      presets: [
        ['es2015', { modules: false }],
        'stage-0'
      ],
      plugins: ['ramda'],
    }),
  ],
  dest: 'dist/reduxsauce.js',
  external: isImportExternal,
}
