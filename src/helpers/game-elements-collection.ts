import { PotInterface } from '../models/interfaces/pot-interface';
import { PlantInterface } from '../models/interfaces/plant-interface';
import { SeedInterface } from '../models/interfaces/seed-interface';
import { WildernessInterface } from '../models/interfaces/wilderness-interface';
import { SeedIndex } from '../models/enums/seed-index-helper';
import { PlantIndex } from '../models/enums/plant-index-helper';
import { GolemInterface } from '../models/interfaces/golem-interface';


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
      color2: 'white',
      amount: 0,
      freePots: 0,
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
      unlocked: true
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
      unlocked: true
    }
  ];
}
