import { GolemInterface } from './golem-interface';
import { SeedIndex } from '../enums/seed-index-helper';

export interface WildSeed {
  seedIndex: SeedIndex;
  chanceToOccur: number;
}

export interface WildernessInterface {
  name: string;
  golems: GolemInterface[];
  wildSeeds: WildSeed[];
  maxGolemGroups: number;
  chanceToGetNothing: number;
  damagePerSec: number;
  unlocked: boolean;
}

export function deepCopyWilderness(wilderness: WildernessInterface): WildernessInterface {
  const wildernessCopy: WildernessInterface = {} as any;
  wildernessCopy.name = wilderness.name;
  wildernessCopy.golems = [];
  wildernessCopy.unlocked = wilderness.unlocked;
  wildernessCopy.damagePerSec = wilderness.damagePerSec;
  wildernessCopy.maxGolemGroups = wilderness.maxGolemGroups;
  wildernessCopy.wildSeeds = [];
  wildernessCopy.chanceToGetNothing = 0; // set later

  let totalSeedChance = wilderness.chanceToGetNothing;
  let accumSeedChance = 0;
  for (let a = 0; a < wilderness.wildSeeds.length; a++) {
    totalSeedChance += wilderness.wildSeeds[a].chanceToOccur;
  }
  wildernessCopy.chanceToGetNothing = wilderness.chanceToGetNothing / totalSeedChance;
  accumSeedChance += wildernessCopy.chanceToGetNothing;
  for (let a = 0; a < wilderness.wildSeeds.length; a++) {
    wildernessCopy.wildSeeds[a] = {} as any;
    wildernessCopy.wildSeeds[a].seedIndex = wilderness.wildSeeds[a].seedIndex;
    wildernessCopy.wildSeeds[a].chanceToOccur = accumSeedChance + wilderness.wildSeeds[a].chanceToOccur / totalSeedChance;
    accumSeedChance += wildernessCopy.wildSeeds[a].chanceToOccur;
  }
  return wildernessCopy;
}
