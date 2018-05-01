import { PotInterface } from '../models/interfaces/pot-interface';
import { PlantInterface } from '../models/interfaces/plant-interface';
import { SeedInterface } from '../models/interfaces/seed-interface';

export function potGenerator(): PotInterface[] {
  return [
    {
      name: 'Clay pot',
      tier: 1,
      color: 'grey',
      amount: 0,
      freePots: 0,
      plantedSeeds: []
    }
  ];
}

export function plantGenerator(): PlantInterface[] {
  return [
    {
      name: 'Red rose',
      tier: 1,
      seedName: 'Red rose seed',
      amount: 0
    }
  ];
}

export function seedGenerator(): SeedInterface[] {
  return [
    {
      name: 'Red rose seed',
      tier: 1,
      plantName: 'Red rose',
      timeToGrow: 10,
      amount: 0
    }
  ];
}
