/* tslint:disable */
/// <reference path="../@types/fontkit/index.ts"/>
/* tslint:enable */
import type { TypeFeatures } from 'fontkit';
import type { EmbeddedFileOptions } from 'src/core/embedders/FileEmbedder';

export enum ParseSpeeds {
  Fastest = Infinity,
  Fast = 1500,
  Medium = 500,
  Slow = 100,
}

export interface AttachmentOptions extends EmbeddedFileOptions {}
export { AFRelationship } from 'src/core/embedders/FileEmbedder';

export interface SaveOptions {
  useObjectStreams?: boolean;
  addDefaultPage?: boolean;
  objectsPerTick?: number;
  updateFieldAppearances?: boolean;
}

export interface Base64SaveOptions extends SaveOptions {
  dataUri?: boolean;
}

export interface LoadOptions {
  ignoreEncryption?: boolean;
  parseSpeed?: ParseSpeeds | number;
  throwOnInvalidObject?: boolean;
  updateMetadata?: boolean;
  capNumbers?: boolean;
}

export interface CreateOptions {
  updateMetadata?: boolean;
}

export interface EmbedFontOptions {
  subset?: boolean;
  customName?: string;
  vertical?: boolean;
  features?: TypeFeatures;
}

export interface SetTitleOptions {
  showInWindowTitleBar: boolean;
}
