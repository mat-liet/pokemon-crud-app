class PokemonSprites {

    // { weight: "", height: "", stats: [{ base_stat: "", stat: { name: "" } }], sprites: { front_default: "" } }

    front_default: string;
   
    constructor(front_default: string) {
      this.front_default = front_default;
    }

}

export default PokemonSprites