import { BaseClass } from './base';
import { PlantInterface } from './interfaces/plant-interface';
import { SeedIndex } from './enums/seed-index-helper';
import { baseInterfaceCopy } from './interfaces/base-interface';
import { GolemInterface } from './interfaces/golem-interface';
import { Game } from './game';

export class Plant extends BaseClass<PlantInterface> implements PlantInterface {

  public reference: PlantInterface;
  public seedIndex: SeedIndex;
  public name: string;
  public tier: number;
  public amount: number;
  public color1: string;
  public color2: string;
  public unlocked: boolean;

  constructor(plant: PlantInterface, referenceIndex?: number) {
    super(plant, referenceIndex);
  }

  protected assignData(data: PlantInterface, referenceIndex?: number) {
    baseInterfaceCopy(this, data);
    this.reference = Game.plantCollection[referenceIndex];
    this.seedIndex = data.seedIndex;
  }

  public gameLoop(): void {

  }

  public addAmount(amount: number): void {
    this.amount += amount;
  }
}
