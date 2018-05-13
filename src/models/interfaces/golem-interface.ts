import { CommonInterface } from './common-var';

export interface GolemInterface extends CommonInterface {
  maxHp: number;
  currentHp: number;
  manaCost: number;
  goldCost: number;
}

export function golemDeepCopy(golem: GolemInterface): GolemInterface {
  const golemCopy: GolemInterface = {} as any;
  golemCopy.name = golem.name;
  golemCopy.tier = golem.tier;
  golemCopy.amount = 0;
  golemCopy.color1 = golem.color1;
  golemCopy.color2 = golem.color2;
  golemCopy.maxHp = golem.maxHp;
  golemCopy.currentHp = golem.currentHp;
  golemCopy.manaCost = golem.manaCost;
  golemCopy.goldCost = golem.goldCost;
  return golemCopy;
}
