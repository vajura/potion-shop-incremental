import { WildernessInterface, WildSeedInterface } from './interfaces/wilderness-interface';
import { Golem } from './golem';
import {BaseClass} from './base';
import { baseInterfaceCopy } from './interfaces/base-interface';
import { game, Game } from './game';
import { GolemInterface } from './interfaces/golem-interface';
import { getComponentDecorator } from 'codelyzer/util/utils';
import { getCollection } from '@angular/cli/utilities/schematics';

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
    for (let b = 0; b < this.golems.length; b++) {
      const golem = this.golems[b];
      if (golem) {
        golem.currentHp -= this.damagePerSec;
        const rand = Math.random();
        if (rand > this.chanceToGetNothing) {
          for (let c = 0; c < this.wildSeeds.length; c++) {
            if (rand < this.wildSeeds[c].chanceToOccur) {
              const seedAmount = Math.floor(Math.random() * golem.amount * 2) + 1;
              game.seeds[this.wildSeeds[c].seedIndex].addAmount(seedAmount);
              break;
            }
          }
        }
        if (golem.currentHp <= 0) {
          this.removeGolem(b);
          const newGolem: Golem = new Golem(Game.golemCollection[Game.golemsI[golem.name]]);
          newGolem.amount = golem.amount;
          if (!this.addGolem(newGolem, b)) {
            game.notificationService.info('', 'Golem group ' + (b + 1) + ' was not renewed.');
          }
        }
      }
    }
  }

  removeGolem(index: number) {
    this.golems.splice(index, 1);
  }

  addGolem(golem: Golem, index?: number): GolemInterface {
    if (game.checkAndRemoveMana(golem.manaCost * golem.amount, false) &&
      game.checkAndRemoveGold(golem.goldCost * golem.amount, false) &&
      this.golems.length < this.maxGolemGroups
    ) {
      game.checkAndRemoveMana(golem.manaCost * golem.amount);
      game.checkAndRemoveGold(golem.goldCost * golem.amount);
      if (index !== undefined) {
        this.golems.splice(index, 0, golem);
      } else {
        this.golems.push(golem);
      }
      return golem;
    } else {
      return undefined;
    }
  }
}
