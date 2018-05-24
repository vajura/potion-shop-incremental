import { SeedInterface } from './interfaces/seed-interface';
import { BaseClass } from './base';
import { PlantIndex } from './enums/plant-index-helper';
import { baseInterfaceCopy } from './interfaces/base-interface';
import { PotInterface } from './interfaces/pot-interface';
import { Game } from './game';

export class Seed extends BaseClass<SeedInterface> implements SeedInterface {

  public reference: SeedInterface;
  public name: string;
  public tier: number;
  public amount: number;
  public color1: string;
  public color2: string;
  public unlocked: boolean;
  public timeToGrow: number;
  public plantIndex: PlantIndex;

  constructor(seed: SeedInterface, referenceIndex?: number) {
    super(seed, referenceIndex);
  }

  protected assignData(data: SeedInterface, referenceIndex?: number) {
    baseInterfaceCopy(this, data);
    this.reference = Game.seedCollection[referenceIndex];
    this.timeToGrow = data.timeToGrow;
    this.plantIndex = data.plantIndex;
  }

  public gameLoop(): void {

  }

  public addAmount(amount: number): void {
    this.amount += amount;
  }

  public removeAmount(amount: number): number {
    if (this.amount < amount) {
      amount = this.amount;
    }
    this.amount -= amount;
    return amount;
  }
}

