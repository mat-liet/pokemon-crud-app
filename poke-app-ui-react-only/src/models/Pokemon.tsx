class Pokemon {
    id: number;
    name: string;
    type: string;
    move: string;
   
    constructor(id: number, name: string, type: string, move: string) {
      this.id = id;
      this.name = name;
      this.type = type;
      this.move = move;
    }

}

export default Pokemon