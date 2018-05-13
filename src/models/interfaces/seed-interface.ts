import { CommonInterface } from './common-var';
import { PlantIndex } from '../enums/plant-index-helper';

export interface SeedInterface extends CommonInterface {
  timeToGrow: number;
  plantIndex: PlantIndex;
}

export function seedDeepCopy(seed: SeedInterface): SeedInterface {
  const seedCopy: SeedInterface = {} as any;
  seedCopy.name = seed.name;
  seedCopy.tier = seed.tier;
  seedCopy.amount = 0;
  seedCopy.color1 = seed.color1;
  seedCopy.color2 = seed.color1;
  seedCopy.timeToGrow = seed.timeToGrow;
  seedCopy.plantIndex = seed.plantIndex;
  return seedCopy;
}
