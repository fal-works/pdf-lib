import type { PDFDict } from 'src/core/objects/PDFDict';
import { PDFAcroChoice } from 'src/core/acroform/PDFAcroChoice';
import type { PDFContext } from 'src/core/PDFContext';
import type { PDFRef } from 'src/core/objects/PDFRef';

export class PDFAcroListBox extends PDFAcroChoice {
  static fromDict = (dict: PDFDict, ref: PDFRef) =>
    new PDFAcroListBox(dict, ref);

  static create = (context: PDFContext) => {
    const dict = context.obj({
      FT: 'Ch',
      Kids: [],
    });
    const ref = context.register(dict);
    return new PDFAcroListBox(dict, ref);
  };
}
