import { DefaultShaper, type ShapingPlan } from '@denkiyagi/fontkit';

/**
 * `Shaper` with minimum [GSUB](https://learn.microsoft.com/en-us/typography/opentype/spec/gsub) features:
 * `ccmp`, `locl`, `rclt`, `rlig`.
 */
export class BasicPresetShaper extends DefaultShaper {
  /**
   * Commonly used [OpenType Features](https://learn.microsoft.com/en-us/typography/opentype/spec/featurelist)
   * related to glyph substitution,
   * excluding non-required ligatures and contextual alternates (liga, clig, calt).
   */
  static basicFeatures = [
    'ccmp',
    'locl',
    'rclt',
    'rlig',
  ];

  override planPreprocessing(_: ShapingPlan): void {
    // Do nothing
  }

  override planPostprocessing(
    plan: ShapingPlan,
    userFeatures: string[] | Record<string, boolean>,
  ): void {
    this.addPresetFeatures(plan);
    plan.setFeatureOverrides(userFeatures);
  }

  protected addPresetFeatures(plan: ShapingPlan): void {
    plan.add(BasicPresetShaper.basicFeatures);
  }
}
