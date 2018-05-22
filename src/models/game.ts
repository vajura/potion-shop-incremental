import { PotInterface } from './interfaces/pot-interface';
import { PlantInterface } from './interfaces/plant-interface';
import { SeedInterface } from './interfaces/seed-interface';
import { golemGenerator, plantGenerator, potGenerator, seedGenerator, wildernessGenerator } from '../helpers/game-elements-collection';
import {ChangeDetectorRef} from '@angular/core';
import { WildernessInterface } from './interfaces/wilderness-interface';
import { SeedIndex } from './enums/seed-index-helper';
import { PlantIndex } from './enums/plant-index-helper';
import { GolemInterface } from './interfaces/golem-interface';
import { NotificationService } from '../services/notification-service';
import { Plant } from './plant';
import { Pot } from './pot';
import { Wilderness } from './wilderness';
import { Seed } from './seed';

export class Game {

  public static game: Game;
  public static potCollection: PotInterface[];
  public static plantCollection: PlantInterface[];
  public static seedCollection: SeedInterface[];
  public static wildernessCollection: WildernessInterface[];
  public static golemCollection: GolemInterface[];

  // mana
  public maxMana = 100;
  public currentMana = 100;
  public manaRegen = 1;
  // gold
  public gold = 0;
  // wilderness
  public wilderness: Wilderness[] = [];
  public selectedWildernessIndex = 0;
  // golems
  public selectedGolem = 0;
  public golemsI: any[] = [];
  // pots
  public pots: Pot[] = [];
  public potsI: any[] = [];
  // plants
  public plants: Plant[] = [];
  public plantsI: any[] = [];
  // seeds
  public seeds: Seed[] = [];
  public seedsI: any[] = [];

  constructor(
    public cdr: ChangeDetectorRef,
    public notificationService: NotificationService
  ) {
    this.generateCollections();
    this.generateObjects();

    setTimeout(async () => {
      await this.gameLoop();
    }, 1000);
  }

  async gameLoop() {
    await this.gameLoopForPots();
    await this.gameLoopForMana();
    await this.gameLoopForWilderness();

    await this.cdr.markForCheck();
    setTimeout(async () => {
      await this.gameLoop();
    }, 1000);
  }

  async gameLoopForWilderness() {
    for (let a = 0; a < this.wilderness.length; a++) {
      for (let b = 0; b < this.wilderness[a].golems.length; b++) {
        const golem = this.wilderness[a].golems[b];
        if (golem) {
          golem.currentHp -= this.wilderness[a].damagePerSec;
          const rand = Math.random();
          if (rand > this.wilderness[a].chanceToGetNothing) {
            for (let c = 0; c < this.wilderness[a].wildSeeds.length; c++) {
              if (rand < this.wilderness[a].wildSeeds[c].chanceToOccur) {
                this.addSeedToBank(this.wilderness[a].wildSeeds[c].seedIndex, golem.amount);
                break;
              }
            }
          }
          if (golem.currentHp <= 0) {
            this.removeGolemFromWilderness(this.wilderness[a], b);
            const newGolem = golemDeepCopy(Game.golemCollection[this.golemsI[golem.name]]);
            newGolem.amount = golem.amount;
            if (!this.addGolemToWilderness(this.wilderness[a], newGolem, b)) {
              this.notificationService.info('', 'Golem group ' + (b + 1) + ' was not renewed.');
            }
          }
        }
      }
    }
  }

  async gameLoopForPots() {
    for (let a = 0; a < this.pots.length; a++) {
      for (let b = 0; b < this.pots[a].plantedSeeds.length; b++) {
        const seed = this.pots[a].plantedSeeds[b];
        if (seed) {
          seed.timeToGrow--;
          if (seed.timeToGrow <= 0) {
            this.addPlantToBank(seed.plantIndex, seed.amount);
            this.removeSeedFromPot(this.pots[a], b);
            const newSeed = seedDeepCopy(Game.seedCollection[this.seedsI[seed.name]]);
            newSeed.amount = seed.amount;
            this.addSeedToPot(this.pots[a], newSeed, b);
          }
        }
      }
    }
  }

  async gameLoopForMana() {
    this.currentMana += this.manaRegen;
    if (this.currentMana > this.maxMana) {
      this.currentMana = this.maxMana;
    }
  }

  removeGolemFromWilderness(wilderness: WildernessInterface, golemIndex: number) {
    wilderness.golems.splice(golemIndex, 1);
  }

