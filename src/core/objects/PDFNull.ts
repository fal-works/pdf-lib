import { PDFObject } from 'src/core/objects/PDFObject';
import { CharCodes } from 'src/core/syntax/CharCodes';

class _PDFNull extends PDFObject {
  asNull(): null {
    return null;
  }

  clone(): _PDFNull {
    return this;
  }

  toString(): string {
    return 'null';
  }

  sizeInBytes(): number {
    return 4;
  }

  copyBytesInto(buffer: Uint8Array, offset: number): number {
    buffer[offset++] = CharCodes.n;
    buffer[offset++] = CharCodes.u;
    buffer[offset++] = CharCodes.l;
    buffer[offset++] = CharCodes.l;
    return 4;
  }
}

export const PDFNull = new _PDFNull();