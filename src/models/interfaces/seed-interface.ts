import { BaseInterface } from './base-interface';
import { PlantIndex } from '../enums/plant-index-helper';
import { LinkedList } from '../linked-list';

export interface SeedInterface extends BaseInterface {
  timeToGrow: number;
  plantIndex: PlantIndex;
  // avg calc
  avgNumbers: LinkedList;
  oneMinAvg: number;
  runningAvg: number;
}
