import { CommonInterface } from './common-var';
import { SeedIndex } from '../enums/seed-index-helper';

export interface PlantInterface extends CommonInterface {
  seedIndex: SeedIndex;
}

export function plantDeepCopy(plant: PlantInterface): PlantInterface {
  const plantCopy: PlantInterface = {} as any;
  plantCopy.name = plant.name;
  plantCopy.seedIndex = plant.seedIndex;
  plantCopy.color1 = plant.color1;
  plantCopy.color2 = plant.color2;
  plantCopy.tier = plant.tier;
  plantCopy.amount = 0;
  return plantCopy;
}
