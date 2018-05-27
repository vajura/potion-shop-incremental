import { SeedInterface } from './interfaces/seed-interface';
import { BaseClass } from './base';
import { PlantIndex } from './enums/plant-index-helper';
import { baseInterfaceCopy } from './interfaces/base-interface';
import { game, Game } from './game';
import { LinkedList } from './linked-list';
import { avgCalcHelper } from '../helpers/avg-calc-helper';

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
  // avg calculation
  public avgNumbers: LinkedList;
  public oneMinAvg: number;
  public runningAvg = 0;
  public sellingPrice;

  constructor(seed: SeedInterface, referenceIndex?: number) {
    super(seed, referenceIndex);
  }

  protected assignData(data: SeedInterface, referenceIndex?: number) {
    baseInterfaceCopy(this, data);
    this.reference = Game.seedCollection[referenceIndex];
    this.timeToGrow = data.timeToGrow;
    this.plantIndex = data.plantIndex;
    this.avgNumbers = new LinkedList();
    this.sellingPrice = data.sellingPrice;
    for (let a = 0; a < 60; a++) { this.avgNumbers.push(0); }
    this.oneMinAvg = 0;
  }

  public gameLoop(): void {
    avgCalcHelper(this);
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

