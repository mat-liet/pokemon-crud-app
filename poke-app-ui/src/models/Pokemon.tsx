class Pokemon {
    id: number;
    name: string;
    type: string;
    moves: string[];
   
    constructor(id: number, name: string, type: string, moves: string[]) {
      this.id = id;
      this.name = name;
      this.type = type;
      this.moves = moves;
    }

}

export default Pokemon