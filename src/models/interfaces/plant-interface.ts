import { BaseInterface } from './base-interface';
import { SeedIndex } from '../enums/seed-index-helper';
import { LinkedList } from '../linked-list';

export interface PlantInterface extends BaseInterface {
  seedIndex: SeedIndex;
  // avg calc
  avgNumbers: LinkedList;
  oneMinAvg: number;
  runningAvg: number;
}
