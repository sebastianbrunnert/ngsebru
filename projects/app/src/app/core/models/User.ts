export class MatchUser {
    public id: String = "";
    public name: String = "";
    public email: String = "";
}

export class NativeUser extends MatchUser {
    public hash: String = ""
}