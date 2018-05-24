import { GolemInterface } from './interfaces/golem-interface';
import { BaseClass } from './base';
import { baseInterfaceCopy } from './interfaces/base-interface';
import { Game } from './game';

export class Golem extends BaseClass<GolemInterface> implements GolemInterface {

  public reference: GolemInterface;
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

  constructor(golem: GolemInterface, referenceIndex?: number) {
    super(golem, referenceIndex);
  }

  protected assignData(data: GolemInterface, referenceIndex?: number) {
    baseInterfaceCopy(this, data);
    this.reference = Game.golemCollection[referenceIndex];
    this.currentHp = data.currentHp;
    this.goldCost = data.goldCost;
    this.manaCost = data.manaCost;
    this.maxHp = data.maxHp;
  }

  public gameLoop(): void {

  }
}
