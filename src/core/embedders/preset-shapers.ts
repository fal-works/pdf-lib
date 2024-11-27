import { DefaultShaper, type ShapingPlan } from '@denkiyagi/fontkit';

const HORIZONTAL_FEATURES = [
  'ccmp',
  'locl',
  'calt',
  'clig',
  'rclt',
  'liga',
  'rlig',
];
const VERTICAL_FEATURES = HORIZONTAL_FEATURES.concat(['vert']);

export class HorizontalPresetShaper extends DefaultShaper {
  override planPreprocessing(_: ShapingPlan): void {
    // Do nothing
  }

  override planPostprocessing(
    plan: ShapingPlan,
    userFeatures: string[] | Record<string, boolean>,
  ): void {
    plan.add(HORIZONTAL_FEATURES);
    plan.setFeatureOverrides(userFeatures);
  }
}

export class VerticalPresetShaper extends DefaultShaper {
  override planPreprocessing(_: ShapingPlan): void {
    // Do nothing
  }

  override planPostprocessing(
    plan: ShapingPlan,
    userFeatures: string[] | Record<string, boolean>,
  ): void {
    plan.add(VERTICAL_FEATURES);
    plan.setFeatureOverrides(userFeatures);
  }
}
