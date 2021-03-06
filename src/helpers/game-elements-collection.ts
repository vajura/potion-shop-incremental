import { PotInterface } from '../models/interfaces/pot-interface';
import { PlantInterface } from '../models/interfaces/plant-interface';
import { SeedInterface } from '../models/interfaces/seed-interface';
import { WildernessInterface } from '../models/interfaces/wilderness-interface';
import { SeedIndex } from '../models/enums/seed-index-helper';
import { PlantIndex } from '../models/enums/plant-index-helper';
import { GolemInterface } from '../models/interfaces/golem-interface';
import { SupplierInterface } from '../models/interfaces/supplier-interface';
import { Seed } from '../models/seed';
import { Plant } from '../models/plant';

export function supplierGenerator(): SupplierInterface[] {
  return [
    {
      name: 'Red Rose seed supplier',
      tier: 1,
      amount: 0,
      color1: '#CC4444',
      color2: 'black',
      unlocked: true,
      itemType: 'seed',
      referenceIndex: SeedIndex.RedRoseSeed,
      sellChance: 0.2,
      activeAmount: 0,
      goldCost: 5
    },
    {
      name: 'Red Rose supplier',
      tier: 1,
      amount: 0,
      color1: '#CC4444',
      color2: 'black',
      unlocked: true,
      itemType: 'plant',
      referenceIndex: PlantIndex.RedRose,
      sellChance: 0.1,
      activeAmount: 0,
      goldCost: 12
    },
    {
      name: 'Viola supplier',
      tier: 1,
      amount: 0,
      color1: '#4444CC',
      color2: 'white',
      unlocked: true,
      itemType: 'plant',
      referenceIndex: PlantIndex.Viola,
      sellChance: 0.2,
      activeAmount: 0,
      goldCost: 55
    }
  ];
}

export function golemGenerator(): GolemInterface[] {
  return [
    {
      name: 'Clay Golem',
      tier: 1,
      amount: 0,
      maxHp: 20,
      color1: 'gray',
      color2: 'black',
      currentHp: 20,
      manaCost: 5,
      goldCost: 0,
      unlocked: true
    }
  ];
}

export function wildernessGenerator(): WildernessInterface[] {
  return [
    {
      name: 'The Dark Forest',
      tier: 1,
      color1: 'green',
      color2: 'brown',
      amount: 0,
      golems: [],
      maxGolemGroups: 5,
      wildSeeds: [
        {
          seedIndex: SeedIndex.RedRoseSeed,
          chanceToOccur: 30
        },
        {
          seedIndex: SeedIndex.ViolaSeed,
          chanceToOccur: 5
        }
      ],
      chanceToGetNothing: 100,
      damagePerSec: 1,
      unlocked: true
    }
  ];
}

export function potGenerator(): PotInterface[] {
  return [
    {
      name: 'Clay pot',
      tier: 1,
      color1: 'gray',
      color2: 'black',
      amount: 0,
      freePots: 0,
      goldCost: 40,
      manaCost: 90,
      plantedSeeds: [],
      unlocked: true
    },
    {
      name: 'Chared pot',
      tier: 2,
      color1: 'red',
      color2: 'black',
      amount: 0,
      freePots: 0,
      goldCost: 450,
      manaCost: 220,
      plantedSeeds: [],
      unlocked: true
    }
  ];
}

export function plantGenerator(): PlantInterface[] {
  return [
    {
      name: 'Red rose',
      tier: 1,
      color1: '#CC4444',
      color2: 'black',
      seedIndex: SeedIndex.RedRoseSeed,
      amount: 0,
      unlocked: true,
      avgNumbers: undefined,
      oneMinAvg: 0,
      runningAvg: 0,
      sellingPrice: 5,
    },
    {
      name: 'Viola',
      tier: 1,
      color1: '#4444CC',
      color2: 'white',
      seedIndex: SeedIndex.ViolaSeed,
      amount: 0,
      unlocked: true,
      avgNumbers: undefined,
      oneMinAvg: 0,
      runningAvg: 0,
      sellingPrice: 25,
    }
  ];
}

export function seedGenerator(): SeedInterface[] {
  return [
    {
      name: 'Red rose seed',
      tier: 1,
      color1: '#CC4444',
      color2: 'black',
      plantIndex: PlantIndex.RedRose,
      timeToGrow: 10,
      amount: 0,
      unlocked: true,
      avgNumbers: undefined,
      oneMinAvg: 0,
      runningAvg: 0,
      sellingPrice: 1,
    },
    {
      name: 'Viola seed',
      tier: 2,
      color1: '#4444CC',
      color2: 'white',
      plantIndex: PlantIndex.Viola,
      timeToGrow: 42,
      amount: 0,
      unlocked: true,
      avgNumbers: undefined,
      oneMinAvg: 0,
      runningAvg: 0,
      sellingPrice: 5,
    }
  ];
}
