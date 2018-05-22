import { SeedInterface } from './interfaces/seed-interface';
import { BaseClass } from './base';
import { PlantIndex } from './enums/plant-index-helper';
import { baseInterfaceCopy } from './interfaces/base-interface';

export class Seed extends BaseClass<SeedInterface> implements SeedInterface {

  public name: string;
  public tier: number;
  public amount: number;
  public color1: string;
  public color2: string;
  public unlocked: boolean;
  public timeToGrow: number;
  public plantIndex: PlantIndex;

  constructor(seed: SeedInterface) {
    super(seed);
  }

  protected assignData(data: SeedInterface) {
    baseInterfaceCopy(this, data);
    this.timeToGrow = data.timeToGrow;
    this.plantIndex = data.plantIndex;
  }

  public gameLoop(): void {

  }
}

