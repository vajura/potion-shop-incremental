import { PotInterface } from './interfaces/pot-interface';
import { PlantInterface } from './interfaces/plant-interface';
import { SeedInterface } from './interfaces/seed-interface';
import { plantGenerator, potGenerator, seedGenerator } from '../assets/game-elements-collection';
import {ChangeDetectorRef} from '@angular/core';

export class Game {

  public static potCollection: PotInterface[];
  public static plantCollection: PlantInterface[];
  public static seedCollection: SeedInterface[];

  // Banked stuff
  public pots: PotInterface[] = [];
  public potsI: any[] = [];
  public plants: PlantInterface[] = [];
  public plantsI: any[] = [];
  public seeds: SeedInterface[] = [];
  public seedsI: any[] = [];

  constructor(private cdr: ChangeDetectorRef) {
    Game.potCollection = potGenerator();
    Game.plantCollection = plantGenerator();
    Game.seedCollection = seedGenerator();
    for (let a = 0; a < Game.potCollection.length; a++) {
      this.potsI[Game.potCollection[a].name] = a;
    }
    for (let a = 0; a < Game.plantCollection.length; a++) {
      this.plantsI[Game.plantCollection[a].name] = a;
    }
    for (let a = 0; a < Game.seedCollection.length; a++) {
      this.seedsI[Game.seedCollection[a].name] = a;
    }
    this.pots.push(Game.potCollection[0]);
    setTimeout(this.gameLoop, 1000);
  }

  gameLoop() {
    for (let a = 0; a < this.pots.length; a++) {
      for (let b = 0; b < this.pots[a].plantedSeeds.length; b++) {
        const seed = this.pots[a].plantedSeeds[b];
        if (seed) {
          seed.timeToGrow--;
          if (seed.timeToGrow <= 0) {
            this.getPlant(seed.plantName).amount += seed.amount;
            const bankedSeed = this.getSeed(seed.name);
            if (bankedSeed.amount < seed.amount) {
              seed.amount = bankedSeed.amount;
            }
            bankedSeed.amount -= seed.amount;
            seed.timeToGrow = Game.seedCollection[this.seedsI[seed.name]].timeToGrow;
            if (seed.amount === 0) {
              this.pots[a].plantedSeeds.splice(b, 1);
            }
          }
        }
      }
    }
    this.cdr.markForCheck();
    setTimeout(this.gameLoop, 1000);
  }

  getSeed(name: string): SeedInterface {
    return this.seeds[this.seedsI[name]];
  }
  getPlant(name: string): PlantInterface {
    return this.plants[this.plantsI[name]];
  }
  getPot(name: string): PotInterface {
    return this.pots[this.potsI[name]];
  }
}
