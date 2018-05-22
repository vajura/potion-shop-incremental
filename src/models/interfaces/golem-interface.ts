import { BaseInterface } from './base-interface';

export interface GolemInterface extends BaseInterface {
  maxHp: number;
  currentHp: number;
  manaCost: number;
  goldCost: number;
}
