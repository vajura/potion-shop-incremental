import { BaseClass } from './base';
import { PotInterface } from './interfaces/pot-interface';
import { Seed } from './seed';
import { baseInterfaceCopy } from './interfaces/base-interface';
import { WildernessInterface } from './interfaces/wilderness-interface';

export class Pot extends BaseClass<PotInterface> implements PotInterface<Seed> {

  public freePots: number;
  public plantedSeeds: Seed[];
  public name: string;
  public tier: number;
  public amount: number;
  public color1: string;
  public color2: string;
  public unlocked: boolean;

  constructor(pot: PotInterface) {
    super(pot);
  }

  protected assignData(data: PotInterface) {
    baseInterfaceCopy(this, data);
    this.freePots = data.freePots;
    this.plantedSeeds = [];
  }

  public gameLoop(): void {

  }
}
