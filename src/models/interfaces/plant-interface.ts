import { CommonPlantVarInterface } from './common-plant-var';
import { SeedInterface } from './seed-interface';

export interface PlantInterface extends  CommonPlantVarInterface {
  seed: SeedInterface;
}
