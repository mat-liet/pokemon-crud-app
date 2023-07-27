export class Pokemon {
    public id: number;
    public name: string;
    public type: string;
    public move: string;

    constructor(id: number, name: string, type: string, move: string) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.move = move;
    }
}
