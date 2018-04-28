import { CommonPlantVarInterface } from './common-plant-var';
import { PlantInterface } from './plant-interface';

export interface SeedInterface extends  CommonPlantVarInterface {
  timeToGrow: number;
  plant: PlantInterface;
}