  addGolemToWilderness(wilderness: WildernessInterface, golem: GolemInterface, index?: number): GolemInterface {
    if (this.currentMana >= golem.manaCost * golem.amount &&
        this.gold >= golem.goldCost * golem.amount &&
        wilderness.golems.length < wilderness.maxGolemGroups
    ) {
      this.checkAndRemoveMana(golem.manaCost * golem.amount);
      this.checkAndRemoveGold(golem.goldCost * golem.amount);
      if (index !== undefined) {
        wilderness.golems.splice(index, 0, golem);
      } else {
        wilderness.golems.push(golem);
      }
      return golem;
    } else {
      return undefined;
    }
  }

  checkAndRemoveGold(amount: number, remove = true): boolean {
    if (this.gold >= amount) {
      if (remove) {
        this.gold -= amount;
      }
      return true;
    }
    return false;
  }

  checkAndRemoveMana(amount: number, remove = true): boolean {
    if (this.currentMana >= amount) {
      if (remove) {
        this.currentMana -= amount;
      }
      return true;
    }
    return false;
  }

  addPlantToBank(plantIndex: PlantIndex, amount: number) {
    if (this.plants[plantIndex]) {
      this.plants[plantIndex].amount += amount;
    } else {
      this.plants[plantIndex] = plantDeepCopy(Game.plantCollection[plantIndex]);
      this.plants[plantIndex].amount = amount;
    }
  }

  removeSeedFromPot(pot: PotInterface, seedIndex: number) {
    pot.plantedSeeds.splice(seedIndex, 1);
  }

  addSeedToPot(pot: PotInterface, seed: SeedInterface, index?: number): SeedInterface {
    seed.amount = this.removeSeedFromBank(this.seedsI[seed.name], seed.amount);
    if (seed.amount > 0) {
      if (index !== undefined) {
        pot.plantedSeeds.splice(index, 0, seed);
      } else {
        pot.plantedSeeds.push(seed);
      }
      return seed;
    } else {
      return undefined;
    }
  }

  addSeedToBank(seedIndex: SeedIndex, amount: number) {
    if (this.seeds[seedIndex]) {
      this.seeds[seedIndex].amount += amount;
    } else {
      this.seeds[seedIndex] = seedDeepCopy(Game.seedCollection[seedIndex]);
      this.seeds[seedIndex].amount = amount;
    }
  }

  removeSeedFromBank(seedIndex: SeedIndex, amount: number): number {
    if (this.seeds[seedIndex]) {
      if (this.seeds[seedIndex].amount < amount) {
        amount = this.seeds[seedIndex].amount;
      }
      this.seeds[seedIndex].amount -= amount;
      return amount;
    } else {
      console.error('Removal from seed that doesnt exists ', seedIndex);
      return 0;
    }
  }

  generateCollections() {
    Game.potCollection = potGenerator();
    Game.plantCollection = plantGenerator();
    Game.seedCollection = seedGenerator();
    Game.wildernessCollection = wildernessGenerator();
    Game.golemCollection = golemGenerator();

    for (let a = 0; a < Game.potCollection.length; a++) {
      this.potsI[Game.potCollection[a].name] = a;
    }
    for (let a = 0; a < Game.plantCollection.length; a++) {
      this.plantsI[Game.plantCollection[a].name] = a;
    }
    for (let a = 0; a < Game.seedCollection.length; a++) {
      this.seedsI[Game.seedCollection[a].name] = a;
    }
    for (let a = 0; a < Game.golemCollection.length; a++) {
      this.golemsI[Game.golemCollection[a].name] = a;
    }
  }

  generateObjects() {
    for (let a = 0; a < Game.potCollection.length; a++) {
      this.pots.push(potDeepCopy(Game.potCollection[a]));
    }
    for (let a = 0; a < Game.plantCollection.length; a++) {
      this.plants.push(plantDeepCopy(Game.plantCollection[a]));
    }
    for (let a = 0; a < Game.seedCollection.length; a++) {
      this.seeds.push(seedDeepCopy(Game.seedCollection[a]));
    }
    for (let a = 0; a < Game.wildernessCollection.length; a++) {
      this.wilderness.push(wildernessDeepCopy(Game.wildernessCollection[a]));
    }
  }

  getSeedFromName(name: string): SeedInterface {
    return this.seeds[this.seedsI[name]];
  }
  getPlantFromName(name: string): PlantInterface {
    return this.plants[this.plantsI[name]];
  }
  getPotFromName(name: string): PotInterface {
    return this.pots[this.potsI[name]];
  }
}
