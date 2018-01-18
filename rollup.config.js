import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import includePaths from 'rollup-plugin-includepaths';
import license from 'rollup-plugin-license';
import path from 'path';

export default {
  input: 'src/blotter.js',
  indent: '\t',
  output: [
    {
      format: 'umd',
      name: 'Blotter',
      file: 'build/blotter.js'
    }
  ],
  plugins: [
    resolve(),
    includePaths({
      paths: ['third_party/growing-packer'],
    }),
    commonjs({
      include: [
        'node_modules/detector-webgl/**',
        'node_modules/growing-packer/**',
        'node_modules/immediate/**',
        'node_modules/underscore/**',
        'node_modules/wolfy87-eventemitter/**'
      ],
      namedExports: {
        './node_modules/underscore/underscore.js': [
          'allKeys',
          'bind',
          'defaults',
          'difference',
          'each',
          'extend',
          'filter',
          'intersection',
          'isArray',
          'keys',
          'omit',
          'pick',
          'toArray',
          'reduce',
          'reduceRight',
          'without',
          'wrap'
        ]
      }
    }),
    license({
      sourceMap: true,
      banner: {
        file: path.join(__dirname, 'license.txt'),
        encoding: 'utf-8'
      }
    })
  ],
  globals: {
    "three": "THREE",
    "underscore": "_"
  }
};
