import { GolemInterface } from './golem-interface';
import { SeedIndex } from '../enums/seed-index-helper';
import { BaseInterface } from './base-interface';

export interface WildSeedInterface {
  seedIndex: SeedIndex;
  chanceToOccur: number; // is absolute number while in interface and gets transformed to 0-1 chance range when in class
}

export interface WildernessInterface<GolemModel = GolemInterface> extends BaseInterface {
  golems: GolemModel[];
  wildSeeds: WildSeedInterface[];
  maxGolemGroups: number;
  chanceToGetNothing: number;
  damagePerSec: number;
}
