import type { PDFDict } from 'src/core/objects/PDFDict';
import { PDFAcroButton } from 'src/core/acroform/PDFAcroButton';
import type { PDFContext } from 'src/core/PDFContext';
import type { PDFRef } from 'src/core/objects/PDFRef';
import { AcroButtonFlags } from 'src/core/acroform/flags';

export class PDFAcroPushButton extends PDFAcroButton {
  static fromDict = (dict: PDFDict, ref: PDFRef) =>
    new PDFAcroPushButton(dict, ref);

  static create = (context: PDFContext) => {
    const dict = context.obj({
      FT: 'Btn',
      Ff: AcroButtonFlags.PushButton,
      Kids: [],
    });
    const ref = context.register(dict);
    return new PDFAcroPushButton(dict, ref);
  };
}
