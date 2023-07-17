import PokemonStat from "./PokemonStat";

class PokemonBaseStat {

    // { weight: "", height: "", stats: [{ base_stat: "", stat: { name: "" } }], sprites: { front_default: "" } }

    base_stat: string
    stat: PokemonStat;
   
    constructor(base_stat: string, stat: PokemonStat) {
      this.base_stat = base_stat
      this.stat = stat;
    }

}

export default PokemonBaseStat