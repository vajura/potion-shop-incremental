import { BaseClass } from './base';
import { PotInterface } from './interfaces/pot-interface';
import { Seed } from './seed';
import { baseInterfaceCopy } from './interfaces/base-interface';
import { game, Game } from './game';
import { SeedInterface } from './interfaces/seed-interface';
import { PlantInterface } from './interfaces/plant-interface';

export class Pot extends BaseClass<PotInterface> implements PotInterface<Seed> {

  public reference: PotInterface;
  public freePots: number;
  public plantedSeeds: Seed[];
  public name: string;
  public tier: number;
  public amount: number;
  public color1: string;
  public color2: string;
  public unlocked: boolean;
  public goldCost: number;
  public manaCost: number;

  constructor(pot: PotInterface, referenceIndex?: number) {
    super(pot, referenceIndex);
  }

  protected assignData(data: PotInterface, referenceIndex?: number) {
    baseInterfaceCopy(this, data);
    this.reference = Game.potCollection[referenceIndex];
    this.freePots = data.freePots;
    this.goldCost = data.goldCost;
    this.manaCost = data.manaCost;
    this.plantedSeeds = [];
  }

  public gameLoop(): void {
    for (let b = 0; b < this.plantedSeeds.length; b++) {
      const seed = this.plantedSeeds[b];
      if (seed) {
        seed.timeToGrow--;
        if (seed.timeToGrow <= 0) {
          game.plants[seed.plantIndex].addAmount(seed.amount);
          this.removeSeedFromPot(b);
          const newSeed = new Seed(Game.seedCollection[Game.seedsI[seed.name]]);
          newSeed.amount = seed.amount;
          this.addSeedToPot(newSeed, b);
        }
      }
    }
  }

  removeSeedFromPot(index: number) {
    this.plantedSeeds.splice(index, 1);
  }

  addSeedToPot(seed: Seed, index?: number): SeedInterface {
    seed.amount = game.seeds[Game.seedsI[seed.name]].removeAmount(seed.amount);
    if (seed.amount > 0) {
      if (index !== undefined) {
        this.plantedSeeds.splice(index, 0, seed);
      } else {
        this.plantedSeeds.push(seed);
      }
      return seed;
    } else {
      return undefined;
    }
  }

  public addAmount(amount: number): number {
    if (game.checkAndRemoveManaAndGold(this.goldCost * amount, this.manaCost * amount) {
      this.amount += amount;
      return this.amount;
    } else {
      return undefined;
    }
  }

  public removeAmount(amount: number): number {
    if (this.amount < amount) {
      amount = this.amount;
    }
    this.amount -= amount;
    return amount;
  }
}
