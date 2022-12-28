import type { PDFDict } from 'src/core/objects/PDFDict';
import type { PDFRef } from 'src/core/objects/PDFRef';
import { PDFAcroTerminal } from 'src/core/acroform/PDFAcroTerminal';

export class PDFAcroSignature extends PDFAcroTerminal {
  static fromDict = (dict: PDFDict, ref: PDFRef) =>
    new PDFAcroSignature(dict, ref);
}
