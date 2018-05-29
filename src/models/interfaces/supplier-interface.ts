import { BaseInterface } from './base-interface';
import { PlantIndex } from '../enums/plant-index-helper';
import { SeedIndex } from '../enums/seed-index-helper';

export interface SupplierInterface extends BaseInterface {
  referenceIndex: PlantIndex | SeedIndex;
  itemType: string;
  sellItem?: any;
  sellChance: number;
  activeAmount: number;
  amount: number;
  goldCost: number;
}
