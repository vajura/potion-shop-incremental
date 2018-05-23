import { BaseClass } from './base';
import { PlantInterface } from './interfaces/plant-interface';
import { SeedIndex } from './enums/seed-index-helper';
import { baseInterfaceCopy } from './interfaces/base-interface';

export class Plant extends BaseClass<PlantInterface> implements PlantInterface {

  public seedIndex: SeedIndex;
  public name: string;
  public tier: number;
  public amount: number;
  public color1: string;
  public color2: string;
  public unlocked: boolean;

  constructor(plant: PlantInterface) {
    super(plant);
  }

  protected assignData(data: PlantInterface) {
    baseInterfaceCopy(this, data);
    this.seedIndex = data.seedIndex;
  }

  public gameLoop(): void {

  }

  public addAmount(amount: number): void {
    this.amount += amount;
  }
}
