import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

export default {
  input: 'es/all.js',
  output: [
    {
      file: 'umd/pdf-lib.js',
      name: 'PDFLib',
      format: 'umd',
      sourcemap: true,
    },
    {
      file: 'umd/pdf-lib.min.js',
      name: 'PDFLib',
      format: 'umd',
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  plugins: [nodeResolve(), commonjs(), json()],
};