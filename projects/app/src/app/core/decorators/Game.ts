export class GameWrapper {
    public id: String = ""
    public image: String = ""
    public sort: Number = 100
    public function: Function = () => { }
}

export const registeredGames: GameWrapper[] = []

export function Game(data: { id: String, image: String, sort?: Number }): Function {
    return function (target: Function) {
        registeredGames.push({
            id: data.id,
            image: data.image,
            sort: data.sort || 100,
            function: target
        })
    }
}