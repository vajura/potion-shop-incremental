import { CommonInterface } from './common-plant-var';
import { SeedInterface } from './seed-interface';

export interface PotInterface extends CommonInterface {
  color: string;
  freePots: number;
  plantedSeeds: SeedInterface[];
}
