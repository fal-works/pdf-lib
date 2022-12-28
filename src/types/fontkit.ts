import type { Font } from 'fontkit';

export interface Fontkit {
  // create: typeof(create);
  create(buffer: Buffer, postscriptName?: string): Font;
}
