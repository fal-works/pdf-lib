import { Font, Glyph, Subset, TypeFeatures } from 'fontkit';
import { Fontkit } from 'src/types/fontkit';

import CustomFontEmbedder from 'src/core/embedders/CustomFontEmbedder';
import PDFHexString from 'src/core/objects/PDFHexString';
import { Cache, toHexStringOfMinLength } from 'src/utils';

/**
 * A note of thanks to the developers of https://github.com/foliojs/pdfkit, as
 * this class borrows from:
 *   https://github.com/devongovett/pdfkit/blob/e71edab0dd4657b5a767804ba86c94c58d01fbca/lib/image/jpeg.coffee
 */
class CustomFontSubsetEmbedder extends CustomFontEmbedder {
  static for(
    fontkit: Fontkit,
    fontData: Uint8Array,
    customFontName?: string,
    vertical?: boolean,
    fontFeatures?: TypeFeatures,
  ) {
    const font = fontkit.create(Buffer.from(fontData));
    return new CustomFontSubsetEmbedder(
      font,
      fontData,
      customFontName,
      vertical,
      fontFeatures,
    );
  }

  private readonly subset: Subset;
  private readonly glyphs: Glyph[];
  private readonly glyphIdMap: Map<number, number>;

  private constructor(
    font: Font,
    fontData: Uint8Array,
    customFontName?: string,
    vertical?: boolean,
    fontFeatures?: TypeFeatures,
  ) {
    super(font, fontData, customFontName, vertical, fontFeatures);

    this.subset = this.font.createSubset();
    this.glyphs = [];
    this.glyphCache = Cache.populatedBy(() => this.glyphs);
    this.glyphIdMap = new Map();
  }

  encodeText(text: string): PDFHexString {
    const { glyphs } = this.font.layout(text, this.fontFeatures);
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
    return (this.subset as any).cff;
  }

  protected glyphId(glyph?: Glyph): number {
    return glyph ? this.glyphIdMap.get(glyph.id)! : -1;
  }

  protected serializeFont(): Uint8Array {
    return this.subset.encode();
  }
}

export default CustomFontSubsetEmbedder;
