import { BaseInterface } from './base-interface';
import { PlantIndex } from '../enums/plant-index-helper';

export interface SeedInterface extends BaseInterface {
  timeToGrow: number;
  plantIndex: PlantIndex;
}
