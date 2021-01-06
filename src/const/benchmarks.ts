interface ISparky {
  [key: string]: {
    silver: number
    gold: number
    platinum: number
    diamond: number
    master: number
    grandmaster: number
    nova: number
    ascended: number
  }
}

export const SparkyBenchmarks: ISparky = {
  '1wall5targets_pasu reload': {
    silver: 80,
    gold: 90,
    platinum: 105,
    diamond: 120,
    master: 135,
    grandmaster: 145,
    nova: 170,
    ascended: 177,
  },
  'popcorn sparky': {
    silver: 70,
    gold: 100,
    platinum: 150,
    diamond: 200,
    master: 250,
    grandmaster: 300,
    nova: 370,
    ascended: 390,
  },
  'ww6t reload': {
    silver: 105,
    gold: 115,
    platinum: 125,
    diamond: 135,
    master: 145,
    grandmaster: 160,
    nova: 167,
    ascended: 175,
  },
}
