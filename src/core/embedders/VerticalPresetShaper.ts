import { DefaultShaper, type ShapingPlan } from '@denkiyagi/fontkit';
import { HorizontalPresetShaper } from './HorizontalPresetShaper';

export class VerticalPresetShaper extends DefaultShaper {
  static defaultFeatures = HorizontalPresetShaper.defaultFeatures.concat([
    'vert',
  ]);

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
