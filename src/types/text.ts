/**
 * Multi-line text to be drawn on any PDF page.
 *
 * Either a `string` (which may contain line feeds) or an array of `GlyphLine`.
 *
 * NOTE: If you use the `GlyphLine` type, see also the comment of the `GlyphLine` for notes.
 */
export type MultiLineTextOrGlyphs = string | readonly GlyphLine[];

/**
 * Single-line text to be drawn on any PDF page.
 *
 * Either a `string` (which should not contain line feeds) or a single `GlyphLine`.
 *
 * NOTE: If you use the `GlyphLine` type, see also the comment of the `GlyphLine` for notes.
 */
export type SingleLineTextOrGlyphs = string | GlyphLine;

/**
 * Single-line text represented by an array of glyph IDs.
 *
 * The IDs can be obtained from fontkit `Glyph` instances created by `TTFFont` class.
 *
 * NOTE: If you use this type, make sure that appropriate code points have been assigned to each `Glyph` instance.
 * `TTFFont#layout` does this automatically, but it can also be done manually by `TTFFont#getGlyph`.
 */
export type GlyphLine = readonly number[] | Uint16Array | Uint32Array;
