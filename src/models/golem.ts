import { GolemInterface } from './interfaces/golem-interface';

export class Golem implements GolemInterface {

  constructor(
    public amount: number,
    public color1: string,
    public color2: string,
    public currentHp: number,
    public goldCost: number,
    public manaCost: number,
    public maxHp: number,
    public name: string,
    public tier: number,
    public unlocked: boolean
  ) {

  }
}
