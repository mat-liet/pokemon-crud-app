export class PokemonBaseStat {
    base_stat: string;
    stat: PokemonStat
   
    constructor(base_stat: string, stat: PokemonStat) {
      this.base_stat = base_stat
      this.stat = stat
    }

}

export class PokemonStat {
    name: string
   
    constructor(name: string) {
      this.name = name
    }

}