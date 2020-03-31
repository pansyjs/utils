import { readdirSync } from 'fs';
import { join } from 'path';

// utils must build before core
// runtime must build before renderer-react
const headPkgs: string[] = [
  'utility-types',
  'get-type',
  'is-array',
  'is-boolean',
  'is-string',
  'is-date',
  'is-empty-object',
  'is-function',
  'is-integer',
  'is-nan',
  'is-negative-integer',
  'is-nil',
  'is-null',
  'is-number',
  'is-object',
  'is-plain-object',
  'is-promise',
  'is-string',
  'is-undefined',
  'indent'
];
const tailPkgs = ['pansy-utils'];
const otherPkgs = readdirSync(join(__dirname, 'packages')).filter(
  (pkg) => pkg.charAt(0) !== '.' && !headPkgs.includes(pkg) && !tailPkgs.includes(pkg)
);

export default {
  cjs: 'babel',
  esm: { type: 'babel', importLibToEs: true },
  pkgs: [...headPkgs, ...otherPkgs, ...tailPkgs]
};
