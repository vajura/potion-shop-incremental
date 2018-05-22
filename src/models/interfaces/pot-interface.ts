import { BaseInterface } from './base-interface';
import { SeedInterface } from './seed-interface';

export interface PotInterface<SeedModel = SeedInterface> extends BaseInterface {
  freePots: number;
  plantedSeeds: SeedModel[];
}
