import { DefaultShaper, type ShapingPlan } from '@denkiyagi/fontkit';

export class HorizontalPresetShaper extends DefaultShaper {
  /**
   * Commonly used [OpenType Features](https://learn.microsoft.com/en-us/typography/opentype/spec/featurelist)
   * related to [glyph substitution](https://learn.microsoft.com/en-us/typography/opentype/spec/gsub).
   */
  static defaultFeatures = [
    'ccmp',
    'locl',
    'calt',
    'clig',
    'rclt',
    'liga',
    'rlig',
  ];

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
