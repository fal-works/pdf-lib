import type { PDFDict } from 'src/core/objects/PDFDict';
import type { PDFRef } from 'src/core/objects/PDFRef';
import { PDFName } from 'src/core/objects/PDFName';
import type { PDFContext } from 'src/core/PDFContext';
import { PDFAcroField } from 'src/core/acroform/PDFAcroField';

export class PDFAcroNonTerminal extends PDFAcroField {
  static fromDict = (dict: PDFDict, ref: PDFRef) =>
    new PDFAcroNonTerminal(dict, ref);

  static create = (context: PDFContext) => {
    const dict = context.obj({});
    const ref = context.register(dict);
    return new PDFAcroNonTerminal(dict, ref);
  };

  addField(field: PDFRef) {
    const { Kids } = this.normalizedEntries();
    Kids?.push(field);
  }

  normalizedEntries() {
    let Kids = this.Kids();

    if (!Kids) {
      Kids = this.dict.context.obj([]);
      this.dict.set(PDFName.of('Kids'), Kids);
    }

    return { Kids };
  }
}
