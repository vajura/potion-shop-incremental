import { BaseClass } from './base';
import { PlantInterface } from './interfaces/plant-interface';
import { SeedIndex } from './enums/seed-index-helper';
import { baseInterfaceCopy } from './interfaces/base-interface';
import { Game } from './game';
import { LinkedList } from './linked-list';
import { avgCalcHelper } from '../helpers/avg-calc-helper';

export class Plant extends BaseClass<PlantInterface> implements PlantInterface {

  public reference: PlantInterface;
  public seedIndex: SeedIndex;
  public name: string;
  public tier: number;
  public amount: number;
  public color1: string;
  public color2: string;
  public unlocked: boolean;
  public avgNumbers: LinkedList;
  public oneMinAvg: number;
  public runningAvg = 0;
  public sellingPrice;

  constructor(plant: PlantInterface, referenceIndex?: number) {
    super(plant, referenceIndex);
  }

  protected assignData(data: PlantInterface, referenceIndex?: number) {
    baseInterfaceCopy(this, data);
    this.reference = Game.plantCollection[referenceIndex];
    this.seedIndex = data.seedIndex;
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
}
