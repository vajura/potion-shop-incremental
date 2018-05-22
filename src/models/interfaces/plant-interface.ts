import { BaseInterface } from './base-interface';
import { SeedIndex } from '../enums/seed-index-helper';

export interface PlantInterface extends BaseInterface {
  seedIndex: SeedIndex;
}
