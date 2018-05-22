import { WildernessInterface, WildSeedInterface } from './interfaces/wilderness-interface';
import { Golem } from './golem';

export class Wilderness implements WildernessInterface<Golem> {

  constructor(
    public chanceToGetNothing: number,
    public damagePerSec: number,
    public golems: Golem[],
    public maxGolemGroups: number,
    public name: string,
    public unlocked: boolean,
    public wildSeeds: WildSeedInterface[]
  ) {

  }
}
