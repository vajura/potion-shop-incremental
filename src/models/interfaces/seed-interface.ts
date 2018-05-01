import { CommonInterface } from './common-plant-var';

export interface SeedInterface extends CommonInterface {
  timeToGrow: number;
  plantName: string;
}
