import { create as createFont } from '@denkiyagi/fontkit';
import type { TTFFont, Glyph, Subset } from '@denkiyagi/fontkit';

import { CustomFontEmbedder } from 'src/core/embedders/CustomFontEmbedder';
import { PDFHexString } from 'src/core/objects/PDFHexString';
import { Cache, toHexStringOfMinLength } from 'src/utils';
import type { EmbedFontAdvancedOptions } from 'src/api';

/**
 * A note of thanks to the developers of https://github.com/foliojs/pdfkit, as
 * this class borrows from:
 *   https://github.com/devongovett/pdfkit/blob/e71edab0dd4657b5a767804ba86c94c58d01fbca/lib/image/jpeg.coffee
 */
export class CustomFontSubsetEmbedder extends CustomFontEmbedder {
  static for(
    fontData: Uint8Array,
    customFontName?: string,
    vertical?: boolean,
    advanced?: EmbedFontAdvancedOptions,
  ) {
    const font = createFont(fontData);
    if (font.type !== 'TTF') throw new Error(`Invalid font type: ${font.type}`);

    return new CustomFontSubsetEmbedder(
      font,
      fontData,
      customFontName,
      vertical,
      advanced,
    );
  }

  private readonly subset: Subset;
  private readonly glyphs: Glyph[];
  private readonly glyphIdMap: Map<number, number>;

  private constructor(
    font: TTFFont,
    fontData: Uint8Array,
    customFontName?: string,
    vertical?: boolean,
    advanced?: EmbedFontAdvancedOptions,
  ) {
    super(font, fontData, customFontName, vertical, advanced);

    this.subset = this.font.createSubset();
    this.glyphs = [];
    this.glyphCache = Cache.populatedBy(() => this.glyphs);
    this.glyphIdMap = new Map();
  }

  encodeText(text: string): PDFHexString {
    const { glyphs } = this.font.layout(text, this.fontFeatures, this.layoutAdvancedParams);
    const hexCodes = new Array(glyphs.length);

    for (let idx = 0, len = glyphs.length; idx < len; idx++) {
      const glyph = glyphs[idx];
      const subsetGlyphId = this.subset.includeGlyph(glyph);

      this.glyphs[subsetGlyphId - 1] = glyph;
      this.glyphIdMap.set(glyph.id, subsetGlyphId);

      hexCodes[idx] = toHexStringOfMinLength(subsetGlyphId, 4);
    }

    this.glyphCache.invalidate();
    return PDFHexString.of(hexCodes.join(''));
  }

  protected isCFF(): boolean {
    return this.subset.type === "CFF";
  }

  protected glyphId(glyph?: Glyph): number {
    return glyph ? this.glyphIdMap.get(glyph.id)! : -1;
  }

  protected serializeFont(): Uint8Array {
    return this.subset.encode();
  }
}
