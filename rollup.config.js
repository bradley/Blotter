import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/blotter.js',
  indent: '\t',
  output: [
    {
      format: 'umd',
      name: 'Blotter',
      file: 'build_2/blotter.js'
    }
  ],
  // sourceMap: false,
  // plugins: [
  //   resolve({
  //     //browser: true,
  //     preferBuiltins: false
  //   }),
  //   // babel({
  //   //   exclude: 'node_modules/**'
  //   // }),
  //   builtins(),
  //   commonjs({
  //     include: 'node_modules/**',
  //     //exclude: ['node_modules/process-es6/browser.js'],
  //     namedExports: {
  //       './node_modules/underscore/underscore.js': [
  //         'allKeys',
  //         'bind',
  //         'defaults',
  //         'difference',
  //         'each',
  //         'extend',
  //         'filter',
  //         'intersection',
  //         'isArray',
  //         'keys',
  //         'omit',
  //         'pick',
  //         'toArray',
  //         'reduce',
  //         'reduceRight',
  //         'without',
  //         'wrap'
  //       ]
  //     }
  //   }),
  //   globals()
  // ],
  // globals: {
  //   underscore: '_',
  //   three: 'THREE'
  // }


  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs({
      include: [
        'node_modules/detector-webgl/**',
        'node_modules/immediate/**',
        'node_modules/jakes-gordon-growing-packer/**',
        //'node_modules/underscore/**',
        'node_modules/wolfy87-eventemitter/**'
      ],
      // namedExports: {
      //   './node_modules/underscore/underscore.js': [
      //     'allKeys',
      //     'bind',
      //     'defaults',
      //     'difference',
      //     'each',
      //     'extend',
      //     'filter',
      //     'intersection',
      //     'isArray',
      //     'keys',
      //     'omit',
      //     'pick',
      //     'toArray',
      //     'reduce',
      //     'reduceRight',
      //     'without',
      //     'wrap'
      //   ]
      // }
    }),
    resolve({
      browser: true
    })
  ],
};
