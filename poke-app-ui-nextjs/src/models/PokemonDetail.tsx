import PokemonBaseStat from "./PokemonBaseStat";
import PokemonSprites from "./PokemonSprites";

class PokemonDetail {

    // { weight: "", height: "", stats: [{ base_stat: "", stat: { name: "" } }], sprites: { front_default: "" } }

    weight: string;
    height: string;
    stats: PokemonBaseStat[];
    sprites: PokemonSprites;
   
    constructor(weight: string, height: string, stats: PokemonBaseStat[], sprites: PokemonSprites) {
      this.weight = weight;
      this.height = height;
      this.stats = stats;
      this.sprites = sprites;
    }

}

export default PokemonDetail