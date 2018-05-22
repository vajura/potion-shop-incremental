import { WildernessInterface, WildSeedInterface } from './interfaces/wilderness-interface';
import { Golem } from './golem';
import {BaseClass} from './base';
import { baseInterfaceCopy } from './interfaces/base-interface';

export class Wilderness extends BaseClass<WildernessInterface> implements WildernessInterface<Golem> {

  public tier: number;
  public amount: number;
  public color1: string;
  public color2: string;
  public unlocked: boolean;
  public chanceToGetNothing: number;
  public damagePerSec: number;
  public golems: Golem[];
  public maxGolemGroups: number;
  public name: string;
  public wildSeeds: WildSeedInterface[];

  constructor(wilderness: WildernessInterface) {
    super(wilderness);
  }

  protected assignData(data: WildernessInterface) {
    baseInterfaceCopy(this, data);
    this.damagePerSec = data.damagePerSec;
    this.maxGolemGroups = data.maxGolemGroups;
    this.unlocked = data.unlocked;
    this.golems = [];

    let totalSeedChance = data.chanceToGetNothing;
    let accumSeedChance = 0;
    for (let a = 0; a < data.wildSeeds.length; a++) {
      totalSeedChance += data.wildSeeds[a].chanceToOccur;
    }
    this.wildSeeds = [];
    this.chanceToGetNothing = data.chanceToGetNothing / totalSeedChance;
    accumSeedChance += this.chanceToGetNothing;
    for (let a = 0; a < data.wildSeeds.length; a++) {
      this.wildSeeds[a] = {} as any;
      this.wildSeeds[a].seedIndex = data.wildSeeds[a].seedIndex;
      this.wildSeeds[a].chanceToOccur = accumSeedChance + data.wildSeeds[a].chanceToOccur / totalSeedChance;
      accumSeedChance += this.wildSeeds[a].chanceToOccur;
    }
  }

  public gameLoop(): void {

  }

}
