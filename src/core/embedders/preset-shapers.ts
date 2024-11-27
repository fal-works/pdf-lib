import { DefaultShaper, type ShapingPlan } from '@denkiyagi/fontkit';

/**
 * Commonly used [OpenType Features](https://learn.microsoft.com/en-us/typography/opentype/spec/featurelist)
 * related to [glyph substitution](https://learn.microsoft.com/en-us/typography/opentype/spec/gsub).
 */
const COMMON_FEATURES = [
  'ccmp',
  'locl',
  'calt',
  'clig',
  'rclt',
  'liga',
  'rlig',
];
const VERTICAL_FEATURES = [
  'vert', // NOTE: If you apply 'vrt2' instead, 'vert' must be disabled.
];

class HorizontalPresetShaper extends DefaultShaper {
  static defaultFeatures = COMMON_FEATURES;

  override planPreprocessing(_: ShapingPlan): void {
    // Do nothing
  }

  override planPostprocessing(
    plan: ShapingPlan,
    userFeatures: string[] | Record<string, boolean>,
  ): void {
    plan.add(HorizontalPresetShaper.defaultFeatures);
    plan.setFeatureOverrides(userFeatures);
  }
}

class VerticalPresetShaper extends DefaultShaper {
  static defaultFeatures = COMMON_FEATURES.concat(VERTICAL_FEATURES);

  override planPreprocessing(_: ShapingPlan): void {
    // Do nothing
  }

  override planPostprocessing(
    plan: ShapingPlan,
    userFeatures: string[] | Record<string, boolean>,
  ): void {
    plan.add(VerticalPresetShaper.defaultFeatures);
    plan.setFeatureOverrides(userFeatures);
  }
}

export class PresetShapers {
  static horizontal = new HorizontalPresetShaper();
  static vertical = new VerticalPresetShaper();
}
