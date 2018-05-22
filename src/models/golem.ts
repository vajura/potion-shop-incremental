import { GolemInterface } from './interfaces/golem-interface';
import { BaseClass } from './base';
import { baseInterfaceCopy } from './interfaces/base-interface';

export class Golem extends BaseClass<GolemInterface> implements GolemInterface {

  public amount: number;
  public color1: string;
  public color2: string;
  public currentHp: number;
  public goldCost: number;
  public manaCost: number;
  public maxHp: number;
  public name: string;
  public tier: number;
  public unlocked: boolean;

  constructor(golem: GolemInterface) {
    super(golem);
  }

  protected assignData(data: GolemInterface) {
    baseInterfaceCopy(this, data);
    this.currentHp = data.currentHp;
    this.goldCost = data.goldCost;
    this.manaCost = data.manaCost;
    this.maxHp = data.maxHp;
  }

  public gameLoop(): void {

  }
}
