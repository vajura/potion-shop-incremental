import { BaseInterface } from './base-interface';
import { PlantIndex } from '../enums/plant-index-helper';
import { SeedIndex } from '../enums/seed-index-helper';
import { Plant } from '../plant';
import { Seed } from '../seed';

export interface SupplierInterface extends BaseInterface {
  seedIndex: SeedIndex;
  plantIndex: PlantIndex;
  seedSeller?: Seller<Seed>;
  plantSeller?: Seller<Plant>;
  goldCost: number;
}

export interface Seller<T> {
  reference: T;
  sellChance: number;
  amount: number;
}
