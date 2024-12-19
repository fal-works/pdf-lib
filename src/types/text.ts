/**
 * Multi-line text to be drawn on any PDF page.
 *
 * Either a `string` (which may contain line feeds) or an array of `GlyphLine`.
 */
export type MultiLineTextOrGlyphs = string | readonly GlyphLine[];

/**
 * Single-line text to be drawn on any PDF page.
 *
 * Either a `string` (which should not contain line feeds) or a single `GlyphLine`.
 */
export type SingleLineTextOrGlyphs = string | GlyphLine;

/**
 * Single-line text represented by an array of glyph IDs.
 */
export type GlyphLine = readonly number[] | Uint16Array | Uint32Array;
