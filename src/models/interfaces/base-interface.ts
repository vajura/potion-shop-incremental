export interface BaseInterface {
  name: string;
  tier: number;
  amount: number;
  color1: string;
  color2: string;
  unlocked: boolean;
}

export function baseInterfaceCopy(classObj: any, interfaceObj: any) {
  classObj.name = interfaceObj.name;
  classObj.tier = interfaceObj.tier;
  classObj.amount = interfaceObj.amount;
  classObj.color1 = interfaceObj.color1;
  classObj.color2 = interfaceObj.color2;
  classObj.unlocked = interfaceObj.unlocked;
}
