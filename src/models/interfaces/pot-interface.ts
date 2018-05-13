import { CommonInterface } from './common-var';
import { SeedInterface } from './seed-interface';

export interface PotInterface extends CommonInterface {
  freePots: number;
  plantedSeeds: SeedInterface[];
}

export function potDeepCopy(pot: PotInterface): PotInterface {
  const potCopy: PotInterface = {} as any;
  potCopy.name = pot.name;
  potCopy.freePots = pot.freePots;
  potCopy.color1 = pot.color1;
  potCopy.color2 = pot.color2;
  potCopy.tier = pot.tier;
  potCopy.plantedSeeds = [];
  potCopy.amount = 0;
  return potCopy;
}
